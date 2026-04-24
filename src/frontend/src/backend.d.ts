import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Registration {
    id: bigint;
    teamName: string;
    captainName: string;
    playerCount: string;
    timestamp: bigint;
    villageName: string;
    phone: string;
}
export interface backendInterface {
    getRegistrations(): Promise<Array<Registration>>;
    registerTeam(teamName: string, captainName: string, villageName: string, phone: string, playerCount: string): Promise<boolean>;
}
