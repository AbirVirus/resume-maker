import type { TemplateProps } from "@/types/template";

function formatDate(d: string | null): string {
  if (!d) return "";
  const date = new Date(d);
  if (isNaN(date.getTime())) return d;
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="border-b-2 mb-3 pb-1" style={{ borderColor: "var(--primary)" }}>
      <h2 className="text-sm font-bold tracking-widest uppercase" style={{ color: "var(--primary)" }}>
        {title}
      </h2>
    </div>
  );
}

export default function ClassicTemplate({ data, settings }: TemplateProps) {
  const { personalInfo, summary, workExperience, education, skills, projects, certifications, languages, volunteerWork, references } = data;
  const primary = settings.primaryColor || "#1a365d";

  return (
    <div className="p-10 font-serif text-sm leading-relaxed text-gray-800" style={{ "--primary": primary } as React.CSSProperties}>
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold tracking-wide text-gray-900 uppercase">
          {personalInfo?.fullName || "Your Name"}
        </h1>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-2 text-xs text-gray-600">
          {personalInfo?.email && <span>{personalInfo.email}</span>}
          {personalInfo?.phone && <span>{personalInfo.phone}</span>}
          {personalInfo?.location && <span>{personalInfo.location}</span>}
          {personalInfo?.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo?.github && <span>{personalInfo.github}</span>}
        </div>
      </div>

      {/* Summary */}
      {summary?.content && settings.sectionOrder.includes("summary") && (
        <div className="mb-5">
          <SectionHeading title="Professional Summary" />
          <p className="text-xs leading-relaxed">{summary.content}</p>
        </div>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && settings.sectionOrder.includes("workExperience") && (
        <div className="mb-5">
          <SectionHeading title="Professional Experience" />
          {workExperience.map((exp) => (
            <div key={exp.id || exp.sortOrder} className="mb-4">
              <div className="flex justify-between items-baseline">
                <div>
                  <h3 className="font-bold text-sm">{exp.jobTitle}</h3>
                  <span className="text-xs italic">{exp.companyName}{exp.location ? `, ${exp.location}` : ""}</span>
                </div>
                <span className="text-xs text-gray-500 shrink-0 ml-4">
                  {formatDate(exp.startDate)} — {exp.isCurrent ? "Present" : formatDate(exp.endDate)}
                </span>
              </div>
              {exp.description && (
                <div className="mt-1 text-xs leading-relaxed" dangerouslySetInnerHTML={{ __html: exp.description }} />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && settings.sectionOrder.includes("education") && (
        <div className="mb-5">
          <SectionHeading title="Education" />
          {education.map((edu) => (
            <div key={edu.id || edu.sortOrder} className="mb-3">
              <div className="flex justify-between items-baseline">
                <div>
                  <h3 className="font-bold text-sm">{edu.schoolName}</h3>
                  <span className="text-xs italic">{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""}</span>
                </div>
                <span className="text-xs text-gray-500 shrink-0 ml-4">
                  {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && settings.sectionOrder.includes("skills") && (
        <div className="mb-5">
          <SectionHeading title="Skills" />
          <div className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <span key={s.id || s.sortOrder} className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                {s.skillName}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && settings.sectionOrder.includes("projects") && (
        <div className="mb-5">
          <SectionHeading title="Projects" />
          {projects.map((p) => (
            <div key={p.id || p.sortOrder} className="mb-3">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-sm">{p.projectName}{p.role ? ` — ${p.role}` : ""}</h3>
                <span className="text-xs text-gray-500 shrink-0 ml-4">
                  {formatDate(p.startDate)} — {formatDate(p.endDate)}
                </span>
              </div>
              {p.description && <div className="mt-1 text-xs leading-relaxed" dangerouslySetInnerHTML={{ __html: p.description }} />}
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && settings.sectionOrder.includes("certifications") && (
        <div className="mb-5">
          <SectionHeading title="Certifications" />
          {certifications.map((c) => (
            <div key={c.id || c.sortOrder} className="mb-2 text-xs">
              <span className="font-bold">{c.name}</span>
              {c.issuer && <span className="text-gray-600"> — {c.issuer}</span>}
              {c.issueDate && <span className="text-gray-500"> ({formatDate(c.issueDate)})</span>}
            </div>
          ))}
        </div>
      )}

      {/* Languages */}
      {languages.length > 0 && settings.sectionOrder.includes("languages") && (
        <div className="mb-5">
          <SectionHeading title="Languages" />
          <div className="flex flex-wrap gap-x-6 text-xs">
            {languages.map((l) => (
              <span key={l.id || l.sortOrder}>{l.language} — {l.proficiency}</span>
            ))}
          </div>
        </div>
      )}

      {/* Volunteer Work */}
      {volunteerWork.length > 0 && settings.sectionOrder.includes("volunteerWork") && (
        <div className="mb-5">
          <SectionHeading title="Volunteer Experience" />
          {volunteerWork.map((v) => (
            <div key={v.id || v.sortOrder} className="mb-3">
              <div className="flex justify-between items-baseline">
                <div>
                  <h3 className="font-bold text-sm">{v.role}</h3>
                  <span className="text-xs italic">{v.organizationName}</span>
                </div>
                <span className="text-xs text-gray-500 shrink-0 ml-4">
                  {formatDate(v.startDate)} — {formatDate(v.endDate)}
                </span>
              </div>
              {v.description && <div className="mt-1 text-xs leading-relaxed" dangerouslySetInnerHTML={{ __html: v.description }} />}
            </div>
          ))}
        </div>
      )}

      {/* References */}
      {references.length > 0 && settings.sectionOrder.includes("references") && (
        <div className="mb-5">
          <SectionHeading title="References" />
          <div className="grid grid-cols-2 gap-3 text-xs">
            {references.map((r) => (
              <div key={r.id || r.sortOrder}>
                <p className="font-bold">{r.fullName}</p>
                <p className="text-gray-600">{r.title}{r.company ? `, ${r.company}` : ""}</p>
                <p className="text-gray-500">{r.email}{r.phone ? ` | ${r.phone}` : ""}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
