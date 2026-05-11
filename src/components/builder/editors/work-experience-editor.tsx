"use client";

import { useResumeBuilderStore } from "@/stores/resume-builder-store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { RichTextEditor } from "@/components/shared/rich-text-editor";
import { Plus, Trash2, GripVertical } from "lucide-react";

export function WorkExperienceEditor() {
  const workExperience = useResumeBuilderStore((s) => s.resumeData.workExperience);
  const addWorkExperience = useResumeBuilderStore((s) => s.addWorkExperience);
  const updateWorkExperience = useResumeBuilderStore((s) => s.updateWorkExperience);
  const removeWorkExperience = useResumeBuilderStore((s) => s.removeWorkExperience);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Work Experience
        </h3>
        <Button variant="outline" size="sm" onClick={addWorkExperience} className="gap-1">
          <Plus className="h-3.5 w-3.5" /> Add
        </Button>
      </div>

      <div className="space-y-4">
        {workExperience.map((exp, i) => (
          <div key={i} className="rounded-md border p-3 space-y-3">
            <div className="flex items-center gap-2">
              <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
              <Input
                placeholder="Job Title"
                value={exp.jobTitle}
                onChange={(e) => updateWorkExperience(i, { jobTitle: e.target.value })}
                className="font-medium"
              />
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-destructive ml-auto"
                onClick={() => removeWorkExperience(i)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              <div className="space-y-1">
                <Label className="text-xs">Company</Label>
                <Input
                  placeholder="Company name"
                  value={exp.companyName}
                  onChange={(e) => updateWorkExperience(i, { companyName: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Location</Label>
                <Input
                  placeholder="City, State"
                  value={exp.location}
                  onChange={(e) => updateWorkExperience(i, { location: e.target.value })}
                />
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-3">
              <div className="space-y-1">
                <Label className="text-xs">Start Date</Label>
                <Input
                  type="date"
                  value={exp.startDate || ""}
                  onChange={(e) => updateWorkExperience(i, { startDate: e.target.value || null })}
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">End Date</Label>
                <Input
                  type="date"
                  value={exp.endDate || ""}
                  onChange={(e) => updateWorkExperience(i, { endDate: e.target.value || null })}
                  disabled={exp.isCurrent}
                />
              </div>
              <div className="flex items-end gap-2 pb-1">
                <Switch
                  checked={exp.isCurrent}
                  onCheckedChange={(checked) => updateWorkExperience(i, { isCurrent: checked, endDate: null })}
                />
                <Label className="text-xs">Current Job</Label>
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-xs">Description</Label>
              <RichTextEditor
                value={exp.description}
                onChange={(html) => updateWorkExperience(i, { description: html })}
                placeholder="Describe your responsibilities and achievements..."
                minimal
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
