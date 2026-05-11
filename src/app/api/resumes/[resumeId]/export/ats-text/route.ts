import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateATSText } from "@/lib/ats-exporter";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ resumeId: string }> },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { resumeId } = await params;

  const resume = await prisma.resume.findFirst({
    where: { id: resumeId, userId: session.user.id },
    include: {
      personalInfo: true,
      summary: true,
      workExperiences: { orderBy: { sortOrder: "asc" } },
      educations: { orderBy: { sortOrder: "asc" } },
      skills: { orderBy: { sortOrder: "asc" } },
    },
  });

  if (!resume) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const atsText = generateATSText(resume);

  return new NextResponse(atsText, {
    headers: {
      "Content-Type": "text/plain",
      "Content-Disposition": `attachment; filename="${resume.title}-ATS.txt"`,
    },
  });
}
