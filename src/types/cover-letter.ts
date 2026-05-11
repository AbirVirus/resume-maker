export interface CoverLetter {
  id?: string;
  resumeId: string;
  title: string;
  recipientName: string;
  recipientTitle: string;
  companyName: string;
  companyAddress: string;
  greeting: string;
  bodyContent: string;
  closing: string;
  templateId: string;
  createdAt?: string;
  updatedAt?: string;
}
