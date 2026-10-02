# Portfolio

Bartosz Bak's portfolio, built with TanStack Start, React, and Vite, and hosted on Cloudflare Workers.

## Development

```sh
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000). The homepage is in `src/routes/index.tsx`.

## Validation

```sh
bun run typecheck
bun run build
cf deploy --prebuilt --mode production --dry-run
```

## Deployment

Deployment uses the authenticated Cloudflare CLI (`cf`) and `cloudflare.config.ts`.
Commit before deploying so the HTML cache's build ID matches the deployed revision.

```sh
# Production: portfolior, bartoszbak.org and www.bartoszbak.org
bun run deploy

# Staging: portfolior-testing.bartek-bak.workers.dev
bun run deploy:staging
```

The `production` mode attaches the portfolio domains; staging and previews do not.

When homepage or article content changes, update its `text/markdown` representation in `src/markdown.ts` in the same change.
