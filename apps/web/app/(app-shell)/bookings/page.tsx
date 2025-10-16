"use client";

import { useEffect, useMemo, useRef, useState } from 'react';

import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import { Label } from '../../../components/ui/label';
import { Skeleton } from '../../../components/ui/skeleton';
import { Textarea } from '../../../components/ui/textarea';
import { type AvailabilitySlot } from '../../../lib/api/integrations';
import { useServicesQuery } from '../../../lib/hooks/useBusinessProfile';
import {
  useAvailabilityQuery,
  useConnectIntegrationMutation,
  useDisconnectIntegrationMutation,
  useIntegrationsQuery,
} from '../../../lib/hooks/useIntegrations';

type Provider = 'calendly' | 'acuity';

type ServiceMappingState = Record<Provider, Record<string, string>>;

type MessagingDefaults = {
  confirmation: string;
  reminder: string;
};

const SERVICE_MAPPINGS_STORAGE_KEY = 'videobooker.serviceMappings.v1';
const MESSAGING_STORAGE_KEY = 'videobooker.bookingMessaging.v1';

const DEFAULT_SERVICE_MAPPINGS: ServiceMappingState = {
  calendly: {},
  acuity: {},
};

const DEFAULT_MESSAGING: MessagingDefaults = {
  confirmation:
    'Hi {{name}}, you are confirmed for {{service}} on {{date}} at {{time}}. Reply to this message if you need to reschedule within 24 hours.',
  reminder:
    'Hi {{name}}, looking forward to seeing you for {{service}} tomorrow at {{time}}. Tap the booking link if you need to adjust.',
};

const PROVIDER_DETAILS: Record<
  Provider,
  { title: string; description: string; helper: string }
> = {
  calendly: {
    title: 'Calendly',
    description: 'Best for solo providers or small teams needing quick availability sync.',
    helper: 'OAuth connect · Respects pooled availability',
  },
  acuity: {
    title: 'Acuity Scheduling',
    description: 'Advanced intake forms and package handling for medspa and aesthetics teams.',
    helper: 'OAuth connect · Supports add-ons and packages',
  },
};

const EVENT_TYPE_FALLBACKS: Record<Provider, Array<{ name: string; duration: number }>> = {
  calendly: [
    { name: 'Intro Class', duration: 30 },
    { name: 'Consultation', duration: 45 },
    { name: 'Personal Training', duration: 60 },
  ],
  acuity: [
    { name: 'Aesthetic Consult', duration: 30 },
    { name: 'Follow-up Session', duration: 30 },
    { name: 'Treatment Block', duration: 60 },
  ],
};

const MODAL_FALLBACK_TIMES = ['9:00 AM', '11:30 AM', '2:15 PM', '4:45 PM'];

function cloneMappings(state: ServiceMappingState): ServiceMappingState {
  return {
    calendly: { ...state.calendly },
    acuity: { ...state.acuity },
  };
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function getDurationLabel(minutes: number) {
  if (minutes % 60 === 0) {
    const hours = minutes / 60;
    return `${hours}h`;
  }
  if (minutes > 60) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  }
  return `${minutes}m`;
}

function inferDuration(label: string): number {
  const normalized = label.toLowerCase();
  if (normalized.includes('intro') || normalized.includes('consult')) {
    return 30;
  }
  if (normalized.includes('follow')) {
    return 30;
  }
  if (normalized.includes('personal') || normalized.includes('training') || normalized.includes('treatment')) {
    return 60;
  }
  return 45;
}

