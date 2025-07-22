import { IArea, ICompetition, ISeason } from "./competitions";

export interface IStandingsResponse {
  filters: {
    season: string;
  };
  area: IArea;
  competition: ICompetition;
  season: ISeason;
  standings: IStanding[];
}

export interface IStanding {
  stage: string;
  type: string;
  group: null | string;
  table: TableEntry[];
}

export interface TableEntry {
  position: number;
  team: {
    id: number;
    name: string;
    shortName: string;
    tla: string;
    crest: string;
  };
  playedGames: number;
  form: string;
  won: number;
  draw: number;
  lost: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
}
