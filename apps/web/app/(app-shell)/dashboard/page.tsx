import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';

const checklistItems = [
  { label: 'Connect Instagram & Facebook', helper: 'OAuth & permissions', complete: true },
  { label: 'Sync Calendly availability', helper: 'Map top services', complete: true },
  { label: 'Generate draft concepts', helper: '3 scripts + visuals', complete: true },
  { label: 'Publish a promo to Meta', helper: 'Schedule or post now', complete: false },
  { label: 'Send DM test booking', helper: 'Verify flows', complete: false },
  { label: 'Secure first booking', helper: 'Celebrate and repeat', complete: false },
];

const quickActions = [
  { label: 'Generate new promo', helper: '3 concepts in under 3 minutes' },
  { label: 'Schedule weekly posts', helper: 'Drag onto best-time slots' },
  { label: 'Review DM assistant', helper: 'Suggested replies ready' },
];

const upcomingSchedule = [
  { title: 'Fresh Fade Friday', platform: 'Instagram Reels', time: 'Today · 5:30 PM', status: 'Scheduled' },
  { title: 'Back-to-School Touch-Up', platform: 'Facebook Feed', time: 'Thu · 10:00 AM', status: 'Needs caption' },
  { title: 'Weekend Walk-in Slots', platform: 'Stories', time: 'Sat · 9:15 AM', status: 'Draft' },
];

const inboxPreview = [
  {
    from: '@stylehunter21',
    message: '“Do you have any Saturday morning spots?”',
    intent: 'Availability',
    status: 'Assistant replied · Booking link sent',
  },
  {
    from: 'Taylor M.',
    message: '“Loved last video—can I book color + cut?”',
    intent: 'Service details',
    status: 'Waiting on you · Suggested reply ready',
  },
];

const performanceHighlights = [
  { stat: '3.2%', label: 'Video → booking conversion', trend: '+0.8% vs last week' },
  { stat: '4 / 4', label: 'Videos scheduled this month', trend: 'Starter plan fulfilled' },
  { stat: '6', label: 'DM bookings captured', trend: '+2 handoffs vs avg' },
];

export default function DashboardPage() {
  const completedCount = checklistItems.filter((item) => item.complete).length;
  const completionPercent = Math.round((completedCount / checklistItems.length) * 100);

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <Badge variant="accent" className="uppercase tracking-wide">
          Launch checklist
        </Badge>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Publish first promo & capture first booking
            </h1>
            <p className="max-w-2xl text-muted-foreground">
              Follow the guided steps to spin up three promo concepts, publish across Meta, and hand off DM leads to the booking flow.
            </p>
          </div>
          <Button size="lg" className="w-full sm:w-auto">
            Share feedback
          </Button>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <Card className="border-border/60">
          <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>30-minute launch plan</CardTitle>
              <CardDescription>Keep momentum toward your first booking.</CardDescription>
            </div>
            <Badge variant="secondary" className="text-xs font-semibold uppercase tracking-wide">
              {completionPercent}% complete
            </Badge>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {checklistItems.map((item) => (
                <li
                  key={item.label}
                  className="flex flex-col gap-2 rounded-xl border border-border/70 bg-card/70 px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex flex-col gap-1">
                    <p className="font-medium text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.helper}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={item.complete ? 'accent' : 'outline'}>
                      {item.complete ? 'Done' : 'Next'}
                    </Badge>
                    {!item.complete && (
                      <Button size="sm" variant="outline">
                        Continue
                      </Button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardHeader>
            <CardTitle>Upcoming schedule</CardTitle>
            <CardDescription>Resolve conflicts before publish time.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {upcomingSchedule.map((slot) => (
                <div
                  key={slot.title}
                  className="rounded-xl border border-border/60 bg-card/70 p-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">{slot.title}</span>
                    <Badge variant="outline" className="text-xs uppercase tracking-wide">
                      {slot.status}
                    </Badge>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {slot.platform} · {slot.time}
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full" variant="secondary">
              Open calendar
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Card className="border-border/60">
          <CardHeader>
            <CardTitle>Performance at a glance</CardTitle>
            <CardDescription>Understand what’s driving bookings this week.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
              {performanceHighlights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-border/60 bg-card/70 p-4 shadow-sm"
                >
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">{item.label}</p>
                  <p className="mt-2 text-2xl font-semibold text-foreground">{item.stat}</p>
                  <p className="text-xs font-semibold text-secondary">{item.trend}</p>
                </div>
              ))}
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {quickActions.map((action) => (
                <Card key={action.label} className="border-border/60 bg-muted/40">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">{action.label}</CardTitle>
                    <CardDescription>{action.helper}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" variant="secondary">
                      Launch
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardHeader>
            <CardTitle>Inbox spotlight</CardTitle>
            <CardDescription>DM assistant keeps leads moving.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {inboxPreview.map((thread) => (
                <div
                  key={thread.from}
                  className="rounded-xl border border-border/60 bg-card/70 p-3"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-foreground">{thread.from}</p>
                    <Badge variant="accent" className="text-xs uppercase tracking-wide">
                      {thread.intent}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-foreground">{thread.message}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{thread.status}</p>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full">
              Go to inbox
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
