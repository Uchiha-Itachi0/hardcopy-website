import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {HandleLogin} from "@/utils/api/handle_login";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const authToken = request.cookies.get('token')?.value;
    const currentRoute = request.nextUrl.pathname;
    if(authToken === undefined){
        return NextResponse.redirect(new URL('/login', request.url))
    }
    const isTokenValid = await HandleLogin.verifyToken(authToken);
    if(!isTokenValid.success){
        return NextResponse.redirect(new URL('/login', request.url))
    }
    else if(isTokenValid && currentRoute === '/login'){
        return NextResponse.redirect(new URL('/content', request.url))
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/content/:path*']
}