import { PrismaClient, ProficiencyLevel } from "../src/generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Clean existing data
  await prisma.aISuggestion.deleteMany();
  await prisma.coverLetter.deleteMany();
  await prisma.referenceEntry.deleteMany();
  await prisma.volunteerWork.deleteMany();
  await prisma.language.deleteMany();
  await prisma.certification.deleteMany();
  await prisma.project.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.education.deleteMany();
  await prisma.workExperience.deleteMany();
  await prisma.professionalSummary.deleteMany();
  await prisma.personalInfo.deleteMany();
  await prisma.resume.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash("demo123", 12);

  const user = await prisma.user.create({
    data: {
      email: "demo@resumeforge.com",
      passwordHash,
      name: "Alex Chen",
      aiCredits: 20,
    },
  });

  // Resume 1: Tech Professional
  const resume1 = await prisma.resume.create({
    data: {
      userId: user.id,
      title: "Software Engineer Resume",
      templateId: "modern",
      primaryColor: "#2563eb",
      fontFamily: "inter",
      fontSize: "medium",
      status: "complete",
      sectionOrder: [
        "personalInfo", "summary", "workExperience", "education",
        "skills", "projects", "certifications", "languages",
      ],
    },
  });

  await prisma.personalInfo.create({
    data: {
      resumeId: resume1.id,
      fullName: "Alex Chen",
      email: "alex.chen@email.com",
      phone: "(555) 123-4567",
      location: "San Francisco, CA",
      linkedin: "linkedin.com/in/alexchen",
      github: "github.com/alexchen",
      website: "alexchen.dev",
    },
  });

  await prisma.professionalSummary.create({
    data: {
      resumeId: resume1.id,
      content:
        "Full-stack software engineer with 5+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud infrastructure. Led migration of monolithic legacy system to microservices, reducing deployment time by 60% and improving system reliability to 99.9% uptime.",
    },
  });

  const workDates = [
    { start: new Date("2023-03-01"), end: null, isCurrent: true },
    { start: new Date("2020-06-01"), end: new Date("2023-02-28"), isCurrent: false },
    { start: new Date("2018-09-01"), end: new Date("2020-05-31"), isCurrent: false },
  ];

  const workExps = [
    {
      sortOrder: 0,
      companyName: "TechCorp Inc.",
      jobTitle: "Senior Software Engineer",
      location: "San Francisco, CA",
      description:
        "<ul><li>Architected and built a real-time analytics dashboard serving 2M+ daily active users using React, TypeScript, and WebSockets</li><li>Reduced API latency by 40% through Redis caching layer and database query optimization</li><li>Mentored team of 4 junior engineers and led migration from JavaScript to TypeScript across 12 microservices</li></ul>",
      ...workDates[0],
    },
    {
      sortOrder: 1,
      companyName: "StartupXYZ",
      jobTitle: "Full-Stack Developer",
      location: "Austin, TX",
      description:
        "<ul><li>Built customer-facing SaaS platform from scratch using Next.js, Prisma, and PostgreSQL, growing to 50K users in first year</li><li>Implemented CI/CD pipeline with GitHub Actions, cutting release cycle from 2 weeks to daily deployments</li><li>Designed RESTful API consumed by iOS and Android apps with comprehensive OpenAPI documentation</li></ul>",
      ...workDates[1],
    },
    {
      sortOrder: 2,
      companyName: "Digital Agency Co.",
      jobTitle: "Junior Developer",
      location: "Austin, TX",
      description:
        "<ul><li>Developed responsive web applications for 15+ clients using React and Node.js</li><li>Built reusable component library adopted across all agency projects, reducing development time by 25%</li></ul>",
      ...workDates[2],
    },
  ];

  for (const exp of workExps) {
    await prisma.workExperience.create({
      data: { resumeId: resume1.id, ...exp },
    });
  }

  await prisma.education.create({
    data: {
      resumeId: resume1.id,
      sortOrder: 0,
      schoolName: "University of Texas at Austin",
      degree: "Bachelor of Science",
      fieldOfStudy: "Computer Science",
      startDate: new Date("2014-09-01"),
      endDate: new Date("2018-05-15"),
      gpa: "3.8",
    },
  });

  const skills = [
    { skillName: "React", category: "Frontend", proficiencyLevel: "expert" as ProficiencyLevel },
    { skillName: "TypeScript", category: "Languages", proficiencyLevel: "expert" as ProficiencyLevel },
    { skillName: "Node.js", category: "Backend", proficiencyLevel: "expert" as ProficiencyLevel },
    { skillName: "Next.js", category: "Frontend", proficiencyLevel: "advanced" as ProficiencyLevel },
    { skillName: "PostgreSQL", category: "Database", proficiencyLevel: "advanced" as ProficiencyLevel },
    { skillName: "AWS", category: "Cloud", proficiencyLevel: "advanced" as ProficiencyLevel },
    { skillName: "Docker", category: "DevOps", proficiencyLevel: "intermediate" as ProficiencyLevel },
    { skillName: "Python", category: "Languages", proficiencyLevel: "intermediate" as ProficiencyLevel },
    { skillName: "GraphQL", category: "Backend", proficiencyLevel: "intermediate" as ProficiencyLevel },
    { skillName: "Redis", category: "Database", proficiencyLevel: "intermediate" as ProficiencyLevel },
  ];

  for (let i = 0; i < skills.length; i++) {
    await prisma.skill.create({
      data: { resumeId: resume1.id, sortOrder: i, ...skills[i] },
    });
  }

  await prisma.project.create({
    data: {
      resumeId: resume1.id,
      sortOrder: 0,
      projectName: "OpenSource CMS",
      role: "Core Maintainer",
      url: "github.com/alexchen/opensource-cms",
      startDate: new Date("2022-01-01"),
      description:
        "Headless CMS with 2K+ GitHub stars. Built with Next.js, Prisma, and PostgreSQL. Features real-time collaboration, role-based access control, and REST/GraphQL APIs.",
    },
  });

  await prisma.certification.create({
    data: {
      resumeId: resume1.id,
      sortOrder: 0,
      name: "AWS Solutions Architect Associate",
      issuer: "Amazon Web Services",
      issueDate: new Date("2022-08-15"),
    },
  });

  await prisma.language.create({
    data: {
      resumeId: resume1.id,
      sortOrder: 0,
      language: "English",
      proficiency: "expert",
    },
  });

  await prisma.language.create({
    data: {
      resumeId: resume1.id,
      sortOrder: 1,
      language: "Mandarin Chinese",
      proficiency: "expert",
    },
  });

  // Resume 2: Empty template
  await prisma.resume.create({
    data: {
      userId: user.id,
      title: "New Resume (Draft)",
      templateId: "classic",
      primaryColor: "#1e3a5f",
      fontFamily: "inter",
      fontSize: "medium",
      status: "draft",
    },
  });

  // Cover letter
  await prisma.coverLetter.create({
    data: {
      resumeId: resume1.id,
      userId: user.id,
      title: "Google — Senior Frontend Engineer",
      companyName: "Google",
      recipientName: "Hiring Manager",
      greeting: "Dear Hiring Manager,",
      bodyContent:
        "I am writing to express my strong interest in the Senior Frontend Engineer position at Google. With over five years of experience building high-performance web applications and a deep expertise in React and TypeScript, I am excited about the opportunity to contribute to products that reach billions of users.\n\nAt TechCorp, I architected a real-time analytics dashboard serving over 2 million daily active users, which required careful attention to performance optimization, accessibility, and cross-browser compatibility. I led the migration of our frontend codebase from JavaScript to TypeScript, which reduced runtime errors by 70% and improved developer productivity across the engineering organization.\n\nI am particularly drawn to Google's engineering culture of innovation and collaboration. My experience mentoring junior engineers and contributing to open-source projects aligns well with Google's emphasis on knowledge sharing and community impact. I would welcome the opportunity to discuss how my technical skills and leadership experience can add value to your team.",
      closing: "Sincerely,",
      templateId: "classic",
    },
  });

  console.log("Seed complete!");
  console.log("Demo login: demo@resumeforge.com / demo123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
