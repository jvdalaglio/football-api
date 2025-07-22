export default async function GetCompetitionScorers(code: string) {
  try {
    const response = await fetch(`/api/competitions/${code}/scorers`);
    return response.json();
  } catch (e) {
    console.error(e);
  }
}
