"use client";

import { useResumeBuilderStore } from "@/stores/resume-builder-store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RichTextEditor } from "@/components/shared/rich-text-editor";
import { Plus, Trash2 } from "lucide-react";

export function ProjectsEditor() {
  const projects = useResumeBuilderStore((s) => s.resumeData.projects);
  const addProject = useResumeBuilderStore((s) => s.addProject);
  const updateProject = useResumeBuilderStore((s) => s.updateProject);
  const removeProject = useResumeBuilderStore((s) => s.removeProject);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Projects</h3>
        <Button variant="outline" size="sm" onClick={addProject} className="gap-1"><Plus className="h-3.5 w-3.5" /> Add</Button>
      </div>
      {projects.map((p, i) => (
        <div key={i} className="rounded-md border p-3 space-y-2">
          <div className="flex items-center gap-2">
            <Input placeholder="Project name" value={p.projectName} onChange={(e) => updateProject(i, { projectName: e.target.value })} className="font-medium" />
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeProject(i)}><Trash2 className="h-4 w-4" /></Button>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="space-y-1"><Label className="text-xs">Role</Label><Input placeholder="Your role" value={p.role} onChange={(e) => updateProject(i, { role: e.target.value })} /></div>
            <div className="space-y-1"><Label className="text-xs">URL</Label><Input placeholder="https://..." value={p.url} onChange={(e) => updateProject(i, { url: e.target.value })} /></div>
          </div>
          <div className="space-y-1"><Label className="text-xs">Description</Label>
            <RichTextEditor value={p.description} onChange={(html) => updateProject(i, { description: html })} placeholder="Describe the project..." minimal />
          </div>
        </div>
      ))}
    </div>
  );
}
