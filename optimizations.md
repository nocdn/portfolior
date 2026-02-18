# Performance Optimization Plan for bartoszbak.org

This document outlines all performance optimizations for the portfolio site, including what has been implemented and what remains to be done.

---

## 🔍 Problem Statement

The portfolio experiences slow initial loads after periods of inactivity due to:
1. **Vercel serverless cold starts** - Functions spin up from scratch after idle periods
2. **Dynamic rendering** - Using `headers()` forced SSR on every request
3. **Large asset payloads** - Multiple fonts, unoptimized images

---

## 📚 Research Sources

| Topic | Source |
|-------|--------|
| Partial Prerendering (PPR) | https://nextjs.org/docs/app/getting-started/partial-prerendering |
| Cache Components (Next.js 16) | https://nextjs.org/docs/app/getting-started/cache-components |
| Next.js 16 Release Notes | https://nextjs.org/blog/next-16 |
| Vercel Cold Start Guide | https://vercel.com/kb/guide/how-can-i-improve-serverless-function-lambda-cold-start-performance-on-vercel |
| Fluid Compute | https://vercel.com/blog/scale-to-one-how-fluid-solves-cold-starts |
| ISR Documentation | https://nextjs.org/docs/app/guides/incremental-static-regeneration |
| Caching Guide | https://nextjs.org/docs/app/guides/caching |
| Image Optimization | https://nextjs.org/docs/app/getting-started/images |
| Font Optimization | https://nextjs.org/docs/app/getting-started/fonts |
| Lazy Loading | https://nextjs.org/docs/app/guides/lazy-loading |
| generateStaticParams | https://nextjs.org/docs/app/api-reference/functions/generate-static-params |

---

## 🛠️ Optimizations

### Phase 1: Eliminate Cold Starts (Critical)

#### 1.1 Remove Dynamic Rendering from Homepage

**File:** `app/page.tsx`

**Problem:** The page used `await headers()` to detect mobile/desktop via user-agent, which forced Server-Side Rendering (SSR) on every request. This meant:
- No static caching possible
- Every visit triggers a serverless function
- Cold starts after idle periods

**Solution:** Use CSS-based responsive design instead. Both components render, CSS shows/hides based on viewport.

**Before (lines 1-51):**
```tsx
import { headers } from "next/headers"
// ...
export default async function Page() {
  const headersList = await headers()
  const userAgent = headersList.get("user-agent") || ""
  const isMobile = isProbablyMobile(userAgent)
  return isMobile ? <HomeMobile /> : <HomeDesktop />
}
```

**After:**
```tsx
export const dynamic = "force-static"

export default function Page() {
  return (
    <>
      <div className="hidden md:block">
        <HomeDesktop />
      </div>
      <div className="md:hidden">
        <HomeMobile />
      </div>
    </>
  )
}
```

**Trade-off:** Both mobile and desktop components are now in the HTML, but CSS hides the irrelevant one. The JS bundle includes both, but this is worth it for static generation.

**Status:** ✅ COMPLETED

---

#### 1.2 Enable Cache Components / PPR (Next.js 16)

**File:** `next.config.ts`

**Why:** Cache Components enables Partial Prerendering where static shells are served instantly while dynamic parts stream in.

**Change:**
```ts
const nextConfig: NextConfig = {
  cacheComponents: true,
}
```

**Status:** ⬜ NOT STARTED

---

#### 1.3 Enable Vercel Fluid Compute

**Location:** Vercel Dashboard → Project Settings → Functions

**Why:** Fluid Compute keeps at least one function instance warm ("scale to one"), eliminating 99%+ of cold starts. Also enables concurrency so one instance handles multiple requests.

**Action:** Enable "Fluid Compute" in Vercel project settings.

**Status:** ⬜ NOT STARTED (requires Vercel dashboard action)

---

### Phase 2: Font Optimization

#### 2.1 Use next/font/local for All Local Fonts

**File:** `app/layout.tsx`

**Problem:** PP Neue Montreal was loaded via CSS `@font-face` in `globals.css`, missing Next.js font optimizations (preloading, size-adjust for zero layout shift, immutable caching).

**Solution:** Move all local fonts to `next/font/local` in layout.tsx.

**Fonts now using next/font/local:**
- `openRunde` (lines 12-32)
- `switzer` (lines 34-40)
- `ppNeueMontreal` (lines 42-49)

**Status:** ✅ COMPLETED

---

#### 2.2 Remove Redundant Font Preload

