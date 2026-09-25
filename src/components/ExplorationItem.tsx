import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react"

import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
  type Variants,
} from "motion/react"
import useMeasure from "react-use-measure"

const REVERSE_DURATION_MS = 1250
const MIN_PLAYBACK_RATE = 0.0625
const MAX_PLAYBACK_RATE = 16
const DESKTOP_ZOOM_SCALE = 2
const MOBILE_ZOOM_SCALE = 1.05
const PANEL_EASE: [number, number, number, number] = [0.215, 0.61, 0.355, 1]
const FADE_IN_DURATION = 0.3
const FADE_OUT_DURATION = 0.25
const SUBTITLE_DELAY = 0.025
const MEDIA_CLASS = "border-shadow relative overflow-hidden rounded-lg"
const MEDIA_SURFACE_CLASS =
  "absolute inset-0 overflow-hidden rounded-lg bg-[var(--color-preview-bg)]"

function cubicBezier(p1x: number, p1y: number, p2x: number, p2y: number) {
  const cx = 3 * p1x
  const bx = 3 * (p2x - p1x) - cx
  const ax = 1 - cx - bx
  const cy = 3 * p1y
  const by = 3 * (p2y - p1y) - cy
  const ay = 1 - cy - by
  const sampleX = (t: number) => ((ax * t + bx) * t + cx) * t
  const sampleY = (t: number) => ((ay * t + by) * t + cy) * t
  const sampleDerivativeX = (t: number) => (3 * ax * t + 2 * bx) * t + cx
  const sampleDerivativeY = (t: number) => (3 * ay * t + 2 * by) * t + cy

  const solve = (x: number) => {
    let t = x
    for (let i = 0; i < 5; i++) {
      const dx = sampleX(t) - x
      if (Math.abs(dx) < 1e-4) return t
      const d = sampleDerivativeX(t)
      if (Math.abs(d) < 1e-4) break
      t -= dx / d
    }
    return t
  }

  return {
    value: (x: number) => sampleY(solve(x)),
    slope: (x: number) => {
      const t = solve(x)
      const dx = sampleDerivativeX(t)
      return Math.abs(dx) < 1e-4 ? 0 : sampleDerivativeY(t) / dx
    },
  }
}

const reverseEase = cubicBezier(0.215, 0.61, 0.355, 1)

// Videos that have decoded at least once this session. Survives route
// remounts (e.g. home -> article -> back), so returning never replays the
// blur-up placeholder: bytes come from HTTP cache and decode in a frame or
// two. Written from event handlers/effects only, never during render, so
// server rendering always sees an empty set (no cross-request leakage).
const readyVideos = new Set<string>()

