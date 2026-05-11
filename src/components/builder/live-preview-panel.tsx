"use client";

import { useMemo } from "react";
import { useResumeBuilderStore } from "@/stores/resume-builder-store";
import { getTemplate } from "@/components/templates/template-registry";
import { TEMPLATES } from "@/types/template";
import { FileText } from "lucide-react";

export function LivePreviewPanel() {
  const resumeData = useResumeBuilderStore((s) => s.resumeData);
  const resumeMeta = useResumeBuilderStore((s) => s.resumeMeta);

  const templateId = resumeMeta?.templateId || "classic";
  const TemplateComponent = useMemo(() => getTemplate(templateId), [templateId]);

  const settings = {
    primaryColor: resumeMeta?.primaryColor || "#1e3a5f",
    fontFamily: resumeMeta?.fontFamily || "inter",
    fontSize: resumeMeta?.fontSize || "medium",
    sectionOrder: resumeMeta?.sectionOrder || [
      "summary", "workExperience", "education", "skills",
      "projects", "certifications", "languages", "volunteerWork", "references",
    ],
  };

  if (!TemplateComponent) {
    const templateMeta = TEMPLATES.find((t) => t.id === templateId);
    return (
      <div className="h-full overflow-y-auto bg-muted/50 p-4 flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <FileText className="h-12 w-12 mx-auto mb-3 opacity-30" />
          <p className="text-sm font-medium">Template not found</p>
          <p className="text-xs mt-1">
            {templateMeta ? `"${templateMeta.name}" template is not yet available` : `Unknown template: "${templateId}"`}
          </p>
        </div>
      </div>
    );
  }

  const fontClass =
    settings.fontFamily === "merriweather" ? "font-serif" :
    settings.fontFamily === "roboto" ? "font-sans" :
    settings.fontFamily === "lora" ? "font-serif" :
    settings.fontFamily === "montserrat" ? "font-sans" :
    "font-sans";

  const sizeClass =
    settings.fontSize === "small" ? "text-xs" :
    settings.fontSize === "large" ? "text-base" :
    "text-sm";

  return (
    <div className="h-full overflow-y-auto bg-muted/50 p-4 flex justify-center">
      <div
        className={`w-full max-w-[794px] bg-white text-black shadow-lg ${fontClass} ${sizeClass}`}
        style={{ minHeight: "1123px" }}
      >
        <TemplateComponent data={resumeData} settings={settings} />
      </div>
    </div>
  );
}
