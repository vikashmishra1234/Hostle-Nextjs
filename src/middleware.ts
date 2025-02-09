import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request:NextRequest){
    const url = request.nextUrl;
    const token = await getToken({req:request,secret:'vikash mishra'})
    if(!token && (url.pathname.startsWith('/hostler/dashboard'))){
        return NextResponse.redirect(new URL('/',request.url));
    }
    if(!token && (url.pathname.startsWith('/admin/dashboard'))){
        return NextResponse.redirect(new URL('/',request.url));
    }
    if(token  && (url.pathname.startsWith('/hostler/login')) && (token.role=='student')){
        return NextResponse.redirect(new URL('/hostler/dashboard',request.url));
    }
    if(token && (token.role=='admin') && (url.pathname.startsWith('/login'))){
        return NextResponse.redirect(new URL('/admin/dashboard',request.url));
    }
}

export const config = {
    matcher:[
        '/admin/dashboard',
        '/login',
        '/hostler/login',
        '/hostler/dashboard:path*',
        '/admin/dashboard:path*',
        '/admin/:path*',
    ]
}