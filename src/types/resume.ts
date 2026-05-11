export interface PersonalInfo {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  github: string;
  photoUrl?: string;
}

export interface ProfessionalSummary {
  id?: string;
  content: string;
}

export interface WorkExperience {
  id?: string;
  sortOrder: number;
  companyName: string;
  jobTitle: string;
  location: string;
  startDate: string | null;
  endDate: string | null;
  isCurrent: boolean;
  description: string;
}

export interface Education {
  id?: string;
  sortOrder: number;
  schoolName: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string | null;
  endDate: string | null;
  gpa: string;
  description: string;
}

export type ProficiencyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface Skill {
  id?: string;
  sortOrder: number;
  category: string | null;
  skillName: string;
  proficiencyLevel: ProficiencyLevel;
}

export interface Project {
  id?: string;
  sortOrder: number;
  projectName: string;
  role: string;
  url: string;
  startDate: string | null;
  endDate: string | null;
  description: string;
}

export interface Certification {
  id?: string;
  sortOrder: number;
  name: string;
  issuer: string;
  issueDate: string | null;
  expiryDate: string | null;
  credentialUrl: string;
}

export interface Language {
  id?: string;
  sortOrder: number;
  language: string;
  proficiency: ProficiencyLevel;
}

export interface VolunteerWork {
  id?: string;
  sortOrder: number;
  organizationName: string;
  role: string;
  startDate: string | null;
  endDate: string | null;
  description: string;
}

export interface ReferenceEntry {
  id?: string;
  sortOrder: number;
  fullName: string;
  title: string;
  company: string;
  phone: string;
  email: string;
  relationship: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo | null;
  summary: ProfessionalSummary | null;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  volunteerWork: VolunteerWork[];
  references: ReferenceEntry[];
}

export interface ResumeMeta {
  id: string;
  title: string;
  templateId: string;
  primaryColor: string;
  fontFamily: string;
  fontSize: string;
  sectionOrder: string[];
  status: 'draft' | 'complete';
  createdAt: string;
  updatedAt: string;
}
