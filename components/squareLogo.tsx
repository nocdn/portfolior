import type { SVGProps } from "react"

type SquareLogoProps = SVGProps<SVGSVGElement> & {
  gridSize?: number
  showGrid?: boolean
  gridStroke?: string
}

type Rect = {
  x: number
  y: number
  width: number
  height: number
}

const VIEWBOX_SIZE = 500

const logoRects: Rect[] = [
  { x: 69, y: 121, width: 86.988, height: 259 },
  { x: 337.575, y: 121, width: 92.425, height: 259 },
  { x: 252.762, y: 121, width: 174.52, height: 83.456 },
  { x: 252.762, y: 296.544, width: 177.238, height: 83.456 },
  { x: 252.762, y: 204.455, width: 96.774, height: 92.089 },
]

const isFilledCell = (x: number, y: number) =>
  logoRects.some(
    (rect) => x >= rect.x && x <= rect.x + rect.width && y >= rect.y && y <= rect.y + rect.height
  )

export function SquareLogo({
  gridSize = 16,
  showGrid = true,
  gridStroke = "#E5E7EB",
  ...props
}: SquareLogoProps) {
  const safeGridSize = Math.max(4, Math.floor(gridSize))
  const cellSize = VIEWBOX_SIZE / safeGridSize
  const strokeWidth = showGrid ? Math.max(1, cellSize * 0.06) : 0

  return (
    <svg {...props} viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`} shapeRendering="crispEdges">
      {Array.from({ length: safeGridSize }).map((_, rowIndex) =>
        Array.from({ length: safeGridSize }).map((__, colIndex) => {
          const x = colIndex * cellSize
          const y = rowIndex * cellSize
          const centerX = x + cellSize / 2
          const centerY = y + cellSize / 2
          const active = isFilledCell(centerX, centerY)

          return (
            <rect
              key={`${rowIndex}-${colIndex}`}
              x={x}
              y={y}
              width={cellSize}
              height={cellSize}
              fill={active ? "#000" : "#fff"}
              stroke={showGrid ? gridStroke : undefined}
              strokeWidth={strokeWidth}
            />
          )
        })
      )}
    </svg>
  )
}
