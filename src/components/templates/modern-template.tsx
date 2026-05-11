import type { TemplateProps } from "@/types/template";
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from "lucide-react";

function formatDate(d: string | null): string {
  if (!d) return "";
  const date = new Date(d);
  if (isNaN(date.getTime())) return d;
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export default function ModernTemplate({ data, settings }: TemplateProps) {
  const { personalInfo, summary, workExperience, education, skills, projects, certifications, languages, volunteerWork, references } = data;
  const primary = settings.primaryColor || "#2563eb";

  return (
    <div className="flex font-sans text-sm leading-relaxed text-gray-800" style={{ "--primary": primary } as React.CSSProperties}>
      {/* Sidebar */}
      <div className="w-[35%] p-6 text-white" style={{ backgroundColor: primary }}>
        <h1 className="text-xl font-bold mb-1">{personalInfo?.fullName || "Your Name"}</h1>
        <p className="text-xs opacity-80 mb-6">
          {personalInfo?.linkedin || personalInfo?.website || ""}
        </p>

        {/* Contact */}
        <div className="space-y-2 mb-6 text-xs">
          <h3 className="text-xs font-semibold uppercase tracking-wider mb-2 border-b border-white/20 pb-1">Contact</h3>
          {personalInfo?.email && (
            <div className="flex items-center gap-2">
              <Mail className="w-3 h-3 shrink-0" />
              <span className="break-all">{personalInfo.email}</span>
            </div>
          )}
          {personalInfo?.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-3 h-3 shrink-0" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo?.location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-3 h-3 shrink-0" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo?.website && (
            <div className="flex items-center gap-2">
              <Globe className="w-3 h-3 shrink-0" />
              <span className="break-all">{personalInfo.website}</span>
            </div>
          )}
          {personalInfo?.linkedin && (
            <div className="flex items-center gap-2">
              <Linkedin className="w-3 h-3 shrink-0" />
              <span className="break-all">{personalInfo.linkedin}</span>
            </div>
          )}
          {personalInfo?.github && (
            <div className="flex items-center gap-2">
              <Github className="w-3 h-3 shrink-0" />
              <span className="break-all">{personalInfo.github}</span>
            </div>
          )}
        </div>

        {/* Skills in sidebar */}
        {skills.length > 0 && settings.sectionOrder.includes("skills") && (
          <div className="mb-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider mb-2 border-b border-white/20 pb-1">Skills</h3>
            <div className="space-y-2 text-xs">
              {skills.map((s) => (
                <div key={s.id || s.sortOrder}>
                  <p className="mb-0.5">{s.skillName}</p>
                  <div className="w-full h-1 bg-white/20 rounded-full">
                    <div
                      className="h-full bg-white rounded-full"
                      style={{ width: s.proficiencyLevel === "expert" ? "100%" : s.proficiencyLevel === "advanced" ? "75%" : s.proficiencyLevel === "intermediate" ? "50%" : "25%" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages in sidebar */}
        {languages.length > 0 && settings.sectionOrder.includes("languages") && (
          <div className="mb-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider mb-2 border-b border-white/20 pb-1">Languages</h3>
            <div className="space-y-1 text-xs">
              {languages.map((l) => (
                <p key={l.id || l.sortOrder}>{l.language} — {l.proficiency}</p>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="w-[65%] p-6">
        {summary?.content && settings.sectionOrder.includes("summary") && (
          <div className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: primary }}>Professional Summary</h2>
            <p className="text-xs leading-relaxed">{summary.content}</p>
          </div>
        )}

        {workExperience.length > 0 && settings.sectionOrder.includes("workExperience") && (
          <div className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: primary }}>Experience</h2>
            {workExperience.map((exp) => (
              <div key={exp.id || exp.sortOrder} className="mb-4">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-sm">{exp.jobTitle}</h3>
                  <span className="text-xs text-gray-500 shrink-0 ml-2">
                    {formatDate(exp.startDate)} — {exp.isCurrent ? "Present" : formatDate(exp.endDate)}
                  </span>
                </div>
                <p className="text-xs text-gray-600">{exp.companyName}{exp.location ? `, ${exp.location}` : ""}</p>
                {exp.description && (
                  <div className="mt-1 text-xs leading-relaxed" dangerouslySetInnerHTML={{ __html: exp.description }} />
                )}
              </div>
            ))}
          </div>
        )}

        {education.length > 0 && settings.sectionOrder.includes("education") && (
          <div className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: primary }}>Education</h2>
            {education.map((edu) => (
              <div key={edu.id || edu.sortOrder} className="mb-3">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-sm">{edu.schoolName}</h3>
                  <span className="text-xs text-gray-500 shrink-0 ml-2">
                    {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                  </span>
                </div>
                <p className="text-xs text-gray-600">{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""}</p>
                {edu.gpa && <p className="text-xs text-gray-500">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        )}

        {certifications.length > 0 && settings.sectionOrder.includes("certifications") && (
          <div className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: primary }}>Certifications</h2>
            {certifications.map((c) => (
              <p key={c.id || c.sortOrder} className="text-xs mb-1">
                <span className="font-semibold">{c.name}</span>
                {c.issuer && <span className="text-gray-600"> — {c.issuer}</span>}
              </p>
            ))}
          </div>
        )}

        {projects.length > 0 && settings.sectionOrder.includes("projects") && (
          <div className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: primary }}>Projects</h2>
            {projects.map((p) => (
              <div key={p.id || p.sortOrder} className="mb-3">
                <h3 className="font-bold text-sm">{p.projectName}{p.role ? ` — ${p.role}` : ""}</h3>
                {p.description && <div className="mt-1 text-xs leading-relaxed" dangerouslySetInnerHTML={{ __html: p.description }} />}
              </div>
            ))}
          </div>
        )}

        {volunteerWork.length > 0 && settings.sectionOrder.includes("volunteerWork") && (
          <div className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: primary }}>Volunteer</h2>
            {volunteerWork.map((v) => (
              <div key={v.id || v.sortOrder} className="mb-2">
                <p className="font-bold text-xs">{v.role} — {v.organizationName}</p>
                {v.description && <div className="text-xs leading-relaxed" dangerouslySetInnerHTML={{ __html: v.description }} />}
              </div>
            ))}
          </div>
        )}

        {references.length > 0 && settings.sectionOrder.includes("references") && (
          <div className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: primary }}>References</h2>
            {references.map((r) => (
              <p key={r.id || r.sortOrder} className="text-xs mb-1">
                <span className="font-semibold">{r.fullName}</span> — {r.title}{r.company ? `, ${r.company}` : ""}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
