import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { RegistrationRecord, TeamRegistration } from "../types";

const STORAGE_KEY = "krpl_registrations";

function getStoredRegistrations(): RegistrationRecord[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? (JSON.parse(data) as RegistrationRecord[]) : [];
  } catch {
    return [];
  }
}

function saveRegistrations(records: RegistrationRecord[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

export function useRegisterTeam() {
  const queryClient = useQueryClient();

  return useMutation<RegistrationRecord, Error, TeamRegistration>({
    mutationFn: async (data: TeamRegistration) => {
      const existing = getStoredRegistrations();
      const newRecord: RegistrationRecord = {
        ...data,
        id: `team_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        registeredAt: new Date().toISOString(),
      };
      saveRegistrations([...existing, newRecord]);
      return newRecord;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["registrations"] });
    },
  });
}
