export interface IArea {
  id: number;
  name: string;
  code: string;
  flag: string;
}

export interface IWinner {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
  address: string;
  website: string;
  founded: number;
  clubColors: string;
  venue: string;
  lastUpdated: string;
}

export interface ISeason {
  id: number;
  startDate: string;
  endDate: string;
  currentMatchday: number | null;
  winner: IWinner | null;
  stages: string[];
}

export interface ICompetition {
  area: IArea;
  id: number;
  name: string;
  code: string;
  type: string;
  emblem: string;
  currentSeason: ISeason;
  seasons: ISeason[];
  lastUpdated: string;
}

export interface Filters {
  client: string;
}

export interface ICompetitionsResponse {
  count: number;
  filters: Filters;
  competitions: ICompetition[];
}
