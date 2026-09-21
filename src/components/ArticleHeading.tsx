import { ArticleIcon } from "@/icons/articleIcon"
import { ArticleTitle } from "./ArticleTitle"

export function ArticleHeading({
  title,
  date,
  href,
}: {
  title: string
  date: string
  href: string
}) {
  return (
    <div className="flex items-start gap-4">
      <ArticleIcon seed={href} />
      <ArticleTitle title={title} date={date} />
    </div>
  )
}
