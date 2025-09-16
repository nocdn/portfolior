"use client"

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism"

type Props = {
  code: string
  lang?: string
  className?: string
}

export function CodeInline({ code, lang = "tsx", className }: Props) {
  return (
    <SyntaxHighlighter
      language={lang}
      style={oneLight}
      PreTag="div"
      CodeTag="code"
      wrapLongLines
      className={["rounded-sm", className].filter(Boolean).join(" ")}
      customStyle={{
        padding: "12px",
        margin: "0 auto",
        borderRadius: "12px",
        fontSize: "14px",
      }}
      codeTagProps={{
        style: {
          whiteSpace: "pre-wrap",
          overflowWrap: "anywhere",
          wordBreak: "break-word",
        },
      }}
    >
      {code}
    </SyntaxHighlighter>
  )
}
