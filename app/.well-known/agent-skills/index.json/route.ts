export async function GET() {
  return Response.json(
    {
      $schema:
        "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
      skills: [],
    },
    {
      headers: {
        "Cache-Control": "public, max-age=86400",
      },
    },
  )
}
