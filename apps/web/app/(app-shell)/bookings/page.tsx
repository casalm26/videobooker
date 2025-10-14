import { Button } from '../../../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';

const sections = [
  {
    title: "Today's appointments",
    description: 'Surface handoff context and upcoming guests at a glance.',
    status: 'Demo data only',
    action: 'Return to dashboard',
  },
  {
    title: 'Source attribution',
    description: 'Trace bookings back to the originating video, DM, or short link.',
    status: 'Rolling out with analytics MVP',
    action: 'View plan',
  },
  {
    title: 'Provider sync',
    description: 'Reschedule or cancel directly via Calendly/Acuity connectors.',
    status: 'In integration phase',
    action: 'Review specs',
  },
];

export default function BookingsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Bookings</h1>
        <p className="max-w-2xl text-muted-foreground">
          Monitor confirmed, completed, and no-show appointments. Provider sync and reschedule flows will plug into this page as
          integrations firm up.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {sections.map((section) => (
          <Card key={section.title} className="border-border/60 bg-card/70">
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
              <CardDescription>{section.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {section.status}
              </span>
              <Button size="sm" variant="outline">
                {section.action}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
