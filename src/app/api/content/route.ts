import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'content.json');

// Ensure data directory exists
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

export async function POST(request: Request) {
  try {
    const content = await request.json();
    content.lastUpdated = new Date().toLocaleTimeString();
    
    // Ensure we have write permissions and the directory exists
    await fs.promises.writeFile(
      dataFilePath,
      JSON.stringify(content, null, 2),
      { flag: 'w' }
    );
    
    return NextResponse.json({ success: true, content });
  } catch (error: any) {
    console.error('Save error:', error);
    return NextResponse.json(
      { error: 'Failed to save content', details: error?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    if (!fs.existsSync(dataFilePath)) {
      return NextResponse.json({ error: 'No content found' }, { status: 404 });
    }
    const data = await fs.promises.readFile(dataFilePath, 'utf8');
    return NextResponse.json(JSON.parse(data));
  } catch (error: any) {
    console.error('Read error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch content', details: error?.message || 'Unknown error' },
      { status: 500 }
    );
  }
} 