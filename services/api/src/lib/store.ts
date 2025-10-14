import { randomUUID } from 'crypto';

export type ServiceOffering = {
  id: string;
  name: string;
  description: string;
  durationMinutes: number;
  price: number;
  isActive: boolean;
};

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

export type IntegrationStatus =
  | {
      provider: 'meta';
      status: 'connected' | 'needs_attention' | 'disconnected';
      connectedAt?: string;
      pages?: string[];
    }
  | {
      provider: 'calendly' | 'acuity';
      status: 'connected' | 'needs_attention' | 'disconnected';
      connectedAt?: string;
      eventTypes?: string[];
    };

export type BrandKit = {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  logoUrl?: string;
  subtitleStyle: 'light' | 'dark';
};

export type Offer = {
  id: string;
  title: string;
  description: string;
  callToAction: string;
  price?: number;
  active: boolean;
  createdAt: string;
};

export type VideoVariation = {
  id?: string;
  format: '9x16' | '1x1' | '16x9';
  durationSeconds: number;
  captionStyle: 'burned-in' | 'none';
  thumbnailUrl: string;
};

export type VideoProject = {
  id: string;
  concept: string;
  vertical: string;
  offerId?: string;
  status: 'draft' | 'ready' | 'archived';
  variations: VideoVariation[];
  createdAt: string;
};

export type RenderJob = {
  id: string;
  projectId: string;
  format: VideoVariation['format'];
  status: 'queued' | 'processing' | 'completed' | 'failed';
  progress: number;
  etaSeconds: number;
  assetUrl?: string;
  errorMessage?: string;
  createdAt: string;
  updatedAt: string;
};

export type PublishJob = {
  id: string;
  projectId: string;
  platform: 'instagram' | 'facebook' | 'tiktok' | 'youtube';
  status: 'pending' | 'scheduled' | 'published' | 'failed';
  scheduledFor?: string;
  caption: string;
  createdAt: string;
};

export type ScheduleEntry = {
  id: string;
  projectId: string;
  publishAt: string;
  platforms: PublishJob['platform'][];
  status: 'scheduled' | 'published' | 'failed';
};

export type ShortLink = {
  id: string;
  label: string;
  targetUrl: string;
  shortCode: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  createdAt: string;
};

export type Booking = {
  id: string;
  serviceId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  startsAt: string;
  status: 'scheduled' | 'completed' | 'canceled' | 'no_show';
  source: 'video' | 'dm' | 'link';
  provider: 'calendly' | 'acuity';
};

export type ConversationMessage = {
  id: string;
  sender: 'prospect' | 'assistant' | 'staff';
  body: string;
  sentAt: string;
  intent?: 'price' | 'availability' | 'hours' | 'location' | 'other';
};

export type Conversation = {
  id: string;
  channel: 'instagram' | 'facebook';
  participantName: string;
  state: 'new' | 'bot_handled' | 'needs_handoff';
  lastMessageAt: string;
  messages: ConversationMessage[];
};

export type AnalyticsSummary = {
  period: '7d' | '30d';
  totals: {
    videosPublished: number;
    views: number;
    clicks: number;
    dmStarts: number;
    bookings: number;
    conversionRate: number;
  };
  topVideos: {
    projectId: string;
    title: string;
    views: number;
    bookings: number;
  }[];
};

function iso(date: Date): string {
  return date.toISOString();
}

const start = new Date();

const defaultBusiness: BusinessProfile = {
  id: randomUUID(),
  name: 'Demo Business',
  category: 'Fitness',
  description: 'Helping the community stay active with personalized classes.',
  location: '123 Market Street, Springfield',
  hours: 'Mon-Fri 7am-7pm',
  website: 'https://example.com',
  socialLinks: {
    instagram: 'https://instagram.com/demobiz',
    facebook: 'https://facebook.com/demobiz',
  },
  services: [],
  onboardingCompletedSteps: ['business-profile'],
};

const defaultServices: ServiceOffering[] = [
  {
    id: randomUUID(),
    name: 'Intro Class',
    description: '30-minute intro session to assess goals.',
    durationMinutes: 30,
    price: 39,
    isActive: true,
  },
  {
    id: randomUUID(),
    name: 'Personal Training',
    description: '60-minute personalized training session.',
    durationMinutes: 60,
    price: 89,
    isActive: true,
  },
];

