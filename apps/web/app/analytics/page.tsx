import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';

export default function AnalyticsPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="container py-16">
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">Analytics</h1>
          <p className="max-w-2xl text-muted-foreground">
            North-star dashboards, funnel metrics, and per-video insights will anchor here. Until instrumentation goes live,
            this page outlines the key modules to expect.
          </p>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>North-star KPIs</CardTitle>
              <CardDescription>Appointments booked, conversion rates, and cadence tracking.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Hooked up once event stream lands.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Video performance</CardTitle>
              <CardDescription>See which promos drove DM starts, bookings, and watch time.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Benchmarking against peers coming soon.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Exports & alerts</CardTitle>
              <CardDescription>Send CSV snapshots and surface permission or posting issues.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Planned for Phase 7 analytics work.</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
