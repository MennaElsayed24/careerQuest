import { useQuery } from "@tanstack/react-query";
import { resourceService } from "../services/resources/resourceService";

export function useLearningResources(
  skill: string,
) {
  return useQuery({
    queryKey: ["learning-resources", skill],

    queryFn: () =>
      resourceService.getArticlesBySkill(skill),

    enabled: skill.trim().length > 1,

    staleTime: 1000 * 60 * 15,
  });
}