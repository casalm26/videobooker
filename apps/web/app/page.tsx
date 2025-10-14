import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  CalendarCheck2,
  Clock3,
  Clapperboard,
  LineChart,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Store,
  Workflow,
  Palette,
  Share2,
} from 'lucide-react';

import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card';

const launchSteps: Array<{
  icon: LucideIcon;
  title: string;
  timeline: string;
  description: string;
}> = [
  {
    icon: Store,
    title: 'Business profile',
    timeline: '2 minutes',
    description: 'Choose your vertical, top services, hours, and locations with proven defaults ready to go.',
  },
  {
    icon: Share2,
    title: 'Connect social accounts',
    timeline: '2 minutes',
    description: 'OAuth for Instagram and Facebook with a benefit checklist and sandbox test publish button.',
  },
  {
    icon: CalendarCheck2,
    title: 'Booking integration',
    timeline: '3 minutes',
    description: 'Link Calendly or Acuity, map services to durations, and preview availability inside the flow.',
  },
  {
    icon: Palette,
    title: 'Brand kit essentials',
    timeline: '2 minutes',
    description: 'Upload your logo, lock colors, and pick a font pairing with instant accessibility contrast checks.',
  },
  {
    icon: Sparkles,
    title: 'Kick-off offer',
    timeline: '1 minute',
    description: 'Select a high-performing offer template for your category with CTA defaults and messaging tips.',
  },
  {
    icon: Clapperboard,
    title: 'Generate first concepts',
    timeline: '≤ 3 minutes',
    description: 'Spin up three promo-ready concepts with render progress that falls back automatically if needed.',
  },
];

const flowHighlights: Array<{
  icon: LucideIcon;
  title: string;
  description: string;
  metric: string;
}> = [
  {
    icon: Workflow,
    title: 'One connected flow',
    description:
      'Creation, scheduling, DM hand-offs, and bookings stay in the same workspace with handoffs that feel effortless.',
    metric: 'Create → Post → DM → Book',
  },
  {
    icon: MessageCircle,
    title: 'DM assistant ready out-of-the-box',
    description:
      'Intent-aware replies send availability, capture leads, and loop you in for handoffs with contextual nudges.',
    metric: '6 intents tracked from day one',
  },
  {
    icon: LineChart,
    title: 'Booking-focused analytics',
    description:
      'Start every session with a bookings-first dashboard that tells you what to publish next and why it matters.',
    metric: 'Video → appointment conversion surfaced',
  },
  {
    icon: ShieldCheck,
    title: 'Guardrails without friction',
    description:
      'Rate limits, permissions, and fail-safes keep experiments safe while you scale production and publishing.',
    metric: 'Feature flags + audit log baked in',
  },
];

const testimonials = [
  {
    name: 'Jordan Ellis',
    role: 'Owner, Harbor & Hue Salon',
    quote:
      'We launched our first polished promo and filled two new appointment blocks before lunch. The 30-minute checklist is exactly what studio owners need.',
    initials: 'JE',
  },
];

