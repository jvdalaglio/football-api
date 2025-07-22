export default async function GetCompetitionsById(code: string) {
  try {
    const response = await fetch(`/api/competitions/${code}`);
    return response.json();
  } catch (e) {
    console.error(e);
  }
}
