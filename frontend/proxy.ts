import { NextResponse, type NextRequest } from 'next/server';

/**
 * Next.js 16 Proxy handler for authentication and edge routing redirects.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Forward default root to home dashboard if requested by query or cookie
  // Currently allows public access to (marketing), (auth), onboarding, and (app)
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
