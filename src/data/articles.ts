import { familyDrawerArticle, familyDrawerHref } from "@/articles/family-drawer/article"
import { oldPhoneOtpApiArticle, oldPhoneOtpApiHref } from "@/articles/otp-api/article"

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
