import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="container py-16">
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">Settings</h1>
          <p className="max-w-2xl text-muted-foreground">
            Configure business details, integrations, billing, and team roles. These sections map directly to the admin flows in
            the roadmap.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Business profile</CardTitle>
              <CardDescription>Keep hours, locations, and service mappings up to date.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Editing UI coming soon</span>
              <Button size="sm">Edit profile</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Plan & billing</CardTitle>
              <CardDescription>Manage subscription, overages, and payment methods.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Stripe integration pending</span>
              <Button size="sm" variant="outline">
                View plan
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
