import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';

export default function LibraryPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="container py-16">
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">Library</h1>
          <p className="max-w-2xl text-muted-foreground">
            Manage brand assets, saved offers, and reusable templates. This hub ties directly into the Create and Schedule
            surfaces.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Brand kit</CardTitle>
              <CardDescription>Logos, colors, fonts, subtitle styles, and accessibility helpers.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Editing coming soon</span>
              <Button size="sm">Update colors</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Offers</CardTitle>
              <CardDescription>Reusable snippets, seasonal suggestions, and CTA defaults.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Templates ready to seed</span>
              <Button size="sm" variant="outline">
                View offers
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Media & templates</CardTitle>
              <CardDescription>Uploaded clips, licensed stock, and best-performing layouts.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Hooks up with asset pipeline</span>
              <Button size="sm" variant="outline">
                Browse assets
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
