"use client"

import type { CSSProperties, ReactElement, SVGProps } from "react"
import { useEffect, useState } from "react"

type ProjectIcon = (props: SVGProps<SVGSVGElement>) => ReactElement

type PrimaryColorOptions = {
  alphaThreshold?: number
  quantizeStep?: number
  sampleSize?: number
}

type ResolvedOptions = {
  alphaThreshold: number
  quantizeStep: number
  sampleSize: number
}

const DEFAULT_OPTIONS: ResolvedOptions = {
  alphaThreshold: 24,
  quantizeStep: 16,
  sampleSize: 128,
}

const ATTRIBUTE_NAME_MAP: Record<string, string> = {
  className: "class",
  clipRule: "clip-rule",
  fillRule: "fill-rule",
  stopColor: "stop-color",
  stopOpacity: "stop-opacity",
  strokeLinecap: "stroke-linecap",
  strokeLinejoin: "stroke-linejoin",
  strokeMiterlimit: "stroke-miterlimit",
  strokeWidth: "stroke-width",
}

const resolvedColorCache = new WeakMap<ProjectIcon, Map<string, string>>()
const pendingColorCache = new WeakMap<ProjectIcon, Map<string, Promise<string>>>()

function resolveOptions(options?: PrimaryColorOptions): ResolvedOptions {
  return {
    alphaThreshold: options?.alphaThreshold ?? DEFAULT_OPTIONS.alphaThreshold,
    quantizeStep: options?.quantizeStep ?? DEFAULT_OPTIONS.quantizeStep,
    sampleSize: options?.sampleSize ?? DEFAULT_OPTIONS.sampleSize,
  }
}

function getOptionsKey(options: ResolvedOptions) {
  return `${options.sampleSize}:${options.alphaThreshold}:${options.quantizeStep}`
}

function getCachedColor(icon: ProjectIcon, optionsKey: string) {
  return resolvedColorCache.get(icon)?.get(optionsKey) ?? null
}

function setCachedColor(icon: ProjectIcon, optionsKey: string, color: string) {
  const cache = resolvedColorCache.get(icon) ?? new Map<string, string>()
  cache.set(optionsKey, color)
  resolvedColorCache.set(icon, cache)
}

function getPendingColor(icon: ProjectIcon, optionsKey: string) {
  return pendingColorCache.get(icon)?.get(optionsKey) ?? null
}

function setPendingColor(icon: ProjectIcon, optionsKey: string, promise: Promise<string>) {
  const cache = pendingColorCache.get(icon) ?? new Map<string, Promise<string>>()
  cache.set(optionsKey, promise)
  pendingColorCache.set(icon, cache)
}

function clearPendingColor(icon: ProjectIcon, optionsKey: string) {
  const cache = pendingColorCache.get(icon)
  if (!cache) return
  cache.delete(optionsKey)
  if (cache.size === 0) {
    pendingColorCache.delete(icon)
  }
}

function escapeAttribute(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;")
}

function escapeText(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
}

function camelToKebab(value: string) {
  return value.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)
}

function styleObjectToString(style: CSSProperties) {
  return Object.entries(style)
    .filter(([, value]) => value !== null && value !== undefined && value !== "")
    .map(([key, value]) => `${camelToKebab(key)}:${String(value)}`)
    .join(";")
}

function serializeNode(node: unknown): string {
  if (node === null || node === undefined || typeof node === "boolean") return ""

  if (typeof node === "string" || typeof node === "number") {
    return escapeText(String(node))
  }

  if (Array.isArray(node)) {
    return node.map((child) => serializeNode(child)).join("")
  }

  if (typeof node !== "object" || !("type" in node) || !("props" in node)) {
    return ""
  }

  const element = node as {
    type: string | ProjectIcon | symbol
    props: Record<string, unknown>
  }

  if (typeof element.type === "function") {
    return serializeNode(element.type(element.props as SVGProps<SVGSVGElement>))
  }

  if (typeof element.type !== "string") {
    return serializeNode(element.props.children)
  }

  const tagName = element.type
  const props = element.props ?? {}
  const attributes: string[] = []

  if (tagName === "svg") {
    attributes.push('xmlns="http://www.w3.org/2000/svg"')
  }

  for (const [key, value] of Object.entries(props)) {
    if (
      key === "children" ||
      key === "dangerouslySetInnerHTML" ||
      key === "key" ||
      key === "ref" ||
      value === null ||
      value === undefined ||
      typeof value === "function"
    ) {
      continue
    }

    if (key === "style" && typeof value === "object") {
      const styleString = styleObjectToString(value as CSSProperties)
      if (styleString) {
        attributes.push(`style="${escapeAttribute(styleString)}"`)
      }
      continue
    }

    if (typeof value === "boolean") {
      if (value) {
        attributes.push(ATTRIBUTE_NAME_MAP[key] ?? key)
      }
      continue
    }

    const attributeName = ATTRIBUTE_NAME_MAP[key] ?? key
    attributes.push(`${attributeName}="${escapeAttribute(String(value))}"`)
  }

  return `<${tagName}${attributes.length > 0 ? ` ${attributes.join(" ")}` : ""}>${serializeNode(
    props.children
  )}</${tagName}>`
}

