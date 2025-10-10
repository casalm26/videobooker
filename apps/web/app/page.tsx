'use client';

import { Button } from '@videobooker/ui';

import styles from './page.module.css';
import { useBusiness } from '../lib/hooks/useBusiness';

type StepStatus = 'complete' | 'current' | 'upcoming';

type ChecklistItem = {
  label: string;
  status: StepStatus;
};

type OnboardingStep = {
  title: string;
  description: string;
  status: StepStatus;
  badges?: string[];
};

const navigationItems = [
  'Home',
  'Create',
  'Schedule',
  'Inbox',
  'Bookings',
  'Analytics',
  'Library',
  'Settings',
] as const;

const checklistItems: ChecklistItem[] = [
  { label: 'Connect IG / FB', status: 'complete' },
  { label: 'Connect Calendly', status: 'current' },
  { label: 'Generate first video', status: 'upcoming' },
  { label: 'Publish to IG / FB', status: 'upcoming' },
  { label: 'Send test DM', status: 'upcoming' },
  { label: 'Get first booking', status: 'upcoming' },
];

const onboardingSteps: OnboardingStep[] = [
  {
    title: 'Business profile',
    description: 'Category presets applied. Services & hours synced.',
    status: 'complete',
    badges: ['2 min'],
  },
  {
    title: 'Connect social (Meta)',
    description: 'IG + FB connected. Sandbox test ready.',
    status: 'complete',
    badges: ['Auto test publish'],
  },
  {
    title: 'Booking integration',
    description: 'Calendly connected. Map top 3 services to event types.',
    status: 'current',
    badges: ['Availability preview live'],
  },
  {
    title: 'Brand kit',
    description: 'Logo uploaded, color contrast checks ready.',
    status: 'upcoming',
  },
  {
    title: 'Offers & CTA',
    description: 'Pick a kickoff offer & confirm CTA defaults.',
    status: 'upcoming',
  },
  {
    title: 'Generate first set',
    description: '3 video concepts with auto captions in under 3 minutes.',
    status: 'upcoming',
  },
];

const renderStages = [
  { label: 'Script', status: 'complete' as StepStatus },
  { label: 'Scenes', status: 'complete' as StepStatus },
  { label: 'Voice & music', status: 'current' as StepStatus },
  { label: 'Render', status: 'upcoming' as StepStatus },
];

const scheduleCards = [
  {
    title: 'Glow-up promo',
    platform: 'IG Reels',
    time: 'Today · 5:30 PM',
    status: 'scheduled' as const,
  },
  {
    title: 'Behind-the-chair tips',
    platform: 'Facebook',
    time: 'Thu · 11:00 AM',
    status: 'published' as const,
  },
  {
    title: 'Weekend flash offer',
    platform: 'IG Reels',
    time: 'Sat · 9:00 AM',
    status: 'needsAction' as const,
  },
  {
    title: 'Referral shoutout',
    platform: 'Facebook',
    time: 'Draft',
    status: 'scheduled' as const,
  },
];

const inboxMessages = [
  {
    from: 'Ava J.',
    snippet: '“Do you have openings Friday afternoon?”',
    intents: ['availability', 'booking'],
    status: 'Bot drafted reply · needs approval',
  },
  {
    from: 'Marcus P.',
    snippet: '“What does the glow facial include?”',
    intents: ['offer info'],
    status: 'Bot sent CTA · tracking clicks',
  },
];

const bookingSnapshot = [
  { label: 'Today', value: '3 visits' },
  { label: 'This week', value: '11 new bookings' },
  { label: 'No-show rate', value: '2%' },
];

const funnelMetrics = [
  { label: 'Views → Click / DM', value: '3.8%', delta: '+0.7%' },
  { label: 'Click / DM → Booked', value: '27%', delta: '+4.2%' },
  { label: 'Bookings this month', value: '18', delta: '+5 vs last' },
];

const topVideos = [
  { title: 'Autumn balayage promo', platform: 'IG Reels', metric: '7 bookings' },
  { title: 'Refer-a-friend push', platform: 'Facebook', metric: '4 bookings' },
  { title: 'Holiday gift cards', platform: 'IG Stories', metric: '3 bookings' },
];

