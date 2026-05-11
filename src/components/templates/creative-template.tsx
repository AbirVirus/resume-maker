import type { TemplateProps } from "@/types/template";
import { Mail, Phone, MapPin, Globe, ExternalLink, Code } from "lucide-react";

function formatDate(d: string | null): string {
  if (!d) return "";
  const date = new Date(d);
  if (isNaN(date.getTime())) return d;
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export default function CreativeTemplate({ data, settings }: TemplateProps) {
  const { personalInfo, summary, workExperience, education, skills, projects, certifications, languages, volunteerWork, references } = data;
  const primary = settings.primaryColor || "#7c3aed";

  return (
    <div className="font-sans text-sm leading-relaxed text-gray-800" style={{ "--primary": primary } as React.CSSProperties}>
      {/* Header with accent color */}
      <div className="p-8 text-white" style={{ backgroundColor: primary }}>
        <h1 className="text-3xl font-bold mb-2">{personalInfo?.fullName || "Your Name"}</h1>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs opacity-90">
          {personalInfo?.email && (
            <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{personalInfo.email}</span>
          )}
          {personalInfo?.phone && (
            <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{personalInfo.phone}</span>
          )}
          {personalInfo?.location && (
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{personalInfo.location}</span>
          )}
          {personalInfo?.website && (
            <span className="flex items-center gap-1"><Globe className="w-3 h-3" />{personalInfo.website}</span>
          )}
          {personalInfo?.linkedin && (
            <span className="flex items-center gap-1"><ExternalLink className="w-3 h-3" />{personalInfo.linkedin}</span>
          )}
          {personalInfo?.github && (
            <span className="flex items-center gap-1"><Code className="w-3 h-3" />{personalInfo.github}</span>
          )}
        </div>
      </div>

      <div className="flex">
        {/* Main */}
        <div className="w-[65%] p-6">
          {summary?.content && settings.sectionOrder.includes("summary") && (
            <div className="mb-6">
              <h2 className="text-sm font-bold mb-2 flex items-center gap-2" style={{ color: primary }}>
                <span className="w-5 h-0.5 block" style={{ backgroundColor: primary }} />
                Profile
              </h2>
              <p className="text-xs leading-relaxed">{summary.content}</p>
            </div>
          )}

          {workExperience.length > 0 && settings.sectionOrder.includes("workExperience") && (
            <div className="mb-6">
              <h2 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: primary }}>
                <span className="w-5 h-0.5 block" style={{ backgroundColor: primary }} />
                Experience
              </h2>
              {workExperience.map((exp) => (
                <div key={exp.id || exp.sortOrder} className="mb-4 pl-4 border-l-2" style={{ borderColor: primary + "40" }}>
                  <h3 className="font-bold text-sm">{exp.jobTitle}</h3>
                  <p className="text-xs text-gray-500 mb-1">
                    {exp.companyName}{exp.location ? `, ${exp.location}` : ""} · {formatDate(exp.startDate)} — {exp.isCurrent ? "Present" : formatDate(exp.endDate)}
                  </p>
                  {exp.description && (
                    <div className="text-xs leading-relaxed" dangerouslySetInnerHTML={{ __html: exp.description }} />
                  )}
                </div>
              ))}
            </div>
          )}

          {education.length > 0 && settings.sectionOrder.includes("education") && (
            <div className="mb-6">
              <h2 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: primary }}>
                <span className="w-5 h-0.5 block" style={{ backgroundColor: primary }} />
                Education
              </h2>
              {education.map((edu) => (
                <div key={edu.id || edu.sortOrder} className="mb-3 pl-4 border-l-2" style={{ borderColor: primary + "40" }}>
                  <h3 className="font-bold text-sm">{edu.schoolName}</h3>
                  <p className="text-xs text-gray-500">{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""} · {formatDate(edu.startDate)} — {formatDate(edu.endDate)}</p>
                </div>
              ))}
            </div>
          )}

          {projects.length > 0 && settings.sectionOrder.includes("projects") && (
            <div className="mb-6">
              <h2 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: primary }}>
                <span className="w-5 h-0.5 block" style={{ backgroundColor: primary }} />
                Projects
              </h2>
              {projects.map((p) => (
                <div key={p.id || p.sortOrder} className="mb-3 pl-4 border-l-2" style={{ borderColor: primary + "40" }}>
                  <h3 className="font-bold text-sm">{p.projectName}</h3>
                  {p.description && <div className="text-xs leading-relaxed mt-1" dangerouslySetInnerHTML={{ __html: p.description }} />}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="w-[35%] p-6 bg-gray-50">
          {skills.length > 0 && settings.sectionOrder.includes("skills") && (
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider mb-3 text-gray-500">Skills</h3>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((s) => (
                  <span key={s.id || s.sortOrder} className="text-xs px-2 py-1 rounded-md text-white" style={{ backgroundColor: primary + "cc" }}>
                    {s.skillName}
                  </span>
                ))}
              </div>
            </div>
          )}

          {certifications.length > 0 && settings.sectionOrder.includes("certifications") && (
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider mb-3 text-gray-500">Certifications</h3>
              {certifications.map((c) => (
                <div key={c.id || c.sortOrder} className="mb-2 text-xs">
                  <p className="font-semibold">{c.name}</p>
                  <p className="text-gray-500">{c.issuer}{c.issueDate ? ` · ${formatDate(c.issueDate)}` : ""}</p>
                </div>
              ))}
            </div>
          )}

          {languages.length > 0 && settings.sectionOrder.includes("languages") && (
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider mb-3 text-gray-500">Languages</h3>
              <div className="space-y-1 text-xs">
                {languages.map((l) => (
                  <div key={l.id || l.sortOrder} className="flex justify-between">
                    <span>{l.language}</span>
                    <span className="text-gray-500">{l.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {volunteerWork.length > 0 && settings.sectionOrder.includes("volunteerWork") && (
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider mb-3 text-gray-500">Volunteer</h3>
              {volunteerWork.map((v) => (
                <div key={v.id || v.sortOrder} className="mb-2 text-xs">
                  <p className="font-semibold">{v.role}</p>
                  <p className="text-gray-500">{v.organizationName}</p>
                </div>
              ))}
            </div>
          )}

          {references.length > 0 && settings.sectionOrder.includes("references") && (
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider mb-3 text-gray-500">References</h3>
              {references.map((r) => (
                <div key={r.id || r.sortOrder} className="mb-2 text-xs">
                  <p className="font-semibold">{r.fullName}</p>
                  <p className="text-gray-500">{r.title}, {r.company}</p>
                  <p className="text-gray-400">{r.email}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
