import { Slot } from "@radix-ui/react-slot"
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
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof corneredButtonVariants> {
  asChild?: boolean
  borderWidth?: number
  cornerSize?: number
  cornerColor?: string
}

export const CorneredButton = React.forwardRef<HTMLButtonElement, CorneredButtonProps>(
  (
    {
      asChild,
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
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"

    const cssVars: React.CSSProperties = {
      ["--cbw" as any]: `${borderWidth}px`,
      ["--cbs" as any]: `${cornerSize}px`,
      ...(cornerColor ? { ["--cbc" as any]: cornerColor } : {}),
    }

    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : type}
        data-corners={corners}
        className={cn(corneredButtonVariants({ size, variant }), className)}
        style={{ borderWidth: "var(--cbw, 1px)", ...cssVars, ...style }}
        {...props}
      >
        {children}

        {corners === "on" && (
          <span aria-hidden className="pointer-events-none absolute -inset-[var(--cbw,1px)]">
            {(["tl", "tr", "bl", "br"] as const).map((pos) => (
              <span
                key={pos}
                className={cn(
                  "absolute h-[var(--cbs,8px)] w-[var(--cbs,8px)]",
                  pos === "tl" && "top-0 left-0",
                  pos === "tr" && "top-0 right-0",
                  pos === "bl" && "bottom-0 left-0",
                  pos === "br" && "right-0 bottom-0"
                )}
                style={{
                  borderTop:
                    pos === "tl" || pos === "tr"
                      ? "var(--cbw,1px) solid var(--cbc, hsl(var(--border)))"
                      : undefined,
                  borderBottom:
                    pos === "bl" || pos === "br"
                      ? "var(--cbw,1px) solid var(--cbc, hsl(var(--border)))"
                      : undefined,
                  borderLeft:
                    pos === "tl" || pos === "bl"
                      ? "var(--cbw,1px) solid var(--cbc, hsl(var(--border)))"
                      : undefined,
                  borderRight:
                    pos === "tr" || pos === "br"
                      ? "var(--cbw,1px) solid var(--cbc, hsl(var(--border)))"
                      : undefined,
                }}
              />
            ))}
          </span>
        )}
      </Comp>
    )
  }
)
CorneredButton.displayName = "CorneredButton"

export { corneredButtonVariants }
