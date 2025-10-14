import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';

export default function SchedulePage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="container py-16">
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">Schedule</h1>
          <p className="max-w-2xl text-muted-foreground">
            Review and manage queued promos across platforms. Drag-and-drop calendar tooling and best-time suggestions will
            appear here as the scheduling experience evolves.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Weekly calendar</CardTitle>
              <CardDescription>Plan your cadence and resolve conflicts before publish time.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Prototype coming soon</span>
              <Button size="sm">Open dashboard</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Usage meter</CardTitle>
              <CardDescription>Track quota usage and bumps for Starter vs Pro plans.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">In design</span>
              <Button size="sm" variant="outline">
                View launch plan
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
