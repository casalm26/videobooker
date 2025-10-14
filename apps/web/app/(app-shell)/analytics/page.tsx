import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';

const analyticsModules = [
  {
    title: 'North-star KPIs',
    description: 'Appointments booked, conversion rates, cadence tracking.',
    note: 'Hooked up once event stream lands.',
  },
  {
    title: 'Video performance',
    description: 'See which promos drove DM starts, bookings, and watch time.',
    note: 'Benchmarking against peers coming soon.',
  },
  {
    title: 'Exports & alerts',
    description: 'Send CSV snapshots and surface permission or posting issues.',
    note: 'Planned for Phase 7 analytics work.',
  },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Analytics</h1>
        <p className="max-w-2xl text-muted-foreground">
          North-star dashboards, funnel metrics, and per-video insights will anchor here. Until instrumentation goes live, this
          page outlines the key modules to expect.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {analyticsModules.map((module) => (
          <Card key={module.title} className="border-border/60 bg-card/70">
            <CardHeader>
              <CardTitle>{module.title}</CardTitle>
              <CardDescription>{module.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{module.note}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
