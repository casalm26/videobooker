"use client";

import { UsagePill } from '@videobooker/ui';
import type { LucideIcon } from 'lucide-react';
import {
  BarChart3,
  Building2,
  Calendar,
  ClipboardCheck,
  Library,
  ListChecks,
  MessageSquare,
  Settings as SettingsIcon,
  Sparkles,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { cn } from '../../lib/utils';

type NavItem = {
  href: string;
  label: string;
  description: string;
  icon: LucideIcon;
};

const navigation: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', description: 'Launch checklist overview', icon: ClipboardCheck },
  { href: '/business', label: 'Business', description: 'Profile & services', icon: Building2 },
  { href: '/create', label: 'Create', description: 'Templates & drafts', icon: Sparkles },
  { href: '/schedule', label: 'Schedule', description: 'Calendar & queue', icon: Calendar },
  { href: '/inbox', label: 'Inbox', description: 'DM handoffs', icon: MessageSquare },
  { href: '/bookings', label: 'Bookings', description: 'Appointments & availability', icon: Users },
  { href: '/analytics', label: 'Analytics', description: 'Performance trends', icon: BarChart3 },
  { href: '/library', label: 'Library', description: 'Brand kit & media', icon: Library },
  { href: '/settings', label: 'Settings', description: 'Business & billing', icon: SettingsIcon },
];

const checklistCompletion = 68;

export default function AppShellLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const renderNavLinks = () =>
    navigation.map((item) => {
      const isActive = pathname.startsWith(item.href);
      return (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'flex items-start gap-3 rounded-xl px-3 py-2 text-sm transition-colors',
            isActive
              ? 'bg-primary/10 text-primary'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground',
          )}
          onClick={() => setIsNavOpen(false)}
        >
          <item.icon className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <span className="flex flex-col">
            <span className="font-semibold">{item.label}</span>
            <span className="text-xs">{item.description}</span>
          </span>
        </Link>
      );
    });

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Desktop nav */}
      <aside className="relative hidden w-72 flex-col border-r border-border/60 bg-card/60 px-4 pb-10 pt-8 lg:flex">
        <div className="space-y-6 px-2">
          <div className="space-y-2">
            <Badge variant="accent" className="uppercase tracking-wider">
              Launch ready
            </Badge>
            <h1 className="text-2xl font-semibold tracking-tight">VideoBooker HQ</h1>
            <p className="text-sm text-muted-foreground">
              Publish your first promo and secure a booking within 30 minutes.
            </p>
          </div>
          <UsagePill used={3} total={4} label="Monthly videos" />
        </div>
        <nav className="mt-8 flex flex-1 flex-col gap-2 overflow-y-auto px-2">{renderNavLinks()}</nav>
        <Card className="mt-8 border-none bg-secondary/15">
          <CardContent className="space-y-3 p-4">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-secondary-foreground">Need a hand?</p>
              <p className="text-xs text-muted-foreground">
                Tap into the playbook or message support if you get stuck mid-launch.
              </p>
            </div>
            <Button size="sm" variant="secondary" className="w-full">
              View weekly playbook
            </Button>
          </CardContent>
        </Card>
      </aside>

      {/* Mobile nav trigger */}
      <div className="flex w-full flex-col">
        <header className="sticky top-0 z-30 border-b border-border/60 bg-background/95 backdrop-blur">
          <div className="flex items-center justify-between px-4 py-3 lg:px-8">
            <div className="flex items-center gap-3">
              <Button
                size="sm"
                variant="outline"
                className="lg:hidden"
                onClick={() => setIsNavOpen((value) => !value)}
              >
                <ListChecks className="h-4 w-4" />
                Menu
              </Button>
              <div className="hidden lg:flex flex-col">
                <span className="text-xs uppercase tracking-wide text-muted-foreground">Active business</span>
                <span className="text-sm font-semibold text-foreground">Demo Business</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button size="sm" variant="ghost">
                Invite teammate
              </Button>
              <Badge variant="outline" className="hidden border-primary/40 px-3 py-1 text-xs font-semibold text-primary lg:inline-flex">
                Starter · 3/4 videos used
              </Badge>
              <Avatar className="h-9 w-9">
                <AvatarFallback>JE</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div className="border-t border-border/60 bg-secondary/15 px-4 py-3 text-sm text-secondary-foreground lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="accent" className="uppercase tracking-wide">
                  Launch checklist
                </Badge>
                <span className="font-medium"> {checklistCompletion}% complete </span>
                <span className="text-muted-foreground">Keep going and secure that first booking.</span>
              </div>
              <Button size="sm" variant="ghost" className="hidden lg:inline-flex text-secondary-foreground hover:text-secondary-foreground">
                Resume steps
              </Button>
            </div>
          </div>
        </header>

        {/* Mobile nav overlay */}
        {isNavOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            onClick={() => setIsNavOpen(false)}
          >
            <nav
              className="absolute left-0 top-0 h-full w-72 bg-background px-4 py-6 shadow-xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-6 space-y-2">
                <Badge variant="accent" className="uppercase tracking-wider">
                  Launch ready
                </Badge>
                <h2 className="text-xl font-semibold">VideoBooker HQ</h2>
              </div>
              <div className="flex flex-col gap-2">{renderNavLinks()}</div>
            </nav>
          </div>
        )}

        <main className="flex-1">
          <div className="mx-auto w-full max-w-6xl px-4 py-10 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