**File:** `app/layout.tsx`

**Problem:** Manual `<link rel="preload">` for PPNeueMontreal was redundant since `next/font` handles preloading automatically.

**Removed from `<head>`:**
```tsx
<link
  rel="preload"
  href="/fonts/PPNeueMontreal-Medium.woff2"
  as="font"
  type="font/woff2"
  crossOrigin="anonymous"
/>
```

**Status:** ✅ COMPLETED

---

#### 2.3 Add Fallbacks to Local Fonts

**File:** `app/layout.tsx`

**Why:** Explicit fallbacks ensure text is visible immediately while custom fonts load.

**Added to each localFont config:**
```ts
preload: true,
fallback: ["system-ui", "sans-serif"],
```

**Status:** ✅ COMPLETED

---

#### 2.4 Remove @font-face from CSS

**File:** `app/globals.css`

**Removed (was around line 192-198):**
```css
@font-face {
  font-family: "PP";
  src: url("/fonts/PPNeueMontreal-Medium.woff2") format("woff2");
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}
```

**Status:** ✅ COMPLETED

---

#### 2.5 Update Font References to Use CSS Variables

**Files:**
- `components/mobile/Section.tsx` (line 17)
- `components/home/DesktopContactSection.tsx` (line 21)
- `components/desktop/Section.tsx` (line 26)
- `components/desktop/Project.tsx` (line 163)

**Changed from:**
```ts
fontFamily: "PP, Inter, sans-serif"
```

**Changed to:**
```ts
fontFamily: "var(--font-pp-neue-montreal), Inter, sans-serif"
```

**Status:** ✅ COMPLETED

---

#### 2.6 Reduce Font Count (Optional)

**File:** `app/layout.tsx`

**Current fonts loaded (7 total):**
1. OpenRunde (local) - 3 weights = ~476KB
2. Switzer (local) - 1 weight = ~20KB
3. PP Neue Montreal (local) - 1 weight = ~56KB
4. Geist Sans (Google)
5. Geist Mono (Google)
6. Inter (Google)
7. IBM Plex Mono (Google) - **appears unused, candidate for removal**
8. JetBrains Mono (Google)

**Recommendation:** Audit which fonts are actually used and remove unused ones. IBM Plex Mono may be removable.

**Status:** ⬜ NOT STARTED

---

### Phase 3: Image Optimization

#### 3.1 Convert GIFs to Video/WebP

**Files:**
- `public/images/copy.gif` (168KB)
- `public/images/ticker.gif` (312KB)

**Why:** GIFs are inefficient. MP4/WebM can be 90% smaller with better quality.

**Current usage in:**
- `components/ComponentCarousel.tsx` (lines 57-59, 79-81)
- `components/mobile/ComponentCarousel.tsx` (lines 66-69, 95-99)

**Solution:** Convert to video:
```tsx
// Before
<img src={animatedTickerImage.src} />

// After
<video autoPlay loop muted playsInline>
  <source src="/videos/ticker.webm" type="video/webm" />
  <source src="/videos/ticker.mp4" type="video/mp4" />
</video>
```

**Status:** ⬜ NOT STARTED

---

#### 3.2 Use next/image Consistently

**File:** `components/mobile/ComponentCarousel.tsx`

**Problem:** Uses raw `<img>` tags instead of `next/image`.

**Lines to update:** 66-70, 95-99, 115-119

**Change from:**
```tsx
<img src={cornerComponentImage.src} alt="..." />
```

**Change to:**
```tsx
import Image from "next/image"
// ...
<Image 
  src={cornerComponentImage} 
  alt="..."
  width={200}
  height={100}
  sizes="100vw"
/>
```

**Status:** ⬜ NOT STARTED

---

#### 3.3 Add Priority to Above-Fold Images

**Why:** Images that appear in the viewport on initial load should have `priority` to preload them.

**Status:** ⬜ NOT STARTED (evaluate after image audit)

---

### Phase 4: JavaScript Bundle Optimization

#### 4.1 Install Bundle Analyzer

**Why:** Visualize what's in your JS bundle to identify bloat.

**Installation:**
```bash
bun add -d @next/bundle-analyzer
```

**Configure in `next.config.ts`:**
```ts
import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

export default withBundleAnalyzer(nextConfig)
```

**Run:**
```bash
ANALYZE=true bun run build
```

**Status:** ⬜ NOT STARTED

---

#### 4.2 Audit Client Components

