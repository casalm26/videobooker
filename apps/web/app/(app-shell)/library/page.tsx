import { Button } from '../../../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';

const libraryModules = [
  {
    title: 'Brand kit',
    description: 'Logos, colors, fonts, subtitle styles, and accessibility helpers.',
    status: 'Editing coming soon',
    action: 'Update colors',
  },
  {
    title: 'Offers',
    description: 'Reusable snippets, seasonal suggestions, and CTA defaults.',
    status: 'Templates ready to seed',
    action: 'View offers',
  },
  {
    title: 'Media & templates',
    description: 'Uploaded clips, licensed stock, and best-performing layouts.',
    status: 'Hooks up with asset pipeline',
    action: 'Browse assets',
  },
];

export default function LibraryPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Library</h1>
        <p className="max-w-2xl text-muted-foreground">
          Manage brand assets, saved offers, and reusable templates. This hub ties directly into Create, Schedule, and the DM
          assistant.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {libraryModules.map((module) => (
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