const heroStats = [
  { label: 'Time to first publish', value: '≤ 30 min', supporting: 'Guided checklist from blank slate to live promo.' },
  { label: 'Drafts generated', value: '3 concepts', supporting: 'Ready to refine, schedule, or auto-publish.' },
  { label: 'Bookings captured', value: '+22%', supporting: 'DM assistant + smart offers keep the calendar full.' },
];

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="absolute inset-0 bg-hero-grid [background-size:22px_22px] opacity-60" aria-hidden="true" />
        <div className="container relative flex flex-col gap-12 py-24 lg:py-32">
          <div className="max-w-3xl space-y-6">
            <Badge className="w-fit" variant="accent">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-accent-foreground">
                <Sparkles className="h-4 w-4" /> Guided 30-Minute Launch
              </div>
            </Badge>
            <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Launch video marketing and bookings in one guided flow.
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              VideoBooker walks local service businesses from blank slate to a published promo and first booking in under
              thirty minutes. Opinionated templates, connected automations, and an assistant that never forgets the follow-up.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button size="lg" className="gap-2">
                Start the launch checklist
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                See product tour
                <Clock3 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {heroStats.map((stat) => (
              <Card key={stat.label} className="border-none bg-card/80 backdrop-blur">
                <CardContent className="space-y-2 p-6">
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{stat.label}</p>
                  <p className="text-3xl font-semibold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.supporting}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-24">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="secondary" className="mx-auto mb-4 w-fit">
            Built for speed to value
          </Badge>
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            The 30-minute launch checklist keeps owners moving forward
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Each step is pre-filled with smart defaults and clear guardrails so teams get to their first published promo and
            first booking without slowing down for setup hurdles.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {launchSteps.map((step) => (
            <Card key={step.title} className="h-full border-border/70 bg-card/90">
              <CardHeader className="flex flex-row items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <step.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="space-y-1">
                  <CardTitle>{step.title}</CardTitle>
                  <CardDescription className="text-xs font-semibold uppercase text-primary">{step.timeline}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="relative bg-primary/5 py-24">
        <div className="container grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <div className="space-y-6">
            <Badge variant="accent" className="w-fit">
              Connected workflow
            </Badge>
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              From template to booked appointment without losing context
            </h2>
            <p className="text-lg text-muted-foreground">
              Creation, scheduling, DM assistance, and analytics share the same source of truth. Every render, post, and
              booking is annotated so you always know what moved the needle.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {flowHighlights.map((item) => (
                <Card key={item.title} className="border-none bg-card/90 shadow-soft-md">
                  <CardHeader className="space-y-2">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/10 text-secondary-foreground">
                      <item.icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-muted-foreground">
                    <p>{item.description}</p>
                    <p className="font-semibold text-secondary">{item.metric}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <Card className="border-none bg-card shadow-soft-lg">
            <CardHeader>
              <CardTitle className="text-2xl">What owners experience</CardTitle>
              <CardDescription>Every cohort starts with a guided launch and ends with actionable results.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2 rounded-2xl bg-muted/60 p-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-semibold text-primary">82%</span>
                  <span className="text-sm text-muted-foreground">reach the success screen on day one</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  The checklist keeps momentum by sequencing tasks the way owners actually work. No guessing, no detours.
                </p>
              </div>
              <div className="space-y-2 rounded-2xl bg-secondary/10 p-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-semibold text-secondary-foreground">3.2%</span>
                  <span className="text-sm text-muted-foreground">average video → booking conversion</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Offers, CTA end-cards, and DM assistant prompts stay synced so every promo drives toward the calendar.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container py-24">
        <div className="grid gap-10 lg:grid-cols-[2fr_1fr] lg:items-start">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="w-fit">
                Neighborhood ally promise
              </Badge>
              <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                Quiet power that keeps owners in control
              </h2>
              <p className="text-lg text-muted-foreground">
                Built for service providers who want polished marketing without hiring an agency. VideoBooker gives you the
                playbook, automation, and safety net while you keep the relationship with every customer.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-border bg-card/80">
                <CardHeader>
                  <CardTitle className="text-lg">Guardrails over guesswork</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>Template-first creation with safe areas, auto ratios, and disclosures ready for compliance.</p>
                  <p>Undo, retries, and reconnect CTAs keep launches resilient—even when APIs misbehave.</p>
                </CardContent>
              </Card>
              <Card className="border-border bg-card/80">
                <CardHeader>
                  <CardTitle className="text-lg">Made for the whole team</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>Owner, Staff, and Billing roles ensure the right teammates see the right surfaces.</p>
                  <p>Plan-aware nudges highlight when it’s time to upgrade without getting in the way.</p>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="space-y-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="border-none bg-card shadow-soft-md">
                <CardContent className="space-y-5 p-8">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback>{testimonial.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-lg leading-relaxed text-muted-foreground">“{testimonial.quote}”</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-y border-border/70 bg-gradient-to-br from-primary/95 via-primary to-primary/90 text-primary-foreground">
        <div className="container flex flex-col gap-8 py-20 text-center">
          <div className="mx-auto max-w-3xl space-y-4">
            <Badge variant="outline" className="border-primary-foreground/30 text-primary-foreground">
              Ready when you are
            </Badge>
            <h2 className="text-balance text-4xl font-semibold leading-tight md:text-5xl">
              Publish your first promo and capture your first booking before the day ends.
            </h2>
            <p className="text-lg text-primary-foreground/80">
              Join the next cohort and let VideoBooker pair templates, scheduling, DM replies, and analytics so you can focus on
              the craft—not the tools.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              Reserve your onboarding slot
            </Button>
            <Button variant="ghost" size="lg" className="text-primary-foreground hover:bg-primary-foreground/10">
              Talk to a product specialist
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