function classNames(...names: Array<string | false | null | undefined>) {
  return names.filter(Boolean).join(' ');
}

function statusClass(status: StepStatus) {
  switch (status) {
    case 'complete':
      return styles.statusComplete;
    case 'current':
      return styles.statusCurrent;
    case 'upcoming':
    default:
      return styles.statusUpcoming;
  }
}

function stepIndicatorClass(status: StepStatus) {
  switch (status) {
    case 'complete':
      return styles.stepComplete;
    case 'current':
      return styles.stepCurrent;
    case 'upcoming':
    default:
      return styles.stepUpcoming;
  }
}

export default function HomePage() {
  const { activeBusinessId, setActiveBusinessId } = useBusiness();
  const completedChecklist = checklistItems.filter((item) => item.status === 'complete').length;
  const progressPercent = (completedChecklist / checklistItems.length) * 100;

  return (
    <div className={styles.appShell}>
      <aside className={styles.navRail}>
        <div>
          <div className={styles.logo}>VideoBooker</div>
        </div>
        <div className={styles.navSection}>
          <span className={styles.navLabel}>Launch flow</span>
          {navigationItems.map((item, index) => (
            <div
              key={item}
              className={classNames(
                styles.navItem,
                index === 0 ? styles.navItemActive : undefined,
              )}
            >
              <span>{item}</span>
              {index === 0 ? <span>•</span> : null}
            </div>
          ))}
        </div>
        <div className={styles.planCard}>
          <div className={styles.planTitle}>Starter plan</div>
          <div className={styles.planUsage}>
            <span>Videos</span>
            <strong>3 / 4 used</strong>
          </div>
          <div className={styles.sectionDivider} />
          <div className={styles.planUsage}>
            <span>DM assistant</span>
            <span className={styles.usagePill}>Active</span>
          </div>
          <div className={styles.sectionDivider} />
          <Button type="button">Upgrade to Pro</Button>
        </div>
      </aside>
      <div className={styles.mainColumn}>
        <header className={styles.topBar}>
          <div className={styles.topBarGroup}>
            <div className={styles.businessSwitcher}>
              <span className={styles.businessBadge}>
                {activeBusinessId ?? 'Demo Salon'}
              </span>
              <Button
                type="button"
                onClick={() =>
                  setActiveBusinessId(activeBusinessId ? null : 'Glow Theory Salon')
                }
              >
                {activeBusinessId ? 'Switch business' : 'Use my business'}
              </Button>
            </div>
            <div className={styles.usageSummary}>
              <span>Usage: 3 / 4 videos · 1 / 1 bookings integration</span>
            </div>
          </div>
          <div className={styles.topBarGroup}>
            <Button type="button">Help & playbook</Button>
            <div className={styles.avatar}>MJ</div>
          </div>
        </header>

        <section className={styles.checklistBanner}>
          <div className={styles.checklistHeader}>
            <div>
              <h2>30-minute launch checklist</h2>
              <p>Stay on track to publish your first promo and capture a booking today.</p>
            </div>
            <div className={styles.topBarGroup}>
              <div className={styles.progressMeta}>
                <span>
                  {completedChecklist} / {checklistItems.length} complete
                </span>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: `${progressPercent}%` }} />
                </div>
              </div>
              <Button type="button">Resume guided launch</Button>
            </div>
          </div>
          <div className={styles.checklistItems}>
            {checklistItems.map((item) => (
              <div key={item.label} className={styles.checklistItem}>
                <span className={classNames(styles.checklistItemStatus, statusClass(item.status))}>
                  {item.status === 'complete' ? '✓' : item.status === 'current' ? '•' : ''}
                </span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        <main className={styles.contentArea}>
          <div className={styles.primaryGrid}>
            <section className={styles.panel}>
              <div className={styles.panelHeader}>
                <div>
                  <h3 className={styles.panelTitle}>Onboarding timeline</h3>
                  <p className={styles.panelSubtitle}>
                    Finish the guided setup to unlock your first three video concepts.
                  </p>
                </div>
                <Button type="button">View details</Button>
              </div>
              <div className={styles.timeline}>
                {onboardingSteps.map((step, index) => (
                  <div key={step.title} className={styles.timelineStep}>
                    <div className={classNames(styles.stepIndicator, stepIndicatorClass(step.status))}>
                      {step.status === 'complete' ? '✓' : index + 1}
                    </div>
                    <div className={styles.stepContent}>
                      <div className={styles.stepTitle}>{step.title}</div>
                      <p className={styles.panelSubtitle}>{step.description}</p>
                      {step.badges ? (
                        <div className={styles.badgeRow}>
                          {step.badges.map((badge) => (
                            <span key={badge} className={styles.badge}>
                              {badge}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className={styles.panel}>
              <div className={styles.panelHeader}>
                <div>
                  <h3 className={styles.panelTitle}>Render queue</h3>
                  <p className={styles.panelSubtitle}>
                    Tracking Glow Theory promo set – fallback provider on standby.
                  </p>
                </div>
                <Button type="button">View activity</Button>
              </div>
              <div className={styles.timeline}>
                {renderStages.map((stage) => (
                  <div key={stage.label} className={styles.timelineStep}>
                    <div className={classNames(styles.stepIndicator, stepIndicatorClass(stage.status))}>
                      {stage.status === 'complete' ? '✓' : '•'}
                    </div>
                    <div className={styles.stepContent}>
                      <div className={styles.stepTitle}>{stage.label}</div>
                      <p className={styles.panelSubtitle}>
                        {stage.status === 'current'
                          ? 'Auto-leveling voiceover, balancing music mix.'
                          : stage.status === 'complete'
                            ? 'Done'
                            : 'Queued'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.sectionDivider} />
              <div className={styles.tableList}>
                <div className={styles.tableRow}>
                  <span>ETA</span>
                  <strong>02:12 remaining</strong>
                </div>
                <div className={styles.tableRow}>
                  <span>Formats</span>
                  <span>9:16 · 1:1 · 16:9</span>
                </div>
                <div className={styles.tableRow}>
                  <span>Next action</span>
                  <Button type="button">Schedule all 3</Button>
                </div>
              </div>
            </section>
          </div>

          <section className={styles.panel}>
            <div className={styles.panelHeader}>
              <div>
                <h3 className={styles.panelTitle}>Concept workspace</h3>
                <p className={styles.panelSubtitle}>
                  Variation A · “New season, new you” – safe areas locked, captions on by default.
                </p>
              </div>
              <Button type="button">Generate 3 new concepts</Button>
            </div>
            <div className={styles.splitLayout}>
              <div>
                <div className={styles.previewFrame}>
                  <div className={styles.previewSafeArea} />
                  <div className={styles.previewCopy}>
                    <p>“Glow Theory Salon”</p>
                    <p>Hook: “Fall into luminous color”</p>
                    <p>CTA: “Book Friday in 60 seconds”</p>
                  </div>
                </div>
              </div>
              <div className={styles.splitLayout}>
                <div className={styles.copyBucket}>
                  <span className={styles.bucketTitle}>Hook</span>
                  <div className={styles.bucketText}>
                    September glow-ups are 20% off for returning guests.
                  </div>
                  <Button type="button">A/B toggle</Button>
                </div>
                <div className={styles.copyBucket}>
                  <span className={styles.bucketTitle}>Body</span>
                  <div className={styles.bucketText}>
                    Custom balayage with bond builder, scalp massage, and take-home gloss kit included.
                  </div>
                  <Button type="button">Edit copy</Button>
                </div>
                <div className={styles.copyBucket}>
                  <span className={styles.bucketTitle}>Offer</span>
                  <div className={styles.bucketText}>
                    VIP upgrade: add LED glow facial for $45 (normally $65).
                  </div>
                  <Button type="button">Swap offer</Button>
                </div>
                <div className={styles.copyBucket}>
                  <span className={styles.bucketTitle}>CTA</span>
                  <div className={styles.bucketText}>Book now · Calendly synced · DM fallback ready.</div>
                  <Button type="button">Test booking link</Button>
                </div>
              </div>
            </div>
          </section>

          <div className={styles.primaryGrid}>
            <section className={styles.panel}>
              <div className={styles.panelHeader}>
                <div>
                  <h3 className={styles.panelTitle}>Publishing & calendar</h3>
                  <p className={styles.panelSubtitle}>
                    Drag to reschedule. Usage meter nudges when you’re off cadence.
                  </p>
                </div>
                <Button type="button">Open calendar</Button>
              </div>
              <div className={styles.calendarPreview}>
                {scheduleCards.map((card) => (
                  <div key={card.title} className={styles.calendarCard}>
                    <span
                      className={classNames(
                        styles.statusChip,
                        card.status === 'scheduled'
                          ? styles.statusScheduled
                          : card.status === 'published'
                            ? styles.statusPublished
                            : styles.statusNeedsAction,
                      )}
                    >
                      {card.status === 'scheduled'
                        ? 'Scheduled'
                        : card.status === 'published'
                          ? 'Published'
                          : 'Needs action'}
                    </span>
                    <strong>{card.title}</strong>
                    <span className={styles.panelSubtitle}>{card.platform}</span>
                    <span>{card.time}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className={styles.panel}>
              <div className={styles.panelHeader}>
                <div>
                  <h3 className={styles.panelTitle}>Inbox triage</h3>
                  <p className={styles.panelSubtitle}>
                    Intent detection highlights booking-ready conversations.
                  </p>
                </div>
                <Button type="button">Open inbox</Button>
              </div>
              <div className={styles.inboxList}>
                {inboxMessages.map((message) => (
                  <div key={message.from} className={styles.inboxMessage}>
                    <div>
                      <strong>{message.from}</strong>
                      <p className={styles.panelSubtitle}>{message.snippet}</p>
                    </div>
                    <div className={styles.intentChips}>
                      {message.intents.map((intent) => (
                        <span key={intent} className={styles.intentChip}>
                          {intent}
                        </span>
                      ))}
                    </div>
                    <span className={styles.panelSubtitle}>{message.status}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className={styles.primaryGrid}>
            <section className={styles.panel}>
              <div className={styles.panelHeader}>
                <div>
                  <h3 className={styles.panelTitle}>Bookings pulse</h3>
                  <p className={styles.panelSubtitle}>
                    Track appointments sourced from your latest promos.
                  </p>
                </div>
                <Button type="button">View calendar</Button>
              </div>
              <div className={styles.tableList}>
                {bookingSnapshot.map((metric) => (
                  <div key={metric.label} className={styles.tableRow}>
                    <span>{metric.label}</span>
                    <strong>{metric.value}</strong>
                  </div>
                ))}
              </div>
              <div className={styles.sectionDivider} />
              <div className={styles.tableList}>
                <div className={styles.tableRow}>
                  <span>Upcoming</span>
                  <span>Gia L. · Balayage · Friday 4:30 PM</span>
                </div>
                <div className={styles.tableRow}>
                  <span>Action</span>
                  <Button type="button">Send reminder</Button>
                </div>
              </div>
            </section>

            <section className={styles.panel}>
              <div className={styles.panelHeader}>
                <div>
                  <h3 className={styles.panelTitle}>Analytics snapshot</h3>
                  <p className={styles.panelSubtitle}>
                    Funnel metrics tie video performance to bookings.
                  </p>
                </div>
                <Button type="button">Open dashboard</Button>
              </div>
              <div className={styles.analyticsGrid}>
                <div className={styles.analyticsRow}>
                  {funnelMetrics.map((metric) => (
                    <div key={metric.label} className={styles.metricHighlight}>
                      <span className={styles.metricLabel}>{metric.label}</span>
                      <span className={styles.metricValue}>{metric.value}</span>
                      <span className={styles.metricDelta}>{metric.delta}</span>
                    </div>
                  ))}
                </div>
                <div className={styles.sectionDivider} />
                <div>
                  <h4>Top performers</h4>
                  <div className={styles.tableList}>
                    {topVideos.map((video) => (
                      <div key={video.title} className={styles.tableRow}>
                        <div>
                          <strong>{video.title}</strong>
                          <div className={styles.panelSubtitle}>{video.metric}</div>
                        </div>
                        <span className={styles.platformTag}>{video.platform}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styles.sectionDivider} />
                <div>
                  <h4>Cadence tracker</h4>
                  <p className={styles.panelSubtitle}>This month: 3 / 4 published · next best time Friday 6 PM.</p>
                  <div className={styles.sparkline} />
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
