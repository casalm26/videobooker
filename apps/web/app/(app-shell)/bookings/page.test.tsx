import { fireEvent, render, screen } from '@testing-library/react';

import BookingsPage, { BookingLinkModal } from './page';
import type { ServiceOffering } from '../../../lib/api/business';
import type { IntegrationStatus } from '../../../lib/api/integrations';
import { useServicesQuery } from '../../../lib/hooks/useBusinessProfile';
import {
  useAvailabilityQuery,
  useConnectIntegrationMutation,
  useDisconnectIntegrationMutation,
  useIntegrationsQuery,
} from '../../../lib/hooks/useIntegrations';

jest.mock('../../../lib/hooks/useIntegrations');
jest.mock('../../../lib/hooks/useBusinessProfile');

const mockUseIntegrationsQuery = useIntegrationsQuery as jest.MockedFunction<typeof useIntegrationsQuery>;
const mockUseAvailabilityQuery = useAvailabilityQuery as jest.MockedFunction<typeof useAvailabilityQuery>;
const mockUseConnectIntegrationMutation = useConnectIntegrationMutation as jest.MockedFunction<
  typeof useConnectIntegrationMutation
>;
const mockUseDisconnectIntegrationMutation = useDisconnectIntegrationMutation as jest.MockedFunction<
  typeof useDisconnectIntegrationMutation
>;
const mockUseServicesQuery = useServicesQuery as jest.MockedFunction<typeof useServicesQuery>;

const originalConsoleError = console.error;

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation((message?: unknown, ...rest: unknown[]) => {
    if (typeof message === 'string' && message.includes('ReactDOMTestUtils.act')) {
      return;
    }
    originalConsoleError(message as never, ...rest);
  });
});

afterAll(() => {
  (console.error as jest.Mock).mockRestore();
});

const defaultIntegrations: IntegrationStatus[] = [
  {
    provider: 'calendly',
    status: 'connected',
    connectedAt: '2024-03-18T10:00:00.000Z',
    eventTypes: ['Intro Class', 'Consultation', 'Personal Training'],
  },
  {
    provider: 'acuity',
    status: 'disconnected',
  },
];

const defaultServices: ServiceOffering[] = [
  {
    id: 'svc-1',
    name: 'Intro Class',
    description: '30-minute welcome session.',
    durationMinutes: 45,
    price: 0,
    isActive: true,
  },
];

beforeEach(() => {
  jest.clearAllMocks();
  window.localStorage.clear();

  mockUseIntegrationsQuery.mockReturnValue({
    data: defaultIntegrations,
    isLoading: false,
    isError: false,
  } as unknown as ReturnType<typeof useIntegrationsQuery>);

  mockUseAvailabilityQuery.mockReturnValue({
    data: [
      { start: '2024-03-18T15:00:00.000Z', end: '2024-03-18T15:45:00.000Z' },
      { start: '2024-03-18T16:00:00.000Z', end: '2024-03-18T16:45:00.000Z' },
    ],
    isLoading: false,
  } as unknown as ReturnType<typeof useAvailabilityQuery>);

  mockUseConnectIntegrationMutation.mockReturnValue({
    mutate: jest.fn(),
    isLoading: false,
  } as unknown as ReturnType<typeof useConnectIntegrationMutation>);

  mockUseDisconnectIntegrationMutation.mockReturnValue({
    mutate: jest.fn(),
    isLoading: false,
  } as unknown as ReturnType<typeof useDisconnectIntegrationMutation>);

  mockUseServicesQuery.mockReturnValue({
    data: defaultServices,
    isLoading: false,
  } as unknown as ReturnType<typeof useServicesQuery>);
});

describe('BookingsPage', () => {
  it('renders booking providers and service mapping grid', () => {
    render(<BookingsPage />);

    expect(screen.getByText('Choose booking provider')).toBeInTheDocument();
    expect(screen.getByText('Calendly')).toBeInTheDocument();
    expect(screen.getByText('Service mapping')).toBeInTheDocument();
    expect(screen.getAllByText('Intro Class')[0]).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save mappings/i })).toBeInTheDocument();
  });

  it('opens booking preview modal and shows fallback slots when availability is empty', async () => {
    mockUseAvailabilityQuery.mockReturnValue({
      data: [],
      isLoading: false,
    } as unknown as ReturnType<typeof useAvailabilityQuery>);

    render(<BookingsPage />);

    fireEvent.click(screen.getByRole('button', { name: /open booking link preview/i }));

    expect(await screen.findByText('Booking link preview')).toBeInTheDocument();
    expect(screen.getByText('9:00 AM')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /copy link/i })).toBeInTheDocument();
    expect(screen.getByText('https://calendly.com/videobooker/intro-class')).toBeInTheDocument();
  });

  it('persists updated service mappings to localStorage', () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    render(<BookingsPage />);

    const selects = screen.getAllByRole('combobox');
    fireEvent.change(selects[0], { target: { value: 'Consultation' } });
    fireEvent.click(screen.getByRole('button', { name: /save mappings/i }));

    expect(setItemSpy).toHaveBeenCalledWith(
      'videobooker.serviceMappings.v1',
      expect.stringContaining('Consultation'),
    );

    setItemSpy.mockRestore();
  });
});

describe('BookingLinkModal', () => {
  it('renders shareable URL and slots', () => {
    render(
      <BookingLinkModal
        open
        onClose={() => undefined}
        provider="calendly"
        bookingUrl="https://example.com/book"
        eventLabel="Intro Session"
        availability={[
          { start: '2024-03-18T12:00:00.000Z', end: '2024-03-18T12:45:00.000Z' },
          { start: '2024-03-18T13:00:00.000Z', end: '2024-03-18T13:45:00.000Z' },
        ]}
        isProviderConnected
      />,
    );

    expect(screen.getByText('Booking link preview')).toBeInTheDocument();
    expect(screen.getByText('https://example.com/book')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });
});
