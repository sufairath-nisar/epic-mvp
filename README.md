# Epic Padel — Web App

A responsive, pixel-accurate marketing & member web app for the **epic. padel** brand, built from Figma designs. React + Vite + Tailwind CSS, mobile-first and desktop-exact.

## Tech stack

- **React** (functional components + hooks)
- **Vite** (dev server / build)
- **Tailwind CSS** v3 (utility-first, exact arbitrary values from Figma)
- **lucide-react** (icons)
- **@fontsource** — Lexend (`font-sans`) & Sulphur Point (`font-display`)
- Lightweight custom client router (`History` API, no external routing dep)
- **ESLint** + **Prettier** for code quality

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start dev server (http://127.0.0.1:5173)
npm run build    # production build -> dist/
npm run preview  # preview the production build
npm run lint     # run ESLint
npm run format   # format src with Prettier
```

## Project structure

```
src/
  api/            # data-access layer (swap mocks for real API here)
  components/
    common/       # reusable building blocks (carousels, dropdowns, etc.)
    f31/          # shared site header + hero CTAs
    layout/       # OverlayShell (modal pages), SiteFooter
    sections/     # home/story page sections
  constants/      # asset path
  data/           # content data (journal, routes, site content) — backend-ready
  hooks/          # useHomepageData, useSequentialImagePairs
  pages/          # one component per route
  router/         # RouterProvider, Link, useRouter
  utils/          # join/profile flow session helpers
  styles.css      # Tailwind entry + keyframes
public/assets/    # images & SVGs
```

## Routing

Routes are resolved in `src/App.jsx` against the current path from `useRouter()`.

| Path | Page |
| --- | --- |
| `/` | Home |
| `/our-story` | Story |
| `/our-journal`, `/our-journal/blog/:slug` | Journal listing / article |
| `/find-epic` | Find Epic |
| `/join-epic`, `/join-epic/otp`, `/join-epic/membership`, `/join-epic/membership/checkout` | Join Epic flow |
| `/wear-epic`, `/wear-epic/product`, `/wear-epic/cart` | Shop |
| `/profile` (login), `/signin` (create account), `/profile/otp` | Auth flow |
| `/account`, `/account/:section` | Member account |
| `/booking`, `/booking/checkout`, `/booking/confirmation` | Booking |
| `/investments` | Investments |

Navigate in code via `Link` / `useRouter().navigate()` from `src/router/RouterProvider.jsx`.

## API integration (next step)

Content currently lives in `src/data/*` and a mock layer in `src/api/`. To wire a backend:

1. Replace the data imports / mock calls in `src/api/` and `src/data/` with real `fetch` calls.
2. Expose them through hooks (see `src/hooks/useHomepageData.js` as the pattern).
3. Pages already render from arrays/objects, so swapping the source requires no markup changes.

Session-scoped flows (sign-up details, profile edits) use `src/utils/joinFlow.js` and `src/utils/profileFlow.js` (currently `sessionStorage`) — replace with real auth/profile endpoints.

> Note: routing uses the History API. For static hosting, configure an SPA fallback so deep links resolve to `index.html`.
