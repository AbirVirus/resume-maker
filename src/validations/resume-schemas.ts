import { z } from 'zod';

export const personalInfoSchema = z.object({
  fullName: z.string().optional().default(''),
  email: z.string().optional().default(''),
  phone: z.string().optional().default(''),
  location: z.string().optional().default(''),
  linkedin: z.string().optional().default(''),
  website: z.string().optional().default(''),
  github: z.string().optional().default(''),
  photoUrl: z.string().nullable().optional(),
});

export const summarySchema = z.object({
  content: z.string().optional().default(''),
});

export const workExperienceSchema = z.object({
  sortOrder: z.number().optional().default(0),
  companyName: z.string().optional().default(''),
  jobTitle: z.string().optional().default(''),
  location: z.string().optional().default(''),
  startDate: z.string().nullable().optional(),
  endDate: z.string().nullable().optional(),
  isCurrent: z.boolean().optional().default(false),
  description: z.string().optional().default(''),
});

export const educationSchema = z.object({
  sortOrder: z.number().optional().default(0),
  schoolName: z.string().optional().default(''),
  degree: z.string().optional().default(''),
  fieldOfStudy: z.string().optional().default(''),
  startDate: z.string().nullable().optional(),
  endDate: z.string().nullable().optional(),
  gpa: z.string().optional().default(''),
  description: z.string().optional().default(''),
});

export const skillSchema = z.object({
  sortOrder: z.number().optional().default(0),
  category: z.string().nullable().optional(),
  skillName: z.string().optional().default(''),
  proficiencyLevel: z.enum(['beginner', 'intermediate', 'advanced', 'expert']).optional().default('intermediate'),
});

export const projectSchema = z.object({
  sortOrder: z.number().optional().default(0),
  projectName: z.string().optional().default(''),
  role: z.string().optional().default(''),
  url: z.string().optional().default(''),
  startDate: z.string().nullable().optional(),
  endDate: z.string().nullable().optional(),
  description: z.string().optional().default(''),
});

export const certificationSchema = z.object({
  sortOrder: z.number().optional().default(0),
  name: z.string().optional().default(''),
  issuer: z.string().optional().default(''),
  issueDate: z.string().nullable().optional(),
  expiryDate: z.string().nullable().optional(),
  credentialUrl: z.string().optional().default(''),
});

export const languageSchema = z.object({
  sortOrder: z.number().optional().default(0),
  language: z.string().optional().default(''),
  proficiency: z.enum(['beginner', 'intermediate', 'advanced', 'expert']).optional().default('intermediate'),
});

export const volunteerWorkSchema = z.object({
  sortOrder: z.number().optional().default(0),
  organizationName: z.string().optional().default(''),
  role: z.string().optional().default(''),
  startDate: z.string().nullable().optional(),
  endDate: z.string().nullable().optional(),
  description: z.string().optional().default(''),
});

export const referenceEntrySchema = z.object({
  sortOrder: z.number().optional().default(0),
  fullName: z.string().optional().default(''),
  title: z.string().optional().default(''),
  company: z.string().optional().default(''),
  phone: z.string().optional().default(''),
  email: z.string().optional().default(''),
  relationship: z.string().optional().default(''),
});

export const sectionOrderSchema = z.object({
  sectionOrder: z.array(z.string()),
});

export const resumeMetaSchema = z.object({
  title: z.string().optional(),
  templateId: z.string().optional(),
  primaryColor: z.string().optional(),
  fontFamily: z.string().optional(),
  fontSize: z.string().optional(),
  status: z.enum(['draft', 'complete']).optional(),
});
