import { useQuery } from "@tanstack/react-query";
import type { RegistrationRecord } from "../types";

const STORAGE_KEY = "krpl_registrations";

function getStoredRegistrations(): RegistrationRecord[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? (JSON.parse(data) as RegistrationRecord[]) : [];
  } catch {
    return [];
  }
}

export function useRegistrations() {
  return useQuery<RegistrationRecord[]>({
    queryKey: ["registrations"],
    queryFn: async () => {
      return getStoredRegistrations();
    },
  });
}
