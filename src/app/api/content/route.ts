import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Helper function to get the content file path
const getContentPath = () => {
  return path.join(process.cwd(), 'content.json');
};

// GET handler
export async function GET() {
  try {
    const filePath = getContentPath();
    
    try {
      const content = await fs.readFile(filePath, 'utf8');
      return NextResponse.json(JSON.parse(content));
    } catch (error) {
      // If file doesn't exist, return default content
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
      
      // Save default content
      await fs.writeFile(filePath, JSON.stringify(defaultContent, null, 2));
      return NextResponse.json(defaultContent);
    }
  } catch (error) {
    console.error('Error reading content:', error);
    return NextResponse.json({ error: 'Failed to read content' }, { status: 500 });
  }
}

// POST handler
export async function POST(request: Request) {
  try {
    const content = await request.json();
    console.log('Received content:', content);

    // Validate content structure
    if (!content || typeof content !== 'object') {
      return NextResponse.json(
        { error: 'Invalid content format' },
        { status: 400 }
      );
    }

    try {
      // Save the content
      await fs.writeFile(
        getContentPath(),
        JSON.stringify(content, null, 2),
        'utf8'
      );
      
      // Read back and return the saved content
      const savedContent = await fs.readFile(getContentPath(), 'utf8');
      return NextResponse.json(JSON.parse(savedContent));
    } catch (writeError) {
      console.error('Error writing file:', writeError);
      return NextResponse.json(
        { error: 'Failed to write content to file' },
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