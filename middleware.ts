import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';
import { getCookies } from './lib/serveractions';

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const custom_token = await getCookies()
    if(custom_token || token){
        return NextResponse.next();
    }

    if (!token || custom_token ) {
        return NextResponse.redirect(new URL('/?error=NotLoggedIn', req.url));
    }
}

export const config = {
    matcher: ['/dashboard/:path*', '/editor/:path*'],
};
