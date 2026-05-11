import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

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

  // For now, return a JSON-based PDF-like response
  // Full @react-pdf/renderer integration requires separate template components
  const text = `
${resume.personalInfo?.fullName?.toUpperCase() || "NAME"}
${resume.personalInfo?.email || ""} | ${resume.personalInfo?.phone || ""} | ${resume.personalInfo?.location || ""}

PROFESSIONAL SUMMARY
${resume.summary?.content || ""}

EXPERIENCE
${resume.workExperiences.map(e => `${e.jobTitle} at ${e.companyName}`).join("\n")}

EDUCATION
${resume.educations.map(e => `${e.degree} — ${e.schoolName}`).join("\n")}

SKILLS
${resume.skills.map(s => s.skillName).join(", ")}
`.trim();

  return new NextResponse(text, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${resume.title}.pdf"`,
    },
  });
}
