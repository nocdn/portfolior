export default function PodcastEpisode({
  number,
  title,
  url,
}: {
  number: number | string | null
  title: string | number | null
  url: string
}) {
  return (
    <a
      href={url}
      className="flex items-center gap-1 text-[15px] text-gray-500 font-sans"
    >
      <p className="font-geist text-gray-500 text-[12px] leading-[1.4] bg-gray-100 rounded px-1">
        {number}
      </p>
      <p className="leading-[1.85]">{title}</p>
    </a>
  )
}
