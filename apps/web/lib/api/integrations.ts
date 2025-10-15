import { apiGet, apiPatch, apiPost } from './client';

export type IntegrationProvider = 'meta' | 'calendly' | 'acuity';

export type IntegrationStatus = {
  provider: IntegrationProvider;
  status: 'connected' | 'needs_attention' | 'disconnected';
  connectedAt?: string;
  pages?: string[];
  eventTypes?: string[];
  sandboxMode?: boolean;
};

export type AvailabilitySlot = {
  start: string;
  end: string;
};

export async function fetchIntegrations() {
  return apiGet<IntegrationStatus[]>('/integrations');
}

export async function connectIntegration(provider: IntegrationProvider, metadata?: Record<string, unknown>) {
  return apiPost<Record<string, unknown>, { integration: IntegrationStatus }>(`/integrations/${provider}/connect`, metadata ?? {});
}

export async function disconnectIntegration(provider: IntegrationProvider) {
  return apiPost<Record<string, never>, { integration: IntegrationStatus }>(`/integrations/${provider}/disconnect`, {});
}

export async function updateIntegration(provider: IntegrationProvider, payload: Partial<IntegrationStatus>) {
  return apiPatch<Partial<IntegrationStatus>, { integration: IntegrationStatus }>(`/integrations/${provider}`, payload);
}

export async function fetchAvailability(provider: 'calendly' | 'acuity', date: string) {
  const search = new URLSearchParams({ provider, date }).toString();
  return apiGet<{ provider: string; date: string; slots: string[] }>(`/integrations/availability?${search}`);
}
