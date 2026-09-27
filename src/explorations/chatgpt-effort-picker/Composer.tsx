import { memo, useLayoutEffect, useRef, type MouseEvent } from "react"

import { MicrophoneIcon, PlusIcon, VoiceIcon } from "./icons"
import { ModelPicker } from "./ModelPicker"

const PLACEHOLDER = "Work on anything"

const composerButton =
  "relative z-0 flex h-9 min-w-9 cursor-pointer items-center justify-center rounded-full text-[13px] leading-[calc(1/0.85)] whitespace-nowrap text-[#0d0d0d] select-none " +
  "hover:bg-black/5 active:bg-black/5 [@media(hover:none)]:bg-black/5"

export function Composer() {
  const focusEditor = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement
    if (target.closest("button, a")) return
    const editor = event.currentTarget.querySelector<HTMLElement>("[data-composer-editor]")
    if (editor && target !== editor && !editor.contains(target)) editor.focus()
  }

  return (
    <div className="w-full px-4">
      <div className="mx-auto max-w-[40rem]">
        <form
          autoComplete="off"
          className="relative z-1 w-full text-[14px] leading-[1.5]"
          onSubmit={(event) => event.preventDefault()}
        >
          <div
            className={
              "cursor-text overflow-clip rounded-[28px] bg-white bg-clip-padding [contain:inline-size] [corner-shape:superellipse(1.1)] " +
              "shadow-[0_0_0_1px_#0000000a,0_2px_8px_0_#0000000a,0px_4px_80px_8px_#00000006] motion-safe:transition-colors motion-safe:duration-200 " +
              "max-sm:shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_2px_8px_0_rgba(0,0,0,0.04),0px_4px_40px_8px_rgba(0,0,0,0.025)]"
            }
            onMouseDown={focusEditor}
          >
            <div className="grid min-h-0 min-w-0 flex-1 grid-cols-[auto_1fr_auto] px-2 py-[9px] text-[14px] leading-[1.5] [grid-template-areas:'header_header_header'_'primary_primary_primary'_'leading_footer_trailing']">
              <div className="self-center [grid-area:leading]">
                <span className="flex">
                  <button type="button" className={composerButton} aria-label="Add files and more">
                    <PlusIcon className="size-5 shrink-0" />
                  </button>
                </span>
              </div>
              <div className="-mt-2.5 flex min-h-[calc(2rem+2*1.625rem)] items-stretch overflow-x-hidden px-2.5 [grid-area:primary]">
                <div className="ep-scroll-fade max-h-[max(30svh,5rem)] min-h-0 flex-1 scroll-py-4 overflow-auto text-[#0d0d0d] [scrollbar-width:thin]">
                  <PromptEditor />
                </div>
              </div>
              <div className="flex items-center gap-1 [grid-area:trailing]">
                <div className="relative ms-1 flex items-center gap-1.5">
                  <ModelPicker />
                </div>
                <div className="ms-auto flex items-center gap-2">
                  <span className="inline-flex">
                    <button
                      type="button"
                      aria-label="Start dictation"
                      className={`${composerButton} min-h-9 w-9 after:absolute after:inset-y-0 after:-inset-x-1 after:content-['']`}
                    >
                      <MicrophoneIcon className="size-5 shrink-0" />
                    </button>
                  </span>
                  <div className="inline-flex">
                    <button
                      type="button"
                      aria-label="Start Voice"
                      className="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-black text-white transition-colors duration-100 after:absolute after:inset-y-0 after:-inset-x-1 after:content-[''] hover:opacity-70"
                    >
                      <VoiceIcon className="size-5 shrink-0" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

// Uncontrolled on purpose: React re-rendering a contentEditable wipes what the user typed.
const PromptEditor = memo(function PromptEditor() {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const editor = ref.current
    if (!editor || editor.childElementCount > 0) return
    editor.innerHTML = `<p dir="auto" class="ep-placeholder" data-placeholder="${PLACEHOLDER}"><br></p>`
  }, [])

  const syncPlaceholder = () => {
    const editor = ref.current
    const paragraph = editor?.querySelector("p")
    if (!editor || !paragraph) return
    const empty = (editor.textContent ?? "").replace(/\u200b/g, "").trim().length === 0
    paragraph.classList.toggle("ep-placeholder", empty)
    if (empty) paragraph.setAttribute("data-placeholder", PLACEHOLDER)
    else paragraph.removeAttribute("data-placeholder")
  }

  return (
    <div
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      data-composer-editor=""
      role="textbox"
      aria-multiline="true"
      aria-label="Chat with ChatGPT"
      autoCorrect="on"
      autoCapitalize="sentences"
      spellCheck
      translate="no"
      className="ep-editor mt-4 -translate-y-[0.5px] px-0 pt-0 pb-4 text-[16px] leading-[26px] font-normal break-words whitespace-break-spaces outline-none [font-feature-settings:'liga'_0] [font-variant-ligatures:none]"
      onInput={syncPlaceholder}
    />
  )
})
