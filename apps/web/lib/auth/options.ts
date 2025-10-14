import { loadEnv, type EnvConfig } from '@videobooker/shared/config';
import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import { upsertAirtableUser } from '../airtable/users';

const env = loadEnv();

function requireEnv<K extends keyof EnvConfig>(key: K, message: string): NonNullable<EnvConfig[K]> {
  const value = env[key];

  if (!value) {
    throw new Error(message);
  }

  return value as NonNullable<EnvConfig[K]>;
}

const googleClientId = requireEnv('GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_ID is not set.');
const googleClientSecret = requireEnv('GOOGLE_CLIENT_SECRET', 'GOOGLE_CLIENT_SECRET is not set.');
const nextAuthSecret = requireEnv('NEXTAUTH_SECRET', 'NEXTAUTH_SECRET is not set.');

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/signin',
  },
  secret: nextAuthSecret,
  providers: [
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!account || account.provider !== 'google') {
        return false;
      }

      if (!user.email) {
        throw new Error('Google account did not return an email address.');
      }

      await upsertAirtableUser({
        email: user.email,
        name: user.name,
        image: user.image,
        provider: account.provider,
        providerAccountId: account.providerAccountId,
      });

      return true;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }

      if (session.user && token.picture) {
        session.user.image = token.picture as string;
      }

      return session;
    },
    async jwt({ token, user }) {
      if (user?.image) {
        token.picture = user.image;
      }

      return token;
    },
  },
  events: {
    signIn({ user }) {
      if (user.email) {
        console.info(`User ${user.email} signed in via Google.`);
      }
    },
  },
};
