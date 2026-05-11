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

  const { resumeId, currentText } = await request.json().catch(() => ({}));
  if (!resumeId || !currentText) {
    return NextResponse.json({ error: "resumeId and currentText are required" }, { status: 400 });
  }

  const suggestedText = await generateCompletion(
    "You are a professional resume editor. Rewrite the given bullet point to be more impactful using strong action verbs, quantified results where possible, and concise language. Return ONLY the improved bullet point, no additional text.",
    `Improve this resume bullet point:\n${currentText}`,
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
