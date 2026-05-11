import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateCompletion } from "@/lib/ai-client";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user || user.aiCredits <= 0) {
    return NextResponse.json({ error: "No AI credits remaining" }, { status: 402 });
  }

  const body = await request.json().catch(() => ({}));
  const { resumeId, companyName, jobTitle, recipientName, additionalNotes } = body;
  if (!resumeId || !companyName || !jobTitle) {
    return NextResponse.json(
      { error: "resumeId, companyName, and jobTitle are required" },
      { status: 400 },
    );
  }

  const resume = await prisma.resume.findFirst({
    where: { id: resumeId, userId: session.user.id },
    include: {
      personalInfo: true,
      workExperiences: { take: 3, orderBy: { sortOrder: "asc" } },
      skills: true,
      professionalSummary: true,
    },
  });

  if (!resume) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const context = `
Applicant name: ${resume.personalInfo?.fullName || "Unknown"}
Target company: ${companyName}
Target job title: ${jobTitle}
${recipientName ? `Recipient: ${recipientName}` : ""}
Professional summary: ${resume.professionalSummary?.content || "Not provided"}
Recent experience: ${resume.workExperiences.map(e => `${e.jobTitle} at ${e.companyName}`).join(", ")}
Key skills: ${resume.skills.map(s => s.skillName).join(", ")}
${additionalNotes ? `Additional notes: ${additionalNotes}` : ""}
`.trim();

  const suggestedText = await generateCompletion(
    "You are a professional cover letter writer. Write a compelling, tailored cover letter body (3-4 paragraphs). Address the hiring manager, express genuine interest in the company and role, connect the applicant's experience to the job requirements, and close with a call to action. Return ONLY the body content — no greeting, no closing, no subject line.",
    `Write a cover letter body based on:\n${context}`,
  );

  if (!suggestedText) {
    return NextResponse.json({ error: "AI service unavailable" }, { status: 503 });
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { aiCredits: user.aiCredits - 1 },
  });

  await prisma.aISuggestion.create({
    data: {
      userId: session.user.id,
      resumeId,
      sectionType: "coverLetter",
      originalText: "",
      suggestedText,
    },
  });

  return NextResponse.json({
    suggestedText,
    creditsRemaining: user.aiCredits - 1,
  });
}
