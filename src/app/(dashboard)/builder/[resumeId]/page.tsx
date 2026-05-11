import { BuilderPage } from "@/components/builder/builder-page";

export default async function BuilderRoute({
  params,
}: {
  params: Promise<{ resumeId: string }>;
}) {
  const { resumeId } = await params;
  return <BuilderPage resumeId={resumeId} />;
}
