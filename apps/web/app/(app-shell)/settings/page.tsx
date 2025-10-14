import { Button } from '../../../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';

const settingsPanels = [
  {
    title: 'Business profile',
    description: 'Keep hours, locations, and service mappings up to date.',
    status: 'Editing UI coming soon',
    action: 'Edit profile',
  },
  {
    title: 'Integrations',
    description: 'Manage Meta, Calendly, Acuity, Buffer/Hootsuite, and Stripe connectors.',
    status: 'Meta & Calendly mocks live',
    action: 'Open integrations',
  },
  {
    title: 'Plan & billing',
    description: 'Manage subscription, overages, and payment methods.',
    status: 'Stripe integration pending',
    action: 'View plan',
  },
  {
    title: 'Team & roles',
    description: 'Owner, staff, and billing admin permissions coming online.',
    status: 'Auth service in progress',
    action: 'Review roles',
  },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Settings</h1>
        <p className="max-w-2xl text-muted-foreground">
          Configure business details, integrations, billing, and team roles. These sections map directly to the admin flows in the
          roadmap.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {settingsPanels.map((panel) => (
          <Card key={panel.title} className="border-border/60 bg-card/70">
            <CardHeader>
              <CardTitle>{panel.title}</CardTitle>
              <CardDescription>{panel.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {panel.status}
              </span>
              <Button size="sm" variant="outline">
                {panel.action}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
