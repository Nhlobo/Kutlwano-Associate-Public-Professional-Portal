# kutlwanoassociate-PWA
# Kutlwano & Associate — Public Professional Portal

A standalone public-facing web app (PWA) for **referring attorneys** and **medical experts** to access their dashboard. Shares the same Supabase backend as the internal K&A system using the publishable anon key only.

---

## Project structure

```
src/
├── components/        # Shared UI: Alert, DataTable, SimpleList, Footer, Topbar
├── hooks/
│   ├── useAuth.ts     # Auth + profile loading + dashboard data fetching
│   └── usePWAInstall.ts # Install prompt hook
├── lib/
│   ├── supabase.ts    # Supabase client (anon key only)
│   ├── types.ts       # All TypeScript types
│   └── utils.ts       # Helpers: clean, dateLabel, statusClass, etc.
├── pages/
│   ├── LoginCard.tsx  # Sign-in form (sticky sidebar)
│   ├── public/        # Home, Services, Security, Privacy, Install, Support pages
│   └── dashboard/     # Overview, Cases, Documents, Profile, Support tabs
│       └── panels/    # ReferralPanel, AppointmentPanel, ReportPanel
├── styles/globals.css # Full design system (tokens + all component styles)
├── App.tsx            # Root: routes between public site and dashboard
└── main.tsx           # React entry point
```

---

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Set environment variables
cp .env.example .env.local
# Edit .env.local — use the same Supabase URL and anon key as the internal app

# 3. Run development server
npm run dev

# 4. Build for production
npm run build

# 5. Preview production build
npm run preview
```

---

## Security rules

| Rule | Detail |
|------|--------|
| No service-role key | Never put the Supabase service-role key in this browser app |
| RLS is the authority | This UI filters by profile, but the database RLS policies are the final enforcement |
| Staff are blocked | `resolvePortalRole()` rejects any profile not matching `referring_attorney` or `medical_expert` |
| Input sanitised | All user input is cleaned via `clean()` before database writes |
| Session isolated | Auth storage key `ka-portal-auth` is separate from the internal app |
| No offline data cache | Service worker caches app shell only — Supabase responses are never cached |

---

## PWA / Install

The app uses `vite-plugin-pwa` (Workbox). The service worker:
- Caches JS, CSS, HTML, fonts, and icons (app shell)
- Never caches Supabase API responses
- Falls back to `index.html` for SPA navigation

Users see an install prompt automatically on Chrome/Edge desktop and Android. On iOS they use Share → Add to Home Screen.

---

## Deployment

Deploy the `dist/` folder to any static host (Vercel, Netlify, Cloudflare Pages, etc).

- Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as environment variables in your host dashboard
- Ensure HTTPS (required for PWA install prompts)
- Set a catch-all redirect to `index.html` for SPA routing

---

## Adding icons

Place the following in `public/icons/`:
- `icon-192.png` — 192 × 192 PNG
- `icon-512.png` — 512 × 512 PNG (also used as maskable)

And `public/apple-touch-icon.png` — 180 × 180 PNG.
