import { API_CONFIG } from "../../lib/apiConfig";
import { apiClient } from "../api/apiClient";
import type { Skill } from "../../types/skill";

interface EscoSkillSearchResult {
  uri: string;
  title?: string;
  preferredLabel?: string;
  description?: string;
}

interface EscoSkillSearchResponse {
  _embedded?: {
    results?: EscoSkillSearchResult[];
  };
}

function normalizeSkill(
  skill: EscoSkillSearchResult,
): Skill {
  return {
    id: skill.uri,
    name:
      skill.preferredLabel ??
      skill.title ??
      "Unknown Skill",
    category: "esco",
    description:
      skill.description ?? "",
  };
}

export const skillService = {
  searchSkills: async (
    query: string,
  ): Promise<Skill[]> => {
    if (!query.trim()) {
      return [];
    }

    const response =
      await apiClient.get<EscoSkillSearchResponse>(
        `${API_CONFIG.esco}/search`,
        {
          text: query,
          language: "en",
          type: "skill",
          limit: 20,
          offset: 0,
        },
      );

    return (
      response._embedded?.results ?? []
    ).map(normalizeSkill);
  },

  getSkill: async (
    uri: string,
  ): Promise<Skill> => {
    const response =
      await apiClient.get<{
        uri?: string;
        preferredLabel?: string;
        description?: string;
      }>(
        `${API_CONFIG.esco}/resource/skill`,
        {
          uri,
          language: "en",
        },
      );

    return {
      id: response.uri ?? uri,
      name:
        response.preferredLabel ??
        "Unknown Skill",
      category: "esco",
      description:
        response.description ?? "",
    };
  },
};