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
      {number && (
        <p className="font-geist text-gray-500 text-[12px] leading-[1.4] bg-gray-100 rounded px-1">
          {number}
        </p>
      )}
      {!number && (
        <div className="w-1 h-1 bg-gray-200 mr-0.5 ml-0.25 rounded-full"></div>
      )}
      <p className={`${number ? "leading-[1.85]" : "leading-[1.65]"}`}>
        {title}
      </p>
    </a>
  )
}
