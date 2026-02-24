import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const corneredButtonVariants = cva(
  "relative inline-flex items-center justify-center overflow-visible border border-border bg-background text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent/50",
  {
    variants: {
      size: {
        sm: "h-8 px-3",
        md: "h-9 px-4",
        lg: "h-10 px-6",
      },
      variant: {
        default: "",
        outline: "bg-transparent",
        ghost: "bg-transparent border-transparent hover:bg-accent",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 border-transparent",
      },
      corners: {
        on: "",
        off: "",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
      corners: "on",
    },
  }
)

export interface CorneredButtonProps
  extends React.ComponentPropsWithRef<"button">, VariantProps<typeof corneredButtonVariants> {
  borderWidth?: number
  cornerSize?: number
  cornerColor?: string
}

export function CorneredButton({
  className,
  children,
  size,
  variant,
  corners = "on",
  type = "button",
  borderWidth = 1,
  cornerSize = 8,
  cornerColor,
  style,
  ref,
  ...props
}: CorneredButtonProps) {
  const cornerBorder = `${borderWidth}px solid ${cornerColor ?? "hsl(var(--border))"}`

  return (
    <button
      ref={ref}
      type={type}
      data-corners={corners}
      className={cn(corneredButtonVariants({ size, variant }), className)}
      style={{ borderWidth, ...style }}
      {...props}
    >
      {children}

      {corners === "on" && (
        <span
          aria-hidden
          className="pointer-events-none absolute"
          style={{ inset: `-${borderWidth}px` }}
        >
          {(["tl", "tr", "bl", "br"] as const).map((pos) => (
            <span
              key={pos}
              className={cn(
                "absolute",
                pos === "tl" && "top-0 left-0",
                pos === "tr" && "top-0 right-0",
                pos === "bl" && "bottom-0 left-0",
                pos === "br" && "right-0 bottom-0"
              )}
              style={{
                width: cornerSize,
                height: cornerSize,
                borderTop: pos === "tl" || pos === "tr" ? cornerBorder : undefined,
                borderBottom: pos === "bl" || pos === "br" ? cornerBorder : undefined,
                borderLeft: pos === "tl" || pos === "bl" ? cornerBorder : undefined,
                borderRight: pos === "tr" || pos === "br" ? cornerBorder : undefined,
              }}
            />
          ))}
        </span>
      )}
    </button>
  )
}

export { corneredButtonVariants }
