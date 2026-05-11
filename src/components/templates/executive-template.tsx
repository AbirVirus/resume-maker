import type { TemplateProps } from "@/types/template";

function formatDate(d: string | null): string {
  if (!d) return "";
  const date = new Date(d);
  if (isNaN(date.getTime())) return d;
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export default function ExecutiveTemplate({ data, settings }: TemplateProps) {
  const { personalInfo, summary, workExperience, education, skills, projects, certifications, languages, volunteerWork, references } = data;
  const primary = settings.primaryColor || "#1e3a5f";

  return (
    <div className="p-10 font-serif text-sm leading-relaxed text-gray-800" style={{ "--primary": primary } as React.CSSProperties}>
      {/* Centered Header */}
      <div className="text-center mb-8 pb-6 border-b-2" style={{ borderColor: primary }}>
        <h1 className="text-3xl font-bold tracking-wide text-gray-900 mb-2 uppercase">
          {personalInfo?.fullName || "Your Name"}
        </h1>
        <div className="w-16 h-0.5 mx-auto mb-4" style={{ backgroundColor: primary }} />
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-xs text-gray-600">
          {personalInfo?.email && <span>{personalInfo.email}</span>}
          {personalInfo?.phone && <span>{personalInfo.phone}</span>}
          {personalInfo?.location && <span>{personalInfo.location}</span>}
          {personalInfo?.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo?.github && <span>{personalInfo.github}</span>}
        </div>
      </div>

      {/* Summary */}
      {summary?.content && settings.sectionOrder.includes("summary") && (
        <div className="mb-8 text-center">
          <p className="text-sm leading-relaxed max-w-prose mx-auto italic text-gray-600">
            {summary.content}
          </p>
        </div>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && settings.sectionOrder.includes("workExperience") && (
        <div className="mb-8">
          <h2 className="text-sm font-bold tracking-widest uppercase text-center mb-6" style={{ color: primary }}>
            Professional Experience
          </h2>
          <div className="space-y-6">
            {workExperience.map((exp) => (
              <div key={exp.id || exp.sortOrder}>
                <div className="flex justify-between items-baseline border-b pb-1 mb-2" style={{ borderColor: primary + "30" }}>
                  <div>
                    <h3 className="font-bold text-base text-gray-900">{exp.jobTitle}</h3>
                    <span className="text-sm text-gray-600">{exp.companyName}{exp.location ? ` — ${exp.location}` : ""}</span>
                  </div>
                  <span className="text-xs text-gray-500 shrink-0 ml-4">
                    {formatDate(exp.startDate)} — {exp.isCurrent ? "Present" : formatDate(exp.endDate)}
                  </span>
                </div>
                {exp.description && (
                  <div className="text-xs leading-relaxed" dangerouslySetInnerHTML={{ __html: exp.description }} />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && settings.sectionOrder.includes("education") && (
        <div className="mb-8">
          <h2 className="text-sm font-bold tracking-widest uppercase text-center mb-6" style={{ color: primary }}>
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id || edu.sortOrder} className="text-center">
                <h3 className="font-bold text-sm text-gray-900">{edu.schoolName}</h3>
                <p className="text-xs text-gray-600">
                  {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""}
                  {(edu.startDate || edu.endDate) && ` · ${formatDate(edu.startDate)} — ${formatDate(edu.endDate)}`}
                </p>
                {edu.gpa && <p className="text-xs text-gray-500">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && settings.sectionOrder.includes("skills") && (
        <div className="mb-8">
          <h2 className="text-sm font-bold tracking-widest uppercase text-center mb-6" style={{ color: primary }}>
            Core Competencies
          </h2>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-gray-700">
            {skills.map((s) => (
              <span key={s.id || s.sortOrder} className="after:content-['·'] after:ml-4 last:after:content-none">
                {s.skillName}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && settings.sectionOrder.includes("certifications") && (
        <div className="mb-8">
          <h2 className="text-sm font-bold tracking-widest uppercase text-center mb-6" style={{ color: primary }}>
            Certifications
          </h2>
          <div className="space-y-1 text-center text-xs text-gray-600">
            {certifications.map((c) => (
              <p key={c.id || c.sortOrder}>
                {c.name}{c.issuer ? ` — ${c.issuer}` : ""}
                {c.issueDate ? ` (${formatDate(c.issueDate)})` : ""}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && settings.sectionOrder.includes("projects") && (
        <div className="mb-8">
          <h2 className="text-sm font-bold tracking-widest uppercase text-center mb-6" style={{ color: primary }}>
            Selected Projects
          </h2>
          <div className="space-y-4">
            {projects.map((p) => (
              <div key={p.id || p.sortOrder} className="text-center">
                <h3 className="font-bold text-sm text-gray-900">{p.projectName}{p.role ? ` — ${p.role}` : ""}</h3>
                {p.description && <div className="text-xs text-gray-600 mt-1" dangerouslySetInnerHTML={{ __html: p.description }} />}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {languages.length > 0 && settings.sectionOrder.includes("languages") && (
        <div className="mb-8">
          <h2 className="text-sm font-bold tracking-widest uppercase text-center mb-6" style={{ color: primary }}>
            Languages
          </h2>
          <p className="text-center text-xs text-gray-600">
            {languages.map((l) => `${l.language} (${l.proficiency})`).join(" · ")}
          </p>
        </div>
      )}

      {/* Volunteer */}
      {volunteerWork.length > 0 && settings.sectionOrder.includes("volunteerWork") && (
        <div className="mb-8">
          <h2 className="text-sm font-bold tracking-widest uppercase text-center mb-6" style={{ color: primary }}>
            Board & Community Involvement
          </h2>
          <div className="space-y-3 text-center text-xs text-gray-600">
            {volunteerWork.map((v) => (
              <p key={v.id || v.sortOrder}>
                <span className="font-semibold">{v.role}</span> — {v.organizationName}
                {(v.startDate || v.endDate) && ` (${formatDate(v.startDate)} — ${formatDate(v.endDate)})`}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* References */}
      {references.length > 0 && settings.sectionOrder.includes("references") && (
        <div className="mb-8">
          <h2 className="text-sm font-bold tracking-widest uppercase text-center mb-6" style={{ color: primary }}>
            References
          </h2>
          <div className="space-y-2 text-center text-xs text-gray-600">
            {references.map((r) => (
              <p key={r.id || r.sortOrder}>
                <span className="font-semibold text-gray-900">{r.fullName}</span> — {r.title}{r.company ? `, ${r.company}` : ""}
                {(r.email || r.phone) && ` · ${r.email || r.phone}`}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
