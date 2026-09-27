import katex from "katex"
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react"
import { createPortal } from "react-dom"

import {
  BoltIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  LockIcon,
  ResetIcon,
} from "./icons"

const EFFORTS = ["Light", "Standard", "High", "Extra High", "Max"] as const
const STANDARD_INDEX = 1
const QUESTIONS: Record<number, { latex: string; answer: string }> = {
  2: { latex: String.raw`f(x)=x^{3}.\ f'(2)=`, answer: "12" },
  3: { latex: String.raw`\int_{0}^{\infty} x^{2}e^{-x}\,dx=`, answer: "2" },
  4: { latex: String.raw`\text{For a K3 surface, } h^{1,1}=`, answer: "20" },
}

const MODELS = [
  { name: "Default", description: "Recommended set of models" },
  { name: "GPT-6 Astra" },
  { name: "GPT-6 Sol" },
  { name: "GPT-6 Luna" },
  { name: "GPT-5.6 Sol" },
  { name: "GPT-5.6 Terra" },
  { name: "GPT-5.6 Luna" },
  { name: "GPT-5.5" },
]

const menuItem =
  "relative flex cursor-pointer items-center rounded-[12px] outline-none select-none focus:bg-black/4 active:bg-black/6"
const headerButton =
  "ep-header-button absolute top-0 flex size-8 min-h-8 shrink-0 translate-y-1 items-center justify-center rounded-[12px] p-0 text-[#8f8f8f] " +
  "cursor-pointer outline-none select-none focus:bg-black/4 active:bg-black/6"

type ChallengeStatus = "pending" | "wrong" | "correct"
type Challenge = { target: number; previous: number; status: ChallengeStatus }
type View = "simple" | "advanced"

function QuestionPrompt({ latex, children }: { latex: string; children: ReactNode }) {
  const html = katex.renderToString(latex, { throwOnError: false, displayMode: false })
  return (
    <p className="ep-question m-0 flex flex-wrap items-center gap-2 text-left text-[14px] leading-[1.4] text-[#0d0d0d]">
      <span dangerouslySetInnerHTML={{ __html: html }} />
      {children}
    </p>
  )
}

function answersMatch(input: string, answer: string): boolean {
  const given = input.trim().replace(/\s+/g, "").replace(",", ".")
  if (given.length === 0) return false
  if (given === answer) return true
  const left = Number(given)
  const right = Number(answer)
  return Number.isFinite(left) && Number.isFinite(right) && left === right
}

