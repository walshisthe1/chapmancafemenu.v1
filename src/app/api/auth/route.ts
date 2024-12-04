import { NextResponse } from 'next/server';

const ADMIN_PASSWORD = 'walsh'; // In production, use environment variables

export async function POST(request: Request) {
  const { password } = await request.json();
  
  if (password === ADMIN_PASSWORD) {
    return NextResponse.json({ success: true });
  }
  
  return NextResponse.json({ success: false }, { status: 401 });
} 