const defaultBrandKit: BrandKit = {
  primaryColor: '#1F2933',
  secondaryColor: '#F25F5C',
  accentColor: '#FFE066',
  fontFamily: 'Inter',
  logoUrl: 'https://cdn.videobooker.ai/demo/logo.png',
  subtitleStyle: 'light',
};

const defaultOffers: Offer[] = [
  {
    id: randomUUID(),
    title: 'New Member 2-for-1',
    description: 'Bring a friend for free during your first month.',
    callToAction: 'Book a class',
    price: 99,
    active: true,
    createdAt: iso(start),
  },
];

const defaultProjects: VideoProject[] = [
  {
    id: randomUUID(),
    concept: 'February Promo',
    vertical: 'fitness',
    offerId: defaultOffers[0]?.id,
    status: 'ready',
    variations: [
      {
        id: randomUUID(),
        format: '9x16',
        durationSeconds: 45,
        captionStyle: 'burned-in',
        thumbnailUrl: 'https://cdn.videobooker.ai/demo/thumb-9x16.png',
      },
      {
        id: randomUUID(),
        format: '1x1',
        durationSeconds: 45,
        captionStyle: 'burned-in',
        thumbnailUrl: 'https://cdn.videobooker.ai/demo/thumb-1x1.png',
      },
    ],
    createdAt: iso(start),
  },
];

const defaultRenderJobs: RenderJob[] = [
  {
    id: randomUUID(),
    projectId: defaultProjects[0]?.id ?? randomUUID(),
    format: '9x16',
    status: 'completed',
    progress: 100,
    etaSeconds: 0,
    assetUrl: 'https://cdn.videobooker.ai/demo/video-9x16.mp4',
    createdAt: iso(start),
    updatedAt: iso(start),
  },
];

const defaultPublishJobs: PublishJob[] = [
  {
    id: randomUUID(),
    projectId: defaultProjects[0]?.id ?? randomUUID(),
    platform: 'instagram',
    status: 'published',
    caption: 'Book your spot today!',
    scheduledFor: iso(new Date(start.getTime() + 24 * 3600 * 1000)),
    createdAt: iso(start),
  },
];

const defaultSchedule: ScheduleEntry[] = [
  {
    id: randomUUID(),
    projectId: defaultProjects[0]?.id ?? randomUUID(),
    publishAt: iso(new Date(start.getTime() + 2 * 24 * 3600 * 1000)),
    platforms: ['instagram', 'facebook'],
    status: 'scheduled',
  },
];

const defaultLinks: ShortLink[] = [
  {
    id: randomUUID(),
    label: 'Main Booking CTA',
    targetUrl: 'https://calendly.com/demo/intro',
    shortCode: 'demo-book',
    utmSource: 'instagram',
    utmMedium: 'social',
    utmCampaign: 'feb-promo',
    createdAt: iso(start),
  },
];

const defaultBookings: Booking[] = [
  {
    id: randomUUID(),
    serviceId: defaultServices[0]?.id ?? randomUUID(),
    customerName: 'Jordan Smith',
    customerEmail: 'jordan@example.com',
    customerPhone: '+1-555-0101',
    startsAt: iso(new Date(start.getTime() + 3 * 24 * 3600 * 1000)),
    status: 'scheduled',
    source: 'video',
    provider: 'calendly',
  },
];

const defaultConversations: Conversation[] = [
  {
    id: randomUUID(),
    channel: 'instagram',
    participantName: 'Alex Johnson',
    state: 'bot_handled',
    lastMessageAt: iso(start),
    messages: [
      {
        id: randomUUID(),
        sender: 'prospect',
        body: 'Do you have availability on Friday?',
        sentAt: iso(start),
        intent: 'availability',
      },
      {
        id: randomUUID(),
        sender: 'assistant',
        body: 'Absolutely! We have 3pm and 5pm slots available. Want me to book one?',
        sentAt: iso(new Date(start.getTime() + 60 * 1000)),
        intent: 'availability',
      },
    ],
  },
];

const defaultIntegrations: IntegrationStatus[] = [
  {
    provider: 'meta',
    status: 'connected',
    connectedAt: iso(start),
    pages: ['Demo Fitness IG', 'Demo Fitness FB'],
  },
  {
    provider: 'calendly',
    status: 'connected',
    connectedAt: iso(start),
    eventTypes: ['Intro Class', 'Personal Training'],
  },
];