export function ModelPicker() {
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const topRef = useRef<HTMLDivElement>(null)
  const simpleRef = useRef<HTMLDivElement>(null)
  const advancedRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [view, setView] = useState<View>("simple")
  const [model, setModel] = useState("GPT-6 Sol")
  const [effort, setEffort] = useState(STANDARD_INDEX)
  const [committed, setCommitted] = useState(STANDARD_INDEX)
  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const [answer, setAnswer] = useState("")
  const [fastMode, setFastMode] = useState(false)
  const [maxNotice, setMaxNotice] = useState(false)
  const committedRef = useRef(STANDARD_INDEX)
  const settlingRef = useRef(false)
  const timersRef = useRef<number[]>([])
  const [ready, setReady] = useState(false)
  const [height, setHeight] = useState(91)
  const [anchor, setAnchor] = useState({ top: 0, left: 0 })
  const atMax = effort === EFFORTS.length - 1

  useLayoutEffect(() => {
    if (!atMax) {
      setMaxNotice(false)
      return
    }
    setMaxNotice(true)
    const id = window.setTimeout(() => setMaxNotice(false), 800)
    return () => window.clearTimeout(id)
  }, [atMax])

  const percent = (effort / (EFFORTS.length - 1)) * 100
  const offset = 13 - (percent / 50) * 13
  const position = `calc(${percent}% + ${offset}px)`

  useLayoutEffect(() => {
    if (!open) return
    const measure = () => {
      const top = topRef.current?.offsetHeight ?? 0
      const simple = simpleRef.current?.offsetHeight ?? 0
      const advanced = advancedRef.current?.offsetHeight ?? 0
      setHeight(view === "simple" ? top + simple : advanced)
    }
    measure()
    const observer = new ResizeObserver(measure)
    for (const node of [topRef.current, simpleRef.current, advancedRef.current]) {
      if (node) observer.observe(node)
    }
    const frame = requestAnimationFrame(() => setReady(true))
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [open, view])

  useLayoutEffect(() => {
    if (!open || !triggerRef.current) return
    const place = () => {
      const rect = triggerRef.current?.getBoundingClientRect()
      if (!rect) return
      setAnchor({ top: rect.bottom + 8, left: rect.left + rect.width / 2 })
    }
    place()
    window.addEventListener("resize", place)
    window.addEventListener("scroll", place, true)
    return () => {
      window.removeEventListener("resize", place)
      window.removeEventListener("scroll", place, true)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node
      if (triggerRef.current?.contains(target) || menuRef.current?.contains(target)) return
      setOpen(false)
      setView("simple")
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false)
        setView("simple")
      }
    }
    document.addEventListener("pointerdown", onPointerDown)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("pointerdown", onPointerDown)
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  const clearTimers = () => {
    for (const id of timersRef.current) window.clearTimeout(id)
    timersRef.current = []
  }

  useEffect(() => clearTimers, [])

  useEffect(() => {
    if (open) return
    clearTimers()
    settlingRef.current = false
    setEffort(committedRef.current)
    setChallenge(null)
    setAnswer("")
  }, [open])

  const moveTo = (next: number) => {
    if (settlingRef.current) return
    const clamped = Math.max(0, Math.min(EFFORTS.length - 1, next))
    setEffort(clamped)
    if (clamped <= committedRef.current) {
      clearTimers()
      setChallenge(null)
      setAnswer("")
      return
    }
    setChallenge((current) => {
      if (current?.target === clamped) return current
      setAnswer("")
      return { target: clamped, previous: committedRef.current, status: "pending" }
    })
  }

  const selectFromPointer = (clientX: number, element: HTMLElement) => {
    const rect = element.getBoundingClientRect()
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width))
    moveTo(Math.round(ratio * (EFFORTS.length - 1)))
  }

  const submitAnswer = () => {
    if (!challenge || challenge.status !== "pending") return
    const question = QUESTIONS[challenge.target]
    if (!question) return
    if (answersMatch(answer, question.answer)) {
      setChallenge({ ...challenge, status: "correct" })
      timersRef.current.push(
        window.setTimeout(() => {
          committedRef.current = challenge.target
          setCommitted(challenge.target)
          setChallenge(null)
          setAnswer("")
        }, 350)
      )
      return
    }
    settlingRef.current = true
    setChallenge({ ...challenge, status: "wrong" })
    timersRef.current.push(
      window.setTimeout(() => {
        setEffort(challenge.previous)
        setChallenge(null)
        setAnswer("")
      }, 480)
    )
    timersRef.current.push(
      window.setTimeout(() => {
        settlingRef.current = false
      }, 830)
    )
  }

  const resetToDefault = () => {
    clearTimers()
    settlingRef.current = false
    committedRef.current = STANDARD_INDEX
    setCommitted(STANDARD_INDEX)
    setEffort(STANDARD_INDEX)
    setChallenge(null)
    setAnswer("")
    setFastMode(false)
  }

  const knobLocked = effort > committed
  const question = challenge ? QUESTIONS[challenge.target] : undefined
  const simpleActive = view === "simple" ? "true" : "false"
  const advancedActive = view === "advanced" ? "true" : "false"

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={
          "relative flex h-9 cursor-pointer items-center gap-1.5 rounded-full ps-3.5 pe-3 text-[16px] leading-[26px] text-[#8f8f8f] outline-none select-none " +
          "after:absolute after:inset-y-0 after:-inset-x-1 after:content-[''] hover:bg-black/5 active:bg-black/5 data-[state=open]:bg-black/5 " +
          "[@media(hover:none)]:bg-black/5 [@media(hover:none)]:pe-3.5"
        }
        aria-haspopup="menu"
        aria-expanded={open}
        data-state={open ? "open" : "closed"}
        onClick={() => {
          setOpen((value) => !value)
          setView("simple")
        }}
      >
        <span className="max-w-[320px] truncate">
          {open ? (
            "Select effort"
          ) : (
            <span className="flex min-w-0 items-center gap-1">
              <span className="inline-flex min-w-0 items-center gap-1">
                <span className="max-w-[220px] min-w-0 shrink truncate text-[#0d0d0d]">
                  {model}
                </span>
                <span
                  className={`shrink-0 whitespace-nowrap ${atMax ? "text-[#8952ee]" : "text-[#8f8f8f]"}`}
                >
                  {EFFORTS[effort]}
                </span>
              </span>
            </span>
          )}
        </span>
        <ChevronDownIcon className="-me-0.5 size-3.5 shrink-0 text-[#8f8f8f]" />
      </button>
      {open
        ? createPortal(
            <div
              ref={menuRef}
              dir="ltr"
              style={{
                position: "fixed",
                top: anchor.top,
                left: anchor.left,
                transform: "translateX(-50%)",
                zIndex: 50,
                minWidth: "max-content",
              }}
            >
              <div
                role="menu"
                aria-orientation="vertical"
                data-state="open"
                tabIndex={-1}
                className={
                  "ep-popover ep-font z-50 max-w-xs rounded-[24px] bg-white py-2.5 text-[#0d0d0d] antialiased outline-none " +
                  "[corner-shape:superellipse(1.1)] shadow-[0_0_0_1px_#0000000a,0_2px_8px_0_#0000000a,0px_4px_80px_8px_#00000006]"
                }
              >
                <div className="flex w-[min(280px,calc(100vw-24px))] flex-col" role="group">
                  <div
                    className="ep-menu relative -my-1.5 overflow-clip"
                    data-ready={ready ? "true" : "false"}
                    style={{ height }}
                  >
                    <div className="flex h-full w-full flex-col">
                      <div
                        className="ep-motion ep-motion-top"
                        data-active={simpleActive}
                        ref={topRef}
                      >
                        <div
                          className="ep-view-controls relative mx-2 flex min-h-9 items-start justify-center gap-0 px-8"
                          data-notice={maxNotice ? "true" : "false"}
                          role="group"
                        >
                          <div
                            role="menuitem"
                            tabIndex={0}
                            aria-label="Select model"
                            className={`ep-view-toggle ${menuItem} min-h-8 min-w-0 translate-y-1 px-2 py-1 text-[16px] leading-[calc(1/0.85)] font-medium text-[#8f8f8f]`}
                            onClick={() => setView("advanced")}
                            onKeyDown={(event) => {
                              if (event.key === "Enter" || event.key === " ") {
                                event.preventDefault()
                                setView("advanced")
                              }
                            }}
                          >
                            <span className="grid min-w-0 grid-cols-[minmax(16px,1fr)_auto_minmax(16px,1fr)] items-center gap-0">
                              <span className="col-span-full row-start-2 max-w-full min-w-0 justify-self-center truncate text-[12px] leading-4 font-normal text-[#5d5d5d]">
                                {model}
                              </span>
                              <span
                                className="ep-effort-label col-start-2 row-start-1 min-w-0 shrink-0 text-center"
                                data-maximum={atMax ? "true" : "false"}
                                data-locked={effort > committed ? "true" : "false"}
                              >
                                {EFFORTS[effort]}
                              </span>
                              <ChevronRightIcon className="col-start-3 row-start-1 size-4 shrink-0 text-[#8f8f8f]" />
                            </span>
                          </div>
                          <div
                            role="menuitemcheckbox"
                            tabIndex={0}
                            aria-checked={fastMode}
                            aria-label="Enable fast mode"
                            className={`${headerButton} start-0`}
                            data-fast-mode-enabled={fastMode ? "true" : "false"}
                            data-max-slider-selection={atMax ? "true" : "false"}
                            onClick={() => setFastMode((value) => !value)}
                          >
                            <BoltIcon className="size-4 shrink-0" />
                          </div>
                          <div
                            role="menuitem"
                            tabIndex={0}
                            aria-label="Reset to default"
                            className={`${headerButton} end-0`}
                            onClick={resetToDefault}
                          >
                            <ResetIcon className="size-4 shrink-0" />
                          </div>
                          <span
                            aria-hidden="true"
                            className="ep-notice pointer-events-none absolute inset-x-0 top-0 flex h-8 translate-y-1 items-center justify-center text-[14px] leading-5 whitespace-nowrap text-[#8952ee]"
                          >
                            <span className="ep-notice-text">Consumes usage limits faster</span>
                          </span>
                        </div>
                      </div>
                      <div className="flex w-full flex-col" ref={simpleRef}>
                        <div className="ep-motion ep-motion-slider" data-active={simpleActive}>
                          <div className="pt-2 pb-1">
                            <div
                              role="menuitem"
                              tabIndex={0}
                              aria-label="Power"
                              aria-keyshortcuts="ArrowLeft ArrowRight"
                              className="relative block w-full cursor-default outline-none select-none"
                              onKeyDown={(event) => {
                                if (event.key === "ArrowRight") moveTo(effort + 1)
                                if (event.key === "ArrowLeft") moveTo(effort - 1)
                                if (event.key === "Home") moveTo(0)
                                if (event.key === "End") moveTo(EFFORTS.length - 1)
                              }}
                            >
                              <div
                                className="relative mx-1 flex h-8 flex-col justify-center px-2 py-0.5"
                                onPointerDown={(event) => {
                                  const root =
                                    event.currentTarget.querySelector<HTMLElement>(".ep-slider")
                                  if (!root) return
                                  selectFromPointer(event.clientX, root)
                                  root.setPointerCapture(event.pointerId)
                                  root.dataset.dragging = "true"
                                  const move = (next: PointerEvent) =>
                                    selectFromPointer(next.clientX, root)
                                  const up = () => {
                                    root.dataset.dragging = "false"
                                    root.removeEventListener("pointermove", move)
                                    root.removeEventListener("pointerup", up)
                                  }
                                  root.addEventListener("pointermove", move)
                                  root.addEventListener("pointerup", up)
                                }}
                              >
                                <span
                                  className="ep-slider relative flex h-7 w-full touch-none items-center"
                                  data-fast-mode={fastMode ? "true" : "false"}
                                  data-max={atMax ? "true" : "false"}
                                  data-dragging="false"
                                >
                                  <span className="relative h-6 grow self-center overflow-hidden rounded-[12px] bg-[#f3f3f3] shadow-[inset_0_0_2px_rgba(0,0,0,0.18)]">
                                    <span
                                      className="ep-slider-moving absolute start-0 h-full w-full overflow-hidden rounded-l-[12px] bg-[color(display-p3_0.227451_0.513726_0.968627)]"
                                      style={{
                                        transform: `translateX(calc(${percent - 100}% + ${offset}px))`,
                                      }}
                                    >
                                      {atMax ? (
                                        <span className="pointer-events-none absolute -inset-px z-2">
                                          <span className="ep-max-fill absolute inset-0" />
                                        </span>
                                      ) : null}
                                    </span>
                                    <div className="pointer-events-none absolute inset-0">
                                      {EFFORTS.map((label, index) => {
                                        const locked = index > committed
                                        const tickPercent = (index / (EFFORTS.length - 1)) * 100
                                        return (
                                          <span
                                            key={label}
                                            className="ep-tick pointer-events-auto absolute top-1/2 size-1 cursor-pointer rounded-full will-change-[transform,translate,opacity]"
                                            data-locked={locked ? "true" : "false"}
                                            data-selected={index <= effort ? "true" : "false"}
                                            style={{
                                              left: `calc(${tickPercent}% + ${13 - (tickPercent / 50) * 13}px)`,
                                            }}
                                          >
                                            {locked ? <LockIcon className="size-4 shrink-0" /> : null}
                                          </span>
                                        )
                                      })}
                                    </div>
                                  </span>
                                  <div
                                    className="pointer-events-none absolute inset-y-0 start-0 z-4 w-full"
                                    aria-hidden="true"
                                  >
                                    <span
                                      className="ep-slider-moving absolute top-1/2 size-7 -translate-1/2 will-change-[left]"
                                      style={{ left: position }}
                                    >
                                      <span className="absolute inset-0 z-3">
                                        <span className="absolute inset-0 flex items-center justify-center rounded-full border-[0.5px] border-[#00000026] bg-white text-black shadow-[0_0_2px_rgba(0,0,0,0.1)]">
                                          {knobLocked ? (
                                            <LockIcon className="size-3.5 shrink-0" />
                                          ) : null}
                                        </span>
                                      </span>
                                    </span>
                                  </div>
                                  <span
                                    role="slider"
                                    aria-valuemin={0}
                                    aria-valuemax={EFFORTS.length - 1}
                                    aria-valuenow={effort}
                                    aria-valuetext={`${EFFORTS[effort]}, ${effort + 1} of ${EFFORTS.length}.`}
                                    aria-orientation="horizontal"
                                    className="ep-thumb-input ep-slider-moving absolute block size-7 cursor-pointer rounded-full bg-transparent outline-0"
                                    style={{
                                      left: `calc(${percent}% - 7px)`,
                                      transform: "translateX(-50%)",
                                    }}
                                  />
                                </span>
                              </div>
                            </div>
                            {question && challenge ? (
                              <form
                                className="flex flex-col items-stretch gap-3.5 px-3.5 pt-3 pb-1.5"
                                onSubmit={(event) => {
                                  event.preventDefault()
                                  submitAnswer()
                                }}
                              >
                                <div className="flex w-full flex-col overflow-hidden rounded-[8px] bg-[oklch(0.98_0_0)] text-[14px] leading-[1.5] ring ring-[oklch(0.935_0_0)]">
                                  <div className="-my-2 flex items-center gap-2 bg-[oklch(0.98_0_0)] p-4 text-[14px] font-normal text-[oklch(0.556_0_0)]">
                                    Solve to unlock {EFFORTS[challenge.target]} effort.
                                  </div>
                                  <div className="relative flex flex-col gap-2 overflow-hidden rounded-[8px] bg-white p-4 pr-3 ring ring-[oklch(0.922_0_0)]">
                                    <QuestionPrompt latex={question.latex}>
                                      <input
                                        className="ep-answer h-[26px] w-15 flex-none rounded-[6px] border-0 bg-white p-2 text-[12px] leading-4 text-[oklch(0.205_0_0)] ring ring-[oklch(0.145_0_0/0.1)] outline-none"
                                        data-state={
                                          challenge.status === "pending"
                                            ? undefined
                                            : challenge.status
                                        }
                                        value={answer}
                                        autoFocus
                                        disabled={challenge.status !== "pending"}
                                        inputMode="decimal"
                                        aria-label="Answer"
                                        onChange={(event) => setAnswer(event.target.value)}
                                        onKeyDown={(event) => {
                                          if (event.key !== "Enter") return
                                          event.preventDefault()
                                          submitAnswer()
                                        }}
                                      />
                                    </QuestionPrompt>
                                  </div>
                                </div>
                              </form>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <div
                        className="absolute inset-x-0 top-0 flex w-full flex-col py-1.5"
                        inert={view === "simple" ? true : undefined}
                        ref={advancedRef}
                      >
                        <div className="ep-motion ep-motion-list" data-active={advancedActive}>
                          <div className="relative pt-1">
                            <div role="group" className="overflow-y-auto">
                              <div className="mx-2 truncate px-2.5 pt-0 pb-2 text-[13px] leading-[calc(1/0.85)] font-normal text-[#8f8f8f] select-none">
                                Select model
                              </div>
                              {MODELS.map((item) => {
                                const selected = item.name === model
                                return (
                                  <div
                                    key={item.name}
                                    role="menuitemradio"
                                    aria-checked={selected}
                                    tabIndex={0}
                                    className={`${menuItem} mx-2.5 min-h-9 justify-between gap-6 px-2.5 py-1.5 text-[13px] leading-[calc(1/0.85)] text-[#0d0d0d]`}
                                    data-state={selected ? "checked" : "unchecked"}
                                    onClick={() => {
                                      setModel(item.name)
                                      setView("simple")
                                    }}
                                  >
                                    <div
                                      className={
                                        item.description
                                          ? "min-w-0"
                                          : "flex min-w-0 grow items-center gap-2.5"
                                      }
                                    >
                                      <div
                                        className={
                                          item.description
                                            ? "flex min-w-0 grow items-center gap-2.5"
                                            : undefined
                                        }
                                      >
                                        <div className="truncate">{item.name}</div>
                                      </div>
                                      {item.description ? (
                                        <div className="mb-0.5 text-[12px] leading-4 whitespace-normal text-[#8f8f8f]">
                                          {item.description}
                                        </div>
                                      ) : null}
                                    </div>
                                    <div className="flex min-w-4 shrink-0 items-center justify-center self-stretch">
                                      {selected ? (
                                        <CheckIcon className="size-4 shrink-0" />
                                      ) : (
                                        <div className="size-4 shrink-0" />
                                      )}
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  )
}
