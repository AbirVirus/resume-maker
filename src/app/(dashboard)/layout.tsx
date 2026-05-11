import { requireAuth } from "@/lib/auth-guard";
import { redirect } from "next/navigation";
import { Providers } from "@/components/shared/providers";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAuth();
  if (!session?.user) redirect("/login");

  return (
    <Providers>
      <div className="flex h-screen overflow-hidden">
        <DashboardSidebar user={session.user} />
        <div className="flex flex-1 flex-col overflow-hidden">
          <DashboardHeader />
          <main className="flex-1 overflow-y-auto bg-muted/30 p-6">
            {children}
          </main>
        </div>
      </div>
    </Providers>
  );
}
