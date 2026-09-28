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
  title?: string;
  preferredLabel?: string;
  description?: string;
  className?: string;
}

interface EscoOccupationResponse {
  uri?: string;
  preferredLabel?: string;
  altLabels?: string[];
  description?: string;

  _links?: {
    hasEssentialSkill?: {
      href: string;
    };
    hasOptionalSkill?: {
      href: string;
    };
  };
}

function normalizeCareer(
  occupation: EscoSearchResult,
): Career {
  return {
    id: occupation.uri,
    title:
      occupation.preferredLabel ??
      occupation.title ??
      "Unknown Career",
    description:
      occupation.description ?? "",
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
          type: "http://data.europa.eu/esco/model#Occupation",
          limit: 20,
          offset: 0,
        },
      );

    const results =
      response._embedded?.results ?? [];

    return results.map(normalizeCareer);
  },

  getCareer: async (
    uri: string,
  ): Promise<EscoOccupationResponse> => {
    return apiClient.get<EscoOccupationResponse>(
      `${API_CONFIG.esco}/resource/occupation`,
      {
        uri,
        language: "en",
      },
    );
  },
};