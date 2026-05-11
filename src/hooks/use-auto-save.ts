"use client";

import { useEffect, useRef, useCallback } from "react";
import { useResumeBuilderStore } from "@/stores/resume-builder-store";
import { toast } from "sonner";

export function useAutoSave() {
  const {
    resumeMeta,
    resumeData,
    isDirty,
    savingSection,
    markSaved,
    setSaving,
  } = useResumeBuilderStore();

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const savedSnapshot = useRef<string>("");
  const dirtySections = useRef<Set<string>>(new Set());

  const currentSnapshot = JSON.stringify(resumeData);

  const saveSection = useCallback(
    async (section: string) => {
      if (!resumeMeta?.id) return;

      setSaving(section);
      try {
        let url = `/api/resumes/${resumeMeta.id}`;
        let method = "PUT";
        let body: unknown;

        switch (section) {
          case "personalInfo":
            url += "/personal-info";
            body = resumeData.personalInfo;
            break;
          case "summary":
            url += "/summary";
            body = resumeData.summary;
            break;
          case "sectionOrder":
            url += "/section-order";
            body = { sectionOrder: resumeMeta.sectionOrder };
            break;
          default:
            setSaving(null);
            return;
        }

        await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      } catch {
        toast.error(`Failed to save ${section}`);
      } finally {
        setSaving(null);
      }
    },
    [resumeMeta, resumeData, setSaving],
  );

  // Auto-save when dirty, debounced by 2 seconds
  useEffect(() => {
    if (!isDirty || !resumeMeta?.id) return;

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(async () => {
      const newSnapshot = JSON.stringify(resumeData);
      if (newSnapshot === savedSnapshot.current) return;

      // Save personal info if changed
      if (resumeData.personalInfo) {
        await saveSection("personalInfo");
      }
      if (resumeData.summary) {
        await saveSection("summary");
      }

      savedSnapshot.current = newSnapshot;
      markSaved();
    }, 2000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isDirty, resumeData, resumeMeta, saveSection, markSaved]);

  // Manual force-save
  const forceSave = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (resumeData.personalInfo) saveSection("personalInfo");
    if (resumeData.summary) saveSection("summary");
    savedSnapshot.current = JSON.stringify(resumeData);
    markSaved();
  }, [resumeData, saveSection, markSaved]);

  // Ctrl+S listener
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        forceSave();
        toast.success("Resume saved");
      }
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [forceSave]);

  return { forceSave, savingSection };
}
