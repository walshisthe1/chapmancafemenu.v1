import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Use tmp directory for Vercel environment
const dataDir = process.env.VERCEL 
  ? '/tmp'
  : path.join(process.cwd(), 'data');

const dataFilePath = path.join(dataDir, 'content.json');

// Ensure directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

export async function POST(request: Request) {
  try {
    const content = await request.json();
    content.lastUpdated = new Date().toLocaleTimeString();
    
    // Write to file
    await fs.promises.writeFile(
      dataFilePath,
      JSON.stringify(content, null, 2),
      'utf8'
    );

    // Verify the write was successful
    const savedContent = await fs.promises.readFile(dataFilePath, 'utf8');
    const parsedContent = JSON.parse(savedContent);
    
    return NextResponse.json({
      success: true,
      content: parsedContent
    });
  } catch (error: any) {
    console.error('Save error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to save content', 
        details: error?.message || 'Unknown error',
        path: dataFilePath
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    if (!fs.existsSync(dataFilePath)) {
      // Return default content if file doesn't exist
      const defaultContent = {
        title: "Chapman Cafeteria",
        menuTitle: "Cafeteria Menu",
        mealOptionsTitle: "Meal Options",
        menuItems: [],
        cafeNews: [],
        date: new Date().toLocaleDateString('en-US', { 
          weekday: 'long',
          month: 'long',
          day: 'numeric'
        }),
        lastUpdated: new Date().toLocaleTimeString(),
        iceCreamStatus: {
          isWorking: true,
          flavors: [
            { name: "Vanilla", available: true },
            { name: "Chocolate", available: true }
          ]
        }
      };
      return NextResponse.json(defaultContent);
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