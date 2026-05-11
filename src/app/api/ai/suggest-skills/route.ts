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

  const { resumeId, jobTitle } = await request.json().catch(() => ({}));
  if (!resumeId) {
    return NextResponse.json({ error: "resumeId is required" }, { status: 400 });
  }

  const resume = await prisma.resume.findFirst({
    where: { id: resumeId, userId: session.user.id },
    include: { workExperiences: true, skills: true },
  });

  if (!resume) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const existingSkills = resume.skills.map(s => s.skillName).join(", ");
  const context = jobTitle || resume.workExperiences[0]?.jobTitle || "professional";

  const suggestedText = await generateCompletion(
    "You are a career coach. Given a job title and existing skills, suggest 5-8 additional relevant skills that would strengthen a resume. Return as a comma-separated list only, no extra text.",
    `Job: ${context}\nExisting skills: ${existingSkills}\n\nSuggest additional skills:`,
  );

  if (!suggestedText) {
    return NextResponse.json({ error: "AI service unavailable" }, { status: 503 });
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { aiCredits: user.aiCredits - 1 },
  });

  return NextResponse.json({
    suggestedText,
    creditsRemaining: user.aiCredits - 1,
  });
}
