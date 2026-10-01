import { useQuery } from "@tanstack/react-query";
import { careerService } from "../services/careers/careerService";

export function useCareerDetails(uri: string) {
  return useQuery({
    queryKey: ["career-details", uri],
    queryFn: () => careerService.getCareer(uri),
    enabled: uri.length > 0,
    staleTime: 1000 * 60 * 10,
  });
}