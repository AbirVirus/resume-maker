import type { TemplateProps } from "@/types/template";
import ClassicTemplate from "./classic-template";
import ModernTemplate from "./modern-template";
import MinimalTemplate from "./minimal-template";
import CreativeTemplate from "./creative-template";
import ExecutiveTemplate from "./executive-template";

const templateMap: Record<string, React.ComponentType<TemplateProps>> = {
  classic: ClassicTemplate,
  modern: ModernTemplate,
  minimal: MinimalTemplate,
  creative: CreativeTemplate,
  executive: ExecutiveTemplate,
};

export function getTemplate(id: string): React.ComponentType<TemplateProps> | null {
  return templateMap[id] || null;
}

export function getAllTemplateIds(): string[] {
  return Object.keys(templateMap);
}

export { ClassicTemplate, ModernTemplate, MinimalTemplate, CreativeTemplate, ExecutiveTemplate };
