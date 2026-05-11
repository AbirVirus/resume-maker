"use client";

import { useResumeBuilderStore } from "@/stores/resume-builder-store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";

const LEVELS = ["beginner", "intermediate", "advanced", "expert"] as const;

export function LanguagesEditor() {
  const languages = useResumeBuilderStore((s) => s.resumeData.languages);
  const addLang = useResumeBuilderStore((s) => s.addLanguage);
  const updateLang = useResumeBuilderStore((s) => s.updateLanguage);
  const removeLang = useResumeBuilderStore((s) => s.removeLanguage);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Languages</h3>
        <Button variant="outline" size="sm" onClick={addLang} className="gap-1"><Plus className="h-3.5 w-3.5" /> Add</Button>
      </div>
      {languages.map((l, i) => (
        <div key={i} className="flex items-center gap-2 rounded-md border p-2">
          <Input placeholder="Language" value={l.language} onChange={(e) => updateLang(i, { language: e.target.value })} className="flex-1" />
          <Select value={l.proficiency} onValueChange={(v) => updateLang(i, { proficiency: v as typeof LEVELS[number] })}>
            <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
            <SelectContent>{LEVELS.map((lv) => (<SelectItem key={lv} value={lv}>{lv}</SelectItem>))}</SelectContent>
          </Select>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeLang(i)}><Trash2 className="h-4 w-4" /></Button>
        </div>
      ))}
    </div>
  );
}
