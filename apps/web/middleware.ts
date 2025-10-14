export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/analytics/:path*',
    '/bookings/:path*',
    '/create/:path*',
    '/dashboard/:path*',
    '/inbox/:path*',
    '/library/:path*',
    '/schedule/:path*',
    '/settings/:path*',
  ],
};
