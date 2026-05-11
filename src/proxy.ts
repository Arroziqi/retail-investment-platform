import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This is a simple middleware that checks for session cookies.
// In a real production app, we would verify the session token.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Define public routes that don't require authentication
  const isPublicRoute = 
    pathname === '/' || 
    pathname.startsWith('/login') || 
    pathname.startsWith('/register') ||
    pathname.startsWith('/api/auth') ||
    pathname.startsWith('/_next') ||
    pathname.includes('favicon.ico') ||
    pathname.includes('mockServiceWorker.js') ||
    /\.(png|jpg|jpeg|gif|svg|webp|ico)$/i.test(pathname);

  console.log(`[Middleware] ${request.method} ${pathname} | isPublic: ${isPublicRoute}`);


  const sessionToken = request.cookies.get('session-token');
  const kycStatus = request.cookies.get('kyc-status')?.value || 'Unverified';

  // 1. If no session and trying to access a protected route, redirect to login
  if (!sessionToken && !isPublicRoute) {
    const url = new URL('/login', request.url);
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }

  // 2. If session exists
  if (sessionToken) {
    // Prevent logged-in users from accessing login/register pages
    if (pathname === '/login' || pathname === '/register') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Handle KYC Gates for protected routes
    const isProtectedRoute = pathname.startsWith('/dashboard') || 
                             pathname.startsWith('/watchlist') || 
                             pathname.startsWith('/settings') ||
                             pathname.startsWith('/funds');

    if (isProtectedRoute) {
      if (kycStatus === 'Unverified') {
        return NextResponse.redirect(new URL('/onboarding/kyc', request.url));
      }
      
      if (kycStatus === 'Pending' && !pathname.startsWith('/onboarding/verification')) {
        return NextResponse.redirect(new URL('/onboarding/verification', request.url));
      }

      if (kycStatus === 'Rejected') {
        // Handle rejection - maybe a specific page or back to KYC
        return NextResponse.redirect(new URL('/onboarding/kyc?status=rejected', request.url));
      }
    }
  }

  return NextResponse.next();
}

export default proxy;

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - mockServiceWorker.js (MSW)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|mockServiceWorker.js).*)',
  ],
};



