import { codeToHtml } from "shiki"

interface ShikiCodeInlineProps {
  code: string
  lang?: string
  theme?: string
}

export async function ShikiCodeInline({
  code,
  lang = "ts",
  theme = "one-light",
}: ShikiCodeInlineProps) {
  const highlighted = await codeToHtml(code, {
    lang,
    theme,
    transformers: [
      {
        code(node) {
          node.properties.className = ["inline-code"]
          return node
        },
      },
    ],
  })

  return (
    <span
      dangerouslySetInnerHTML={{ __html: highlighted }}
      className="inline-code"
    />
  )
}
