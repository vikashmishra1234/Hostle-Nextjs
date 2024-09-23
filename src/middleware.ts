import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request:NextRequest){
    const url = request.nextUrl;
    const token = await getToken({req:request,secret:'vikash mishra'})
    if(!token && (url.pathname.startsWith('/admin'))){
        return NextResponse.redirect(new URL('/login',request.url));
    }
    if(!token && (url.pathname.startsWith('/hostler'))){
        return NextResponse.redirect(new URL('/hostler/login',request.url));
    }
    if(token  && (url.pathname.startsWith('/admin')) && (token.role=='student')){
        return NextResponse.redirect(new URL('/login',request.url));
    }
    if(token  && (url.pathname.startsWith('/hostler')) && (token.role=='admin')){
        return NextResponse.redirect(new URL('/hostler/login',request.url));
    }
}

export const config = {
    matcher:[
        '/admin/dashboard/addstudent',
        '/admin/:path*',
        '/hostler/dashboard:path*',
    ]
}