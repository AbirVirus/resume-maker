type Dateish = string | Date | null;

interface ResumeExportData {
  personalInfo?: { fullName: string; email: string; phone: string; location: string; linkedin: string; website: string; github: string } | null;
  summary?: { content: string } | null;
  workExperiences?: { jobTitle: string; companyName: string; startDate: Dateish; endDate: Dateish; isCurrent: boolean; description: string }[];
  educations?: { degree: string; schoolName: string; fieldOfStudy: string; startDate: Dateish; endDate: Dateish; gpa: string }[];
  skills?: { skillName: string; category: string | null; proficiencyLevel: string }[];
  sectionOrder?: readonly string[] | string[];
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").trim();
}

function fmtDate(d: Dateish): string {
  if (!d) return "";
  const date = new Date(d);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function generateATSText(data: ResumeExportData): string {
  const lines: string[] = [];
  const pi = data.personalInfo;

  if (pi) {
    lines.push(pi.fullName.toUpperCase());
    lines.push([pi.email, pi.phone, pi.location].filter(Boolean).join(" | "));
    if (pi.linkedin) lines.push(`LinkedIn: ${pi.linkedin}`);
    if (pi.github) lines.push(`GitHub: ${pi.github}`);
    if (pi.website) lines.push(`Website: ${pi.website}`);
    lines.push("");
  }

  if (data.summary?.content) {
    lines.push("PROFESSIONAL SUMMARY");
    lines.push("=".repeat(30));
    lines.push(stripHtml(data.summary.content));
    lines.push("");
  }

  if (data.workExperiences?.length) {
    lines.push("EXPERIENCE");
    lines.push("=".repeat(30));
    for (const exp of data.workExperiences) {
      lines.push(`${exp.jobTitle} — ${exp.companyName}`);
      lines.push(`${fmtDate(exp.startDate)} — ${exp.isCurrent ? "Present" : fmtDate(exp.endDate)}`);
      if (exp.description) lines.push(stripHtml(exp.description));
      lines.push("");
    }
  }

  if (data.educations?.length) {
    lines.push("EDUCATION");
    lines.push("=".repeat(30));
    for (const edu of data.educations) {
      lines.push(`${edu.degree} in ${edu.fieldOfStudy} — ${edu.schoolName}`);
      lines.push(`${fmtDate(edu.startDate)} — ${fmtDate(edu.endDate)}${edu.gpa ? ` | GPA: ${edu.gpa}` : ""}`);
      lines.push("");
    }
  }

  if (data.skills?.length) {
    lines.push("SKILLS");
    lines.push("=".repeat(30));
    const byCategory = new Map<string, string[]>();
    for (const s of data.skills) {
      const cat = s.category || "General";
      if (!byCategory.has(cat)) byCategory.set(cat, []);
      byCategory.get(cat)!.push(`${s.skillName} (${s.proficiencyLevel})`);
    }
    for (const [cat, skills] of byCategory) {
      lines.push(`${cat}: ${skills.join(", ")}`);
    }
    lines.push("");
  }

  return lines.join("\n");
}
