import { ArrowExternalLink } from "@/icons/arrowExternal"

export const LinkText = ({
  url,
  text,
  className,
}: {
  url: string
  text: string
  className?: string
}) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center ${className ?? ""}`}
    >
      {text} <ArrowExternalLink className="ml-0.5 translate-y-px" />
    </a>
  )
}
