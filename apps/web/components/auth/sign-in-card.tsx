'use client';

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

function GoogleLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...props}>
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.78-.07-1.53-.21-2.27H12v4.3h6.43c-.28 1.44-1.15 2.66-2.45 3.48l-.02.14 3.54 2.75.24.02c2.07-1.91 3.26-4.72 3.26-8.42z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.79-2.94c-1.05.7-2.39 1.12-4.15 1.12-3.19 0-5.9-2.15-6.87-5.08l-.14.01-3.71 2.87-.05.13C3.17 21.54 7.26 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.13 14.19c-.24-.72-.38-1.48-.38-2.19s.14-1.47.36-2.19l-.01-.15-3.75-2.91-.12.06C.52 8.93 0 10.41 0 12c0 1.59.52 3.07 1.23 4.29l3.9-3.1z"
      />
      <path
        fill="#EA4335"
        d="M12 4.74c1.77 0 2.96.77 3.64 1.42l2.66-2.59C16.94 1.37 14.65.34 12 .34 7.26.34 3.17 2.8 1.23 7.71l3.9 3.1C6.1 7.87 8.81 4.74 12 4.74z"
      />
    </svg>
  );
}

function getErrorMessage(code: string | null): string | null {
  if (!code) {
    return null;
  }

  const normalizedCode = code.toLowerCase();

  switch (normalizedCode) {
    case 'accessdenied':
      return 'Access was denied. Please try another Google account.';
    case 'signin':
      return 'Unable to sign in. Please try again.';
    case 'oauthaccountnotlinked':
      return 'This Google account is already linked to another login method.';
    case 'configuration':
      return 'Sign-in is misconfigured. Verify your environment variables.';
    case 'oauthsignin':
    case 'oauthcallback':
      return 'We were unable to complete the Google sign-in flow. Please try again.';
    case 'server_error':
      return 'A server error occurred while signing in. Please try again later.';
    case 'sessionrequired':
      return 'Please sign in to continue.';
    case 'default':
    default:
      return 'Something went wrong while signing in. Please try again.';
  }
}

export function SignInCard() {
  const searchParams = useSearchParams();
  const errorCode = searchParams?.get('error');
  const callbackUrl = searchParams?.get('callbackUrl') ?? '/dashboard';

  const errorMessage = useMemo(() => getErrorMessage(errorCode), [errorCode]);

  return (
    <Card className="w-full max-w-md border-border/60 bg-card/90 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Sign in to VideoBooker</CardTitle>
        <CardDescription>Connect with Google to access your dashboard and launch flow.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          type="button"
          className="w-full gap-2"
          onClick={() => signIn('google', { callbackUrl })}
          size="lg"
        >
          <GoogleLogo className="h-5 w-5" />
          Continue with Google
        </Button>
        {errorMessage ? (
          <p className="text-sm text-destructive" role="alert">
            {errorMessage}
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}
