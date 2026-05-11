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

  const { resumeId, currentText, jobTitle } = await request.json().catch(() => ({}));
  if (!resumeId || !currentText) {
    return NextResponse.json({ error: "resumeId and currentText are required" }, { status: 400 });
  }

  const jobContext = jobTitle ? ` for a ${jobTitle} position` : "";

  const suggestedText = await generateCompletion(
    "You are a professional resume writer. Rewrite the job description to be more impactful. Use strong action verbs, include metrics and quantified achievements where plausible, and keep it concise. Return ONLY the rewritten description, no extra text.",
    `Rewrite this job description${jobContext}:\n${currentText}`,
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
      sectionType: "description",
      originalText: currentText,
      suggestedText,
    },
  });

  return NextResponse.json({
    suggestedText,
    creditsRemaining: user.aiCredits - 1,
  });
}
