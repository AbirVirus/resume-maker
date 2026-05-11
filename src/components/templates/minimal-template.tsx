import type { TemplateProps } from "@/types/template";

function formatDate(d: string | null): string {
  if (!d) return "";
  const date = new Date(d);
  if (isNaN(date.getTime())) return d;
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export default function MinimalTemplate({ data, settings }: TemplateProps) {
  const { personalInfo, summary, workExperience, education, skills, projects, certifications, languages, volunteerWork, references } = data;

  return (
    <div className="p-10 font-sans text-sm leading-relaxed text-gray-800 bg-white">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-light tracking-tight text-gray-900 mb-4">
          {personalInfo?.fullName || "Your Name"}
        </h1>
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-gray-500">
          {personalInfo?.email && <span>{personalInfo.email}</span>}
          {personalInfo?.phone && <span>{personalInfo.phone}</span>}
          {personalInfo?.location && <span>{personalInfo.location}</span>}
          {personalInfo?.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo?.github && <span>{personalInfo.github}</span>}
        </div>
      </div>

      {/* Summary */}
      {summary?.content && settings.sectionOrder.includes("summary") && (
        <div className="mb-10">
          <p className="text-sm leading-relaxed text-gray-600 max-w-prose">{summary.content}</p>
        </div>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && settings.sectionOrder.includes("workExperience") && (
        <div className="mb-10">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-5">Experience</h2>
          <div className="space-y-8">
            {workExperience.map((exp) => (
              <div key={exp.id || exp.sortOrder}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-semibold text-base text-gray-900">{exp.jobTitle}</h3>
                  <span className="text-xs text-gray-400 shrink-0 ml-4">
                    {formatDate(exp.startDate)} — {exp.isCurrent ? "Present" : formatDate(exp.endDate)}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-2">{exp.companyName}{exp.location ? ` — ${exp.location}` : ""}</p>
                {exp.description && (
                  <div className="text-sm leading-relaxed text-gray-600" dangerouslySetInnerHTML={{ __html: exp.description }} />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && settings.sectionOrder.includes("education") && (
        <div className="mb-10">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-5">Education</h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id || edu.sortOrder}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-semibold text-sm text-gray-900">{edu.schoolName}</h3>
                  <span className="text-xs text-gray-400 shrink-0 ml-4">
                    {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && settings.sectionOrder.includes("skills") && (
        <div className="mb-10">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-5">Skills</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            {skills.map((s) => s.skillName).join(" · ")}
          </p>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && settings.sectionOrder.includes("projects") && (
        <div className="mb-10">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-5">Projects</h2>
          <div className="space-y-4">
            {projects.map((p) => (
              <div key={p.id || p.sortOrder}>
                <h3 className="font-semibold text-sm text-gray-900">{p.projectName}</h3>
                {p.description && <div className="text-sm text-gray-600 mt-1" dangerouslySetInnerHTML={{ __html: p.description }} />}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && settings.sectionOrder.includes("certifications") && (
        <div className="mb-10">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-5">Certifications</h2>
          <div className="space-y-1 text-sm text-gray-600">
            {certifications.map((c) => (
              <p key={c.id || c.sortOrder}>
                {c.name}{c.issuer ? ` — ${c.issuer}` : ""}
                {c.issueDate ? ` (${formatDate(c.issueDate)})` : ""}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {languages.length > 0 && settings.sectionOrder.includes("languages") && (
        <div className="mb-10">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-5">Languages</h2>
          <p className="text-sm text-gray-600">
            {languages.map((l) => `${l.language} (${l.proficiency})`).join(" · ")}
          </p>
        </div>
      )}

      {/* Volunteer */}
      {volunteerWork.length > 0 && settings.sectionOrder.includes("volunteerWork") && (
        <div className="mb-10">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-5">Volunteer</h2>
          <div className="space-y-3">
            {volunteerWork.map((v) => (
              <div key={v.id || v.sortOrder}>
                <p className="font-semibold text-sm text-gray-900">{v.role} — {v.organizationName}</p>
                {v.description && <div className="text-sm text-gray-600 mt-1" dangerouslySetInnerHTML={{ __html: v.description }} />}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* References */}
      {references.length > 0 && settings.sectionOrder.includes("references") && (
        <div className="mb-10">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-5">References</h2>
          <div className="space-y-2 text-sm text-gray-600">
            {references.map((r) => (
              <p key={r.id || r.sortOrder}>
                <span className="font-medium text-gray-900">{r.fullName}</span> — {r.title}{r.company ? `, ${r.company}` : ""}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
