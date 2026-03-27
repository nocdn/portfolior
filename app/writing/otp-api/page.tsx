import { ArticleHeading } from "@/components/ArticleHeading"
import { articleMetadata } from "@/lib/article-metadata"
import { cacheLife } from "next/cache"
import { oldPhoneOtpApiArticle, oldPhoneOtpApiHref } from "./article"

export const metadata = articleMetadata(oldPhoneOtpApiArticle.title, oldPhoneOtpApiHref)

export default async function OldPhoneOtpApiPage() {
  "use cache"
  cacheLife("max")

  return (
    <div className="p:max-w-2xl flex flex-col gap-5 px-5 md:px-0">
      <ArticleHeading
        title={oldPhoneOtpApiArticle.title}
        date={oldPhoneOtpApiArticle.date}
        href={oldPhoneOtpApiHref}
      />
      <p className="text-paragraph">
        I'm a big fan of not giving out my phone number for some random service I've used once. Yet
        my phone only has one SIM slot.
      </p>
      <p className="text-paragraph">
        This is where my trusty, 11 year-old phone comes into play. With an increbible 5.74 GB of
        internal storage, and an <span className="italic">entire</span> gigabyte of RAM, I figured
        why not use it to run an OTP server? (I had a sim card handy, so that was what we were going
        to use).
      </p>
      <p className="text-paragraph">
        I'm comfortable with TypeScript APIs, but the problem arises with the fact that I have never
        written a native Android app before - especially for Android 6.0.0 (released September
        2015). Thankfully, sillicon valley's golden child - OpenAI, had{" "}
        <a
          href="https://openai.com/index/introducing-gpt-5-4/"
          className="article-underline"
          target="_blank"
        >
          just released GPT-5.4
        </a>
        , so I decided to take it for a spin.
      </p>
      <p className="text-paragraph">
        The rough idea is simple: keep the device permanently online, push a quick POST request on
        incoming SMS messages, and make it accessible as an API without having to manually check the
        phone each time.
      </p>
      <p className="text-paragraph">
        I decided to first write the backend, and then have the model write the app around that.
      </p>
      {/* <p className="text-paragraph opacity-50">
        [here goes a diagram explaining all the endpoints]
      </p> */}
      <p className="text-paragraph">
        Of course, we also needed a suitable database to store the messages. I used Neon's
        serverless Postgres (since I was familiar) with this schema:
      </p>
      {/* <p className="text-paragraph opacity-50">
        [and another diagram of a nice looking table showing the db schema]
      </p> */}

      <p className="text-paragraph">
        So next, we have to tackle the mobile app. With the spec of the API, and some extra
        instructions, Codex guided me through creating a new Android Studio project, and wrote about
        90% of the code needed to make it work. Some small UI and UX refinements later and we had a
        working app, that I could compile and sideload straight into the phone.
      </p>
      <p className="text-paragraph">
        I added the backend URL, saved it and the light was green so to say.
      </p>
      <p className="text-paragraph opacity-50">The rest of the article coming soon :)</p>
    </div>
  )
}
