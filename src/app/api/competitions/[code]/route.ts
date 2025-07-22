import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { code: string } }
) {
  const { code } = params;

  const res = await fetch(
    `https://api.football-data.org/v4/competitions/${code}`,
    {
      headers: {
        "X-Auth-Token": process.env.NEXT_PUBLIC_API_TOKEN || "",
      },
    }
  );

  if (!res.ok) {
    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
    });
  }

  const data = await res.json();
  return Response.json(data);
}
