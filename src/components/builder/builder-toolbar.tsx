"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useResumeBuilderStore } from "@/stores/resume-builder-store";
import { useAutoSave } from "@/hooks/use-auto-save";
import { TEMPLATES, FONT_OPTIONS, FONT_SIZE_OPTIONS } from "@/types/template";
import {
  ArrowLeft, Save, Download, ChevronDown, Check, Palette,
  FileText, Type, Layout, FileJson,
} from "lucide-react";
import { toast } from "sonner";

const COLORS = [
  "#1e3a5f", "#2563eb", "#7c3aed", "#059669",
  "#dc2626", "#ea580c", "#0891b2", "#4f46e5",
];

export function BuilderToolbar() {
  const resumeMeta = useResumeBuilderStore((s) => s.resumeMeta);
  const isDirty = useResumeBuilderStore((s) => s.isDirty);
  const savingSection = useResumeBuilderStore((s) => s.savingSection);
  const updateMeta = useResumeBuilderStore((s) => s.updateMeta);
  const { forceSave } = useAutoSave();

  const [templateOpen, setTemplateOpen] = useState(false);
  const [fontOpen, setFontOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);

  const templateRef = useRef<HTMLDivElement>(null);
  const fontRef = useRef<HTMLDivElement>(null);
  const colorRef = useRef<HTMLDivElement>(null);
  const exportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (templateRef.current && !templateRef.current.contains(e.target as Node)) setTemplateOpen(false);
      if (fontRef.current && !fontRef.current.contains(e.target as Node)) setFontOpen(false);
      if (colorRef.current && !colorRef.current.contains(e.target as Node)) setColorOpen(false);
      if (exportRef.current && !exportRef.current.contains(e.target as Node)) setExportOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (!resumeMeta) return null;

  const currentTemplate = TEMPLATES.find((t) => t.id === resumeMeta.templateId);
  const currentFont = FONT_OPTIONS.find((f) => f.value === resumeMeta.fontFamily);
  const currentSize = FONT_SIZE_OPTIONS.find((s) => s.value === resumeMeta.fontSize);

  return (
    <header className="flex h-12 items-center gap-2 border-b bg-card px-3">
      <Button variant="ghost" size="icon" render={<Link href="/dashboard"><ArrowLeft className="h-4 w-4" /></Link>} className="h-8 w-8" />

      <input
        className="w-36 bg-transparent text-sm font-medium outline-none"
        value={resumeMeta.title}
        onChange={(e) => updateMeta({ title: e.target.value })}
        placeholder="Resume Title"
      />

      <div className="w-px h-5 bg-border mx-1" />

      {/* Template Switcher */}
      <div ref={templateRef} className="relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => { setTemplateOpen(!templateOpen); setFontOpen(false); setColorOpen(false); setExportOpen(false); }}
          className="gap-1 text-xs h-8"
        >
          <Layout className="h-3.5 w-3.5" />
          {currentTemplate?.name || "Template"}
          <ChevronDown className="h-3 w-3" />
        </Button>
        {templateOpen && (
          <div className="absolute top-full left-0 mt-1 w-52 bg-popover border rounded-lg shadow-lg z-50 p-1">
            {TEMPLATES.map((t) => (
              <button
                key={t.id}
                className={`flex items-center gap-2 w-full px-3 py-2 text-xs rounded-md hover:bg-accent transition-colors ${
                  resumeMeta.templateId === t.id ? "bg-accent font-medium" : ""
                }`}
                onClick={() => { updateMeta({ templateId: t.id }); setTemplateOpen(false); }}
              >
                <span>{t.name}</span>
                {resumeMeta.templateId === t.id && <Check className="h-3 w-3 ml-auto" />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Font Selector */}
      <div ref={fontRef} className="relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => { setFontOpen(!fontOpen); setTemplateOpen(false); setColorOpen(false); setExportOpen(false); }}
          className="gap-1 text-xs h-8"
        >
          <Type className="h-3.5 w-3.5" />
          {currentFont?.label || "Font"}
          <ChevronDown className="h-3 w-3" />
        </Button>
        {fontOpen && (
          <div className="absolute top-full left-0 mt-1 w-44 bg-popover border rounded-lg shadow-lg z-50 p-1">
            {FONT_OPTIONS.map((f) => (
              <button
                key={f.value}
                className={`flex items-center justify-between w-full px-3 py-2 text-xs rounded-md hover:bg-accent transition-colors ${
                  resumeMeta.fontFamily === f.value ? "bg-accent font-medium" : ""
                }`}
                onClick={() => { updateMeta({ fontFamily: f.value }); setFontOpen(false); }}
              >
                <span style={{ fontFamily: f.value === "inter" ? "Inter, sans-serif" : f.value === "merriweather" || f.value === "lora" ? "Georgia, serif" : f.value === "roboto" || f.value === "montserrat" ? "Arial, sans-serif" : undefined }}>
                  {f.label}
                </span>
                {resumeMeta.fontFamily === f.value && <Check className="h-3 w-3" />}
              </button>
            ))}
            <div className="border-t my-1" />
            {FONT_SIZE_OPTIONS.map((s) => (
              <button
                key={s.value}
                className={`flex items-center justify-between w-full px-3 py-2 text-xs rounded-md hover:bg-accent transition-colors ${
                  resumeMeta.fontSize === s.value ? "bg-accent font-medium" : ""
                }`}
                onClick={() => { updateMeta({ fontSize: s.value }); setFontOpen(false); }}
              >
                <span className={s.value === "small" ? "text-xs" : s.value === "large" ? "text-base" : "text-sm"}>
                  {s.label}
                </span>
                {resumeMeta.fontSize === s.value && <Check className="h-3 w-3" />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Color Picker */}
      <div ref={colorRef} className="relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => { setColorOpen(!colorOpen); setTemplateOpen(false); setFontOpen(false); setExportOpen(false); }}
          className="gap-1 text-xs h-8"
        >
          <Palette className="h-3.5 w-3.5" />
          <span className="w-3 h-3 rounded-full border" style={{ backgroundColor: resumeMeta.primaryColor }} />
        </Button>
        {colorOpen && (
          <div className="absolute top-full left-0 mt-1 bg-popover border rounded-lg shadow-lg z-50 p-2">
            <div className="flex gap-1.5">
              {COLORS.map((c) => (
                <button
                  key={c}
                  className={`w-6 h-6 rounded-full border-2 transition-all ${
                    resumeMeta.primaryColor === c ? "border-foreground scale-110" : "border-transparent hover:scale-105"
                  }`}
                  style={{ backgroundColor: c }}
                  onClick={() => { updateMeta({ primaryColor: c }); setColorOpen(false); }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex-1" />

      <span className="text-xs text-muted-foreground hidden sm:inline">
        {savingSection ? `Saving ${savingSection}...` : isDirty ? "Unsaved changes" : "Saved"}
      </span>

      <Button variant="ghost" size="sm" onClick={forceSave} disabled={!isDirty} className="gap-1 h-8 text-xs">
        <Save className="h-3.5 w-3.5" /> Save
      </Button>

      {/* Export Menu */}
      <div ref={exportRef} className="relative">
        <Button
          variant="outline"
          size="sm"
          onClick={() => { setExportOpen(!exportOpen); setTemplateOpen(false); setFontOpen(false); setColorOpen(false); }}
          className="gap-1 h-8 text-xs"
        >
          <Download className="h-3.5 w-3.5" /> Export
          <ChevronDown className="h-3 w-3" />
        </Button>
        {exportOpen && (
          <div className="absolute top-full right-0 mt-1 w-48 bg-popover border rounded-lg shadow-lg z-50 p-1">
            <button
              className="flex items-center gap-2 w-full px-3 py-2 text-xs rounded-md hover:bg-accent transition-colors"
              onClick={() => {
                toast("Downloading PDF...");
                window.open(`/api/resumes/${resumeMeta.id}/export/pdf`);
                setExportOpen(false);
              }}
            >
              <FileText className="h-3.5 w-3.5" /> PDF Document
            </button>
            <button
              className="flex items-center gap-2 w-full px-3 py-2 text-xs rounded-md hover:bg-accent transition-colors"
              onClick={() => {
                window.open(`/api/resumes/${resumeMeta.id}/export/ats-text`);
                setExportOpen(false);
              }}
            >
              <Type className="h-3.5 w-3.5" /> ATS-Friendly Text
            </button>
            <button
              className="flex items-center gap-2 w-full px-3 py-2 text-xs rounded-md hover:bg-accent transition-colors"
              onClick={() => {
                window.open(`/api/resumes/${resumeMeta.id}/export/json`);
                setExportOpen(false);
              }}
            >
              <FileJson className="h-3.5 w-3.5" /> JSON Data
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
