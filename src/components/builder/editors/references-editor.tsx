"use client";

import { useResumeBuilderStore } from "@/stores/resume-builder-store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

export function ReferencesEditor() {
  const items = useResumeBuilderStore((s) => s.resumeData.references);
  const add = useResumeBuilderStore((s) => s.addReference);
  const update = useResumeBuilderStore((s) => s.updateReference);
  const remove = useResumeBuilderStore((s) => s.removeReference);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">References</h3>
        <Button variant="outline" size="sm" onClick={add} className="gap-1"><Plus className="h-3.5 w-3.5" /> Add</Button>
      </div>
      {items.map((r, i) => (
        <div key={i} className="rounded-md border p-3 space-y-2">
          <div className="flex items-center gap-2">
            <Input placeholder="Full name" value={r.fullName} onChange={(e) => update(i, { fullName: e.target.value })} className="font-medium" />
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => remove(i)}><Trash2 className="h-4 w-4" /></Button>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="space-y-1"><Label className="text-xs">Title</Label><Input placeholder="Their title" value={r.title} onChange={(e) => update(i, { title: e.target.value })} /></div>
            <div className="space-y-1"><Label className="text-xs">Company</Label><Input placeholder="Company" value={r.company} onChange={(e) => update(i, { company: e.target.value })} /></div>
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            <div className="space-y-1"><Label className="text-xs">Phone</Label><Input placeholder="Phone" value={r.phone} onChange={(e) => update(i, { phone: e.target.value })} /></div>
            <div className="space-y-1"><Label className="text-xs">Email</Label><Input placeholder="Email" type="email" value={r.email} onChange={(e) => update(i, { email: e.target.value })} /></div>
            <div className="space-y-1"><Label className="text-xs">Relationship</Label><Input placeholder="e.g., Manager" value={r.relationship} onChange={(e) => update(i, { relationship: e.target.value })} /></div>
          </div>
        </div>
      ))}
    </div>
  );
}
