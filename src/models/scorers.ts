export interface PlayerInfo {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  nationality: string;
  section: string;
  position?: string | null;
  shirtNumber?: number | null;
  lastUpdate: string;
}

export interface TeamInfo {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
  address: string;
  website: string;
  founded: number;
  clubColors: string;
  stadium: string;
  lastUpdate: string;
}

export interface Scorer {
  player: PlayerInfo;
  team: TeamInfo;
  matchesPlayed: number;
  goals: number;
  assists: number;
  penalties?: number | null;
}
