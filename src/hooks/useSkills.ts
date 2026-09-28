import { useQuery } from "@tanstack/react-query";
import { skillService } from "../services/careers/skillService";

export function useSkills(query: string) {
  return useQuery({
    queryKey: ["skills", query],

    queryFn: () =>
      skillService.searchSkills(query),

    enabled: query.trim().length > 1,

    staleTime: 1000 * 60 * 10,
  });
}