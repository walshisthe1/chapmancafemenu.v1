import { NextResponse } from 'next/server';

// Remove all config exports
export async function POST(request: Request) {
  try {
    // Your existing upload logic
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process upload' },
      { status: 500 }
    );
  }
} 