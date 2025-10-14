declare module 'next-auth' {
  export interface User {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }

  export interface Account {
    provider: string;
    providerAccountId: string;
  }

  export interface Session {
    user?: User & { id?: string };
  }

  export interface JWT {
    sub?: string;
    picture?: string | null;
    [key: string]: unknown;
  }

  export interface SignInParams {
    user: User;
    account?: Account | null;
  }

  export interface SessionParams {
    session: Session;
    token: JWT;
  }

  export interface JWTParams {
    token: JWT;
    user?: User | null;
  }

  export interface Events {
    signIn?: (params: { user: User }) => Promise<void> | void;
  }

  export interface Callbacks {
    signIn?: (params: SignInParams) => Promise<boolean | string> | boolean | string;
    session?: (params: SessionParams) => Promise<Session> | Session;
    jwt?: (params: JWTParams) => Promise<JWT> | JWT;
  }

  export interface NextAuthOptions {
    secret?: string;
    session?: {
      strategy?: 'jwt' | 'database';
    };
    pages?: {
      signIn?: string;
    };
    providers: Array<unknown>;
    callbacks?: Callbacks;
    events?: Events;
  }

  const NextAuth: (options: NextAuthOptions) => (req: unknown, res: unknown) => Promise<unknown>;
  export default NextAuth;
}

declare module 'next-auth/react' {
  import type { Session } from 'next-auth';

  export function signIn(provider?: string, options?: Record<string, unknown>): Promise<void>;
  export function signOut(options?: Record<string, unknown>): Promise<void>;
  export function useSession(): {
    data: Session | null;
    status: 'loading' | 'authenticated' | 'unauthenticated';
  };
  export interface SessionProviderProps {
    children: React.ReactNode;
  }
  export function SessionProvider(props: SessionProviderProps): JSX.Element;
}

declare module 'next-auth/providers/google' {
  type GoogleProviderConfig = {
    clientId: string;
    clientSecret: string;
  };

  export default function GoogleProvider(options: GoogleProviderConfig): unknown;
}

declare module 'next-auth/middleware' {
  const middleware: (request: unknown) => unknown;
  export default middleware;
}