**Current "use client" components (18 total):**

| Component | Reason for Client | Can Be Server? |
|-----------|-------------------|----------------|
| `CodeBlock.tsx` | SyntaxHighlighter | No, but only loads on /writing |
| `AnimatedCircularButton.tsx` | Animation | No |
| `TimeZoneName.tsx` | useState, date | No |
| `ComponentCarousel.tsx` | useState, animation | No |
| `Section.tsx` | useState for hover | Maybe - could lift state |
| `Project.tsx` | useState for hover | Maybe - could lift state |
| `MobileNavigation.tsx` | Scroll handling | No |
| `DesktopExtraSection.tsx` | useState, dynamic | No |
| `DesktopContactSection.tsx` | useState | No |
| `DesktopComponentsSection.tsx` | useState | No |
| `MobileComponentsSection.tsx` | useState | No |
| `MobileContactSection.tsx` | useState | No |

**Note:** `react-syntax-highlighter` is only imported in `/writing/family-drawer/page.tsx`, so it's automatically code-split and NOT loaded on the homepage.

**Status:** ⬜ NOT STARTED

---

### Phase 5: Caching & Headers

#### 5.1 Configure Cache Headers

**File:** `next.config.ts`

**Add:**
```ts
const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}
```

**Status:** ⬜ NOT STARTED

---

#### 5.2 Enable ISR for Writing Pages

**File:** `app/writing/family-drawer/page.tsx`

**Add at top of file:**
```tsx
export const revalidate = 3600 // Revalidate every hour
```

**Status:** ⬜ NOT STARTED

---

### Phase 6: HTML/Hydration Fixes

#### 6.1 Fix Nested Anchor Tags

**Files:**
- `components/mobile/ComponentCarousel.tsx` (was line 78-84)
- `components/ComponentCarousel.tsx` (was line 36-42)

**Problem:** `<a>` tags were nested inside other `<a>` tags, causing hydration errors.

**Solution:** Changed inner `<a>` to `<span>`:
```tsx
// Before
<a href="...">@aliszu</a>

// After
<span className="text-blue-700">@aliszu</span>
```

**Status:** ✅ COMPLETED

---

### Phase 7: Vercel Configuration

#### 7.1 Set Optimal Function Region

**File:** Create `vercel.json` in project root

**Why:** Function region should match your primary audience for lowest latency.

```json
{
  "regions": ["lhr1"]
}
```

(Use `lhr1` for London/UK, `iad1` for US East, etc.)

**Status:** ⬜ NOT STARTED

---

## ✅ Checklist

### Completed
- [x] Remove `headers()` from homepage - force static generation
- [x] Add `export const dynamic = "force-static"` to page.tsx
- [x] Switch to CSS-based responsive design
- [x] Remove redundant font preload link
- [x] Add `preload: true` and `fallback` to local fonts
- [x] Move PP Neue Montreal from CSS @font-face to next/font/local
- [x] Update font references to use CSS variable
- [x] Fix nested anchor tag hydration errors

### Not Started
- [ ] Enable `cacheComponents` in next.config.ts (PPR)
- [ ] Enable Fluid Compute on Vercel dashboard
- [ ] Install and run bundle analyzer
- [ ] Audit and reduce font count (remove IBM Plex Mono if unused)
- [ ] Convert GIFs to video format
- [ ] Use next/image in mobile ComponentCarousel
- [ ] Add priority to above-fold images
- [ ] Audit client components for potential server component conversion
- [ ] Configure cache headers in next.config.ts
- [ ] Add ISR revalidate to writing pages
- [ ] Create vercel.json with optimal region

---

## 📊 Expected Impact

| Metric | Before (Estimated) | After Full Optimization |
|--------|---------------------|------------------------|
| **Cold Start TTFB** | 2-4 seconds | <500ms |
| **Homepage Rendering** | Dynamic (SSR) | Static (prerendered) |
| **Font Payload** | ~550KB | ~150KB (after audit) |
| **Image Payload** | ~900KB | ~200KB (after conversion) |
| **LCP** | >2.5s | <1.5s target |

---

## 🔄 Build Output Reference

After optimizations, `bun run build` should show:

```
Route (app)
┌ ○ /                      <- Static (was dynamic!)
├ ○ /_not-found
├ ƒ /api/og
└ ○ /writing/family-drawer

○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand
```

The `/` route being `○` (static) instead of `ƒ` (dynamic) is the key indicator that cold starts are eliminated for the homepage.
