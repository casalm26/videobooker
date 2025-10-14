# API Service

Express + TypeScript backend for VideoBooker. The service currently ships with an in-memory
store and mocked workflows so the web client can iterate on flows before persistence and
external integrations are wired up.

### Storage plan

The mock data layer returns asset URLs that mimic a CDN, but no binary uploads are stored by
the service yet. When persistence lands we will back video renders and other large media with
an object store such as Amazon S3 fronted by a CDN, and wire the API to hand out signed URLs
for uploads and downloads. Until then, any `assetUrl` or thumbnail paths you see in responses
are just fixtures from the in-memory store to help the client build its flows.

## Development

```bash
npm install
npm run dev:api
```

The server boots on port `4000` by default. All routes expect and respond with JSON.

## Route reference

The mocked API surface is organised by feature slice. Each path below is mounted relative to
the service root (e.g. `GET /health`). Request bodies and params are validated with Zod – the
schemas live alongside their routers under `src/modules/**`.

### Health

| Method | Path        | Description              |
| ------ | ----------- | ------------------------ |
| GET    | /health     | Service health check.

### Business profile

| Method | Path        | Description                              |
| ------ | ----------- | ---------------------------------------- |
| GET    | /business   | Fetch the active business profile.
| PUT    | /business   | Update profile fields such as name, location, hours, links.

### Services catalog

| Method | Path        | Description                                       |
| ------ | ----------- | ------------------------------------------------- |
| GET    | /services   | List services that can be promoted or booked.
| PUT    | /services   | Replace the full services collection.

### Integrations

| Method | Path                                  | Description                                         |
| ------ | ------------------------------------- | --------------------------------------------------- |
| GET    | /integrations                         | List configured integrations and connection status.
| POST   | /integrations/:provider/connect       | Connect Meta, Calendly, or Acuity integrations.
| POST   | /integrations/:provider/disconnect    | Disconnect the given integration provider.
| GET    | /integrations/availability            | Return scheduling availability for supported tools.

### Brand kit

| Method | Path        | Description                                         |
| ------ | ----------- | --------------------------------------------------- |
| GET    | /brand-kit  | Retrieve brand colors, fonts, and logo settings.
| PUT    | /brand-kit  | Update brand kit tokens used across generated media.

### Offers

| Method | Path          | Description                             |
| ------ | ------------- | --------------------------------------- |
| GET    | /offers       | List marketing offers attached to videos.
| POST   | /offers       | Create a new offer.
| PUT    | /offers/:id   | Update an offer by id.
| DELETE | /offers/:id   | Archive/remove an offer.

### Video projects

| Method | Path                    | Description                                         |
| ------ | ----------------------- | --------------------------------------------------- |
| GET    | /video-projects         | List all video projects.
| GET    | /video-projects/:id     | Fetch a single project with its variations.
| POST   | /video-projects         | Create a new project draft.
| PATCH  | /video-projects/:id     | Update project status or linked offer.

### Render jobs

| Method | Path                | Description                                     |
| ------ | ------------------- | ----------------------------------------------- |
| GET    | /render-jobs        | List render jobs and their progress.
| POST   | /render-jobs        | Queue a new render for a project variation.
| GET    | /render-jobs/:id    | Fetch render job details.
| PATCH  | /render-jobs/:id    | Update job status, progress, or asset URL.

### Publish jobs

| Method | Path                 | Description                                               |
| ------ | -------------------- | --------------------------------------------------------- |
| POST   | /publish-jobs        | Schedule a publish attempt for a rendered video.
| GET    | /publish-jobs/:id    | Fetch publish job status and metadata.

### Schedule

| Method | Path              | Description                                      |
| ------ | ----------------- | ------------------------------------------------ |
| GET    | /schedule         | List scheduled publish entries.
| POST   | /schedule         | Schedule a project across platforms.
| PUT    | /schedule/:id     | Update scheduling metadata or status.
| DELETE | /schedule/:id     | Remove a scheduled entry.

### Links & QR codes

| Method | Path        | Description                             |
| ------ | ----------- | --------------------------------------- |
| GET    | /links      | List smart links tied to offers/videos.
| POST   | /links      | Create a new smart link.
| POST   | /qr         | Generate a QR code asset for a link.

### Bookings

| Method | Path             | Description                                            |
| ------ | ---------------- | ------------------------------------------------------ |
| GET    | /bookings        | List bookings across connected scheduling providers.
| POST   | /bookings        | Create a booking record for a service.
| PATCH  | /bookings/:id    | Update booking status or contact information.

### Conversations

| Method | Path                           | Description                                           |
| ------ | ------------------------------ | ----------------------------------------------------- |
| GET    | /conversations                 | List DM threads with prospects.
| GET    | /conversations/:id             | Fetch a single conversation and its messages.
| POST   | /conversations/:id/messages    | Append a message to an existing conversation.

### Analytics

| Method | Path                | Description                                         |
| ------ | ------------------- | --------------------------------------------------- |
| GET    | /analytics/overview | Fetch high-level performance metrics.
| PATCH  | /analytics/overview | Update analytics totals or top video stats.

