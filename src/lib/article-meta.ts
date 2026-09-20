const BASE_URL = "https://ssr.bartoszbak.org"
const CANONICAL_URL = "https://bartoszbak.org"

export function articleMeta(title: string, href: string) {
  return {
    title: `${title} - Bartosz Bak`,
    description: `${title} – by Bartosz Bak`,
    ogTitle: title,
    ogDescription: `${title} – by Bartosz Bak`,
    ogUrl: `${CANONICAL_URL}${href}`,
    ogImageUrl: `${BASE_URL}/api/og?title=${encodeURIComponent(title)}`,
  }
}
