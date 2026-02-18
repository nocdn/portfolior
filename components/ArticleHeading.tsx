export function ArticleHeading({ title, date }: { title: string; date: string }) {
  return (
    <div className="mb-2">
      <h1 className="w-fit font-medium">{title}</h1>
      <p className="text-[15px] text-gray-500/60 dark:text-gray-400/60">{date}</p>
    </div>
  )
}
