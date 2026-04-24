import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { TeamRegistration } from "../types";

export function useRegisterTeam() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation<boolean, Error, TeamRegistration>({
    mutationFn: async (data: TeamRegistration) => {
      if (!actor)
        throw new Error("बैकएंड से कनेक्शन नहीं हो पाया। कृपया पुनः प्रयास करें।");
      return actor.registerTeam(
        data.teamName,
        data.captainName,
        data.villageName,
        data.phone,
        data.playerCount,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["registrations"] });
    },
  });
}
