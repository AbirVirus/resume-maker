"use client";

import { PersonalInfoForm } from "@/components/builder/editors/personal-info-form";
import { SummaryEditor } from "@/components/builder/editors/summary-editor";
import { WorkExperienceEditor } from "@/components/builder/editors/work-experience-editor";
import { EducationEditor } from "@/components/builder/editors/education-editor";
import { SkillsEditor } from "@/components/builder/editors/skills-editor";
import { ProjectsEditor } from "@/components/builder/editors/projects-editor";
import { CertificationsEditor } from "@/components/builder/editors/certifications-editor";
import { LanguagesEditor } from "@/components/builder/editors/languages-editor";
import { VolunteerWorkEditor } from "@/components/builder/editors/volunteer-work-editor";
import { ReferencesEditor } from "@/components/builder/editors/references-editor";
import { useResumeBuilderStore } from "@/stores/resume-builder-store";

const sectionComponents: Record<string, React.ReactNode> = {
  personalInfo: <PersonalInfoForm />,
  summary: <SummaryEditor />,
  workExperience: <WorkExperienceEditor />,
  education: <EducationEditor />,
  skills: <SkillsEditor />,
  projects: <ProjectsEditor />,
  certifications: <CertificationsEditor />,
  languages: <LanguagesEditor />,
  volunteerWork: <VolunteerWorkEditor />,
  references: <ReferencesEditor />,
};

export function SectionEditorPanel() {
  const sectionOrder = useResumeBuilderStore((s) => s.resumeMeta?.sectionOrder || []);
  const savingSection = useResumeBuilderStore((s) => s.savingSection);

  return (
    <div className="h-full overflow-y-auto p-4 space-y-6">
      {sectionOrder.map((sectionKey) => {
        const component = sectionComponents[sectionKey];
        if (!component) return null;

        return (
          <div key={sectionKey} className="relative">
            {savingSection === sectionKey && (
              <span className="absolute -top-2 right-0 text-[10px] text-muted-foreground animate-pulse">
                Saving...
              </span>
            )}
            {component}
          </div>
        );
      })}
    </div>
  );
}
