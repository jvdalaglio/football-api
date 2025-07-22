export async function GET() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/competitions`, {
    headers: {
      "X-Auth-Token": process.env.NEXT_PUBLIC_API_TOKEN || "",
    },
  });

  if (!res.ok) {
    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
    });
  }

  const data = await res.json();
  return Response.json(data);
}
