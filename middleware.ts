import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';
import { getCookies } from './lib/serveractions';

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const custom_token = await getCookies();

    const protectedRoutes = ['/dashboard', '/editor']; // Pages that require authentication
    const guestOnlyRoutes = ['/resetpassword', '/forget']; // Pages NOT accessible to logged-in users

    const path = req.nextUrl.pathname;

    // 🚀 **Redirect UNAUTHENTICATED users away from protected pages**
    if (protectedRoutes.some(route => path.startsWith(route))) {
        if (!token && !custom_token) {
            return NextResponse.redirect(new URL('/?error=NotLoggedIn', req.url));
        }
    }

    // 🔒 **Redirect AUTHENTICATED users away from reset & forget password pages**
    if (guestOnlyRoutes.includes(path)) {
        if (token || custom_token) {
            return NextResponse.redirect(new URL('/', req.url)); // Redirect logged-in users to dashboard
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/editor/:path*', '/resetpassword', '/forget'],
};
