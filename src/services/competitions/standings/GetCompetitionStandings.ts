export default async function GetCompetitionStandings(code: string) {
  try {
    const response = await fetch(`/api/competitions/${code}/standings`);
    return response.json();
  } catch (e) {
    console.error(e);
  }
}
