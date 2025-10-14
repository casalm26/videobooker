"use client";

import { Button, colors, radii, spacing, typography } from '@videobooker/ui';

import { useBusiness } from '../../lib/hooks/useBusiness';

type NavigationItem = {
  label: string;
  description: string;
  status?: 'default' | 'active' | 'locked';
  badge?: string;
};

const navigationItems: NavigationItem[] = [
  { label: 'Home', description: 'Launchpad overview', status: 'active' },
  { label: 'Create', description: 'Templates & drafts' },
  { label: 'Schedule', description: 'Calendar & queue' },
  { label: 'Inbox', description: 'DM handoffs' },
  { label: 'Bookings', description: 'Appointments & availability' },
  { label: 'Analytics', description: 'Performance trends' },
  { label: 'Library', description: 'Brand kit & media' },
  { label: 'Settings', description: 'Business & billing' },
];

const checklistItems = [
  { label: 'Connect Instagram & Facebook', complete: true },
  { label: 'Sync Calendly availability', complete: true },
  { label: 'Generate first video concepts', complete: true },
  { label: 'Publish a promo to Meta', complete: false },
  { label: 'Send yourself a DM test booking', complete: false },
  { label: 'Secure first booking', complete: false },
];

const quickActions = [
  { label: 'Generate new promo', helper: '3 fresh concepts in under 3 min' },
  { label: 'Schedule this week’s posts', helper: 'Drag onto optimal times' },
  { label: 'Review DM assistant', helper: 'Suggested replies ready' },
];

const upcomingSchedule = [
  {
    time: 'Today · 5:30 PM',
    platform: 'Instagram Reels',
    title: 'Fresh Fade Friday Promo',
    status: 'Scheduled',
  },
  {
    time: 'Thu · 10:00 AM',
    platform: 'Facebook Feed',
    title: 'Back-to-School Touch-Up',
    status: 'Needs caption',
  },
  {
    time: 'Sat · 9:15 AM',
    platform: 'Stories',
    title: 'Weekend Walk-in Slots',
    status: 'Draft',
  },
];

const inboxPreview = [
  {
    from: '@stylehunter21',
    message: '“Do you have any Saturday morning spots?”',
    intent: 'Availability',
    status: 'Assistant replied · Booking link sent',
  },
  {
    from: 'Taylor M.',
    message: '“Loved last video—can I book color + cut?”',
    intent: 'Service details',
    status: 'Waiting on you · Suggested reply ready',
  },
];

const performanceHighlights = [
  {
    stat: '3.2%',
    label: 'Video → booking conversion',
    trend: '+0.8% vs last week',
  },
  {
    stat: '4 / 4',
    label: 'Videos scheduled this month',
    trend: 'Starter plan fulfilled',
  },
  {
    stat: '6',
    label: 'DM bookings captured',
    trend: '+2 handoffs vs avg',
  },
];

const capsuleStyle = {
  fontSize: '0.75rem',
  padding: `${spacing.xs} ${spacing.sm}`,
  borderRadius: radii.pill,
  background: colors.primarySoft,
  color: colors.primary,
  fontWeight: 600,
  letterSpacing: '0.04em',
} as const;

