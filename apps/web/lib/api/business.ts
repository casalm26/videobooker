import { apiGet, apiPut } from './client';

export type BusinessProfile = {
  id: string;
  name: string;
  category: string;
  description: string;
  location: string;
  hours: string;
  website?: string;
  socialLinks: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    youtube?: string;
  };
  services: string[];
  onboardingCompletedSteps: string[];
};

export type ServiceOffering = {
  id: string;
  name: string;
  description: string;
  durationMinutes: number;
  price: number;
  isActive: boolean;
};

export type UpdateBusinessPayload = Partial<Omit<BusinessProfile, 'id' | 'services'>> & {
  services?: string[];
};

export type ReplaceServicesPayload = {
  services: Omit<ServiceOffering, 'id'>[];
};

export async function fetchBusinessProfile() {
  return apiGet<BusinessProfile>('/business');
}

export async function updateBusinessProfile(payload: UpdateBusinessPayload) {
  return apiPut<UpdateBusinessPayload, BusinessProfile>('/business', payload);
}

export async function fetchServices() {
  return apiGet<ServiceOffering[]>('/services');
}

export async function replaceServices(payload: ReplaceServicesPayload) {
  return apiPut<ReplaceServicesPayload, ServiceOffering[]>('/services', payload);
}
