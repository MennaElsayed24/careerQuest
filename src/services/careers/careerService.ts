import { API_CONFIG } from "../../lib/apiConfig";
import { apiClient } from "../api/apiClient";
import type { Career } from "../../types/career";

interface EscoSearchResponse {
  _embedded?: {
    results?: EscoSearchResult[];
  };
}

interface EscoSearchResult {
  uri: string;
  title?: LocalizedText;
  preferredLabel?: LocalizedText;
  description?: LocalizedText;
  className?: string;
}

type LocalizedTextValue = string | { literal?: string };
type LocalizedText = string | Record<string, LocalizedTextValue>;

interface EscoOccupationResponseWire {
  uri?: string;
  preferredLabel?: LocalizedText;
  altLabels?: LocalizedText[];
  description?: LocalizedText;

  _links?: {
    hasEssentialSkill?: EscoSkillRelation[];
    hasOptionalSkill?: EscoSkillRelation[];
  };
}

interface EscoSkillRelation {
  href: string;
  uri: string;
  title: LocalizedText;
  skillType?: string;
}

export interface CareerSkillRelation {
  id: string;
  title: string;
  href: string;
  type: "essential" | "optional";
}

interface EscoOccupationResponse {
  uri: string;
  preferredLabel: string;
  altLabels?: string[];
  description: string;
  essentialSkills: CareerSkillRelation[];
  optionalSkills: CareerSkillRelation[];
}

function getEnglishText(value: LocalizedText | undefined): string {
  if (typeof value === "string") return value;
  if (!value) return "";

  const englishValue =
    value.en ??
    value["en-us"] ??
    Object.values(value)[0];

  if (typeof englishValue === "string") return englishValue;
  return englishValue?.literal ?? "";
}

function normalizeCareer(
  occupation: EscoSearchResult,
): Career {
  return {
    id: occupation.uri,
    title:
      getEnglishText(occupation.preferredLabel) ||
      getEnglishText(occupation.title) ||
      "Unknown Career",
    description: getEnglishText(occupation.description),
    category: "occupation",
    requiredSkills: [],
  };
}

export const careerService = {
  searchCareers: async (
    query: string,
  ): Promise<Career[]> => {
    if (!query.trim()) {
      return [];
    }

    const response =
      await apiClient.get<EscoSearchResponse>(
        `${API_CONFIG.esco}/search`,
        {
          text: query,
          language: "en",
          type: "occupation",
          limit: 20,
          offset: 0,
        },
      );

    const results =
      response._embedded?.results ?? [];

    return results.map(normalizeCareer);
  },

  getRecommendedCareers: async (): Promise<Career[]> => {
    const searches = [
      "software developer",
      "data analyst",
      "cybersecurity analyst",
    ];
    const resultGroups = await Promise.all(
      searches.map((query) => careerService.searchCareers(query)),
    );
    const uniqueCareers = new Map<string, Career>();

    for (const group of resultGroups) {
      for (const career of group.slice(0, 3)) {
        uniqueCareers.set(career.id, career);
      }
    }

    return Array.from(uniqueCareers.values());
  },

  getCareer: async (
    uri: string,
  ): Promise<EscoOccupationResponse> => {
    const response = await apiClient.get<EscoOccupationResponseWire>(
      `${API_CONFIG.esco}/resource/occupation`,
      {
        uri,
        language: "en",
      },
    );

    return {
      uri: response.uri ?? uri,
      preferredLabel: getEnglishText(response.preferredLabel),
      altLabels: response.altLabels
        ?.map(getEnglishText)
        .filter((label) => label.length > 0),
      description: getEnglishText(response.description),
      essentialSkills: (response._links?.hasEssentialSkill ?? []).map(
        (skill) => ({
          id: skill.uri,
          title: getEnglishText(skill.title) || skill.uri,
          href: skill.href,
          type: "essential",
        }),
      ),
      optionalSkills: (response._links?.hasOptionalSkill ?? []).map(
        (skill) => ({
          id: skill.uri,
          title: getEnglishText(skill.title) || skill.uri,
          href: skill.href,
          type: "optional",
        }),
      ),
    };
  },
};