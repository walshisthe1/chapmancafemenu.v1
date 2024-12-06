import { NextResponse } from 'next/server';
import { put, list, del } from '@vercel/blob';

export async function GET() {
  try {
    const defaultContent = {
      title: "Chapman Cafeteria",
      menuTitle: "Cafeteria Menu",
      mealOptionsTitle: "Meal Options",
      menuItems: [
        { id: 1, name: 'Grilled Chicken', demand: 5 },
        { id: 2, name: 'Vegetarian Pasta', demand: 3 },
        { id: 3, name: 'Taco Bar', demand: 8 },
      ],
      cafeNews: [
        'New vegan options available!',
        'Chef\'s special: Sushi Friday',
      ],
      date: new Date().toLocaleDateString(),
      lastUpdated: new Date().toLocaleTimeString(),
      iceCreamStatus: {
        isWorking: true,
        flavors: [
          { name: 'Vanilla', available: true },
          { name: 'Chocolate', available: true },
        ],
      },
    };

    const { blobs } = await list();
    const contentBlob = blobs.find(blob => blob.pathname === 'content.json');
    
    if (!contentBlob) {
      const { url } = await put('content.json', JSON.stringify(defaultContent), {
        access: 'public',
      });
      return NextResponse.json(defaultContent);
    }

    const response = await fetch(contentBlob.url);
    const content = await response.json();
    return NextResponse.json(content);
  } catch (error) {
    console.error('Error reading content:', error);
    return NextResponse.json({ error: 'Failed to read content' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const content = await request.json();
    
    if (!content || typeof content !== 'object') {
      return NextResponse.json(
        { error: 'Invalid content format' },
        { status: 400 }
      );
    }

    try {
      // Delete old content if it exists
      const { blobs } = await list();
      const oldContent = blobs.find(blob => blob.pathname === 'content.json');
      if (oldContent) {
        await del(oldContent.url);
      }

      // Save new content
      const { url } = await put('content.json', JSON.stringify(content), {
        access: 'public',
      });

      return NextResponse.json(content);
    } catch (writeError) {
      console.error('Error writing to blob:', writeError);
      return NextResponse.json(
        { error: 'Failed to save content' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in POST handler:', error);
    return NextResponse.json(
      { error: 'Failed to process content' },
      { status: 500 }
    );
  }
}