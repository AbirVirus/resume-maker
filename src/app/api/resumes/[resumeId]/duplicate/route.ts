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

  const original = await prisma.resume.findFirst({
    where: { id: resumeId, userId: session.user.id },
    include: {
      personalInfo: true,
      summary: true,
      workExperiences: true,
      educations: true,
      skills: true,
      projects: true,
      certifications: true,
      languages: true,
      volunteerWorks: true,
      references: true,
    },
  });

  if (!original) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const duplicate = await prisma.resume.create({
    data: {
      userId: session.user.id,
      title: `${original.title} (Copy)`,
      templateId: original.templateId,
      primaryColor: original.primaryColor,
      fontFamily: original.fontFamily,
      fontSize: original.fontSize,
      sectionOrder: original.sectionOrder as object,
      personalInfo: original.personalInfo
        ? {
            create: {
              fullName: original.personalInfo.fullName,
              email: original.personalInfo.email,
              phone: original.personalInfo.phone,
              location: original.personalInfo.location,
              linkedin: original.personalInfo.linkedin,
              website: original.personalInfo.website,
              github: original.personalInfo.github,
              photoUrl: original.personalInfo.photoUrl,
            },
          }
        : undefined,
      summary: original.summary
        ? { create: { content: original.summary.content } }
        : undefined,
      workExperiences: {
        createMany: {
          data: original.workExperiences.map((e) => ({
            sortOrder: e.sortOrder,
            companyName: e.companyName,
            jobTitle: e.jobTitle,
            location: e.location,
            startDate: e.startDate,
            endDate: e.endDate,
            isCurrent: e.isCurrent,
            description: e.description,
          })),
        },
      },
      educations: {
        createMany: {
          data: original.educations.map((e) => ({
            sortOrder: e.sortOrder,
            schoolName: e.schoolName,
            degree: e.degree,
            fieldOfStudy: e.fieldOfStudy,
            startDate: e.startDate,
            endDate: e.endDate,
            gpa: e.gpa,
            description: e.description,
          })),
        },
      },
      skills: {
        createMany: {
          data: original.skills.map((s) => ({
            sortOrder: s.sortOrder,
            category: s.category,
            skillName: s.skillName,
            proficiencyLevel: s.proficiencyLevel,
          })),
        },
      },
      projects: {
        createMany: {
          data: original.projects.map((p) => ({
            sortOrder: p.sortOrder,
            projectName: p.projectName,
            role: p.role,
            url: p.url,
            startDate: p.startDate,
            endDate: p.endDate,
            description: p.description,
          })),
        },
      },
      certifications: {
        createMany: {
          data: original.certifications.map((c) => ({
            sortOrder: c.sortOrder,
            name: c.name,
            issuer: c.issuer,
            issueDate: c.issueDate,
            expiryDate: c.expiryDate,
            credentialUrl: c.credentialUrl,
          })),
        },
      },
      languages: {
        createMany: {
          data: original.languages.map((l) => ({
            sortOrder: l.sortOrder,
            language: l.language,
            proficiency: l.proficiency,
          })),
        },
      },
      volunteerWorks: {
        createMany: {
          data: original.volunteerWorks.map((v) => ({
            sortOrder: v.sortOrder,
            organizationName: v.organizationName,
            role: v.role,
            startDate: v.startDate,
            endDate: v.endDate,
            description: v.description,
          })),
        },
      },
      references: {
        createMany: {
          data: original.references.map((r) => ({
            sortOrder: r.sortOrder,
            fullName: r.fullName,
            title: r.title,
            company: r.company,
            phone: r.phone,
            email: r.email,
            relationship: r.relationship,
          })),
        },
      },
    },
  });

  return NextResponse.json(duplicate, { status: 201 });
}
