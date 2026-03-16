import { familyDrawerArticle, familyDrawerHref } from "@/app/writing/family-drawer/article"
import { oldPhoneOtpApiArticle, oldPhoneOtpApiHref } from "@/app/writing/otp-api/article"

export type ArticleData = {
  title: string
  date: string
  href: string
  disabled?: boolean
}

export const articles: ArticleData[] = [
  {
    title: familyDrawerArticle.title,
    date: familyDrawerArticle.date,
    href: familyDrawerHref,
  },
  {
    title: oldPhoneOtpApiArticle.title,
    date: oldPhoneOtpApiArticle.date,
    href: oldPhoneOtpApiHref,
  },
]
