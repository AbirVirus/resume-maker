"use client";

import { useResumeBuilderStore } from "@/stores/resume-builder-store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RichTextEditor } from "@/components/shared/rich-text-editor";
import { Plus, Trash2, GripVertical } from "lucide-react";

export function EducationEditor() {
  const education = useResumeBuilderStore((s) => s.resumeData.education);
  const addEducation = useResumeBuilderStore((s) => s.addEducation);
  const updateEducation = useResumeBuilderStore((s) => s.updateEducation);
  const removeEducation = useResumeBuilderStore((s) => s.removeEducation);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Education</h3>
        <Button variant="outline" size="sm" onClick={addEducation} className="gap-1">
          <Plus className="h-3.5 w-3.5" /> Add
        </Button>
      </div>
      <div className="space-y-3">
        {education.map((edu, i) => (
          <div key={i} className="rounded-md border p-3 space-y-2">
            <div className="flex items-center gap-2">
              <GripVertical className="h-4 w-4 text-muted-foreground" />
              <Input placeholder="Degree" value={edu.degree} onChange={(e) => updateEducation(i, { degree: e.target.value })} className="font-medium" />
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive ml-auto" onClick={() => removeEducation(i)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="space-y-1"><Label className="text-xs">School</Label><Input placeholder="School name" value={edu.schoolName} onChange={(e) => updateEducation(i, { schoolName: e.target.value })} /></div>
              <div className="space-y-1"><Label className="text-xs">Field of Study</Label><Input placeholder="Computer Science" value={edu.fieldOfStudy} onChange={(e) => updateEducation(i, { fieldOfStudy: e.target.value })} /></div>
            </div>
            <div className="grid gap-2 sm:grid-cols-3">
              <div className="space-y-1"><Label className="text-xs">Start</Label><Input type="date" value={edu.startDate || ""} onChange={(e) => updateEducation(i, { startDate: e.target.value || null })} /></div>
              <div className="space-y-1"><Label className="text-xs">End</Label><Input type="date" value={edu.endDate || ""} onChange={(e) => updateEducation(i, { endDate: e.target.value || null })} /></div>
              <div className="space-y-1"><Label className="text-xs">GPA</Label><Input placeholder="3.8/4.0" value={edu.gpa} onChange={(e) => updateEducation(i, { gpa: e.target.value })} /></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
