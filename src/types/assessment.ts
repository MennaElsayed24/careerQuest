export type AssessmentStatus =
  | "not-started"
  | "in-progress"
  | "completed";

export type AssessmentQuestionType =
  | "single"
  | "multiple";

export interface AssessmentOption {
  id: string;
  label: string;
  value: string;
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  description?: string;
  type: AssessmentQuestionType;
  options: AssessmentOption[];
  required?: boolean;
}

export interface AssessmentAnswer {
  questionId: string;
  value: string | string[] | number;
}

export interface AssessmentResult {
  careerId: string;
  matchPercentage: number;
  matchingSkills: string[];
  missingSkills: string[];
  reasons?: string[];
}

export interface Assessment {
  id: string;
  userId: string;
  answers: AssessmentAnswer[];
  results: AssessmentResult[];
  status: AssessmentStatus;
  currentQuestionIndex: number;
  startedAt?: string;
  completedAt?: string;
}