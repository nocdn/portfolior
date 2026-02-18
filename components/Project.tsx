export const ProjectDesktop = ({
  className,
  title,
  description,
  demoURL,
  sourceURL,
}: {
  className?: string
  title: string
  description?: string
  demoURL?: string
  sourceURL?: string
}) => {
  return (
    <a
      href={demoURL ? demoURL : sourceURL}
      target="_blank"
      className={`${className} group/item relative inline-block cursor-pointer py-0.5 transition-opacity duration-100 group-hover:opacity-30 hover:opacity-100! hover:duration-0 focus:outline-none`}
    >
      <div className="font-pp-neue-montreal relative z-10 flex items-center gap-3 text-[17px] leading-8 font-medium">
        <p className="text-gray-800/90 group-hover/item:text-blue-600 group-hover/item:drop-shadow-[0_0_0.5px_rgba(59,130,246,0.2)] dark:group-hover/item:text-blue-400 dark:group-hover/item:drop-shadow-[0_0_0.5px_rgba(96,165,250,0.2)]">
          {title}
        </p>
        {description && (
          <p className="font-switzer text-[17px] font-medium text-gray-500/90 antialiased group-hover:text-gray-700 dark:text-gray-400/90 dark:group-hover:text-gray-300">
            {description}
          </p>
        )}
      </div>
    </a>
  )
}

export const ProjectMobile = () => {
  return <div>ProjectsMobile</div>
}
