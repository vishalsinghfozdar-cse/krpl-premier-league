export interface TeamRegistration {
  teamName: string;
  captainName: string;
  villageName: string;
  phone: string;
  playerCount: string;
}

export interface RegistrationRecord extends TeamRegistration {
  id: string;
  registeredAt: string;
}
