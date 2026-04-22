export async function GET() {
  return Response.json(
    {
      name: "bartoszbak.org",
      version: "1.0.0",
      description: "Bartosz Bak's portfolio — software engineer based in the UK",
      websiteUrl: "https://bartoszbak.org",
      capabilities: {
        tools: false,
        resources: false,
        prompts: false,
      },
    },
    {
      headers: {
        "Cache-Control": "public, max-age=86400",
      },
    },
  )
}
