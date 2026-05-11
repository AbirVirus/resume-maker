"use client";

import { useResumeBuilderStore } from "@/stores/resume-builder-store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function PersonalInfoForm() {
  const resumeData = useResumeBuilderStore((s) => s.resumeData);
  const updatePersonalInfo = useResumeBuilderStore((s) => s.updatePersonalInfo);

  const info = resumeData.personalInfo;

  if (!info) return null;

  const fields = [
    { key: "fullName" as const, label: "Full Name", placeholder: "John Doe" },
    { key: "email" as const, label: "Email", placeholder: "john@example.com", type: "email" },
    { key: "phone" as const, label: "Phone", placeholder: "+1 555 123 4567" },
    { key: "location" as const, label: "Location", placeholder: "San Francisco, CA" },
    { key: "linkedin" as const, label: "LinkedIn URL", placeholder: "linkedin.com/in/..." },
    { key: "website" as const, label: "Website / Portfolio", placeholder: "yourportfolio.com" },
    { key: "github" as const, label: "GitHub", placeholder: "github.com/..." },
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
        Personal Information
      </h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {fields.map(({ key, label, placeholder, type }) => (
          <div key={key} className="space-y-1">
            <Label className="text-xs">{label}</Label>
            <Input
              type={type || "text"}
              placeholder={placeholder}
              value={info[key] || ""}
              onChange={(e) => updatePersonalInfo(key, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
