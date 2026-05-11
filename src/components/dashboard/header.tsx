"use client";

import { usePathname } from "next/navigation";

const TITLES: Record<string, string> = {
  "/dashboard": "My Resumes",
  "/templates": "Template Gallery",
  "/settings": "Settings",
};

export function DashboardHeader() {
  const pathname = usePathname();

  const title =
    TITLES[pathname] ||
    (pathname.startsWith("/builder") ? "Resume Builder" : "") ||
    (pathname.startsWith("/cover-letter") ? "Cover Letter" : "") ||
    "ResumeForge";

  return (
    <header className="flex h-14 items-center border-b bg-card px-6">
      <h1 className="text-sm font-semibold">{title}</h1>
    </header>
  );
}
