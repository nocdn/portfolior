"use client"

import { Check, Copy, ExternalLink } from "lucide-react"
import { useState } from "react"
import { SectionMobile } from "./Section"

const contactItems = [
  {
    title: "Email",
    href: "mailto:contact@bartoszbak.org",
    value: "contact@bartoszbak.org",
    action: "Copy" as const,
  },
  {
    title: "Twitter",
    href: "https://x.com/nocdns",
    action: "Visit" as const,
  },
  {
    title: "GitHub",
    href: "https://github.com/nocdn",
    action: "Visit" as const,
  },
]

export function ContactMobile() {
  const [copied, setCopied] = useState(false)

  const handleEmailCopy = () => {
    navigator.clipboard.writeText("contact@bartoszbak.org")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <SectionMobile id="contact" title="CONTACT">
      <div className="flex flex-col gap-4">
        {contactItems.map((item) => {
          if (item.action === "Copy") {
            return (
              <button
                key={item.title}
                onClick={handleEmailCopy}
                className="flex items-center justify-between gap-4"
              >
                <p className="flex-nowrap text-[17px] whitespace-nowrap">{item.title}</p>
                <div className="h-0.25 w-full bg-gray-200 dark:bg-white/10"></div>
                <div className="flex items-center gap-1">
                  <p
                    className={`font-inter text-[16px] font-[530] ${copied ? "text-blue-600 dark:text-blue-400" : "text-gray-500/90 dark:text-gray-400/90"}`}
                  >
                    {copied ? "Copied" : item.action}
                  </p>
                  {copied ? (
                    <Check
                      className="mr-[1.5px] ml-1.5 h-3.5 w-3.5 text-blue-600 dark:text-blue-400"
                      strokeWidth={2.75}
                    />
                  ) : (
                    <Copy
                      className="mr-[1.5px] ml-1.5 h-3.5 w-3.5 text-gray-500/90 dark:text-gray-400/90"
                      strokeWidth={2.75}
                    />
                  )}
                </div>
              </button>
            )
          }

          return (
            <a
              key={item.title}
              className="flex items-center justify-between gap-4"
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="flex-nowrap text-[17px] whitespace-nowrap">{item.title}</p>
              <div className="h-0.25 w-full bg-gray-200 dark:bg-white/10"></div>
              <div className="flex items-center gap-1">
                <p className="font-inter text-[16px] font-[530] text-gray-500/90 dark:text-gray-400/90">{item.action}</p>
                <ExternalLink className="ml-1.5 h-3.5 w-3.5 text-gray-500/90 dark:text-gray-400/90" strokeWidth={2.75} />
              </div>
            </a>
          )
        })}
      </div>
      <p className="mt-4 font-sans text-[15.5px] text-gray-500 dark:text-gray-400">Thanks for visiting!</p>
    </SectionMobile>
  )
}
