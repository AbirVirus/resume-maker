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
      projects: { orderBy: { sortOrder: "asc" } },
      certifications: { orderBy: { sortOrder: "asc" } },
      languages: { orderBy: { sortOrder: "asc" } },
      volunteerWorks: { orderBy: { sortOrder: "asc" } },
      references: { orderBy: { sortOrder: "asc" } },
    },
  });

  if (!resume) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const exportData = {
    meta: {
      title: resume.title,
      templateId: resume.templateId,
      primaryColor: resume.primaryColor,
      fontFamily: resume.fontFamily,
      fontSize: resume.fontSize,
      sectionOrder: resume.sectionOrder,
    },
    personalInfo: resume.personalInfo,
    summary: resume.summary,
    workExperience: resume.workExperiences,
    education: resume.educations,
    skills: resume.skills,
    projects: resume.projects,
    certifications: resume.certifications,
    languages: resume.languages,
    volunteerWork: resume.volunteerWorks,
    references: resume.references,
  };

  return new NextResponse(JSON.stringify(exportData, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": `attachment; filename="${resume.title}.json"`,
    },
  });
}
