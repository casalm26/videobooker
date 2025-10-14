import { Button } from '../../../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';

const modules = [
  {
    title: 'Template gallery',
    description: 'Browse vertical-specific starting points with safe areas and tone guidance.',
    status: 'Launches soon',
    action: 'Back to dashboard',
  },
  {
    title: 'Light editor',
    description: 'Tweak copy buckets, brand locks, music and VO selections in one view.',
    status: 'Phase 3 milestone',
    action: 'View roadmap',
  },
  {
    title: 'CTA end cards',
    description: 'Generate short links, UTM presets, and QR codes for the final frame.',
    status: 'Planned for iteration',
    action: 'Open checklist',
  },
];

export default function CreatePage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Create</h1>
        <p className="max-w-2xl text-muted-foreground">
          Spin up campaign drafts and concept variations. These modules connect to the guided launch checklist and library to keep
          assets in sync.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {modules.map((module) => (
          <Card key={module.title} className="border-border/60 bg-card/70">
            <CardHeader>
              <CardTitle>{module.title}</CardTitle>
              <CardDescription>{module.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {module.status}
              </span>
              <Button size="sm" variant="outline">
                {module.action}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
