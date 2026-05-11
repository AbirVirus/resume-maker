"use client";

import { useEffect, useState } from "react";
import { useResumeBuilderStore } from "@/stores/resume-builder-store";
import { BuilderToolbar } from "@/components/builder/builder-toolbar";
import { SectionEditorPanel } from "@/components/builder/section-editor-panel";
import { LivePreviewPanel } from "@/components/builder/live-preview-panel";
import { ErrorBoundary } from "@/components/shared/error-boundary";
import { useAutoSave } from "@/hooks/use-auto-save";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Edit3, Eye } from "lucide-react";

interface BuilderPageProps {
  resumeId: string;
}

export function BuilderPage({ resumeId }: BuilderPageProps) {
  const setResumeData = useResumeBuilderStore((s) => s.setResumeData);
  const resumeMeta = useResumeBuilderStore((s) => s.resumeMeta);
  const isDirty = useResumeBuilderStore((s) => s.isDirty);
  useAutoSave();

  // Mobile: toggle between edit and preview
  const [mobileTab, setMobileTab] = useState<"edit" | "preview">("edit");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const res = await fetch(`/api/resumes/${resumeId}`);
      if (!res.ok) return;
      const json = await res.json();
      if (cancelled) return;

      setResumeData(
        {
          personalInfo: json.personalInfo,
          summary: json.summary,
          workExperience: json.workExperiences || [],
          education: json.educations || [],
          skills: json.skills || [],
          projects: json.projects || [],
          certifications: json.certifications || [],
          languages: json.languages || [],
          volunteerWork: json.volunteerWorks || [],
          references: json.references || [],
        },
        {
          id: json.id,
          title: json.title,
          templateId: json.templateId,
          primaryColor: json.primaryColor,
          fontFamily: json.fontFamily,
          fontSize: json.fontSize,
          sectionOrder: json.sectionOrder as string[],
          status: json.status,
          createdAt: json.createdAt,
          updatedAt: json.updatedAt,
        },
      );
    }

    load();
    return () => { cancelled = true; };
  }, [resumeId, setResumeData]);

  // Warn on unsaved before unload
  useEffect(() => {
    function handler(e: BeforeUnloadEvent) {
      if (isDirty) {
        e.preventDefault();
      }
    }
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty]);

  if (!resumeMeta) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Skeleton className="h-96 w-full max-w-2xl" />
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col">
      <BuilderToolbar />

      {/* Mobile Tab Toggle */}
      <div className="flex lg:hidden border-b bg-card">
        <button
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-colors ${
            mobileTab === "edit"
              ? "text-foreground border-b-2 border-primary"
              : "text-muted-foreground"
          }`}
          onClick={() => setMobileTab("edit")}
        >
          <Edit3 className="h-3.5 w-3.5" /> Edit
        </button>
        <button
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-colors ${
            mobileTab === "preview"
              ? "text-foreground border-b-2 border-primary"
              : "text-muted-foreground"
          }`}
          onClick={() => setMobileTab("preview")}
        >
          <Eye className="h-3.5 w-3.5" /> Preview
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Editor Panel */}
        <div
          className={`${
            mobileTab === "edit" ? "flex" : "hidden"
          } lg:flex w-full lg:w-[480px] flex-shrink-0 border-r bg-card flex-col overflow-hidden`}
        >
          <ErrorBoundary>
            <SectionEditorPanel />
          </ErrorBoundary>
        </div>

        {/* Preview Panel */}
        <div
          className={`${
            mobileTab === "preview" ? "flex" : "hidden"
          } lg:flex flex-1 flex-col overflow-hidden`}
        >
          <ErrorBoundary>
            <LivePreviewPanel />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}
