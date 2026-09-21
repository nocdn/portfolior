// Unique per article, identical on the home row and the article heading:
// the browser morphs between the two during home <-> article navigations.
// Applied as static CSS classes (not React's <ViewTransition>): the name must
// already be present in both trees when startViewTransition snapshots them.
export function articleTransitionClass(href: string) {
  return `vt-name-${href.split("/").pop()}`
}

export function ArticleTitle({
  title,
  date,
  href,
}: {
  title: string
  date: string
  // omit for rows with no article page: no name, no transition
  href?: string
}) {
  return (
    <div className={`flex flex-col gap-1 ${href ? articleTransitionClass(href) : ""}`}>
      <span className="text-foreground">{title}</span>
      <span className="text-muted-foreground">{date}</span>
    </div>
  )
}
