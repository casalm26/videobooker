import { Button } from '../../../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';

const tiles = [
  {
    title: 'Conversation list',
    description: 'Filter by new, bot-handled, or needs handoff conversations.',
    status: 'Assistant mock data only',
    action: 'Jump to dashboard',
    variant: 'default',
  },
  {
    title: 'Quick replies',
    description: 'Pre-scripted responses for pricing, availability, and hours.',
    status: 'Messaging MVP milestone',
    action: 'See roadmap',
    variant: 'outline',
  },
  {
    title: 'Test console',
    description: 'Simulate DM prompts and preview assistant responses with slots.',
    status: 'Planned for assistant setup',
    action: 'View checklist',
    variant: 'secondary',
  },
];

export default function InboxPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Inbox</h1>
        <p className="max-w-2xl text-muted-foreground">
          DM handoffs, assistant replies, and booking-ready quick responses will live here. The current view keeps the space warm
          until real-time messaging lands.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {tiles.map((tile) => (
          <Card key={tile.title} className="border-border/60 bg-card/70">
            <CardHeader>
              <CardTitle>{tile.title}</CardTitle>
              <CardDescription>{tile.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {tile.status}
              </span>
              <Button size="sm" variant={tile.variant as 'default' | 'outline' | 'secondary'}>
                {tile.action}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
