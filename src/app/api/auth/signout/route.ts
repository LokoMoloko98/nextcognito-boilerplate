// src/app/api/auth/signout/route.ts
import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const response = NextResponse.json({ success: true });
  
  // Delete the auth cookies
  response.cookies.delete('accessToken');
  response.cookies.delete('refreshToken');
  response.cookies.delete('idToken');
  
  return response;
}