export default function DashboardPage() {
  const { activeBusinessId, setActiveBusinessId } = useBusiness();

  const completedItems = checklistItems.filter((item) => item.complete).length;
  const completionPercent = Math.round((completedItems / checklistItems.length) * 100);

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: '280px 1fr',
        background: colors.canvas,
        color: colors.text,
      }}
    >
      <aside
        style={{
          background: colors.surface,
          borderRight: `1px solid ${colors.border}`,
          padding: spacing.lg,
          display: 'flex',
          flexDirection: 'column',
          gap: spacing.xl,
        }}
      >
        <div
          style={{
            background: 'linear-gradient(135deg, #1E7A78 0%, #2C9290 100%)',
            borderRadius: radii.lg,
            padding: spacing.lg,
            color: colors.surface,
            display: 'flex',
            flexDirection: 'column',
            gap: spacing.md,
          }}
        >
          <div>
            <span style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.8 }}>
              Welcome back
            </span>
            <h2
              style={{
                margin: 0,
                fontFamily: typography.displayFamily,
                fontSize: '1.5rem',
                fontWeight: 600,
              }}
            >
              VideoBooker HQ
            </h2>
          </div>
          <p style={{ margin: 0, opacity: 0.85 }}>
            You’re 2 steps away from your first booking this week. Keep the momentum going!
          </p>
          <Button
            style={{
              background: colors.surface,
              color: colors.primary,
              fontWeight: 600,
            }}
          >
            Continue launch checklist
          </Button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
          <span style={{ fontSize: '0.75rem', letterSpacing: '0.08em', color: colors.textSubtle }}>NAVIGATION</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm }}>
            {navigationItems.map((item) => {
              const isActive = item.status === 'active';
              return (
                <button
                  key={item.label}
                  type="button"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: spacing.xs,
                    padding: spacing.md,
                    borderRadius: radii.md,
                    border: `1px solid ${isActive ? colors.primary : colors.border}`,
                    background: isActive ? colors.primarySoft : colors.surface,
                    color: colors.text,
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ fontWeight: 600 }}>{item.label}</span>
                  <span style={{ fontSize: '0.85rem', color: colors.textSubtle }}>{item.description}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div
          style={{
            borderRadius: radii.lg,
            background: colors.surfaceMuted,
            padding: spacing.lg,
            display: 'flex',
            flexDirection: 'column',
            gap: spacing.md,
            border: `1px solid ${colors.border}`,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: colors.textSubtle, textTransform: 'uppercase' }}>Business</span>
              <h3 style={{ margin: 0 }}>{activeBusinessId}</h3>
            </div>
            <Button
              style={{ background: colors.surface, color: colors.primary }}
              onClick={() => {
                setActiveBusinessId('demo-business');
              }}
            >
              Switch
            </Button>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: spacing.xs,
              fontSize: '0.9rem',
              color: colors.textSubtle,
            }}
          >
            <span>Plan · Starter (4 videos / month)</span>
            <span>Usage · 3 published · 1 queued</span>
            <Button style={{ alignSelf: 'flex-start', paddingInline: spacing.md }}>Upgrade plan</Button>
          </div>
        </div>
      </aside>

      <div
        style={{
          padding: spacing['2xl'],
          display: 'flex',
          flexDirection: 'column',
          gap: spacing['2xl'],
        }}
      >
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.xs }}>
            <span style={capsuleStyle}>Launch checklist · 68% complete</span>
            <h1
              style={{
                margin: 0,
                fontFamily: typography.displayFamily,
                fontSize: '2.25rem',
                fontWeight: 600,
              }}
            >
              Publish first promo & capture first booking
            </h1>
            <p style={{ margin: 0, color: colors.textSubtle }}>
              Guided steps to generate your first content set, post across Meta, and respond to DM leads quickly.
            </p>
          </div>
          <Button style={{ paddingInline: spacing.lg, fontSize: '1rem' }}>Share feedback</Button>
        </header>

        <section
          style={{
            display: 'grid',
            gridTemplateColumns: '2.5fr 1fr',
            gap: spacing['2xl'],
            alignItems: 'start',
          }}
        >
          <div
            style={{
              background: colors.surface,
              borderRadius: radii.lg,
              padding: spacing.xl,
              border: `1px solid ${colors.border}`,
              boxShadow: '0 14px 30px rgba(16, 18, 35, 0.05)',
              display: 'flex',
              flexDirection: 'column',
              gap: spacing.lg,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ margin: 0, fontFamily: typography.subheadingFamily, fontSize: '1.5rem' }}>
                  30-minute launch plan
                </h2>
                <p style={{ margin: 0, color: colors.textSubtle }}>Keep momentum toward your first booking.</p>
              </div>
              <span style={{ ...capsuleStyle, background: colors.surfaceMuted, color: colors.text }}>
                {completionPercent}% complete
              </span>
            </div>

            <ol
              style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: spacing.sm,
              }}
            >
              {checklistItems.map((item) => (
                <li
                  key={item.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: spacing.md,
                    padding: spacing.md,
                    borderRadius: radii.md,
                    border: `1px solid ${item.complete ? colors.primary : colors.border}`,
                    background: item.complete ? colors.primarySoft : colors.surface,
                    color: colors.text,
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      width: '1.75rem',
                      height: '1.75rem',
                      borderRadius: '9999px',
                      background: item.complete ? colors.primary : colors.surfaceMuted,
                      border: `2px solid ${item.complete ? colors.primary : colors.border}`,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: colors.surface,
                      fontWeight: 600,
                    }}
                  >
                    {item.complete ? '✓' : ''}
                  </span>
                  <span style={{ fontWeight: 600 }}>{item.label}</span>
                  {item.complete ? (
                    <span style={{ marginLeft: 'auto', color: colors.primary }}>Done</span>
                  ) : (
                    <Button style={{ marginLeft: 'auto' }}>Continue</Button>
                  )}
                </li>
              ))}
            </ol>
          </div>

          <div
            style={{
              background: colors.surface,
              borderRadius: radii.lg,
              padding: spacing.xl,
              border: `1px solid ${colors.border}`,
              display: 'flex',
              flexDirection: 'column',
              gap: spacing.md,
              boxShadow: '0 14px 30px rgba(16, 18, 35, 0.05)',
            }}
          >
            <h3 style={{ margin: 0, fontFamily: typography.subheadingFamily }}>Upcoming schedule</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm }}>
              {upcomingSchedule.map((slot) => (
                <div
                  key={slot.title}
                  style={{
                    borderRadius: radii.md,
                    padding: spacing.md,
                    border: `1px solid ${colors.border}`,
                    background: colors.surfaceMuted,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: spacing.xs,
                  }}
                >
                  <span style={{ fontWeight: 600 }}>{slot.title}</span>
                  <span style={{ color: colors.textSubtle }}>{slot.platform}</span>
                  <span style={{ color: colors.textSubtle, fontSize: '0.875rem' }}>{slot.time}</span>
                  <span style={{ ...capsuleStyle, alignSelf: 'flex-start' }}>{slot.status}</span>
                </div>
              ))}
            </div>
            <Button style={{ alignSelf: 'flex-start' }}>Open calendar</Button>
          </div>
        </section>

        <section
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: spacing['2xl'],
            alignItems: 'start',
          }}
        >
          <div
            style={{
              background: colors.surface,
              borderRadius: radii.lg,
              padding: spacing.xl,
              border: `1px solid ${colors.border}`,
              boxShadow: '0 14px 30px rgba(16, 18, 35, 0.05)',
              display: 'flex',
              flexDirection: 'column',
              gap: spacing.lg,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: 0, fontFamily: typography.subheadingFamily, fontSize: '1.5rem' }}>
                  Performance at a glance
                </h3>
                <p style={{ margin: 0, color: colors.textSubtle }}>Track how video activity drives appointments and keep momentum.</p>
              </div>
              <Button style={{ background: colors.secondary, color: colors.text }}>View analytics</Button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: spacing.lg }}>
              {performanceHighlights.map((highlight) => (
                <div
                  key={highlight.label}
                  style={{
                    padding: spacing.lg,
                    borderRadius: radii.lg,
                    background: colors.surfaceMuted,
                    border: `1px solid ${colors.border}`,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: spacing.xs,
                  }}
                >
                  <span style={{ fontSize: '0.875rem', color: colors.textSubtle }}>{highlight.label}</span>
                  <span
                    style={{
                      fontFamily: typography.displayFamily,
                      fontSize: '2rem',
                      fontWeight: 600,
                      color: colors.primary,
                      fontFeatureSettings: '"tnum" 1',
                    }}
                  >
                    {highlight.stat}
                  </span>
                  <span style={{ color: colors.secondary, fontWeight: 600 }}>{highlight.trend}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: spacing.lg }}>
                {quickActions.map((action) => (
                  <div
                    key={action.label}
                    style={{
                      padding: spacing.lg,
                      borderRadius: radii.lg,
                      background: colors.surface,
                      border: `1px solid ${colors.border}`,
                      boxShadow: '0 12px 24px rgba(16, 18, 35, 0.05)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: spacing.xs,
                      minWidth: '220px',
                    }}
                  >
                    <span style={{ fontWeight: 600 }}>{action.label}</span>
                    <span style={{ color: colors.textSubtle }}>{action.helper}</span>
                    <Button style={{ alignSelf: 'flex-start', marginTop: spacing.sm }}>Launch</Button>
                  </div>
                ))}
              </div>
              <Button>Weekly playbook</Button>
            </div>
          </div>

          <div
            style={{
              background: colors.surface,
              borderRadius: radii.lg,
              padding: spacing.xl,
              border: `1px solid ${colors.border}`,
              boxShadow: '0 14px 30px rgba(16, 18, 35, 0.05)',
              display: 'flex',
              flexDirection: 'column',
              gap: spacing.md,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontFamily: typography.subheadingFamily, fontSize: '1.25rem' }}>Inbox spotlight</h3>
              <span style={{ fontSize: '0.75rem', color: colors.textSubtle }}>DM assistant active</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm }}>
              {inboxPreview.map((thread) => (
                <div
                  key={thread.from}
                  style={{
                    borderRadius: radii.md,
                    padding: spacing.md,
                    border: `1px solid ${colors.border}`,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: spacing.xs,
                    background: colors.surfaceMuted,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 600 }}>{thread.from}</span>
                    <span style={{ ...capsuleStyle, background: colors.secondary, color: colors.surface }}>{thread.intent}</span>
                  </div>
                  <span style={{ color: colors.text }}>{thread.message}</span>
                  <span style={{ color: colors.textSubtle, fontSize: '0.875rem' }}>{thread.status}</span>
                </div>
              ))}
            </div>
            <Button style={{ alignSelf: 'flex-start' }}>Go to inbox</Button>
          </div>
        </section>
      </div>
    </main>
  );
}
