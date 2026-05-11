import { create } from "zustand";
import type {
  ResumeData,
  ResumeMeta,
  PersonalInfo,
  ProfessionalSummary,
  WorkExperience,
  Education,
  Skill,
  Project,
  Certification,
  Language,
  VolunteerWork,
  ReferenceEntry,
} from "@/types/resume";

interface ResumeBuilderState {
  // Data
  resumeData: ResumeData;
  resumeMeta: ResumeMeta | null;
  isDirty: boolean;
  lastSavedAt: Date | null;
  savingSection: string | null;

  // Init
  setResumeData: (data: ResumeData, meta: ResumeMeta) => void;

  // Personal Info
  updatePersonalInfo: (field: keyof PersonalInfo, value: string) => void;

  // Summary
  updateSummary: (content: string) => void;

  // Work Experience
  addWorkExperience: () => void;
  updateWorkExperience: (index: number, data: Partial<WorkExperience>) => void;
  removeWorkExperience: (index: number) => void;
  reorderWorkExperience: (fromIndex: number, toIndex: number) => void;

  // Education
  addEducation: () => void;
  updateEducation: (index: number, data: Partial<Education>) => void;
  removeEducation: (index: number) => void;
  reorderEducation: (fromIndex: number, toIndex: number) => void;

  // Skills
  addSkill: () => void;
  updateSkill: (index: number, data: Partial<Skill>) => void;
  removeSkill: (index: number) => void;
  reorderSkills: (fromIndex: number, toIndex: number) => void;

  // Projects
  addProject: () => void;
  updateProject: (index: number, data: Partial<Project>) => void;
  removeProject: (index: number) => void;

  // Certifications
  addCertification: () => void;
  updateCertification: (index: number, data: Partial<Certification>) => void;
  removeCertification: (index: number) => void;

  // Languages
  addLanguage: () => void;
  updateLanguage: (index: number, data: Partial<Language>) => void;
  removeLanguage: (index: number) => void;

  // Volunteer Work
  addVolunteerWork: () => void;
  updateVolunteerWork: (index: number, data: Partial<VolunteerWork>) => void;
  removeVolunteerWork: (index: number) => void;

  // References
  addReference: () => void;
  updateReference: (index: number, data: Partial<ReferenceEntry>) => void;
  removeReference: (index: number) => void;

  // Section order
  updateSectionOrder: (newOrder: string[]) => void;

  // Meta
  updateMeta: (data: Partial<ResumeMeta>) => void;

  // Persistence tracking
  markDirty: (section: string) => void;
  markSaved: () => void;
  setSaving: (section: string | null) => void;
}

const emptyWorkExperience: WorkExperience = {
  sortOrder: 0,
  companyName: "",
  jobTitle: "",
  location: "",
  startDate: null,
  endDate: null,
  isCurrent: false,
  description: "",
};

const emptyEducation: Education = {
  sortOrder: 0,
  schoolName: "",
  degree: "",
  fieldOfStudy: "",
  startDate: null,
  endDate: null,
  gpa: "",
  description: "",
};

const emptySkill: Skill = {
  sortOrder: 0,
  category: null,
  skillName: "",
  proficiencyLevel: "intermediate",
};

const emptyProject: Project = {
  sortOrder: 0,
  projectName: "",
  role: "",
  url: "",
  startDate: null,
  endDate: null,
  description: "",
};

const emptyCertification: Certification = {
  sortOrder: 0,
  name: "",
  issuer: "",
  issueDate: null,
  expiryDate: null,
  credentialUrl: "",
};

const emptyLanguage: Language = {
  sortOrder: 0,
  language: "",
  proficiency: "intermediate",
};

const emptyVolunteerWork: VolunteerWork = {
  sortOrder: 0,
  organizationName: "",
  role: "",
  startDate: null,
  endDate: null,
  description: "",
};

const emptyReference: ReferenceEntry = {
  sortOrder: 0,
  fullName: "",
  title: "",
  company: "",
  phone: "",
  email: "",
  relationship: "",
};

