"use client";

import { Button, colors, radii, spacing, typography } from '@videobooker/ui';

import { useBusiness } from '../lib/hooks/useBusiness';

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

export default function HomePage() {
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
            boxShadow: '0 12px 32px rgba(30, 122, 120, 0.25)',
          }}
        >
          <div style={{ fontFamily: typography.displayFamily, fontSize: '1.25rem', fontWeight: 600 }}>VideoBooker</div>
          <p style={{ marginTop: spacing.sm, lineHeight: 1.5 }}>
            Guided launch mode keeps you on track. Publish your first promo and land a booking in under 30 minutes.
          </p>
          <div style={{ marginTop: spacing.md }}>
            <Button onClick={() => setActiveBusinessId(activeBusinessId ? null : 'demo-business')}>
              {activeBusinessId ? 'Switch business' : 'Load demo data'}
            </Button>
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm }}>
          {navigationItems.map((item) => {
            const isActive = item.status === 'active';
            return (
              <button
                key={item.label}
                type="button"
                style={{
                  textAlign: 'left',
                  padding: spacing.md,
                  borderRadius: radii.md,
                  border: `1px solid ${isActive ? colors.primary : colors.border}`,
                  background: isActive ? colors.primarySoft : colors.surface,
                  color: colors.text,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: spacing.xs,
                  fontFamily: typography.fontFamily,
                }}
              >
                <span style={{ fontWeight: 600 }}>{item.label}</span>
                <span style={{ color: colors.textSubtle, fontSize: '0.875rem' }}>{item.description}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      <div style={{ display: 'flex', flexDirection: 'column', padding: spacing['2xl'], gap: spacing['2xl'] }}>
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: spacing.lg,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.xs }}>
            <span style={{ ...capsuleStyle, width: 'fit-content' }}>30-Minute Launch</span>
            <h1
              style={{
                fontFamily: typography.displayFamily,
                fontSize: '2rem',
                margin: 0,
                letterSpacing: '-0.01em',
              }}
            >
              Welcome back{activeBusinessId ? `, ${activeBusinessId.replace('-', ' ')}` : ''}
            </h1>
            <span style={{ color: colors.textSubtle }}>Let’s get your next promo published and booked.</span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: spacing.md,
            }}
          >
            <div
              style={{
                padding: `${spacing.xs} ${spacing.md}`,
                borderRadius: radii.pill,
                border: `1px solid ${colors.border}`,
                background: colors.surface,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: spacing.xxs,
                minWidth: '180px',
              }}
            >
              <span style={{ fontSize: '0.75rem', color: colors.textSubtle }}>Plan usage</span>
              <span style={{ fontWeight: 600 }}>Starter · 4 / 4 videos scheduled</span>
            </div>
            <Button>Create new video</Button>
          </div>
        </header>

        <section
          style={{
            background: 'linear-gradient(120deg, rgba(30, 122, 120, 0.95) 0%, rgba(43, 146, 144, 0.85) 100%)',
            borderRadius: radii.lg,
            padding: spacing['2xl'],
            color: colors.surface,
            boxShadow: '0 18px 40px rgba(30, 122, 120, 0.3)',
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr',
            gap: spacing['2xl'],
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
            <div style={{ ...capsuleStyle, background: 'rgba(255, 255, 255, 0.16)', color: colors.surface }}>Guided track</div>
            <h2
              style={{
                fontFamily: typography.displayFamily,
                fontSize: '2.25rem',
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              Publish now and your DM assistant will hand off bookings with your latest availability.
            </h2>
            <p style={{ margin: 0, lineHeight: 1.6 }}>
              Nice—your IG Reel is queued for this evening. Finish the checklist to unlock auto-posting suggestions and DM handoffs.
            </p>
            <div style={{ display: 'flex', gap: spacing.md }}>
              <Button>Open checklist</Button>
              <Button style={{ background: 'rgba(255, 255, 255, 0.12)', color: colors.surface, boxShadow: 'none' }}>
                Preview reel
              </Button>
            </div>
          </div>
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.12)',
              borderRadius: radii.lg,
              padding: spacing.xl,
              display: 'flex',
              flexDirection: 'column',
              gap: spacing.md,
            }}
          >
            <div style={{ fontSize: '0.875rem', letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.9 }}>
              Launch progress
            </div>
            <div style={{ fontFamily: typography.displayFamily, fontSize: '2.5rem', fontWeight: 600 }}>{completionPercent}%</div>
            <div style={{ color: 'rgba(255, 255, 255, 0.85)' }}>{completedItems} of {checklistItems.length} milestones complete</div>
            <div
              style={{
                position: 'relative',
                height: '12px',
                borderRadius: radii.pill,
                background: 'rgba(255, 255, 255, 0.22)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  bottom: 0,
                  width: `${completionPercent}%`,
                  background: colors.secondary,
                  borderRadius: radii.pill,
                }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.xs }}>
              {checklistItems.slice(0, 3).map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: spacing.sm,
                    fontSize: '0.875rem',
                    color: 'rgba(255, 255, 255, 0.85)',
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      background: item.complete ? colors.secondary : 'transparent',
                      border: `2px solid ${colors.surface}`,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.6rem',
                      fontWeight: 700,
                      color: colors.surface,
                    }}
                  >
                    {item.complete ? '✓' : ''}
                  </span>
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr',
            gap: spacing['2xl'],
          }}
        >
          <div
            style={{
              background: colors.surface,
              borderRadius: radii.lg,
              padding: spacing.xl,
              boxShadow: '0 20px 50px rgba(16, 18, 35, 0.08)',
              border: `1px solid ${colors.border}`,
              display: 'flex',
              flexDirection: 'column',
              gap: spacing.lg,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: 0, fontFamily: typography.subheadingFamily, fontSize: '1.5rem' }}>
                  30-minute launch checklist
                </h3>
                <p style={{ margin: 0, color: colors.textSubtle }}>Stay on the guided path—finish these steps to unlock automated nudges.</p>
              </div>
              <span style={capsuleStyle}>{completedItems} / {checklistItems.length} done</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm }}>
              {checklistItems.map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: `${spacing.sm} ${spacing.md}`,
                    borderRadius: radii.md,
                    background: item.complete ? colors.primarySoft : colors.surfaceMuted,
                    border: `1px solid ${item.complete ? colors.primary : colors.border}`,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: spacing.md }}>
                    <span
                      aria-hidden
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        border: `2px solid ${item.complete ? colors.primary : colors.border}`,
                        background: item.complete ? colors.primary : colors.surface,
                        color: item.complete ? colors.surface : colors.textSubtle,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                      }}
                    >
                      {item.complete ? '✓' : ''}
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.xxs }}>
                      <span style={{ fontWeight: 600 }}>{item.label}</span>
                      <span style={{ color: colors.textSubtle, fontSize: '0.875rem' }}>
                        {item.complete ? 'Completed' : 'Next up'}
                      </span>
                    </div>
                  </div>
                  {!item.complete && (
                    <Button style={{ background: colors.secondary, color: colors.text }}>Open step</Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing['2xl'] }}>
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
                <h3 style={{ margin: 0, fontFamily: typography.subheadingFamily, fontSize: '1.25rem' }}>Upcoming schedule</h3>
                <span style={{ fontSize: '0.75rem', color: colors.textSubtle }}>Auto-post suggestions ready</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm }}>
                {upcomingSchedule.map((entry) => (
                  <div
                    key={`${entry.time}-${entry.title}`}
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
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 600 }}>{entry.title}</span>
                      <span style={capsuleStyle}>{entry.platform}</span>
                    </div>
                    <span style={{ color: colors.textSubtle, fontSize: '0.875rem' }}>{entry.time}</span>
                    <span style={{ color: entry.status === 'Scheduled' ? colors.accent : colors.secondary, fontWeight: 600 }}>
                      {entry.status}
                    </span>
                  </div>
                ))}
              </div>
              <Button style={{ alignSelf: 'flex-start' }}>Open calendar</Button>
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
          </div>
        </section>

        <section
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
        </section>
      </div>
    </main>
  );
}
