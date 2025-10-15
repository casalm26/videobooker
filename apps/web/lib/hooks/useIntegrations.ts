"use client";

import { useMutation, useQuery, useQueryClient } from 'react-query';

import {
  connectIntegration,
  disconnectIntegration,
  updateIntegration,
  fetchAvailability,
  fetchIntegrations,
  type AvailabilitySlot,
  type IntegrationProvider,
  type IntegrationStatus,
} from '../api/integrations';

const INTEGRATIONS_QUERY_KEY = ['integrations'];

export function useIntegrationsQuery() {
  return useQuery<IntegrationStatus[]>(INTEGRATIONS_QUERY_KEY, fetchIntegrations, {
    staleTime: 30_000,
  });
}

export function useConnectIntegrationMutation() {
  const queryClient = useQueryClient();
  return useMutation(
    ({ provider, metadata }: { provider: IntegrationProvider; metadata?: Record<string, unknown> }) =>
      connectIntegration(provider, metadata),
    {
      onSuccess: ({ integration }) => {
        queryClient.setQueryData<IntegrationStatus[]>(INTEGRATIONS_QUERY_KEY, (current) => {
          if (!current) {
            return [integration];
          }
          return current.map((item) => (item.provider === integration.provider ? integration : item));
        });
      },
    },
  );
}

export function useDisconnectIntegrationMutation() {
  const queryClient = useQueryClient();
  return useMutation((provider: IntegrationProvider) => disconnectIntegration(provider), {
    onSuccess: ({ integration }) => {
      queryClient.setQueryData<IntegrationStatus[]>(INTEGRATIONS_QUERY_KEY, (current) => {
        if (!current) {
          return [integration];
        }
        return current.map((item) => (item.provider === integration.provider ? integration : item));
      });
    },
  });
}

export function useAvailabilityQuery(provider: 'calendly' | 'acuity', date: string) {
  return useQuery(['availability', provider, date], () => fetchAvailability(provider, date), {
    enabled: Boolean(provider && date),
    select: (data) =>
      data.slots.map((slot) => {
        const start = new Date(slot);
        const end = new Date(start.getTime() + 45 * 60 * 1000);
        return { start: start.toISOString(), end: end.toISOString() } satisfies AvailabilitySlot;
      }),
  });
}

export function useUpdateIntegrationMutation() {
  const queryClient = useQueryClient();
  return useMutation(
    ({ provider, payload }: { provider: IntegrationProvider; payload: Partial<IntegrationStatus> }) =>
      updateIntegration(provider, payload),
    {
      onSuccess: ({ integration }) => {
        queryClient.setQueryData<IntegrationStatus[]>(INTEGRATIONS_QUERY_KEY, (current) => {
          if (!current) {
            return [integration];
          }
          const exists = current.some((item) => item.provider === integration.provider);
          if (!exists) {
            return [...current, integration];
          }
          return current.map((item) => (item.provider === integration.provider ? integration : item));
        });
      },
    },
  );
}
