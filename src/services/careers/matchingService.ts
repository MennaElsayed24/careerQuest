import type {
  Career,
  CareerMatch,
} from "../../types/career";

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

export function calculateCareerMatch(
  career: Career,
  userSkills: string[],
): CareerMatch {
  const normalizedUserSkills =
    new Set(userSkills.map(normalize));

  const normalizedRequiredSkills =
    career.requiredSkills.map(normalize);

  const matchingSkills =
    career.requiredSkills.filter((skill) =>
      normalizedUserSkills.has(
        normalize(skill),
      ),
    );

  const missingSkills =
    career.requiredSkills.filter(
      (skill) =>
        !normalizedUserSkills.has(
          normalize(skill),
        ),
    );

  const matchPercentage =
    normalizedRequiredSkills.length === 0
      ? 0
      : Math.round(
          (matchingSkills.length /
            normalizedRequiredSkills.length) *
            100,
        );

  return {
    career,
    matchPercentage,
    matchingSkills,
    missingSkills,
    reasons: [],
  };
}