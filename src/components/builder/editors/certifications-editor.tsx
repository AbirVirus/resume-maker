"use client";

import { useResumeBuilderStore } from "@/stores/resume-builder-store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

export function CertificationsEditor() {
  const certs = useResumeBuilderStore((s) => s.resumeData.certifications);
  const addCert = useResumeBuilderStore((s) => s.addCertification);
  const updateCert = useResumeBuilderStore((s) => s.updateCertification);
  const removeCert = useResumeBuilderStore((s) => s.removeCertification);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Certifications</h3>
        <Button variant="outline" size="sm" onClick={addCert} className="gap-1"><Plus className="h-3.5 w-3.5" /> Add</Button>
      </div>
      {certs.map((c, i) => (
        <div key={i} className="rounded-md border p-3 space-y-2">
          <div className="flex items-center gap-2">
            <Input placeholder="Certification name" value={c.name} onChange={(e) => updateCert(i, { name: e.target.value })} className="font-medium" />
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeCert(i)}><Trash2 className="h-4 w-4" /></Button>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="space-y-1"><Label className="text-xs">Issuer</Label><Input placeholder="Issuing organization" value={c.issuer} onChange={(e) => updateCert(i, { issuer: e.target.value })} /></div>
            <div className="space-y-1"><Label className="text-xs">Credential URL</Label><Input placeholder="https://..." value={c.credentialUrl} onChange={(e) => updateCert(i, { credentialUrl: e.target.value })} /></div>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="space-y-1"><Label className="text-xs">Issue Date</Label><Input type="date" value={c.issueDate || ""} onChange={(e) => updateCert(i, { issueDate: e.target.value || null })} /></div>
            <div className="space-y-1"><Label className="text-xs">Expiry Date</Label><Input type="date" value={c.expiryDate || ""} onChange={(e) => updateCert(i, { expiryDate: e.target.value || null })} /></div>
          </div>
        </div>
      ))}
    </div>
  );
}
