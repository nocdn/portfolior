export const initialCode = `"use client"

import { AnimatePresence, motion } from "motion/react"
import { useMemo, useState } from "react"
import useMeasure from "react-use-measure"

export const InitialDrawer = () => {
  const [view, setView] = useState(0)
  const [elementRef, bounds] = useMeasure()

  const options = [
    <div className="flex flex-col gap-2" key={0}>
      <p className="text-sm font-medium text-[#222222]">Private Key</p>
      <p className="text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates dolorem fugit
        consequatur sint necessitatibus natus deserunt? Impedit deleniti libero necessitatibus, fuga
        officiis autem consectetur.
      </p>
      <button
        className="mt-2 cursor-pointer rounded-xl border border-gray-200 px-4 py-2 text-sm transition-transform active:scale-95"
        onClick={() => setView((currentView) => (currentView + 1) % options.length)}
      >
        Show Recovery Phrase
      </button>
    </div>,
    <div className="flex flex-col gap-2" key={1}>
      <p className="text-sm font-medium text-[#222222]">Secret Recovery Phrase</p>
      <p className="text-sm">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid sint molestiae maxime
        harum ea nisi corporis a eligendi dolor illo eveniet doloremque aperiam est, ratione et
        officia consequuntur, atque error aut! Magni accusantium deleniti, eius laboriosam nihil
        sunt. Corporis iusto doloremque ex explicabo commodi earum, nobis.
      </p>
      <button
        className="mt-2 cursor-pointer rounded-xl border border-gray-200 px-4 py-2 text-sm transition-transform active:scale-95"
        onClick={() => setView((currentView) => (currentView + 1) % options.length)}
      >
        Show Private Key
      </button>
    </div>,
  ]

  const content = useMemo(() => {
    return options[view]
  }, [options, view])

  return (
    <motion.div
      animate={{ height: bounds.height }}
      transition={{
        type: "tween",
        ease: [0.26, 1, 0.5, 1],
        bounce: 0,
        duration: 0.27,
      }}
      className="border-shadow mt-auto max-w-80 overflow-hidden rounded-4xl"
    >
      <div className="px-6 pt-6 pb-6 antialiased" ref={elementRef}>
        <AnimatePresence initial={false} mode="popLayout" custom={view}>
          <motion.div
            initial={{ opacity: 0, scale: 0.96, filter: "blur(2px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0)" }}
            exit={{
              opacity: 0,
              scale: 0.96,
              filter: "blur(2px)",
              transition: {
                opacity: { duration: 0.19, ease: [0.26, 0.08, 0.25, 1] },
                default: { duration: 0.27, ease: [0.26, 0.08, 0.25, 1] },
              },
            }}
            key={view}
            transition={{
              duration: 0.27,
              ease: [0.26, 0.08, 0.25, 1],
            }}
          >
            {content}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}`

