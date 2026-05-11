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
  const entry = await prisma.skill.create({ data: { ...body, resumeId } });
  return NextResponse.json(entry, { status: 201 });
}
