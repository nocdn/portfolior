// Markdown variants served to clients that ask for text/markdown (AI agents,
// scrapers). Mirrors the current homepage content.

// Trailing slashes never match content, so normalize before lookup.
export function normalizePath(pathname: string): string {
  if (pathname.length > 1) pathname = pathname.replace(/\/+$/, "")
  return pathname
}

export function getMarkdown(pathname: string): string | null {
  switch (normalizePath(pathname)) {
    case "/":
      return `# Bartosz Bak

Aspiring design engineer based in the UK. UI Platform intern at Cloudflare in London, studying computer science at the University of York. Currently exploring typography, web animations and crafting interactions.

## Writing

- [My take on the Family Drawer](/writing/family-drawer) - August 2025
- [Turning an old phone into an OTP server](/writing/otp-api) - March 2026
- Fixing the infamous Cloudflare error pages - September 2026

## Explorations

- EmDash loading stepper - An upgrade I made to the playground loading screen, try it live [here](https://try.emdashcms.com/)
- Dashboard illustration - Added interactivity with the signature glow colour to dashboard's 404 pages, to make it a little less annoying to hit one

## Contact

- Email: contact@bartoszbak.org
- [Twitter](https://x.com/nocdns)
- [GitHub](https://github.com/nocdn)
- [CV](/cv)
`
    case "/writing/family-drawer":
      return `# My take on the Family Drawer

A deep dive into recreating the Family App's wallet options drawer animation using React and Motion.

[Back to home](/)
`
    case "/writing/otp-api":
      return `# Turning my old phone into an OTP server

Using an 11 year-old phone with 1GB of RAM as an OTP server, powered by a TypeScript API and an Android app.

[Back to home](/)
`
    default:
      return null
  }
}
