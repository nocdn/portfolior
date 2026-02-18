export const SectionDesktop = ({
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
}) => {
  return (
    <div
      className={`group/section ${className} font-pp-neue-montreal text-[19px] leading-[30px] font-medium`}
    >
      <div
        id="title"
        className="relative mb-1 flex items-center font-mono text-[16px] font-semibold tracking-[0.015em] text-gray-500/60 antialiased transition-transform duration-200 ease-[cubic-bezier(0.175,0.885,0.32,1)] group-hover/section:translate-x-[3px] group-hover/section:font-[650] dark:text-gray-400/60"
      >
        {title}
        {subtitleChildren && (
          <a
            href={subtitleURL}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={0}
            id="subtitleChildren"
            className="group-hover/section:blur-0 ml-2 flex cursor-pointer items-center font-mono text-[16px] font-semibold text-blue-700/40 opacity-0 transition-all duration-200 group-hover/section:opacity-100 hover:text-blue-700/60 dark:text-blue-400/40 dark:hover:text-blue-400/60"
          >
            [{subtitleChildren}]
          </a>
        )}
        <div
          id="secondaryChildren"
          className="ml-auto cursor-pointer text-gray-500 transition-all duration-200 ease-[cubic-bezier(0.175,0.885,0.32,1)] group-hover/section:-translate-x-0.75 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          {secondaryChildren}
        </div>
      </div>
      {children}
    </div>
  )
}

export const SectionMobile = ({
  id,
  title,
  children,
  secondaryChildren,
}: {
  id?: string
  title: string
  children: React.ReactNode
  secondaryChildren?: React.ReactNode
}) => {
  return (
    <div
      id={id}
      className="font-pp-neue-montreal flex h-svh flex-col justify-end gap-2 p-8 pb-[calc(env(safe-area-inset-bottom)+2rem)] text-[20px] leading-[30px] font-medium"
    >
      <div className="relative mb-1 flex items-center font-mono text-[16px] font-semibold tracking-[0.015em] text-gray-500/60 dark:text-gray-400/60">
        {title}
        <div className="ml-auto flex items-center gap-2">{secondaryChildren}</div>
      </div>
      {children}
    </div>
  )
}
