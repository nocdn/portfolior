export function DesktopSection({
  children,
  className,
  title,
  subtitleChildren,
  secondaryChildren,
  subtitleURL,
}: {
  children: React.ReactNode
  className?: string
  title: string
  subtitleChildren?: React.ReactNode
  secondaryChildren?: React.ReactNode
  subtitleURL?: string
}) {
  return (
    <div
      style={{
        fontFamily: "var(--font-pp-neue-montreal), Inter, sans-serif",
        fontWeight: 500,
        lineHeight: "30px",
        fontSize: "19px",
      }}
      className={`group/section ${className}`}
    >
      <div
        id="title"
        className="font-mono text-gray-500/60 text-[16px] font-semibold relative mb-1 flex items-center transition-transform duration-200 ease-[cubic-bezier(0.175,0.885,0.32,1)] group-hover/section:translate-x-[3px] group-hover/section:font-[650]"
      >
        {title}
        {subtitleChildren && (
          <a
            href={subtitleURL}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={0}
            id="subtitleChildren"
            className="text-[16px] font-semibold font-mono ml-2 text-blue-700/40 hover:text-blue-700/60 cursor-pointer flex items-center opacity-0 transition-all duration-200 group-hover/section:opacity-100 group-hover/section:blur-0"
          >
            [{subtitleChildren}]
          </a>
        )}
        <div
          id="secondaryChildren"
          className="text-gray-500 hover:text-gray-700 cursor-pointer transition-all duration-200 ease-[cubic-bezier(0.175,0.885,0.32,1)] ml-auto group-hover/section:-translate-x-0.75"
        >
          {secondaryChildren}
        </div>
      </div>
      {children}
    </div>
  )
}