export default function BookingsPage() {
  const [selectedProvider, setSelectedProvider] = useState<Provider>('calendly');
  const [serviceMappings, setServiceMappings] = useState<ServiceMappingState>(() => cloneMappings(DEFAULT_SERVICE_MAPPINGS));
  const [messagingDraft, setMessagingDraft] = useState<MessagingDefaults>(DEFAULT_MESSAGING);
  const [mappingSavedAt, setMappingSavedAt] = useState<number | null>(null);
  const [messagingSavedAt, setMessagingSavedAt] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const autoSelectedProvider = useRef(false);

  const { data: services, isLoading: servicesLoading } = useServicesQuery();
  const {
    data: integrations,
    isLoading: integrationsLoading,
    isError: integrationsError,
  } = useIntegrationsQuery();
  const connectMutation = useConnectIntegrationMutation();
  const disconnectMutation = useDisconnectIntegrationMutation();

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const displayDate = useMemo(() => new Date(today).toLocaleDateString(), [today]);
  const availabilityQuery = useAvailabilityQuery(selectedProvider, today);

  const activeServices = useMemo(
    () => services?.filter((service) => service.isActive) ?? [],
    [services],
  );

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    try {
      const raw = window.localStorage.getItem(SERVICE_MAPPINGS_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<ServiceMappingState>;
        setServiceMappings({
          calendly: { ...(parsed?.calendly ?? {}) },
          acuity: { ...(parsed?.acuity ?? {}) },
        });
      }
    } catch {
      // Ignore malformed storage.
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    try {
      const raw = window.localStorage.getItem(MESSAGING_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<MessagingDefaults>;
        setMessagingDraft({
          ...DEFAULT_MESSAGING,
          ...parsed,
        });
      }
    } catch {
      // Ignore malformed storage.
    }
  }, []);

  useEffect(() => {
    if (!integrations || autoSelectedProvider.current) {
      return;
    }
    const connected = integrations.find(
      (integration) =>
        (integration.provider === 'calendly' || integration.provider === 'acuity') && integration.status === 'connected',
    );
    if (connected && (connected.provider === 'calendly' || connected.provider === 'acuity')) {
      setSelectedProvider(connected.provider);
      autoSelectedProvider.current = true;
    }
  }, [integrations]);

  useEffect(() => {
    if (mappingSavedAt === null) {
      return;
    }
    const timeout = window.setTimeout(() => setMappingSavedAt(null), 4000);
    return () => window.clearTimeout(timeout);
  }, [mappingSavedAt]);

  useEffect(() => {
    if (messagingSavedAt === null) {
      return;
    }
    const timeout = window.setTimeout(() => setMessagingSavedAt(null), 4000);
    return () => window.clearTimeout(timeout);
  }, [messagingSavedAt]);

  useEffect(() => {
    if (!isModalOpen || typeof document === 'undefined') {
      return;
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isModalOpen]);

  const statusMap = useMemo(() => {
    if (!integrations) {
      return {};
    }
    return integrations.reduce<Record<string, (typeof integrations)[number]>>((acc, integration) => {
      acc[integration.provider] = integration;
      return acc;
    }, {});
  }, [integrations]);

  const selectedIntegration = statusMap[selectedProvider];
  const isProviderConnected = selectedIntegration?.status === 'connected';

  const eventTypeOptions = useMemo(() => {
    const integrationEventTypes =
      selectedIntegration && 'eventTypes' in selectedIntegration ? selectedIntegration.eventTypes ?? [] : [];
    const fallbackOptions = EVENT_TYPE_FALLBACKS[selectedProvider];
    const seen = new Set<string>();
    const options: Array<{ name: string; duration: number }> = [];
    const addOption = (name: string, duration?: number) => {
      const trimmed = name.trim();
      if (!trimmed || seen.has(trimmed)) {
        return;
      }
      seen.add(trimmed);
      options.push({
        name: trimmed,
        duration: duration ?? inferDuration(trimmed),
      });
    };
    integrationEventTypes.forEach((type) => addOption(type));
    fallbackOptions.forEach((option) => addOption(option.name, option.duration));
    if (options.length === 0) {
      fallbackOptions.forEach((option) => addOption(option.name, option.duration));
    }
    return options;
  }, [selectedIntegration, selectedProvider]);

  const mappingForProvider = serviceMappings[selectedProvider];

  const firstMappedServiceId = Object.keys(mappingForProvider)[0];
  const primaryService =
    activeServices.find((service) => service.id === firstMappedServiceId) ?? activeServices[0] ?? null;
  const primaryEventType =
    (primaryService && mappingForProvider[primaryService.id]) || eventTypeOptions[0]?.name || 'Intro Session';

  const bookingUrl =
    selectedProvider === 'calendly'
      ? `https://calendly.com/videobooker/${slugify(primaryEventType)}`
      : `https://app.acuityscheduling.com/schedule.php?owner=videobooker&template=${slugify(primaryEventType)}`;

  const handleMappingChange = (serviceId: string, eventType: string) => {
    setServiceMappings((prev) => {
      const next = cloneMappings(prev);
      if (!eventType) {
        delete next[selectedProvider][serviceId];
      } else {
        next[selectedProvider][serviceId] = eventType;
      }
      return next;
    });
  };

  const persistMappings = (nextState?: ServiceMappingState) => {
    const stateToPersist = nextState ?? serviceMappings;
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(SERVICE_MAPPINGS_STORAGE_KEY, JSON.stringify(stateToPersist));
    }
    setMappingSavedAt(Date.now());
  };

  const resetMappingsForProvider = () => {
    const next = cloneMappings(serviceMappings);
    next[selectedProvider] = {};
    setServiceMappings(next);
    persistMappings(next);
  };

  const handleMessagingChange = (field: keyof MessagingDefaults, value: string) => {
    setMessagingDraft((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const persistMessaging = (nextState?: MessagingDefaults) => {
    const stateToPersist = nextState ?? messagingDraft;
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(MESSAGING_STORAGE_KEY, JSON.stringify(stateToPersist));
    }
    setMessagingSavedAt(Date.now());
  };

  const resetMessaging = () => {
    setMessagingDraft(DEFAULT_MESSAGING);
    persistMessaging(DEFAULT_MESSAGING);
  };

  return (
    <div className="space-y-8">
      <section className="space-y-2">
        <Badge variant="accent" className="uppercase tracking-wide">
          Step 3 · Booking integration
        </Badge>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Bookings & availability</h1>
        <p className="max-w-2xl text-muted-foreground">
          Connect Calendly or Acuity, map your top services to event types, and keep confirmation and reminder copy aligned with
          the DM assistant.
        </p>
      </section>

      {integrationsLoading ? (
        <Skeleton className="h-40 w-full" />
      ) : integrationsError ? (
        <Card className="border-border/60 bg-destructive/10">
          <CardHeader>
            <CardTitle>Integrations unavailable</CardTitle>
            <CardDescription>Refresh or check the API service before configuring booking providers.</CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <Card className="border-border/60 bg-card/80">
          <CardHeader>
            <CardTitle>Choose booking provider</CardTitle>
            <CardDescription>
              OAuth connects in a separate window. Once linked, service mappings and availability sync instantly.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {(Object.keys(PROVIDER_DETAILS) as Provider[]).map((provider) => {
              const details = PROVIDER_DETAILS[provider];
              const integration = statusMap[provider];
              const status = integration?.status ?? 'disconnected';
              const isConnected = status === 'connected';
              const badgeVariant = isConnected ? 'accent' : status === 'needs_attention' ? 'secondary' : 'outline';
              return (
                <div
                  key={provider}
                  className="flex flex-col gap-3 rounded-xl border border-border/60 bg-card/70 p-4 md:flex-row md:items-center md:justify-between"
                >
                  <div className="flex flex-1 flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-foreground">{details.title}</h3>
                      <Badge variant={badgeVariant} className="uppercase">
                        {status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{details.description}</p>
                    <span className="text-xs text-muted-foreground">{details.helper}</span>
                  </div>
                  <div className="flex flex-col gap-2 md:items-end">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant={selectedProvider === provider ? 'secondary' : 'outline'}
                        onClick={() => setSelectedProvider(provider)}
                      >
                        Configure
                      </Button>
                      <Button
                        size="sm"
                        variant={isConnected ? 'outline' : 'secondary'}
                        disabled={connectMutation.isLoading || disconnectMutation.isLoading}
                        onClick={() => {
                          if (isConnected) {
                            disconnectMutation.mutate(provider);
                          } else {
                            connectMutation.mutate({ provider });
                          }
                        }}
                      >
                        {isConnected ? 'Disconnect' : `Connect ${details.title}`}
                      </Button>
                    </div>
                    {integration?.connectedAt ? (
                      <span className="text-xs text-muted-foreground">
                        Connected {new Date(integration.connectedAt).toLocaleDateString()}
                      </span>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <Card className="border-border/60 bg-card/90">
            <CardHeader className="space-y-1.5">
              <CardTitle>Service mapping</CardTitle>
              <CardDescription>
                Link each active service to a matching{' '}
                {selectedProvider === 'calendly' ? 'Calendly event type' : 'Acuity appointment'} so the assistant and offer
                templates pull the right duration.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {servicesLoading ? (
                <div className="space-y-3">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              ) : activeServices.length > 0 ? (
                <div className="overflow-hidden rounded-xl border border-border/60">
                  <div className="grid grid-cols-3 bg-muted/40 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    <span>Service</span>
                    <span>Duration</span>
                    <span>Booking event</span>
                  </div>
                  <div className="divide-y divide-border/60">
                    {activeServices.map((service) => {
                      const selectedEvent = mappingForProvider[service.id] ?? '';
                      return (
                        <div
                          key={service.id}
                          className="grid grid-cols-1 gap-3 px-4 py-4 sm:grid-cols-3 sm:items-center"
                        >
                          <div>
                            <p className="font-medium text-foreground">{service.name}</p>
                            {service.description ? (
                              <p className="text-xs text-muted-foreground">{service.description}</p>
                            ) : null}
                          </div>
                          <span className="text-sm font-medium text-foreground sm:text-center">
                            {getDurationLabel(service.durationMinutes)}
                          </span>
                          <div className="flex flex-col gap-2">
                            <select
                              className="w-full rounded-md border border-border/60 bg-background px-3 py-2 text-sm outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 disabled:opacity-60"
                              value={selectedEvent}
                              disabled={!isProviderConnected}
                              onChange={(event) => handleMappingChange(service.id, event.target.value)}
                            >
                              <option value="">Unmapped</option>
                              {eventTypeOptions.map((option) => (
                                <option key={option.name} value={option.name}>
                                  {option.name} · {getDurationLabel(option.duration)}
                                </option>
                              ))}
                            </select>
                            {!isProviderConnected ? (
                              <span className="text-xs text-muted-foreground">
                                Connect {PROVIDER_DETAILS[selectedProvider].title} to map events.
                              </span>
                            ) : null}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Add services in the Business profile step to unlock mapping.
                </p>
              )}
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-xs text-muted-foreground">
                  {mappingSavedAt ? 'Mappings saved to this browser.' : 'Mappings save to this browser on click.'}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={resetMappingsForProvider}>
                    Reset {PROVIDER_DETAILS[selectedProvider].title}
                  </Button>
                  <Button size="sm" onClick={() => persistMappings()}>
                    Save mappings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/60 bg-card/90">
            <CardHeader className="space-y-1.5">
              <CardTitle>Confirmation & reminder copy</CardTitle>
              <CardDescription className="space-y-1">
                <span>These templates power DM follow-ups and booking emails.</span>{' '}
                <span>
                  Use tokens like <code className="rounded bg-muted px-1">{'{{name}}'}</code> and{' '}
                  <code className="rounded bg-muted px-1">{'{{service}}'}</code>.
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="confirmation-copy" className="text-sm font-medium text-foreground">
                  Confirmation message
                </Label>
                <Textarea
                  id="confirmation-copy"
                  rows={4}
                  value={messagingDraft.confirmation}
                  onChange={(event) => handleMessagingChange('confirmation', event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reminder-copy" className="text-sm font-medium text-foreground">
                  Reminder (24h before)
                </Label>
                <Textarea
                  id="reminder-copy"
                  rows={4}
                  value={messagingDraft.reminder}
                  onChange={(event) => handleMessagingChange('reminder', event.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-xs text-muted-foreground">
                  {messagingSavedAt ? 'Messaging saved for future sessions.' : 'Copy saves locally after you click save.'}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={resetMessaging}>
                    Reset to defaults
                  </Button>
                  <Button size="sm" onClick={() => persistMessaging()}>
                    Save messaging
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-border/60 bg-card/70">
            <CardHeader>
              <CardTitle>Availability preview</CardTitle>
              <CardDescription>
                Next available slots from {PROVIDER_DETAILS[selectedProvider].title} for today ({displayDate}).
              </CardDescription>
            </CardHeader>
            <CardContent>
              {availabilityQuery.isLoading ? (
                <Skeleton className="h-24 w-full" />
              ) : availabilityQuery.data && availabilityQuery.data.length > 0 ? (
                <ul className="space-y-3">
                  {availabilityQuery.data.slice(0, 6).map((slot) => (
                    <li
                      key={`${slot.start}-${slot.end}`}
                      className="flex items-center justify-between rounded-lg border border-border/60 bg-background/80 px-3 py-2 text-sm"
                    >
                      <span className="font-medium text-foreground">
                        {new Date(slot.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <span className="text-muted-foreground">
                        {new Date(slot.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Connect {PROVIDER_DETAILS[selectedProvider].title} or refresh availability to see slots.
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="border-border/60 bg-card/80">
            <CardHeader>
              <CardTitle>Test booking link</CardTitle>
              <CardDescription>
                Launch the embed to double-check the hand-off experience before sharing promos or DM replies.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-lg border border-dashed border-border/60 bg-background/70 p-4 text-sm text-muted-foreground">
                <p>
                  The preview opens a demo booking flow using{' '}
                  <span className="font-medium text-foreground">{primaryEventType}</span>. Slots come from the live availability
                  feed and match your service mapping.
                </p>
              </div>
              <Button size="sm" className="w-full" onClick={() => setIsModalOpen(true)}>
                Open booking link preview
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <BookingLinkModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        provider={selectedProvider}
        bookingUrl={bookingUrl}
        eventLabel={primaryEventType}
        availability={availabilityQuery.data ?? []}
        isProviderConnected={isProviderConnected}
      />
    </div>
  );
}

type BookingLinkModalProps = {
  open: boolean;
  onClose: () => void;
  provider: Provider;
  bookingUrl: string;
  eventLabel: string;
  availability: AvailabilitySlot[];
  isProviderConnected: boolean;
};

export function BookingLinkModal({
  open,
  onClose,
  provider,
  bookingUrl,
  eventLabel,
  availability,
  isProviderConnected,
}: BookingLinkModalProps) {
  if (!open) {
    return null;
  }

  const modalSlots =
    availability.length > 0
      ? availability.slice(0, 4).map((slot) => ({
          key: slot.start,
          start: new Date(slot.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          end: new Date(slot.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }))
      : MODAL_FALLBACK_TIMES.map((time, index) => ({
          key: `${provider}-${index}`,
          start: time,
          end: null,
        }));

  const handleCopy = () => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) {
      return;
    }
    navigator.clipboard.writeText(bookingUrl).catch(() => {
      // ignore copy failures silently
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-link-modal-title"
        className="w-full max-w-2xl rounded-2xl border border-border/60 bg-background shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-border/60 px-6 py-4">
          <div>
            <h2 id="booking-link-modal-title" className="text-lg font-semibold text-foreground">
              Booking link preview
            </h2>
            <p className="text-sm text-muted-foreground">
              {PROVIDER_DETAILS[provider].title} · {eventLabel}
            </p>
          </div>
          <Button size="sm" variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>
        <div className="space-y-4 px-6 py-6">
          {!isProviderConnected ? (
            <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
              Connect {PROVIDER_DETAILS[provider].title} to load the live booking experience.
            </div>
          ) : null}
          <div className="rounded-xl border border-border/60 bg-card/80 p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="flex-1 space-y-2">
                <h3 className="text-base font-semibold text-foreground">Embed preview</h3>
                <p className="text-sm text-muted-foreground">
                  This is a demo hand-off; replace with your branded embed once OAuth completes.
                </p>
                <div className="rounded-lg border border-border/60 bg-background/80 p-4">
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-foreground">{eventLabel}</p>
                      <p className="text-xs text-muted-foreground">{PROVIDER_DETAILS[provider].title}</p>
                    </div>
                    <ul className="flex flex-wrap gap-2">
                      {modalSlots.map((slot) => (
                        <li
                          key={slot.key}
                          className="rounded-md border border-border/60 bg-background px-2 py-1 text-xs font-medium text-foreground"
                        >
                          {slot.start}
                          {slot.end ? ` – ${slot.end}` : ''}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="w-full max-w-[220px] space-y-3">
                <div className="rounded-lg border border-border/60 bg-background/80 p-3">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Shareable URL</p>
                  <p className="break-all text-sm font-medium text-foreground">{bookingUrl}</p>
                </div>
                <Button size="sm" variant="outline" className="w-full" onClick={handleCopy}>
                  Copy link
                </Button>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={onClose}>Close</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
