# Repository Guidelines

## Project Structure & Module Organization
Stack: TypeScript MERN (Mongo, Express, React, Node). Current contents are planning docs (`design.txt`, `prd.txt`, `tasks.txt`); grow into this monorepo:
- `apps/web/` – Next.js frontend; place routes in `app/`, primitives in `components/`, hooks in `lib/hooks/`.
- `services/api/` – Express service; feature slices in `src/modules/**` with router, controller, data layers.
- `services/workers/` – Node job runners for renders, posting, webhook fan-out.
- `packages/shared/` – Cross-cutting TypeScript packages (`config/`, `schemas/`, `ui/`, `utils/`).
- `packages/db/` – Mongoose models, schema validators, and migration scripts for MongoDB.
- Tests live beside code as `.test.ts(x)` plus E2E specs in `tests/e2e/`.
- Static assets (template thumbs, logos) go in `apps/web/public/media/`; large media stay in S3.

## Build, Test, and Development Commands
Run `pnpm install` at the repo root to bootstrap workspaces. Launch the web client with `pnpm --filter @videobooker/web dev`, start the API with `pnpm --filter @videobooker/api dev`, lint via `pnpm lint`, run units with `pnpm test`, execute E2E with `pnpm test:e2e`, and spin MongoDB with `pnpm db:up`; add `--filter` to target specific workspaces when needed.

## Coding Style & Naming Conventions
Write modern TypeScript with strict mode. Prefer functional React components, 2-space indentation, and trailing commas (Prettier defaults). Component files use `PascalCase.tsx`, shared utilities use `camelCase.ts`, data models end with `.model.ts`, and helpers sit in `_fixtures`. Keep env vars upper snake case (`VIDEOBOOKER_API_URL`, `VIDEOBOOKER_MONGO_URL`). Run `pnpm lint --filter @videobooker/web -- --fix` (and other workspaces as required) before every PR.

## Testing Guidelines
Unit tests use Jest with `@testing-library/react`. Run server suites via `pnpm --filter @videobooker/api test`. Playwright E2E specs live in `tests/e2e` and use feature tags (`@onboarding`, `@booking`). Keep statement coverage ≥80% and call out gaps in the PR description.

## Commit & Pull Request Guidelines
There is no commit history yet, so default to Conventional Commits (`feat:`, `fix:`, `chore:`). Each PR should explain the user outcome, list test commands, and attach UI screenshots or Looms. Link tickets with `Closes #id`, request reviews from domain owners, and keep diffs under ~400 lines.

## Security & Configuration Tips
Store secrets in local `.env` variants and sync shared values through the secrets manager noted in `tasks.txt`. Never commit `.env*`; document new keys and rotation steps. Wrap experiments in feature flags and protect external API calls with rate limiting and structured logging.
