import { ArticleIcon } from "@/icons/articleIcon"
import { ArticleTitle, articleIconTransitionClass } from "./ArticleTitle"

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
      <div className={articleIconTransitionClass(href)}>
        <ArticleIcon seed={href} />
      </div>
      <ArticleTitle title={title} date={date} href={href} />
    </div>
  )
}
