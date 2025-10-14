import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';

export default function CreatePage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="container py-16">
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">Create</h1>
          <p className="max-w-2xl text-muted-foreground">
            Spin up campaign drafts, concept variations, and end cards. This surface will house the template gallery and light
            editor described in the PRD. For now, here’s a quick link to jump back into the guided launch checklist.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Template gallery</CardTitle>
              <CardDescription>Browse vertical-specific starting points with safe areas and tone guidance.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Launches soon</span>
              <Button size="sm">Return to dashboard</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Light editor</CardTitle>
              <CardDescription>Tweak copy buckets, brand locks, music and VO selections in one view.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Coming in Phase 3</span>
              <Button size="sm" variant="outline">
                View roadmap
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
