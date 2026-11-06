<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Commands

Package manager is **npm** (only `package-lock.json` is committed). No test setup and no CI exist yet.

```bash
npm run dev     # dev server (Turbopack), regenerates the agent-rules block above
npm run build   # production build; also validates TS + lint rules
npm run lint    # bare eslint (flat config in eslint.config.mjs)
npx tsc --noEmit  # typecheck; tsconfig includes .next/types, run dev/build first if it errors oddly
```

## Stack quirks

- **Tailwind v4, CSS-first.** There is no `tailwind.config.*`. Theme lives in `src/app/globals.css` (`@theme inline`, imports `tailwindcss`, `tw-animate-css`, and `shadcn/tailwind.css`). CSS is wired through a Turbopack loader rule in `next.config.ts` — don't remove it.
- **shadcn "base-nova" style: components build on `@base-ui/react`, NOT Radix.** Primitives import like `@base-ui/react/button`, and APIs differ from the Radix-based shadcn components you may know. Generate new ones with the shadcn CLI so `components.json` (aliases, baseColor, icon library) stays authoritative.
- **`cn` comes from the `"cn"` npm package directly** (`import { cn } from "cn"`). `src/lib/utils.ts` is only a re-export; don't switch imports to `@/lib/utils`.
- Path alias: `@/*` → `src/*`.
- Fonts: Manrope (headings, `--font-manrope`) and Inter (body, `--font-inter`) via `next/font` in `src/app/layout.tsx`; globals.css maps them to `--font-heading`/`--font-sans`.

## Structure

- `src/app` — App Router with route groups: `(website)` (public marketing pages) and `(auth)` (auth pages, separate no-Navbar layout). `src/app/(website)/page.tsx` is still the create-next-app placeholder; landing content lives in `src/components/shared/Navbar.tsx`/`Footer.tsx` but is not yet wired into the layout.
- `src/components/ui` — generated shadcn/base-nova primitives. `src/images` and `src/logos` hold site assets.
