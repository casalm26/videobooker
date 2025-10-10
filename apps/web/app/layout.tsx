import type { Metadata, Viewport } from 'next';
import { ReactNode } from 'react';

import { Providers } from '../lib/providers';

export const metadata: Metadata = {
  title: 'VideoBooker',
  description: 'Automated video marketing and bookings for local businesses.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0f172a',
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
