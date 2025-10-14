'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { BusinessProvider } from '../state/business-context';

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <BusinessProvider>{children}</BusinessProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
