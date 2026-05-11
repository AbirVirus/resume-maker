import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ resumeId: string }> },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { resumeId } = await params;
  const { sectionOrder } = await request.json();

  await prisma.resume.update({
    where: { id: resumeId, userId: session.user.id },
    data: { sectionOrder },
  });

  return NextResponse.json({ success: true });
}
