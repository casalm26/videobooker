import type { Metadata } from 'next';
import Link from 'next/link';

import { SignInCard } from '../../../components/auth/sign-in-card';

export const metadata: Metadata = {
  title: 'Sign in • VideoBooker',
};

export default function SignInPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-10">
      <div className="absolute left-1/2 top-10 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/30 blur-3xl" />
      <div className="relative z-10 flex w-full max-w-xl flex-col items-center gap-6 text-center">
        <div className="space-y-2">
          <Link href="/" className="text-sm font-medium text-muted-foreground transition hover:text-primary">
            ← Back to home
          </Link>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">Welcome back</h1>
          <p className="text-muted-foreground">
            Sign in with Google to continue orchestrating your automated video marketing and booking flows.
          </p>
        </div>
        <SignInCard />
      </div>
    </main>
  );
}
