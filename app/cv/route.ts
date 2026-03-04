import { readFile } from "fs/promises"
import { join } from "path"

export async function GET() {
  const filePath = join(process.cwd(), "public", "Bartosz_Bak_CV.pdf")
  const fileBuffer = await readFile(filePath)

  return new Response(fileBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline; filename="Bartosz_Bak_CV.pdf"',
      "Content-Length": fileBuffer.byteLength.toString(),
      "Cache-Control": "public, max-age=432000, immutable",
    },
  })
}
