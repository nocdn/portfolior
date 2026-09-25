// Shared by home rows and article headings: icon + title block stay
// visually identical in both places.
export function ArticleTitle({ title, date }: { title: string; date: string }) {
  return (
    <div className="flex flex-col gap-0.5 leading-[1.5]">
      <span className="text-foreground">{title}</span>
      <span className="text-muted-foreground text-[16px]">{date}</span>
    </div>
  )
}
