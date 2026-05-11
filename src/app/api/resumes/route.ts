import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const resumes = await prisma.resume.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: "desc" },
    include: {
      personalInfo: { select: { fullName: true } },
    },
  });

  return NextResponse.json(resumes);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title = "Untitled Resume", templateId = "classic" } =
    await request.json().catch(() => ({}));

  const resume = await prisma.resume.create({
    data: {
      userId: session.user.id,
      title,
      templateId,
      personalInfo: { create: {} },
      summary: { create: { content: "" } },
    },
  });

  return NextResponse.json(resume, { status: 201 });
}
