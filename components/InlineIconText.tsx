import type { ReactElement, ReactNode, SVGProps } from "react"

type ProjectIcon = (props: SVGProps<SVGSVGElement>) => ReactElement

export const InlineIconText = ({
  icon: Icon,
  children,
  className,
  textClassName,
  iconClassName,
  iconSize = 16,
}: {
  icon: ProjectIcon
  children: ReactNode
  className?: string
  textClassName?: string
  iconClassName?: string
  iconSize?: number | string
}) => {
  return (
    <span className={`whitespace-nowrap ${className ?? ""}`}>
      <Icon
        className={`mr-1 inline align-[-0.125em] ${iconClassName ?? ""}`}
        style={{ height: iconSize, width: iconSize }}
        aria-hidden="true"
      />
      <span className={textClassName}>{children}</span>
    </span>
  )
}
