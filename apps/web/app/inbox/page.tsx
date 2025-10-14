import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';

export default function InboxPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="container py-16">
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">Inbox</h1>
          <p className="max-w-2xl text-muted-foreground">
            DM hand-offs, assistant replies, and booking-ready quick responses will live here. The current view keeps the space
            warm until real-time messaging lands.
          </p>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Conversation list</CardTitle>
              <CardDescription>Filter by new, bot-handled, or needs hand-off conversations.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Assistant mock data only</span>
              <Button size="sm">Jump to dashboard</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Quick replies</CardTitle>
              <CardDescription>Pre-scripted responses for pricing, availability, and hours.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Planned for messaging MVP</span>
              <Button size="sm" variant="outline">
                See roadmap
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
