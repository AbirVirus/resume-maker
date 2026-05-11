"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Mail, ExternalLink } from "lucide-react";

interface CoverLetterSummary {
  id: string;
  title: string;
  companyName: string;
  updatedAt: string;
}

export function CoverLettersSection() {
  const { data: letters, isLoading } = useQuery<CoverLetterSummary[]>({
    queryKey: ["cover-letters"],
    queryFn: async () => {
      const res = await fetch("/api/cover-letters");
      if (!res.ok) return [];
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-5 w-32" />
        <div className="grid gap-4 sm:grid-cols-2">
          {[1, 2].map((i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
      </div>
    );
  }

  if (!letters?.length) return null;

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium">Cover Letters</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {letters.map((l) => (
          <Link key={l.id} href={`/cover-letter/${l.id}`}>
            <Card className="transition-shadow hover:shadow-sm">
              <CardHeader className="pb-1">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <CardTitle className="text-sm">{l.title}</CardTitle>
                </div>
                <CardDescription className="text-xs">
                  {l.companyName || "No company"} &middot; {new Date(l.updatedAt).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
