import { ArticleHeading } from "@/components/ArticleHeading"
import { articleMetadata } from "@/lib/article-metadata"
import { cacheLife } from "next/cache"
import { oldPhoneOtpApiArticle, oldPhoneOtpApiHref } from "./article"

export const metadata = articleMetadata(oldPhoneOtpApiArticle.title, oldPhoneOtpApiHref)

export default async function OldPhoneOtpApiPage() {
  "use cache"
  cacheLife("max")

  return (
    <div className="flex flex-col gap-5 px-5 md:px-0">
      <ArticleHeading title={oldPhoneOtpApiArticle.title} date={oldPhoneOtpApiArticle.date} />
      <p className="text-paragraph max-w-2xl">
        I'm a big fan of not giving out my phone number for some random service I've used once. Yet
        my phone only has one SIM slot.
      </p>
      <p className="text-paragraph max-w-2xl">
        This is where my trusty, 11 year-old phone comes into play. With an increbible 5.74 GB of
        internal storage, and a gigabyte of RAM, I figured why not use it to run an OTP server? (I
        had a sim card handy, so that was what we were going to use.)
      </p>
      <p className="text-paragraph max-w-2xl">
        I'm comfortable with TypeScript APIs, but the problem arises with the fact that I have never
        written a native Android app before - especially for Android 6.0.0 (released September
        2015). Thankfully, sillicon valley's golden child - OpenAI, had just released GPT-5.4, so I
        decided to take it for a spin.
      </p>
      <p className="text-paragraph max-w-2xl">
        The rough idea is simple: keep the device permanently online, push a quick POST request on
        incoming SMS messages, and make it accessible as an API without having to manually check the
        phone each time.
      </p>
      <p className="text-paragraph max-w-2xl">
        I decided to first write the backend, and then have the model write the app around that.
      </p>
      <p className="text-paragraph mt-8 max-w-2xl italic antialiased opacity-60">
        The rest of the article is coming soon...
      </p>
    </div>
  )
}
