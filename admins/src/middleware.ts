import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose'; // ✅ benar: ambil function jwtVerify dari jose

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || 'supersecret');

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 🔹 Skip middleware untuk public routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api/login') ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/images')
  ) {
    return NextResponse.next();
  }

  // 🔹 Proteksi route /admin/*
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      console.log('❌ No token found, redirecting to login');
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      // 🔹 Verifikasi JWT dengan jose
      await jwtVerify(token, SECRET_KEY); // ✅ ini menggantikan jwt.verify
      console.log('✅ Token valid');

      // 🔹 Lanjutkan request
      return NextResponse.next();
    } catch (error) {
      console.error('❌ Token invalid:', error);

      // 🔹 Hapus cookie yang invalid
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
