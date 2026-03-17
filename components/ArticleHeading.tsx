import { Article } from "./Article"

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
    <Article
      title={title}
      date={date}
      href={href}
      prefetch={false}
      titleTag="h1"
      showBookIcon={false}
    />
  )
}
