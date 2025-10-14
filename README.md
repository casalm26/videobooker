# VideoBooker Monorepo

This repo houses the VideoBooker product stack: a Next.js marketing/front‑office app, an Express API, shared UI + utility packages, and supporting worker+DB scaffolding.

## Getting Started

- Install dependencies: `npm install`
- Copy the provided `.env.example` files to their `.env.local` counterparts (root, `apps/web`, `services/api`, `services/workers`) and populate required values.
- Run the web client: `npm run dev:web`
- Run the API: `npm run dev:api`
- Lint all workspaces: `npm run lint`
- Typecheck all workspaces: `npm run typecheck`

## Frontend Routes (`apps/web`)

| Route | Description |
| ----- | ----------- |
| `/` | Shadcn/Tailwind marketing landing page summarising the 30-minute launch flow. |
| `/dashboard` | Operational launchpad with the 30-minute checklist, schedule preview, inbox spotlight, and performance highlights. |
| `/create` | Placeholder for template gallery and light editor workflows; links back to the launch plan. |
| `/schedule` | Upcoming calendar overview and quota/usage concepts (scheduling MVP staging area). |
| `/inbox` | Messaging hub placeholder showing how DM assistant and quick replies will slot in. |
| `/bookings` | Booking management placeholder outlining daily agenda and attribution modules. |
| `/analytics` | Analytics surface placeholder highlighting north-star KPIs, video metrics, and export plans. |
| `/library` | Library hub placeholder covering brand kit, offers, and media/templates. |
| `/settings` | Settings placeholder covering business profile, billing, and team management. |

> The Next.js app uses the App Router (`apps/web/app/**`). Add new surfaces under that directory and they will be picked up automatically.

## API Surface (`services/api`)

All endpoints are rooted at the API base URL (default `http://localhost:4000`). Request/response bodies are validated with Zod and backed by the in-memory store in `services/api/src/lib/store.ts`.

### Health & Business Context

| Method | Path | Description |
| ------ | ---- | ----------- |
| GET | `/health` | Health check used by infra and smoke tests. |
| GET | `/business` | Retrieve the active business profile. |
| PUT | `/business` | Update business profile fields (name, category, socials, onboarding steps, etc.). |
| GET | `/services` | List configured service offerings. |
| PUT | `/services` | Replace the full set of service offerings. |

### Integrations & Availability

| Method | Path | Description |
| ------ | ---- | ----------- |
| GET | `/integrations` | List Meta/Calendly/Acuity integration statuses. |
| POST | `/integrations/:provider/connect` | Mark an integration as connected; optional metadata payload. |
| POST | `/integrations/:provider/disconnect` | Disconnect an integration. |
| GET | `/integrations/availability?provider=&date=` | Fetch mock availability slots for Calendly or Acuity. |

### Brand Kit & Offers

| Method | Path | Description |
| ------ | ---- | ----------- |
| GET | `/brand-kit` | Fetch current brand kit colours, fonts, logo, subtitle style. |
| PUT | `/brand-kit` | Update brand kit selections. |
| GET | `/offers` | List saved offers/CTAs. |
| POST | `/offers` | Create a new offer template. |
| PUT | `/offers/:id` | Update an existing offer. |
| DELETE | `/offers/:id` | Remove an offer. |

### Video Projects & Production

| Method | Path | Description |
| ------ | ---- | ----------- |
| GET | `/video-projects` | List video projects. |
| GET | `/video-projects/:id` | Retrieve a single video project. |
| POST | `/video-projects` | Create a new project (concept, vertical, variations). |
| PATCH | `/video-projects/:id` | Update project status or associated offer. |
| GET | `/render-jobs` | List render jobs and their progress. |
| POST | `/render-jobs` | Queue a new render job for a project variation. |
| GET | `/render-jobs/:id` | Inspect a render job. |
| PATCH | `/render-jobs/:id` | Update render job status/progress/asset URL. |
| POST | `/publish-jobs` | Schedule an immediate or future publish for a project. |
| GET | `/publish-jobs/:id` | Inspect a publish job. |

### Scheduling, Links, and QR

| Method | Path | Description |
| ------ | ---- | ----------- |
| GET | `/schedule` | List scheduled publish entries. |
| POST | `/schedule` | Create a schedule entry (project, time, platforms). |
| PUT | `/schedule/:id` | Update a scheduled entry. |
| DELETE | `/schedule/:id` | Remove a scheduled entry. |
| GET | `/links` | List short links + UTM metadata. |
| POST | `/links` | Create a short link. |
| POST | `/qr` | Generate a QR image URL for a short link. |

### Bookings, Conversations, and Analytics

| Method | Path | Description |
| ------ | ---- | ----------- |
| GET | `/bookings` | List bookings captured via DM/video/link flows. |
| POST | `/bookings` | Create a booking (service, customer info, provider). |
| PATCH | `/bookings/:id` | Update booking status or details. |
| GET | `/conversations` | List DM conversations. |
| GET | `/conversations/:id` | Retrieve a conversation thread. |
| POST | `/conversations/:id/messages` | Append a message to a conversation. |
| GET | `/analytics/overview` | Fetch dashboard analytics summary. |
| PATCH | `/analytics/overview` | Update analytics summary/top videos (mock). |

## Contributing

- Follow Conventional Commit prefixes (`feat:`, `fix:`, `chore:`…).
- Run `npm run lint` and `npm run typecheck` before committing; both commands are enforced by the Husky hooks.
- Keep UI updates routed through shared primitives in `packages/ui` or new Shadcn components in `apps/web/components/ui`.

Refer to `tasks.txt` for the current feature roadmap and to `MONOREPO_OUTLINE.md` for workspace conventions.
