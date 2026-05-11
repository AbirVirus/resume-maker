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

  const { resumeId } = await request.json().catch(() => ({}));
  if (!resumeId) {
    return NextResponse.json({ error: "resumeId is required" }, { status: 400 });
  }

  const resume = await prisma.resume.findFirst({
    where: { id: resumeId, userId: session.user.id },
    include: {
      personalInfo: true,
      workExperiences: { take: 3, orderBy: { sortOrder: "asc" } },
      skills: true,
    },
  });

  if (!resume) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const context = `
Name: ${resume.personalInfo?.fullName || "Unknown"}
Recent roles: ${resume.workExperiences.map(e => `${e.jobTitle} at ${e.companyName}`).join(", ")}
Skills: ${resume.skills.map(s => s.skillName).join(", ")}
`.trim();

  const suggestedText = await generateCompletion(
    "You are a professional resume writer. Write a concise, powerful 3-4 sentence professional summary. Use active language, highlight impact, and avoid clichés. Return ONLY the summary text, no additional formatting.",
    `Write a professional summary based on:\n${context}`,
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
      sectionType: "summary",
      originalText: "",
      suggestedText,
    },
  });

  return NextResponse.json({
    suggestedText,
    creditsRemaining: user.aiCredits - 1,
  });
}
