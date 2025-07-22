export default async function GetCompetitionTeams(code: string) {
  try {
    const response = await fetch(`/api/competitions/${code}/teams`);
    return response.json();
  } catch (e) {
    console.error(e);
  }
}
