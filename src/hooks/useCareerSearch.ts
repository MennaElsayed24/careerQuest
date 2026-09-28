import { useQuery } from "@tanstack/react-query";
import { careerService } from "../services/careers/careerService";

export function useCareerSearch(query: string) {
  return useQuery({
    queryKey: ["career-search", query],
    queryFn: () => careerService.searchCareers(query),
    enabled: query.trim().length > 1,
    staleTime: 1000 * 60 * 10,
  });
}