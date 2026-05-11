"use client";

import { useResumeBuilderStore } from "@/stores/resume-builder-store";
import { Textarea } from "@/components/ui/textarea";

export function SummaryEditor() {
  const summary = useResumeBuilderStore((s) => s.resumeData.summary);
  const updateSummary = useResumeBuilderStore((s) => s.updateSummary);

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
        Professional Summary
      </h3>
      <Textarea
        rows={5}
        placeholder="Brief overview of your professional background and key strengths..."
        value={summary?.content || ""}
        onChange={(e) => updateSummary(e.target.value)}
      />
    </div>
  );
}
