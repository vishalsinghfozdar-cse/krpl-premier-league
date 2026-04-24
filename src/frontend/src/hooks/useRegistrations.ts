import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { type Registration, createActor } from "../backend";

export type { Registration };

export function useRegistrations() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<Registration[]>({
    queryKey: ["registrations"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getRegistrations();
    },
    enabled: !!actor && !isFetching,
  });
}
