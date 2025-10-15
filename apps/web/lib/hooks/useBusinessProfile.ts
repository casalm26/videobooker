"use client";

import { useMutation, useQuery, useQueryClient } from 'react-query';

import type {
  BusinessProfile,
  ReplaceServicesPayload,
  ServiceOffering,
  UpdateBusinessPayload,
} from '../api/business';
import {
  fetchBusinessProfile,
  fetchServices,
  replaceServices,
  updateBusinessProfile,
} from '../api/business';

const BUSINESS_QUERY_KEY = ['business-profile'];
const SERVICES_QUERY_KEY = ['services'];

export function useBusinessProfileQuery() {
  return useQuery<BusinessProfile>(BUSINESS_QUERY_KEY, fetchBusinessProfile, {
    staleTime: 60_000,
  });
}

export function useServicesQuery() {
  return useQuery<ServiceOffering[]>(SERVICES_QUERY_KEY, fetchServices, {
    staleTime: 60_000,
  });
}

export function useUpdateBusinessProfileMutation() {
  const queryClient = useQueryClient();

  return useMutation((payload: UpdateBusinessPayload) => updateBusinessProfile(payload), {
    onSuccess: (data) => {
      queryClient.setQueryData<BusinessProfile>(BUSINESS_QUERY_KEY, data);
    },
  });
}

export function useReplaceServicesMutation() {
  const queryClient = useQueryClient();

  return useMutation(
    (payload: ReplaceServicesPayload) => replaceServices(payload),
    {
      onSuccess: (services) => {
        queryClient.setQueryData<ServiceOffering[]>(SERVICES_QUERY_KEY, services);
      },
    },
  );
}
