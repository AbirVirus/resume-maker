import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ resumeId: string }> },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { resumeId } = await params;
  const body = await request.json();

  const resume = await prisma.resume.findFirst({
    where: { id: resumeId, userId: session.user.id },
  });

  if (!resume) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (body.personalInfo) {
    await prisma.personalInfo.upsert({
      where: { resumeId },
      update: body.personalInfo,
      create: { ...body.personalInfo, resumeId },
    });
  }

  if (body.summary) {
    await prisma.professionalSummary.upsert({
      where: { resumeId },
      update: body.summary,
      create: { ...body.summary, resumeId },
    });
  }

  if (body.workExperience?.length) {
    await prisma.workExperience.deleteMany({ where: { resumeId } });
    await prisma.workExperience.createMany({
      data: body.workExperience.map((e: Record<string, unknown>) => ({ ...e, resumeId })),
    });
  }

  if (body.education?.length) {
    await prisma.education.deleteMany({ where: { resumeId } });
    await prisma.education.createMany({
      data: body.education.map((e: Record<string, unknown>) => ({ ...e, resumeId })),
    });
  }

  if (body.skills?.length) {
    await prisma.skill.deleteMany({ where: { resumeId } });
    await prisma.skill.createMany({
      data: body.skills.map((s: Record<string, unknown>) => ({ ...s, resumeId })),
    });
  }

  return NextResponse.json({ success: true });
}
