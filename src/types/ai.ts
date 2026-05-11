export interface AISuggestSummaryRequest {
  resumeId: string;
  jobTitle?: string;
  industry?: string;
}

export interface AIImproveBulletRequest {
  resumeId: string;
  currentText: string;
  context?: string;
}

export interface AISuggestSkillsRequest {
  resumeId: string;
  jobTitle?: string;
}

export interface AIRewriteDescriptionRequest {
  resumeId: string;
  currentText: string;
  jobTitle?: string;
}

export interface AIGenerateCoverLetterRequest {
  resumeId: string;
  companyName: string;
  jobTitle: string;
  recipientName?: string;
  additionalNotes?: string;
}

export interface AISuggestionResponse {
  suggestedText: string;
  creditsRemaining: number;
}
