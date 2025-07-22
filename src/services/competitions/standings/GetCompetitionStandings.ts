import { IStandingsResponse } from "@/models/standings";

export default async function GetCompetitionStandings(
  code: string
): Promise<IStandingsResponse | null> {
  try {
    const response = await fetch(`/api/competitions/${code}/standings`);
    return response.json();
  } catch (e) {
    console.error(e);
    return null;
  }
}
