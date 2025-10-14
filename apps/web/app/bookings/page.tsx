import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';

export default function BookingsPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="container py-16">
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">Bookings</h1>
          <p className="max-w-2xl text-muted-foreground">
            Monitor confirmed, completed, and no-show appointments. Provider sync and reschedule flows will plug into this page
            as integrations firm up.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Today&apos;s appointments</CardTitle>
              <CardDescription>Surface handoff context and upcoming guests at a glance.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Demo data only</span>
              <Button size="sm">Return to dashboard</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Source attribution</CardTitle>
              <CardDescription>Trace bookings back to the originating video, DM, or short link.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Rolling out with analytics MVP</span>
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