const defaultAnalytics: AnalyticsSummary = {
  period: '30d',
  totals: {
    videosPublished: 6,
    views: 15230,
    clicks: 3240,
    dmStarts: 287,
    bookings: 54,
    conversionRate: 3.54,
  },
  topVideos: defaultProjects.map((project) => ({
    projectId: project.id,
    title: project.concept,
    views: 5320,
    bookings: 17,
  })),
};

export class InMemoryStore {
  private business: BusinessProfile = defaultBusiness;
  private services: ServiceOffering[] = defaultServices;
  private brandKit: BrandKit = defaultBrandKit;
  private offers: Offer[] = defaultOffers;
  private projects: VideoProject[] = defaultProjects;
  private renderJobs: RenderJob[] = defaultRenderJobs;
  private publishJobs: PublishJob[] = defaultPublishJobs;
  private scheduleEntries: ScheduleEntry[] = defaultSchedule;
  private links: ShortLink[] = defaultLinks;
  private bookings: Booking[] = defaultBookings;
  private conversations: Conversation[] = defaultConversations;
  private integrations: IntegrationStatus[] = defaultIntegrations;
  private analytics: AnalyticsSummary = defaultAnalytics;

  getBusiness(): BusinessProfile {
    return this.business;
  }

  updateBusiness(updates: Partial<Omit<BusinessProfile, 'id'>>): BusinessProfile {
    this.business = {
      ...this.business,
      ...updates,
    };
    return this.business;
  }

  listServices(): ServiceOffering[] {
    return this.services;
  }

  replaceServices(services: Omit<ServiceOffering, 'id'>[]): ServiceOffering[] {
    this.services = services.map((service) => ({
      ...service,
      id: randomUUID(),
    }));
    return this.services;
  }

  listIntegrations(): IntegrationStatus[] {
    return this.integrations;
  }

  updateIntegration(provider: IntegrationStatus['provider'], status: IntegrationStatus['status']): IntegrationStatus {
    const existing = this.integrations.find((integration) => integration.provider === provider);
    const payload: IntegrationStatus = existing
      ? { ...existing, status, connectedAt: status === 'connected' ? iso(new Date()) : existing.connectedAt }
      : { provider, status } as IntegrationStatus;

    if (existing) {
      Object.assign(existing, payload);
      return existing;
    }

    this.integrations.push(payload);
    return payload;
  }

  listAvailability(provider: 'calendly' | 'acuity', date: string): string[] {
    const startDate = new Date(date);
    return Array.from({ length: 5 }).map((_, index) => {
      const slot = new Date(startDate.getTime() + index * 60 * 60 * 1000);
      return iso(slot);
    });
  }

  getBrandKit(): BrandKit {
    return this.brandKit;
  }

  updateBrandKit(updates: Partial<BrandKit>): BrandKit {
    this.brandKit = { ...this.brandKit, ...updates };
    return this.brandKit;
  }

  listOffers(): Offer[] {
    return this.offers;
  }

  createOffer(payload: Omit<Offer, 'id' | 'createdAt'>): Offer {
    const offer: Offer = {
      ...payload,
      id: randomUUID(),
      createdAt: iso(new Date()),
    };
    this.offers.push(offer);
    return offer;
  }

  updateOffer(id: string, payload: Partial<Omit<Offer, 'id' | 'createdAt'>>): Offer | undefined {
    const offer = this.offers.find((item) => item.id === id);
    if (!offer) {
      return undefined;
    }
    Object.assign(offer, payload);
    return offer;
  }

  deleteOffer(id: string): boolean {
    const prevLength = this.offers.length;
    this.offers = this.offers.filter((offer) => offer.id !== id);
    return this.offers.length < prevLength;
  }

  listProjects(): VideoProject[] {
    return this.projects;
  }

  createProject(payload: Omit<VideoProject, 'id' | 'status' | 'variations' | 'createdAt'> & { variations?: VideoVariation[] }): VideoProject {
    const project: VideoProject = {
      ...payload,
      id: randomUUID(),
      status: 'draft',
      createdAt: iso(new Date()),
      variations: payload.variations ?? [],
    };
    this.projects.push(project);
    return project;
  }

  getProject(id: string): VideoProject | undefined {
    return this.projects.find((project) => project.id === id);
  }

  listRenderJobs(): RenderJob[] {
    return this.renderJobs;
  }

