import { ICompetitionsResponse } from "@/models/competitions";

export default async function GetCompetitions(): Promise<ICompetitionsResponse | null> {
  try {
    const response = await fetch("/api/competitions");
    return response.json();
  } catch (e) {
    console.error(e);
    return null;
  }
}
