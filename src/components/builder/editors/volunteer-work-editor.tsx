"use client";

import { useResumeBuilderStore } from "@/stores/resume-builder-store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

function DateEditor({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string | null;
  onChange: (v: string | null) => void;
}) {
  return (
    <div className="space-y-1">
      <Label className="text-xs">{label}</Label>
      <Input type="date" value={value || ""} onChange={(e) => onChange(e.target.value || null)} />
    </div>
  );
}

export function VolunteerWorkEditor() {
  const items = useResumeBuilderStore((s) => s.resumeData.volunteerWork);
  const add = useResumeBuilderStore((s) => s.addVolunteerWork);
  const update = useResumeBuilderStore((s) => s.updateVolunteerWork);
  const remove = useResumeBuilderStore((s) => s.removeVolunteerWork);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Volunteer Work</h3>
        <Button variant="outline" size="sm" onClick={add} className="gap-1"><Plus className="h-3.5 w-3.5" /> Add</Button>
      </div>
      {items.map((v, i) => (
        <div key={i} className="rounded-md border p-3 space-y-2">
          <div className="flex items-center gap-2">
            <Input placeholder="Organization" value={v.organizationName} onChange={(e) => update(i, { organizationName: e.target.value })} className="font-medium" />
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => remove(i)}><Trash2 className="h-4 w-4" /></Button>
          </div>
          <div className="space-y-1"><Label className="text-xs">Role</Label><Input placeholder="Your role" value={v.role} onChange={(e) => update(i, { role: e.target.value })} /></div>
          <div className="grid gap-2 sm:grid-cols-2">
            <DateEditor label="Start" value={v.startDate} onChange={(d) => update(i, { startDate: d })} />
            <DateEditor label="End" value={v.endDate} onChange={(d) => update(i, { endDate: d })} />
          </div>
          <div className="space-y-1"><Label className="text-xs">Description</Label><Input placeholder="Brief description" value={v.description} onChange={(e) => update(i, { description: e.target.value })} /></div>
        </div>
      ))}
    </div>
  );
}
