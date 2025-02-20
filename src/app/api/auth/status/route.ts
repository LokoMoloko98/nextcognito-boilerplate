import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  // Read the accessToken cookie from the request
  const accessToken = req.cookies.get('accessToken')?.value;
  return NextResponse.json({ isLoggedIn: Boolean(accessToken) });
}