export function ExplorationItem({
  src,
  reverseSrc,
  placeholderSrc,
  width,
  height,
  title,
  description,
  eager,
  onPreloadDone,
  expanded,
  onToggle,
}: {
  src: string
  reverseSrc: string
  placeholderSrc: string
  width: number
  height: number
  title: string
  description: ReactNode
  eager: boolean
  onPreloadDone?: () => void
  expanded: boolean
  onToggle: () => void
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const reverseVideoRef = useRef<HTMLVideoElement | null>(null)
  const itemRef = useRef<HTMLDivElement | null>(null)
  const rowRef = useRef<HTMLDivElement | null>(null)
  const rafRef = useRef(0)
  const sessionRef = useRef(0)
  const shouldPlayRef = useRef(false)
  const reversingRef = useRef(false)
  const zoomedRef = useRef(false)
  const hoverLockRef = useRef(false)
  const lockCleanupRef = useRef<(() => void) | null>(null)
  const [zoomed, setZoomed] = useState(false)
  const [isTop, setIsTop] = useState(false)
  const [reversing, setReversing] = useState(false)
  // remounts (home -> article -> back) start ready when this video decoded
  // before: safe as an initializer because the set is only ever written from
  // client-side event handlers, so SSR always sees it empty (no mismatch)
  const [shouldLoad, setShouldLoad] = useState(() => eager || readyVideos.has(src))
  const [forwardReady, setForwardReady] = useState(() => readyVideos.has(src))
  const [panelOpen, setPanelOpen] = useState(false)
  const [translation, setTranslation] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const mobilePanelId = useId()
  const [mobileContentRef, mobileBounds] = useMeasure()
  const mobileContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const updateViewport = () => setIsMobile(window.innerWidth < 768)
    updateViewport()
    window.addEventListener("resize", updateViewport)
    return () => window.removeEventListener("resize", updateViewport)
  }, [])

  const ensureMediaLoaded = useCallback(() => setShouldLoad(true), [])

  useEffect(() => {
    if (eager) ensureMediaLoaded()
  }, [eager, ensureMediaLoaded])

  useEffect(
    () => () => {
      sessionRef.current += 1
      cancelAnimationFrame(rafRef.current)
      reverseVideoRef.current?.pause()
      lockCleanupRef.current?.()
      lockCleanupRef.current = null
      hoverLockRef.current = false
    },
    []
  )

  const playVideo = useCallback((video: HTMLVideoElement) => {
    shouldPlayRef.current = true
    cancelAnimationFrame(rafRef.current)
    if (!video.currentSrc) return
    try {
      const result = video.play()
      if (result) {
        result
          .then(() => {
            // a pause happened while play() was pending -> stay paused
            if (!shouldPlayRef.current) video.pause()
          })
          .catch(() => {})
      }
    } catch {
      // play() threw synchronously, stay paused
    }
  }, [])

  const handleCanPlay = useCallback(() => {
    readyVideos.add(src)
    setForwardReady(true)
    onPreloadDone?.()
    const video = videoRef.current
    if (video && shouldPlayRef.current && video.paused) playVideo(video)
  }, [src, onPreloadDone, playVideo])

  // The first video may become ready before hydration attaches onCanPlay.
  // Checking the media element also covers a cached video after a branch
  // switch between desktop and mobile markup.
  useEffect(() => {
    const video = videoRef.current
    if (video && video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) handleCanPlay()
  }, [isMobile, shouldLoad, handleCanPlay])

  const releaseHoverLock = useCallback(() => {
    lockCleanupRef.current?.()
    lockCleanupRef.current = null
    hoverLockRef.current = false
  }, [])

  const stopReverse = useCallback((syncForward: boolean) => {
    cancelAnimationFrame(rafRef.current)
    const video = videoRef.current
    const reverseVideo = reverseVideoRef.current

    if (
      syncForward &&
      reversingRef.current &&
      video &&
      reverseVideo &&
      Number.isFinite(reverseVideo.duration)
    ) {
      video.currentTime = Math.max(reverseVideo.duration - reverseVideo.currentTime, 0)
    }

    reverseVideo?.pause()
    reversingRef.current = false
    setReversing(false)
  }, [])

  const pauseAndReverse = useCallback((video: HTMLVideoElement) => {
    const reverseVideo = reverseVideoRef.current
    const session = ++sessionRef.current
    cancelAnimationFrame(rafRef.current)
    shouldPlayRef.current = false
    video.pause()

    const from = video.currentTime
    if (!(from > 0) || !reverseVideo) {
      video.currentTime = 0
      return
    }

    const finish = () => {
      if (sessionRef.current !== session) return
      cancelAnimationFrame(rafRef.current)
      reverseVideo.pause()
      video.currentTime = 0
      reversingRef.current = false
      setReversing(false)
    }

    const prepare = () => {
      if (sessionRef.current !== session || !Number.isFinite(reverseVideo.duration)) return

      const reverseStart = Math.max(reverseVideo.duration - from, 0)
      const durationSeconds = REVERSE_DURATION_MS / 1000

      const play = () => {
        if (sessionRef.current !== session) return

        const startedAt = performance.now()
        reversingRef.current = true
        setReversing(true)
        reverseVideo.addEventListener("ended", finish, { once: true })

        const step = (now: number) => {
          if (sessionRef.current !== session) return
          const progress = Math.min((now - startedAt) / REVERSE_DURATION_MS, 1)
          if (progress >= 1) {
            finish()
            return
          }

          const expectedTime = reverseStart + from * reverseEase.value(progress)
          const idealRate = (from / durationSeconds) * reverseEase.slope(progress)
          const driftCorrection = (expectedTime - reverseVideo.currentTime) * 4
          reverseVideo.playbackRate = Math.min(
            Math.max(idealRate + driftCorrection, MIN_PLAYBACK_RATE),
            MAX_PLAYBACK_RATE
          )
          rafRef.current = requestAnimationFrame(step)
        }

        reverseVideo.playbackRate = Math.min(
          Math.max((from / durationSeconds) * reverseEase.slope(0), MIN_PLAYBACK_RATE),
          MAX_PLAYBACK_RATE
        )
        const result = reverseVideo.play()
        result?.catch(finish)
        rafRef.current = requestAnimationFrame(step)
      }

      if (Math.abs(reverseVideo.currentTime - reverseStart) < 1 / 240) {
        play()
      } else {
        reverseVideo.addEventListener("seeked", play, { once: true })
        reverseVideo.currentTime = reverseStart
      }
    }

    if (reverseVideo.readyState >= HTMLMediaElement.HAVE_METADATA) {
      prepare()
    } else {
      reverseVideo.addEventListener("loadedmetadata", prepare, { once: true })
    }
  }, [])

  const zoom = useCallback(() => {
    releaseHoverLock()
    ensureMediaLoaded()
    sessionRef.current += 1
    stopReverse(false)
    const element = itemRef.current
    if (element) {
      const elementRect = element.getBoundingClientRect()
      setTranslation({
        x: window.innerWidth / 2 - (elementRect.left + elementRect.width / 2),
        y: window.innerHeight / 2 - (elementRect.top + elementRect.height / 2),
      })
    }
    zoomedRef.current = true
    setZoomed(true)
    setIsTop(true)
    const video = videoRef.current
    // already playing from hover -> carry on seamlessly, no restart
    if (video && video.paused) playVideo(video)
  }, [ensureMediaLoaded, playVideo, releaseHoverLock, stopReverse])

  const unzoom = useCallback(
    (keepPlaying = false) => {
      releaseHoverLock()
      zoomedRef.current = false
      setZoomed(false)
      sessionRef.current += 1
      stopReverse(false)
      const video = videoRef.current
      if (!video) return
      if (keepPlaying) {
        // toggled via the video itself: play through uninterrupted, then settle
        // hover state on the next pointer activity (pause only if truly left)
        shouldPlayRef.current = true
        hoverLockRef.current = true
        const settle = () => {
          releaseHoverLock()
          const current = videoRef.current
          const overRow = rowRef.current?.matches(":hover") ?? false
          if (!overRow) {
            setPanelOpen(false)
            if (current) pauseAndReverse(current)
          }
        }
        window.addEventListener("pointermove", settle, { once: true })
        window.addEventListener("pointerdown", settle, { once: true })
        lockCleanupRef.current = () => {
          window.removeEventListener("pointermove", settle)
          window.removeEventListener("pointerdown", settle)
        }
        if (video.paused) playVideo(video)
        return
      }
      shouldPlayRef.current = false
      video.pause()
      video.currentTime = 0
      // dismissed while still hovering the row -> resume hover preview
      if (rowRef.current?.matches(":hover")) playVideo(video)
    },
    [playVideo, pauseAndReverse, releaseHoverLock, stopReverse]
  )

  useEffect(() => {
    if (!zoomed) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [zoomed])

  useEffect(() => {
    if (!zoomed) return
    const handleMouseDown = (event: MouseEvent) => {
      const target = event.target
      // clicks on the video itself toggle via its own handler
      if (target instanceof Node && itemRef.current?.contains(target)) return
      // let interactive elements (e.g. panel links) work normally
      if (
        target instanceof HTMLElement &&
        (target.closest("a,button,input,textarea,select,[contenteditable]") ||
          target.isContentEditable)
      ) {
        return
      }
      unzoom()
    }
    window.addEventListener("mousedown", handleMouseDown)
    return () => window.removeEventListener("mousedown", handleMouseDown)
  }, [zoomed, unzoom])

  useEffect(() => {
    if (!zoomed) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        unzoom()
        return
      }
      if (event.key === " ") {
        const target = event.target
        if (
          target instanceof HTMLElement &&
          (target.tagName === "INPUT" ||
            target.tagName === "TEXTAREA" ||
            target.tagName === "SELECT" ||
            target.tagName === "BUTTON" ||
            target.tagName === "A" ||
            target.isContentEditable)
        ) {
          return
        }
        event.preventDefault()
        const video = videoRef.current
        if (!video) return
        if (video.paused) playVideo(video)
        else {
          shouldPlayRef.current = false
          video.pause()
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [zoomed, unzoom, playVideo])

  const handleEnter = () => {
    setPanelOpen(true)
    if (zoomedRef.current) return
    ensureMediaLoaded()
    const video = videoRef.current
    if (!video) return
    sessionRef.current += 1
    stopReverse(true)
    playVideo(video)
  }

  const handleLeave = () => {
    if (zoomedRef.current || hoverLockRef.current) return
    setPanelOpen(false)
    const video = videoRef.current
    if (!video) return
    pauseAndReverse(video)
  }

  // same expand animation as the mobile projects section on the / route
  const expandTransition = prefersReducedMotion
    ? { duration: 0 }
    : { type: "tween" as const, ease: [0.26, 1, 0.5, 1] as const, duration: 0.27 }

  const handleMobileToggle = () => {
    if (expanded) {
      const video = videoRef.current
      if (video) pauseAndReverse(video)
    } else {
      ensureMediaLoaded()
      const video = videoRef.current
      if (!video) {
        onToggle()
        return
      }
      sessionRef.current += 1
      stopReverse(true)
      playVideo(video)
    }
    onToggle()
  }

  useEffect(() => {
    if (!isMobile || !expanded) return
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target
      if (!(target instanceof Node) || mobileContainerRef.current?.contains(target)) return
      onToggle()
    }
    document.addEventListener("pointerdown", handlePointerDown, true)
    return () => document.removeEventListener("pointerdown", handlePointerDown, true)
  }, [isMobile, expanded, onToggle])

  // closing from elsewhere (another item opened, outside tap) bypasses the
  // toggle handler, so reverse here too instead of stopping abruptly
  useEffect(() => {
    if (!isMobile || expanded) return
    const video = videoRef.current
    if (!video || video.paused) return
    pauseAndReverse(video)
  }, [isMobile, expanded, pauseAndReverse])

  const zoomScale = isMobile ? MOBILE_ZOOM_SCALE : DESKTOP_ZOOM_SCALE
  const mediaTransitionDuration = prefersReducedMotion ? "duration-0" : "duration-700"
  const springTransition = prefersReducedMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 300, damping: 35 }
  const fadeTransition = prefersReducedMotion ? { duration: 0 } : { duration: 0.3 }
  const fadeIn = prefersReducedMotion
    ? { duration: 0 }
    : { duration: FADE_IN_DURATION, ease: PANEL_EASE }
  const subtitleFadeIn = prefersReducedMotion
    ? { duration: 0 }
    : { duration: FADE_IN_DURATION, delay: SUBTITLE_DELAY, ease: PANEL_EASE }
  const fadeOut = prefersReducedMotion
    ? { duration: 0 }
    : { duration: FADE_OUT_DURATION, ease: PANEL_EASE }
  const panelVariants: Variants = {
    open: { opacity: 1, visibility: "visible", transition: { duration: 0 } },
    closed: { opacity: 0, transition: fadeOut, transitionEnd: { visibility: "hidden" } },
  }
  const titleVariants: Variants = {
    open: { opacity: 1, transition: fadeIn },
    closed: { opacity: 0, transition: fadeOut },
  }
  const subtitleVariants: Variants = {
    open: { opacity: 1, transition: subtitleFadeIn },
    closed: { opacity: 0, transition: fadeOut },
  }

  if (isMobile) {
    return (
      <LazyMotion features={domAnimation}>
        <div ref={mobileContainerRef} className="flex w-full flex-col">
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls={mobilePanelId}
            aria-label={`${expanded ? "Hide" : "Show"} details for ${title}`}
            onMouseDown={(event) => {
              event.preventDefault()
              event.currentTarget.blur()
              handleMobileToggle()
            }}
            onKeyDown={(event) => {
              if (event.key !== "Enter" && event.key !== " ") return
              event.preventDefault()
              handleMobileToggle()
            }}
            className="focus-visible:outline-foreground block w-full cursor-pointer text-left focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            <div
              style={{ aspectRatio: `${width} / ${height}` }}
              className={`${MEDIA_CLASS} w-full`}
            >
              <div className={MEDIA_SURFACE_CLASS}>
                <img
                  src={placeholderSrc}
                  width={width}
                  height={height}
                  alt=""
                  aria-hidden="true"
                  className={`pointer-events-none h-full w-full select-none ${forwardReady ? "hidden" : ""}`}
                />
                <video
                  ref={videoRef}
                  src={shouldLoad ? src : undefined}
                  muted
                  loop
                  playsInline
                  preload={shouldLoad ? "auto" : "none"}
                  tabIndex={-1}
                  aria-hidden="true"
                  onCanPlay={handleCanPlay}
                  onError={onPreloadDone}
                  className={`h-full w-full outline-none select-none ${reversing ? "invisible" : "visible"}`}
                />
                <video
                  ref={reverseVideoRef}
                  src={shouldLoad ? reverseSrc : undefined}
                  muted
                  playsInline
                  preload={shouldLoad ? "auto" : "none"}
                  tabIndex={-1}
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-0 h-full w-full outline-none select-none ${reversing ? "visible" : "invisible"}`}
                />
              </div>
            </div>
          </button>
          <m.div
            id={mobilePanelId}
            initial={false}
            animate={{
              height: expanded ? mobileBounds.height : 0,
              opacity: expanded ? 1 : 0,
            }}
            transition={expandTransition}
            className="overflow-hidden"
            aria-hidden={!expanded}
          >
            <div ref={mobileContentRef} inert={!expanded} className="pt-3 pb-1">
              <p className="text-foreground font-medium">{title}</p>
              <p className="text-muted-foreground mt-1">{description}</p>
            </div>
          </m.div>
        </div>
      </LazyMotion>
    )
  }

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {zoomed && (
          <m.div
            role="presentation"
            aria-hidden="true"
            initial={{ opacity: 0, backdropFilter: isMobile ? "blur(0px)" : "none" }}
            animate={{ opacity: 1, backdropFilter: isMobile ? "blur(1px)" : "none" }}
            exit={{ opacity: 0, backdropFilter: isMobile ? "blur(0px)" : "none" }}
            transition={fadeTransition}
            className="pointer-events-none fixed inset-0 z-50 bg-black/60"
          />
        )}
      </AnimatePresence>

      <div
        ref={rowRef}
        className="flex items-start gap-6"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <m.div
          ref={itemRef}
          style={{ width: width / 2, maxWidth: "100%", aspectRatio: `${width} / ${height}` }}
          animate={{
            scale: zoomed ? zoomScale : 1,
            x: zoomed ? translation.x : 0,
            y: zoomed ? translation.y : 0,
          }}
          transition={springTransition}
          onAnimationComplete={() => {
            // keep elevated z-index until the return flight settles,
            // so the video never clips behind its siblings mid-animation
            if (!zoomedRef.current) setIsTop(false)
          }}
          className={`${MEDIA_CLASS} ${isTop ? "z-100" : "z-10"} ${zoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}
          onClick={(event) => {
            event.stopPropagation()
            if (zoomed) unzoom(true)
            else zoom()
          }}
        >
          <div className={MEDIA_SURFACE_CLASS}>
            <img
              src={placeholderSrc}
              width={width}
              height={height}
              alt=""
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 h-full w-full transition-[opacity,filter,transform] select-none ${mediaTransitionDuration} ease-[cubic-bezier(0.215,0.61,0.355,1)] ${forwardReady ? "blur-0 scale-100 opacity-0" : "scale-110 opacity-100 blur-[12px]"}`}
            />
            <video
              ref={videoRef}
              src={shouldLoad ? src : undefined}
              muted
              loop
              playsInline
              preload={shouldLoad ? "auto" : "none"}
              tabIndex={-1}
              onCanPlay={handleCanPlay}
              onError={onPreloadDone}
              className={`pointer-events-none absolute inset-0 h-full w-full transition-[opacity,filter] outline-none select-none ${mediaTransitionDuration} ease-[cubic-bezier(0.215,0.61,0.355,1)] ${reversing ? "invisible" : "visible"} ${forwardReady ? "blur-0 opacity-100" : "opacity-0 blur-[12px]"}`}
            />
            <video
              ref={reverseVideoRef}
              src={shouldLoad ? reverseSrc : undefined}
              muted
              playsInline
              preload={shouldLoad ? "auto" : "none"}
              tabIndex={-1}
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 h-full w-full outline-none select-none ${reversing ? "visible" : "invisible"}`}
            />
          </div>
        </m.div>
        <m.div
          initial={false}
          animate={panelOpen ? "open" : "closed"}
          variants={panelVariants}
          className="invisible relative z-0"
        >
          <div className="w-64">
            <m.p variants={titleVariants} className="text-foreground font-medium opacity-0">
              {title}
            </m.p>
            <m.p variants={subtitleVariants} className="text-muted-foreground mt-1 opacity-0">
              {description}
            </m.p>
          </div>
        </m.div>
      </div>
    </LazyMotion>
  )
}
