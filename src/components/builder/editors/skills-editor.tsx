"use client";

import { useResumeBuilderStore } from "@/stores/resume-builder-store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, X } from "lucide-react";

const LEVELS = ["beginner", "intermediate", "advanced", "expert"] as const;

export function SkillsEditor() {
  const skills = useResumeBuilderStore((s) => s.resumeData.skills);
  const addSkill = useResumeBuilderStore((s) => s.addSkill);
  const updateSkill = useResumeBuilderStore((s) => s.updateSkill);
  const removeSkill = useResumeBuilderStore((s) => s.removeSkill);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Skills</h3>
        <Button variant="outline" size="sm" onClick={addSkill} className="gap-1">
          <Plus className="h-3.5 w-3.5" /> Add
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, i) => (
          <div key={i} className="group relative">
            <Badge variant="secondary" className="pr-1 gap-1">
              <input
                className="w-20 bg-transparent text-xs outline-none"
                value={skill.skillName}
                onChange={(e) => updateSkill(i, { skillName: e.target.value })}
                placeholder="Skill..."
              />
              <button
                className="ml-0.5 rounded-full p-0.5 opacity-0 group-hover:opacity-100 hover:bg-muted"
                onClick={() => removeSkill(i)}
              >
                <X className="h-2.5 w-2.5" />
              </button>
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
