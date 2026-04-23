import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // protect /admin subpaths (allow public /admin login page)
  if (pathname.startsWith('/admin') && pathname !== '/admin') {
    const cookie = request.cookies.get('admin_auth')?.value || '';
    const secret = process.env.ADMIN_PASSWORD || '';
    if (!cookie || cookie !== secret) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};
