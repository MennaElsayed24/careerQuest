import { useQuery } from "@tanstack/react-query";
import { careerService } from "../services/careers/careerService";

export function useCareerRecommendations() {
  return useQuery({
    queryKey: ["career-recommendations"],
    queryFn: careerService.getRecommendedCareers,
    staleTime: 1000 * 60 * 10,
  });
}