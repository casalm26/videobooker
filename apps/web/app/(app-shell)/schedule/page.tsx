import { Button } from '../../../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';

const panels = [
  {
    title: 'Weekly calendar',
    description: 'Drag and drop your promos onto best-time slots and resolve conflicts.',
    status: 'Prototype coming soon',
    action: 'Open dashboard',
    variant: 'default',
  },
  {
    title: 'Usage meter',
    description: 'Track quota usage and upsell prompts for Starter vs Pro plans.',
    status: 'In design',
    action: 'View launch plan',
    variant: 'outline',
  },
  {
    title: 'Publishing queue',
    description: 'Surface failed publishes, retry actions, and permission warnings.',
    status: 'Planned alongside API adapters',
    action: 'Review requirements',
    variant: 'secondary',
  },
];

export default function SchedulePage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Schedule</h1>
        <p className="max-w-2xl text-muted-foreground">
          Review queued promos across platforms. Drag-and-drop calendar tooling and best-time suggestions will land here as the
          scheduling experience evolves.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {panels.map((panel) => (
          <Card key={panel.title} className="border-border/60 bg-card/70">
            <CardHeader>
              <CardTitle>{panel.title}</CardTitle>
              <CardDescription>{panel.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {panel.status}
              </span>
              <Button size="sm" variant={panel.variant as 'default' | 'outline' | 'secondary'}>
                {panel.action}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
