# Preview Deployment Plan

## Goals
- Provide automatic preview environments for every pull request covering the web app (`apps/web`) and backend services (`services/api`, `services/workers`).
- Keep previews short-lived, isolated by branch, and link results back to GitHub PRs for QA.

## Web (Next.js)
- **Platform**: Vercel project `videobooker-web`.
- **Build command**: `npm run build --workspace @videobooker/web` after root install (`npm install`).
- **Output**: `.next` (App Router). Vercel handles static + serverless automatically.
- **Previews**: Enable Deploy Hooks for PRs; set `VERCEL_PROJECT_ID`, `VERCEL_ORG_ID`, `VERCEL_TOKEN` as GitHub secrets.
- **Workflow**: new job `vercel-preview` triggered on PR. Steps: checkout → setup node → install → `npm run build --workspace @videobooker/web` → `npx vercel pull` (sync env) → `npx vercel deploy --prebuilt --token=$VERCEL_TOKEN --scope videobooker`. Capture deployment URL via `vercel deploy --prebuilt --output json` and comment on PR.

## API & Workers (Express + Node)
- **Platform**: Render (infra-as-code Blueprint) or Fly.io for lightweight previews.
- **Docker**: Single repository Dockerfile with build stages for API and workers.
- **Previews**: Use provider CLI to create preview instance per PR (tag with `preview-${{ github.event.number }}`).
- **Secrets**: `RENDER_API_KEY` or `FLY_API_TOKEN`, plus shared staging Mongo/Redis URLs stored in GitHub secrets.
- **Workflow**: job `api-preview` runs after tests. Steps: checkout → setup buildx → login to registry → `docker build --target api` / `docker build --target workers` → push to registry → invoke provider CLI (Render blueprint deploy or `fly deploy --config fly.preview.toml --image ...`). Capture URLs and report.

## GitHub Workflow Skeleton
```yaml
jobs:
  build-and-test: ...

  vercel-preview:
    if: github.event_name == 'pull_request'
    needs: build-and-test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm install
      - run: npm run build --workspace @videobooker/web
      - run: npx vercel pull --yes --environment=preview --token ${{ secrets.VERCEL_TOKEN }}
      - run: npx vercel deploy --prebuilt --token ${{ secrets.VERCEL_TOKEN }} --scope videobooker --yes --env-file .vercel/.env.preview.local

  api-preview:
    if: github.event_name == 'pull_request'
    needs: build-and-test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: docker/setup-buildx-action@v3
      - uses: docker/login-action@v3
        with:
          registry: ${{ secrets.CONTAINER_REGISTRY }}
          username: ${{ secrets.CONTAINER_REGISTRY_USER }}
          password: ${{ secrets.CONTAINER_REGISTRY_PASS }}
      - uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ${{ secrets.CONTAINER_REGISTRY }}/videobooker/api:preview-${{ github.run_id }}
      - run: ./ci/scripts/deploy-render.sh preview-${{ github.event.number }}
```

## Next Steps
1. Create Vercel project + tokens, store secrets as `VERCEL_TOKEN`, `VERCEL_PROJECT_ID`, `VERCEL_ORG_ID`.
2. Produce Dockerfile with API/worker stages and provider deployment script.
3. Implement GitHub Actions jobs referencing the above secrets and scripts.
4. Add job to post preview URLs as GitHub PR comments.
5. Add cleanup workflow (on PR close) to remove preview deployments.

## Open Questions
- Shared vs per-preview Mongo/Redis resources.
- Cost for multiple Render/Fly previews running concurrently.
- Need for feature flag environment sync between preview and staging.