export const useResumeBuilderStore = create<ResumeBuilderState>((set) => ({
  resumeData: {
    personalInfo: null,
    summary: null,
    workExperience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
    volunteerWork: [],
    references: [],
  },
  resumeMeta: null,
  isDirty: false,
  lastSavedAt: null,
  savingSection: null,

  setResumeData: (data, meta) =>
    set({
      resumeData: {
        personalInfo: data.personalInfo,
        summary: data.summary,
        workExperience: data.workExperience,
        education: data.education,
        skills: data.skills,
        projects: data.projects,
        certifications: data.certifications,
        languages: data.languages,
        volunteerWork: data.volunteerWork,
        references: data.references,
      },
      resumeMeta: meta,
      isDirty: false,
      lastSavedAt: null,
    }),

  updatePersonalInfo: (field, value) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        personalInfo: {
          ...(state.resumeData.personalInfo || {
            fullName: "",
            email: "",
            phone: "",
            location: "",
            linkedin: "",
            website: "",
            github: "",
          }),
          [field]: value,
        },
      },
      isDirty: true,
    })),

  updateSummary: (content) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        summary: { content },
      },
      isDirty: true,
    })),

  addWorkExperience: () =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        workExperience: [
          ...state.resumeData.workExperience,
          { ...emptyWorkExperience, sortOrder: state.resumeData.workExperience.length },
        ],
      },
      isDirty: true,
    })),

  updateWorkExperience: (index, data) =>
    set((state) => {
      const arr = [...state.resumeData.workExperience];
      arr[index] = { ...arr[index], ...data };
      return { resumeData: { ...state.resumeData, workExperience: arr }, isDirty: true };
    }),

  removeWorkExperience: (index) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        workExperience: state.resumeData.workExperience.filter((_, i) => i !== index),
      },
      isDirty: true,
    })),

  reorderWorkExperience: (from, to) =>
    set((state) => {
      const arr = [...state.resumeData.workExperience];
      const [item] = arr.splice(from, 1);
      arr.splice(to, 0, item);
      return {
        resumeData: {
          ...state.resumeData,
          workExperience: arr.map((e, i) => ({ ...e, sortOrder: i })),
        },
        isDirty: true,
      };
    }),

  addEducation: () =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        education: [
          ...state.resumeData.education,
          { ...emptyEducation, sortOrder: state.resumeData.education.length },
        ],
      },
      isDirty: true,
    })),

  updateEducation: (index, data) =>
    set((state) => {
      const arr = [...state.resumeData.education];
      arr[index] = { ...arr[index], ...data };
      return { resumeData: { ...state.resumeData, education: arr }, isDirty: true };
    }),

  removeEducation: (index) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        education: state.resumeData.education.filter((_, i) => i !== index),
      },
      isDirty: true,
    })),

  reorderEducation: (from, to) =>
    set((state) => {
      const arr = [...state.resumeData.education];
      const [item] = arr.splice(from, 1);
      arr.splice(to, 0, item);
      return {
        resumeData: {
          ...state.resumeData,
          education: arr.map((e, i) => ({ ...e, sortOrder: i })),
        },
        isDirty: true,
      };
    }),

  addSkill: () =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        skills: [...state.resumeData.skills, { ...emptySkill, sortOrder: state.resumeData.skills.length }],
      },
      isDirty: true,
    })),

  updateSkill: (index, data) =>
    set((state) => {
      const arr = [...state.resumeData.skills];
      arr[index] = { ...arr[index], ...data };
      return { resumeData: { ...state.resumeData, skills: arr }, isDirty: true };
    }),

  removeSkill: (index) =>
    set((state) => ({
      resumeData: { ...state.resumeData, skills: state.resumeData.skills.filter((_, i) => i !== index) },
      isDirty: true,
    })),

  reorderSkills: (from, to) =>
    set((state) => {
      const arr = [...state.resumeData.skills];
      const [item] = arr.splice(from, 1);
      arr.splice(to, 0, item);
      return {
        resumeData: {
          ...state.resumeData,
          skills: arr.map((s, i) => ({ ...s, sortOrder: i })),
        },
        isDirty: true,
      };
    }),

  addProject: () =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        projects: [...state.resumeData.projects, { ...emptyProject, sortOrder: state.resumeData.projects.length }],
      },
      isDirty: true,
    })),

  updateProject: (index, data) =>
    set((state) => {
      const arr = [...state.resumeData.projects];
      arr[index] = { ...arr[index], ...data };
      return { resumeData: { ...state.resumeData, projects: arr }, isDirty: true };
    }),

  removeProject: (index) =>
    set((state) => ({
      resumeData: { ...state.resumeData, projects: state.resumeData.projects.filter((_, i) => i !== index) },
      isDirty: true,
    })),

  addCertification: () =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        certifications: [
          ...state.resumeData.certifications,
          { ...emptyCertification, sortOrder: state.resumeData.certifications.length },
        ],
      },
      isDirty: true,
    })),

  updateCertification: (index, data) =>
    set((state) => {
      const arr = [...state.resumeData.certifications];
      arr[index] = { ...arr[index], ...data };
      return { resumeData: { ...state.resumeData, certifications: arr }, isDirty: true };
    }),

  removeCertification: (index) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        certifications: state.resumeData.certifications.filter((_, i) => i !== index),
      },
      isDirty: true,
    })),

  addLanguage: () =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        languages: [...state.resumeData.languages, { ...emptyLanguage, sortOrder: state.resumeData.languages.length }],
      },
      isDirty: true,
    })),

  updateLanguage: (index, data) =>
    set((state) => {
      const arr = [...state.resumeData.languages];
      arr[index] = { ...arr[index], ...data };
      return { resumeData: { ...state.resumeData, languages: arr }, isDirty: true };
    }),

  removeLanguage: (index) =>
    set((state) => ({
      resumeData: { ...state.resumeData, languages: state.resumeData.languages.filter((_, i) => i !== index) },
      isDirty: true,
    })),

  addVolunteerWork: () =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        volunteerWork: [
          ...state.resumeData.volunteerWork,
          { ...emptyVolunteerWork, sortOrder: state.resumeData.volunteerWork.length },
        ],
      },
      isDirty: true,
    })),

  updateVolunteerWork: (index, data) =>
    set((state) => {
      const arr = [...state.resumeData.volunteerWork];
      arr[index] = { ...arr[index], ...data };
      return { resumeData: { ...state.resumeData, volunteerWork: arr }, isDirty: true };
    }),

  removeVolunteerWork: (index) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        volunteerWork: state.resumeData.volunteerWork.filter((_, i) => i !== index),
      },
      isDirty: true,
    })),

  addReference: () =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        references: [
          ...state.resumeData.references,
          { ...emptyReference, sortOrder: state.resumeData.references.length },
        ],
      },
      isDirty: true,
    })),

  updateReference: (index, data) =>
    set((state) => {
      const arr = [...state.resumeData.references];
      arr[index] = { ...arr[index], ...data };
      return { resumeData: { ...state.resumeData, references: arr }, isDirty: true };
    }),

  removeReference: (index) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        references: state.resumeData.references.filter((_, i) => i !== index),
      },
      isDirty: true,
    })),

  updateSectionOrder: (newOrder) =>
    set((state) => {
      if (!state.resumeMeta) return {};
      return {
        resumeMeta: { ...state.resumeMeta, sectionOrder: newOrder },
        isDirty: true,
      };
    }),

  updateMeta: (data) =>
    set((state) => {
      if (!state.resumeMeta) return {};
      return {
        resumeMeta: { ...state.resumeMeta, ...data },
        isDirty: true,
      };
    }),

  markDirty: () => set({ isDirty: true }),
  markSaved: () => set({ isDirty: false, lastSavedAt: new Date() }),
  setSaving: (section) => set({ savingSection: section }),
}));
