import type { ResumeData } from './resume';

export interface TemplateSettings {
  primaryColor: string;
  fontFamily: string;
  fontSize: string;
  sectionOrder: string[];
}

export interface TemplateProps {
  data: ResumeData;
  settings: TemplateSettings;
}

export interface TemplateMeta {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  tags: string[];
}

export const TEMPLATES: TemplateMeta[] = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional serif layout with clear section dividers. Ideal for conservative industries.',
    thumbnail: '/templates/classic-preview.png',
    tags: ['Traditional', 'Serif', 'Single Column'],
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean sans-serif with a sidebar for skills and contact info. Great for tech roles.',
    thumbnail: '/templates/modern-preview.png',
    tags: ['Sans-serif', 'Two Column', 'Sidebar'],
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Typography-focused design with ample whitespace. Perfect for creative fields.',
    thumbnail: '/templates/minimal-preview.png',
    tags: ['Clean', 'Minimal', 'Whitespace'],
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold accent colors with icon-based contact row. Stand out from the stack.',
    thumbnail: '/templates/creative-preview.png',
    tags: ['Colorful', 'Icons', 'Two Column'],
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Centered header with conservative styling. Built for senior leadership roles.',
    thumbnail: '/templates/executive-preview.png',
    tags: ['Professional', 'Centered', 'Boardroom'],
  },
];

export const FONT_OPTIONS = [
  { value: 'inter', label: 'Inter' },
  { value: 'merriweather', label: 'Merriweather' },
  { value: 'roboto', label: 'Roboto' },
  { value: 'lora', label: 'Lora' },
  { value: 'montserrat', label: 'Montserrat' },
];

export const FONT_SIZE_OPTIONS = [
  { value: 'small', label: 'Small' },
  { value: 'medium', label: 'Medium' },
  { value: 'large', label: 'Large' },
];