function getViewBoxSize(svgMarkup: string, fallbackSize: number) {
  const viewBoxMatch = svgMarkup.match(/viewBox="([^"]+)"/i)
  if (!viewBoxMatch) {
    return { height: fallbackSize, width: fallbackSize }
  }

  const [, viewBox] = viewBoxMatch
  const values = viewBox
    .trim()
    .split(/[\s,]+/)
    .map((value) => Number(value))

  if (values.length !== 4 || values.some((value) => Number.isNaN(value))) {
    return { height: fallbackSize, width: fallbackSize }
  }

  const [, , width, height] = values

  if (width <= 0 || height <= 0) {
    return { height: fallbackSize, width: fallbackSize }
  }

  return { height, width }
}

function getCanvasSize(svgMarkup: string, sampleSize: number) {
  const { height, width } = getViewBoxSize(svgMarkup, sampleSize)
  const aspectRatio = width / height

  if (aspectRatio >= 1) {
    return {
      height: Math.max(1, Math.round(sampleSize / aspectRatio)),
      width: sampleSize,
    }
  }

  return {
    height: sampleSize,
    width: Math.max(1, Math.round(sampleSize * aspectRatio)),
  }
}

function withExplicitSvgSize(svgMarkup: string, width: number, height: number) {
  if (/\swidth=/.test(svgMarkup) || /\sheight=/.test(svgMarkup)) {
    return svgMarkup
  }

  return svgMarkup.replace("<svg", `<svg width="${width}" height="${height}"`)
}

function quantizeChannel(channel: number, step: number) {
  const quantized = Math.round(channel / step) * step
  return Math.max(0, Math.min(255, quantized))
}

function rgbToHex(red: number, green: number, blue: number) {
  return `#${[red, green, blue].map((channel) => channel.toString(16).padStart(2, "0")).join("")}`
}

async function loadSvgImage(svgMarkup: string): Promise<HTMLImageElement> {
  const svgBlob = new Blob([svgMarkup], { type: "image/svg+xml;charset=utf-8" })
  const objectUrl = URL.createObjectURL(svgBlob)

  try {
    const image = new Image()
    image.decoding = "async"

    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve()
      image.onerror = () => reject(new Error("Unable to load SVG into an image."))
      image.src = objectUrl
    })

    return image
  } finally {
    URL.revokeObjectURL(objectUrl)
  }
}

export async function resolvePrimaryColor(icon: ProjectIcon, options?: PrimaryColorOptions) {
  const resolvedOptions = resolveOptions(options)
  const optionsKey = getOptionsKey(resolvedOptions)
  const cachedColor = getCachedColor(icon, optionsKey)

  if (cachedColor) {
    return cachedColor
  }

  const pendingColor = getPendingColor(icon, optionsKey)
  if (pendingColor) {
    return pendingColor
  }

  const promise = (async () => {
    const iconElement = icon({})
    const serializedSvgMarkup = serializeNode(iconElement)

    if (!serializedSvgMarkup.startsWith("<svg")) {
      throw new Error("getPrimaryColor() expects an SVG icon component.")
    }

    const { height, width } = getCanvasSize(serializedSvgMarkup, resolvedOptions.sampleSize)
    const svgMarkup = withExplicitSvgSize(serializedSvgMarkup, width, height)
    const image = await loadSvgImage(svgMarkup)
    const canvas = document.createElement("canvas")
    canvas.width = width
    canvas.height = height

    const context = canvas.getContext("2d", { willReadFrequently: true })
    if (!context) {
      throw new Error("Canvas 2D context is not available in this browser.")
    }

    context.clearRect(0, 0, width, height)
    context.drawImage(image, 0, 0, width, height)

    const imageData = context.getImageData(0, 0, width, height).data
    const colorWeights = new Map<string, number>()

    for (let index = 0; index < imageData.length; index += 4) {
      const alpha = imageData[index + 3]

      if (alpha < resolvedOptions.alphaThreshold) {
        continue
      }

      const red = quantizeChannel(imageData[index], resolvedOptions.quantizeStep)
      const green = quantizeChannel(imageData[index + 1], resolvedOptions.quantizeStep)
      const blue = quantizeChannel(imageData[index + 2], resolvedOptions.quantizeStep)
      const key = `${red},${green},${blue}`
      const weight = alpha / 255

      colorWeights.set(key, (colorWeights.get(key) ?? 0) + weight)
    }

    let dominantKey = ""
    let dominantWeight = -1

    for (const [key, weight] of colorWeights.entries()) {
      if (weight > dominantWeight) {
        dominantKey = key
        dominantWeight = weight
      }
    }

    const [red = 0, green = 0, blue = 0] = dominantKey.split(",").map(Number)
    const dominantColor = rgbToHex(red, green, blue)
    setCachedColor(icon, optionsKey, dominantColor)
    return dominantColor
  })()

  setPendingColor(icon, optionsKey, promise)

  try {
    return await promise
  } finally {
    clearPendingColor(icon, optionsKey)
  }
}

export function getPrimaryColor(icon: ProjectIcon, options?: PrimaryColorOptions) {
  const resolvedOptions = resolveOptions(options)
  const optionsKey = getOptionsKey(resolvedOptions)
  const [color, setColor] = useState<string | null>(() => getCachedColor(icon, optionsKey))

  useEffect(() => {
    const cachedColor = getCachedColor(icon, optionsKey)
    if (cachedColor) {
      setColor(cachedColor)
      return
    }

    let cancelled = false
    setColor(null)

    resolvePrimaryColor(icon, resolvedOptions)
      .then((resolvedColor) => {
        if (!cancelled) {
          setColor(resolvedColor)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setColor(null)
        }
      })

    return () => {
      cancelled = true
    }
  }, [
    icon,
    optionsKey,
    resolvedOptions.alphaThreshold,
    resolvedOptions.quantizeStep,
    resolvedOptions.sampleSize,
  ])

  return color
}
