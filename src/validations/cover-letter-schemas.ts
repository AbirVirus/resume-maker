import { z } from 'zod';

export const coverLetterSchema = z.object({
  resumeId: z.string().min(1),
  title: z.string().optional().default('Cover Letter'),
  recipientName: z.string().optional().default(''),
  recipientTitle: z.string().optional().default(''),
  companyName: z.string().optional().default(''),
  companyAddress: z.string().optional().default(''),
  greeting: z.string().optional().default('Dear Hiring Manager,'),
  bodyContent: z.string().optional().default(''),
  closing: z.string().optional().default('Sincerely,'),
  templateId: z.string().optional().default('classic'),
});
