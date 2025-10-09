# Monorepo Outline

## Workspaces
- `apps/web` – Next.js frontend; React Query for data fetching, Zustand for client state, Playwright smoke flows.
- `services/api` – Express + TypeScript API; module folders (`business`, `media`, `schedule`) each with router, controller, service, DAL.
- `services/workers` – BullMQ (Redis) job runners handling renders, publish queue, DM ingestion, analytics sync.
- `packages/shared` – Utilities shared across surfaces (config loader, logging, feature flag client, error types).
- `packages/db` – Mongoose models, validation schemas, seed scripts, migration utilities.
- `packages/ui` – Component library built with Radix UI primitives, tokens, and storybook docs.

## Tooling & Infra
- Package manager: pnpm workspaces with `pnpm-workspace.yaml`.
- TypeScript project references: root `tsconfig.base.json`, package-level `tsconfig.json` extending base.
- Linting/Formatting: ESLint + Prettier via root config; Husky + lint-staged enforce checks on commits and `pnpm lint`/`pnpm typecheck` on push.
- Testing: Jest for unit, Playwright for E2E; coverage thresholds enforced via root `package.json` scripts.
- Environment: Docker Compose orchestrating app containers + MongoDB + Redis; `.env.example` tracked per workspace.

## Pipelines
- `lint` – runs ESLint across all workspaces via `pnpm lint`.
- `typecheck` – executes `tsc --noEmit` with project references.
- `test` – orchestrates jest suites in parallel with coverage gating.
- `test:e2e` – launches services and runs Playwright specs tagged per epic.
- `build` – generates optimized outputs (`next build`, `tsc -p .`) and caches via Turborepo remote cache.
- `deploy` – triggers infrastructure pipelines (web → Vercel, API/Workers → Render/Kubernetes).

## Governance
- Branch strategy: trunk-based on `main`, short-lived feature branches, PR review gates.
- Release cadence: weekly cut with semantic versioning handled by Changesets.
- Observability: shared logger + tracing middleware; central dashboard for job metrics and queue health.
- Security: Renovate bot for dependencies, secret scanning, per-service RBAC enforcement.
