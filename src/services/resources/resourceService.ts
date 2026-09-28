import { API_CONFIG } from "../../lib/apiConfig";
import { apiClient } from "../api/apiClient";
import type { LearningResource } from "../../types/resource";

interface DevArticle {
  id: number;
  title: string;
  description: string;
  url: string;
  cover_image: string | null;
  published_at: string;
  tag_list: string[];
  user?: {
    name?: string;
  };
}

export const resourceService = {
  getArticlesBySkill: async (
    skill: string,
  ): Promise<LearningResource[]> => {
    const response =
      await apiClient.get<DevArticle[]>(
        `${API_CONFIG.devTo}/articles`,
        {
          tag: skill
            .toLowerCase()
            .replace(/\s+/g, ""),
          per_page: 10,
        },
      );

    return response.map((article) => ({
      id: String(article.id),
      title: article.title,
      description: article.description,
      url: article.url,
      imageUrl:
        article.cover_image ?? undefined,
      author: article.user?.name,
      publishedAt: article.published_at,
      tags: article.tag_list,
      source: "devto",
    }));
  },
};