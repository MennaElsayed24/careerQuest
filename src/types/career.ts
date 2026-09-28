export interface Career {
  id: string;
  title: string;
  description: string;
  category: string;
  requiredSkills: string[];
}

export interface CareerMatch {
  career: Career;
  matchPercentage: number;
  matchingSkills: string[];
  missingSkills: string[];
  reasons: string[];
}