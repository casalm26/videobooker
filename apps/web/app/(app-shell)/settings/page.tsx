"use client";

import { useMemo, useState } from 'react';

import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import { Skeleton } from '../../../components/ui/skeleton';
import {
  useAvailabilityQuery,
  useConnectIntegrationMutation,
  useDisconnectIntegrationMutation,
  useIntegrationsQuery,
  useUpdateIntegrationMutation,
} from '../../../lib/hooks/useIntegrations';

const settingsPanels = [
  {
    title: 'Business profile',
    description: 'Keep hours, locations, and service mappings up to date.',
    status: 'Editing UI coming soon',
    action: 'Edit profile',
  },
  {
    title: 'Plan & billing',
    description: 'Manage subscription, overages, and payment methods.',
    status: 'Stripe integration pending',
    action: 'View plan',
  },
  {
    title: 'Team & roles',
    description: 'Owner, staff, and billing admin permissions coming online.',
    status: 'Auth service in progress',
    action: 'Review roles',
  },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Settings</h1>
        <p className="max-w-2xl text-muted-foreground">
          Configure business details, integrations, billing, and team roles. These sections map directly to the admin flows in the
          roadmap.
        </p>
      </div>

      <IntegrationsPanel />

      <div className="grid gap-4 md:grid-cols-2">
        {settingsPanels.map((panel) => (
          <Card key={panel.title} className="border-border/60 bg-card/70">
            <CardHeader>
              <CardTitle>{panel.title}</CardTitle>
              <CardDescription>{panel.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {panel.status}
              </span>
              <Button size="sm" variant="outline">
                {panel.action}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

const integrationDetails = {
  meta: {
    title: 'Meta (Facebook + Instagram)',
    description: 'Connect to publish and monitor Reels, Feed, and Stories performance.',
    cta: 'Connect Meta',
    connectedCopy: 'Meta connected — ready to publish;',
  },
  calendly: {
    title: 'Calendly',
    description: 'Sync availability and map services to event types automatically.',
    cta: 'Connect Calendly',
    connectedCopy: 'Calendly connected — availability synced;',
  },
  acuity: {
    title: 'Acuity Scheduling',
    description: 'Keep Acuity slots and booking links aligned with offers and DM flows.',
    cta: 'Connect Acuity',
    connectedCopy: 'Acuity connected — availability synced;',
  },
} as const;

function IntegrationsPanel() {
  const { data, isLoading, isError } = useIntegrationsQuery();
  const connectMutation = useConnectIntegrationMutation();
  const disconnectMutation = useDisconnectIntegrationMutation();
  const updateMutation = useUpdateIntegrationMutation();
  const [selectedProvider, setSelectedProvider] = useState<'calendly' | 'acuity'>('calendly');
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const availabilityQuery = useAvailabilityQuery(selectedProvider, today);

  if (isLoading) {
    return (
      <Card className="border-border/60 bg-card/70">
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-72" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
        </CardContent>
      </Card>
    );
  }

  if (isError || !data) {
    return (
      <Card className="border-border/60 bg-destructive/10">
        <CardHeader>
          <CardTitle>Integrations unavailable</CardTitle>
          <CardDescription>Please try refreshing the page or check the API server connection.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const statusMap = data.reduce<Record<string, typeof data[number]>>((acc, integration) => {
    acc[integration.provider] = integration;
    return acc;
  }, {});

  return (
    <Card className="border-border/60 bg-card/90">
      <CardHeader className="space-y-2">
        <CardTitle>Integrations</CardTitle>
        <CardDescription>
          Manage publishing, availability, and analytics connectors. Each connection unlocks steps in the launch checklist.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 lg:grid-cols-3">
          {(Object.keys(integrationDetails) as Array<keyof typeof integrationDetails>).map((provider) => {
            const details = integrationDetails[provider];
            const integration = statusMap[provider];
            const isConnected = integration?.status === 'connected';
            const isWorking = integration?.status === 'needs_attention';
            const statusLabel = isConnected ? 'Connected' : isWorking ? 'Needs attention' : 'Not connected';
            const isMeta = provider === 'meta';

            return (
              <div key={provider} className="flex flex-col gap-3 rounded-xl border border-border/60 bg-card/80 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">{details.title}</h3>
                  <Badge variant={isConnected ? 'accent' : isWorking ? 'secondary' : 'outline'}>{statusLabel}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{details.description}</p>
                {integration?.connectedAt ? (
                  <p className="text-xs text-muted-foreground">
                    Connected {new Date(integration.connectedAt).toLocaleDateString()}
                  </p>
                ) : null}
                <div className="flex items-center gap-2">
                  <label
                    className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                    htmlFor={`status-${provider}`}
                  >
                    Status
                  </label>
                  <select
                    id={`status-${provider}`}
                    className="flex-1 rounded-md border border-border/60 bg-background px-2 py-1 text-sm"
                    value={integration?.status ?? 'disconnected'}
                    onChange={(event) =>
                      updateMutation.mutate({
                        provider,
                        payload: {
                          status: event.target.value as 'connected' | 'needs_attention' | 'disconnected',
                        },
                      })
                    }
                    disabled={updateMutation.isLoading}
                  >
                    <option value="connected">Connected</option>
                    <option value="needs_attention">Needs attention</option>
                    <option value="disconnected">Disconnected</option>
                  </select>
                </div>
                <div className="mt-auto flex flex-col gap-2">
                  <Button
                    size="sm"
                    onClick={() => {
                      if (isConnected) {
                        disconnectMutation.mutate(provider);
                      } else {
                        connectMutation.mutate({ provider });
                      }
                    }}
                    variant={isConnected ? 'outline' : 'secondary'}
                    disabled={connectMutation.isLoading || disconnectMutation.isLoading}
                  >
                    {isConnected ? 'Disconnect' : details.cta}
                  </Button>
                  {!isMeta && isConnected ? (
                    <Button
                      size="sm"
                      variant={selectedProvider === provider ? 'secondary' : 'outline'}
                      onClick={() => setSelectedProvider(provider)}
                    >
                      View {provider === 'calendly' ? 'Calendly' : 'Acuity'} slots
                    </Button>
                  ) : null}
                  {isMeta && isConnected ? (
                    <Button
                      size="sm"
                      variant={integration?.sandboxMode ? 'secondary' : 'outline'}
                      onClick={() =>
                        updateMutation.mutate({
                          provider,
                          payload: { sandboxMode: !integration?.sandboxMode },
                        })
                      }
                    >
                      {integration?.sandboxMode ? 'Disable sandbox mode' : 'Enable sandbox mode'}
                    </Button>
                  ) : null}
                </div>
                {isMeta && integration?.pages && integration.pages.length > 0 ? (
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    {integration.pages.map((page) => (
                      <Badge key={page} variant="outline">
                        {page}
                      </Badge>
                    ))}
                  </div>
                ) : null}
                {!isMeta && integration?.eventTypes && integration.eventTypes.length > 0 ? (
                  <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">Event types</span>
                    <div className="flex flex-wrap gap-2">
                      {integration.eventTypes.map((eventType) => (
                        <Badge key={eventType} variant="outline">
                          {eventType}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ) : null}
                {isConnected && isMeta ? (
                  <p className="text-xs text-muted-foreground">{details.connectedCopy}</p>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="rounded-xl border border-border/60 bg-muted/40 p-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
            <div>
              <h3 className="text-base font-semibold text-foreground">Availability preview</h3>
              <p className="text-sm text-muted-foreground">
                Showing slots for {selectedProvider === 'calendly' ? 'Calendly' : 'Acuity'} on {today}.
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={selectedProvider === 'calendly' ? 'secondary' : 'outline'}
                onClick={() => setSelectedProvider('calendly')}
              >
                Calendly
              </Button>
              <Button
                size="sm"
                variant={selectedProvider === 'acuity' ? 'secondary' : 'outline'}
                onClick={() => setSelectedProvider('acuity')}
              >
                Acuity
              </Button>
            </div>
          </div>

          <div className="mt-4 min-h-[80px] rounded-lg border border-border/60 bg-card/70 p-4">
            {availabilityQuery.isLoading ? (
              <Skeleton className="h-16 w-full" />
            ) : availabilityQuery.data && availabilityQuery.data.length > 0 ? (
              <ul className="grid gap-3 sm:grid-cols-2">
                {availabilityQuery.data.map((slot) => (
                  <li key={`${slot.start}-${slot.end}`} className="rounded-lg border border-border/60 bg-card px-3 py-2 text-sm">
                    <span className="font-medium text-foreground">
                      {new Date(slot.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {' '}–{' '}
                    <span className="text-muted-foreground">
                      {new Date(slot.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No slots found for today.</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