  createRenderJob(payload: Omit<RenderJob, 'id' | 'status' | 'progress' | 'createdAt' | 'updatedAt'>): RenderJob {
    const job: RenderJob = {
      ...payload,
      id: randomUUID(),
      status: 'queued',
      progress: 10,
      etaSeconds: payload.etaSeconds,
      createdAt: iso(new Date()),
      updatedAt: iso(new Date()),
    };
    this.renderJobs.push(job);
    return job;
  }

  updateRenderJobStatus(id: string, status: RenderJob['status'], updates: Partial<RenderJob> = {}): RenderJob | undefined {
    const job = this.renderJobs.find((item) => item.id === id);
    if (!job) {
      return undefined;
    }
    Object.assign(job, updates, {
      status,
      updatedAt: iso(new Date()),
    });
    return job;
  }

  getRenderJob(id: string): RenderJob | undefined {
    return this.renderJobs.find((job) => job.id === id);
  }

  createPublishJob(payload: Omit<PublishJob, 'id' | 'status' | 'createdAt'>): PublishJob {
    const job: PublishJob = {
      ...payload,
      id: randomUUID(),
      status: payload.scheduledFor ? 'scheduled' : 'pending',
      createdAt: iso(new Date()),
    };
    this.publishJobs.push(job);
    return job;
  }

  getPublishJob(id: string): PublishJob | undefined {
    return this.publishJobs.find((job) => job.id === id);
  }

  listSchedule(): ScheduleEntry[] {
    return this.scheduleEntries;
  }

  createScheduleEntry(payload: Omit<ScheduleEntry, 'id' | 'status'> & { status?: ScheduleEntry['status'] }): ScheduleEntry {
    const entry: ScheduleEntry = {
      ...payload,
      id: randomUUID(),
      status: payload.status ?? 'scheduled',
    };
    this.scheduleEntries.push(entry);
    return entry;
  }

  updateScheduleEntry(id: string, updates: Partial<ScheduleEntry>): ScheduleEntry | undefined {
    const entry = this.scheduleEntries.find((item) => item.id === id);
    if (!entry) {
      return undefined;
    }
    Object.assign(entry, updates);
    return entry;
  }

  deleteScheduleEntry(id: string): boolean {
    const previous = this.scheduleEntries.length;
    this.scheduleEntries = this.scheduleEntries.filter((item) => item.id !== id);
    return this.scheduleEntries.length < previous;
  }

  listLinks(): ShortLink[] {
    return this.links;
  }

  createLink(payload: Omit<ShortLink, 'id' | 'createdAt'>): ShortLink {
    const link: ShortLink = {
      ...payload,
      id: randomUUID(),
      createdAt: iso(new Date()),
    };
    this.links.push(link);
    return link;
  }

  listBookings(): Booking[] {
    return this.bookings;
  }

  createBooking(payload: Omit<Booking, 'id'>): Booking {
    const booking: Booking = { ...payload, id: randomUUID() };
    this.bookings.push(booking);
    return booking;
  }

  updateBooking(id: string, updates: Partial<Booking>): Booking | undefined {
    const booking = this.bookings.find((item) => item.id === id);
    if (!booking) {
      return undefined;
    }
    Object.assign(booking, updates);
    return booking;
  }

  listConversations(): Conversation[] {
    return this.conversations;
  }

  getConversation(id: string): Conversation | undefined {
    return this.conversations.find((conversation) => conversation.id === id);
  }

  addMessage(conversationId: string, message: Omit<ConversationMessage, 'id' | 'sentAt'> & { sentAt?: string }): Conversation | undefined {
    const conversation = this.getConversation(conversationId);
    if (!conversation) {
      return undefined;
    }
    const fullMessage: ConversationMessage = {
      ...message,
      id: randomUUID(),
      sentAt: message.sentAt ?? iso(new Date()),
    };
    conversation.messages.push(fullMessage);
    conversation.lastMessageAt = fullMessage.sentAt;
    conversation.state = message.sender === 'assistant' ? 'bot_handled' : 'needs_handoff';
    return conversation;
  }

  getAnalytics(): AnalyticsSummary {
    return this.analytics;
  }

  updateAnalytics(updates: Partial<AnalyticsSummary>): AnalyticsSummary {
    this.analytics = {
      ...this.analytics,
      ...updates,
      totals: {
        ...this.analytics.totals,
        ...updates.totals,
      },
      topVideos: updates.topVideos ?? this.analytics.topVideos,
    };
    return this.analytics;
  }
}

export const store = new InMemoryStore();
