import type { ComponentType, ReactNode, SVGProps } from "react"

type ProjectIcon = ComponentType<SVGProps<SVGSVGElement>>

export const InlineIconText = ({
  icon: Icon,
  title,
  className,
  textColor,
}: {
  icon: ProjectIcon
  title: ReactNode
  className?: string
  textColor?: string
}) => {
  return (
    <span className={`whitespace-nowrap ${className ?? ""}`}>
      <Icon className="mr-1 inline size-4 align-[-0.125em]" aria-hidden="true" />
      <span className={textColor}>{title}</span>
    </span>
  )
}