export const finishedCode = `"use client"

import {
  Ban,
  FileKey2,
  Lock,
  NotepadText,
  RectangleEllipsis,
  ScanFace,
  ShieldCheck,
  TriangleAlert,
  X,
} from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useMemo, useState } from "react"
import useMeasure from "react-use-measure"

// InitialView Component
function InitialView({
  onViewKey,
  onViewRecovery,
}: {
  onViewKey: () => void
  onViewRecovery: () => void
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="mb-4 flex items-center justify-between px-1 text-[19px] font-semibold">
        <p>Options</p>
        <div className="grid cursor-pointer place-content-center rounded-full bg-[#f7f8f9] p-2 transition-transform duration-150 active:scale-85">
          <X size={16} strokeWidth={4} color="#999" />
        </div>
      </div>
      <div className="mb-3 h-px w-full bg-[#f7f7f7]"></div>
      <div className="flex flex-col gap-3 font-semibold">
        <button
          className="flex h-12 cursor-pointer items-center gap-[15px] rounded-2xl border-none bg-[#f7f8f9] pl-4 text-[17px] font-semibold transition-transform duration-150 outline-none active:scale-95"
          onClick={onViewKey}
        >
          <Lock size={18} strokeWidth={2.65} color="#999" />
          View Private Key
        </button>
        <button
          className="flex h-12 cursor-pointer items-center gap-[15px] rounded-2xl border-none bg-[#f7f8f9] pl-4 text-[17px] font-semibold transition-transform duration-150 outline-none active:scale-95"
          onClick={onViewRecovery}
        >
          <NotepadText size={18} strokeWidth={2} color="#999" />
          View Recovery Phrase
        </button>
        <button
          className="flex h-12 cursor-pointer items-center gap-[15px] rounded-2xl border-none bg-[#fff0f0] pl-4 text-[17px] font-semibold text-red-500 transition-transform duration-150 outline-none active:scale-95"
          onClick={() => {}}
        >
          <TriangleAlert size={18} strokeWidth={2} color="red" />
          Remove Wallet
        </button>
      </div>
    </div>
  )
}

// KeyView Component
function KeyView({ onCancel }: { onCancel: () => void; onReveal: () => void }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="mb-2 flex items-center justify-between text-[19px] font-semibold">
        <FileKey2 size={34} color="#999" className="translate-y-[3px]" />
        <div
          className="grid cursor-pointer place-content-center rounded-full bg-[#f7f8f9] p-2 transition-transform duration-150 active:scale-85"
          onClick={onCancel}
        >
          <X size={16} strokeWidth={4} color="#999" />
        </div>
      </div>
      <p className="my-2 flex items-center justify-between text-[22px] font-semibold">
        Private Key
      </p>
      <p className="my-[2px] mb-[17px] text-[17px] font-medium text-[#999999]">
        Your Private Key is the key used to back up your wallet. Keep it secret and secure at all
        times.
      </p>
      <div className="mb-1 h-px w-full bg-[#f7f7f7]"></div>
      <ul className="mt-0 mb-4 flex list-none flex-col p-0">
        <li className="flex items-center gap-3 text-[15px] font-semibold text-[#999999]">
          <ShieldCheck size={24} color="#999" />
          <p className="my-1.75">Keep your private key safe</p>
        </li>
        <li className="flex items-center gap-3 text-[15px] font-semibold text-[#999999]">
          <RectangleEllipsis size={24} color="#999" />
          <p className="my-1.75">Don't share it with anyone else</p>
        </li>
        <li className="flex items-center gap-3 text-[15px] font-semibold text-[#999999]">
          <Ban size={24} color="#999" />
          <p className="my-1.75">If you loose it, we can't recover it</p>
        </li>
      </ul>
      <div className="flex w-full items-center gap-3">
        <button
          className="flex h-12 w-full cursor-pointer items-center justify-center rounded-full border-none bg-[#f0f2f4] text-[19px] font-semibold text-[#222222] transition-transform duration-150 outline-none active:scale-95"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="flex h-12 w-full cursor-pointer items-center justify-center gap-[9px] rounded-full border-none bg-[#4dafff] text-[19px] font-semibold text-white transition-transform duration-150 outline-none active:scale-95"
          onClick={onCancel}
        >
          <ScanFace size={20} strokeWidth={2.25} />
          Reveal
        </button>
      </div>
    </div>
  )
}

// RecoveryView Component
function RecoveryView({ onCancel }: { onCancel: () => void; onReveal: () => void }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="mb-2 flex items-center justify-between text-[19px] font-semibold">
        <FileKey2 size={34} color="#999" className="translate-y-[3px]" />
        <div
          className="grid cursor-pointer place-content-center rounded-full bg-[#f7f8f9] p-2 transition-transform duration-150 active:scale-85"
          onClick={onCancel}
        >
          <X size={16} strokeWidth={4} color="#999" />
        </div>
      </div>
      <p className="my-2 flex items-center justify-between text-[22px] font-semibold">
        Secret Recovery Phrase
      </p>
      <p className="my-[2px] mb-[17px] text-[17px] font-medium text-[#999999]">
        Your Secret Recovery Phrase is the key used to back up your wallet. Keep it secret at all
        times.
      </p>
      <div className="mb-1 h-px w-full bg-[#f7f7f7]"></div>
      <ul className="mt-0 mb-4 flex list-none flex-col p-0">
        <li className="flex items-center gap-3 text-[15px] font-semibold text-[#999999]">
          <ShieldCheck size={24} color="#999" />
          <p className="my-1.75">Keep your private key safe</p>
        </li>
        <li className="flex items-center gap-3 text-[15px] font-semibold text-[#999999]">
          <RectangleEllipsis size={24} color="#999" />
          <p className="my-1.75">Don't share it with anyone else</p>
        </li>
        <li className="flex items-center gap-3 text-[15px] font-semibold text-[#999999]">
          <Ban size={24} color="#999" />
          <p className="my-1.75">If you loose it, we can't recover it</p>
        </li>
      </ul>
      <div className="flex w-full items-center gap-3">
        <button
          className="flex h-12 w-full cursor-pointer items-center justify-center rounded-full border-none bg-[#f0f2f4] text-[19px] font-semibold text-[#222222] transition-transform duration-150 outline-none active:scale-95"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="flex h-12 w-full cursor-pointer items-center justify-center gap-[9px] rounded-full border-none bg-[#4dafff] text-[19px] font-semibold text-white transition-transform duration-150 outline-none active:scale-95"
          onClick={onCancel}
        >
          <ScanFace size={20} strokeWidth={2.25} />
          Reveal
        </button>
      </div>
    </div>
  )
}

// Main Component
export const FinishedDrawer = () => {
  const [view, setView] = useState(0)
  const [elementRef, bounds] = useMeasure()

  const options = [
    <InitialView key={0} onViewKey={() => setView(1)} onViewRecovery={() => setView(2)} />,
    <KeyView key={1} onCancel={() => setView(0)} onReveal={() => setView(0)} />,
    <RecoveryView key={2} onCancel={() => setView(0)} onReveal={() => setView(0)} />,
  ]

  const content = useMemo(() => {
    return options[view]
  }, [options, view])

  return (
    <motion.div
      animate={{ height: bounds.height }}
      transition={{
        type: "tween",
        ease: [0.26, 1, 0.5, 1],
        bounce: 0,
        duration: 0.27,
      }}
      className="w-[360px] overflow-hidden rounded-[2rem] border border-gray-200 bg-white"
    >
      <div className="p-6" ref={elementRef}>
        <AnimatePresence initial={false} mode="popLayout" custom={view}>
          <motion.div
            initial={{ opacity: 0, scale: 0.96, filter: "blur(2px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0)" }}
            exit={{
              opacity: 0,
              scale: 0.96,
              filter: "blur(2px)",
              transition: {
                opacity: { duration: 0.19, ease: [0.26, 0.08, 0.25, 1] },
                default: { duration: 0.27, ease: [0.26, 0.08, 0.25, 1] },
              },
            }}
            key={view}
            transition={{
              duration: 0.27,
              ease: [0.26, 0.08, 0.25, 1],
            }}
          >
            {content}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}`
