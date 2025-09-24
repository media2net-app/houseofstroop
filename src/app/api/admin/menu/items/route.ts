import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { name, price, description, note, isPopular, isActive, categoryId, sectionId } = await request.json();

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    // If no sectionId provided, get the first section of the first category
    let targetSectionId = sectionId;
    if (!targetSectionId) {
      const firstCategory = await prisma.menuCategory.findFirst({
        include: { sections: true }
      });
      if (firstCategory?.sections[0]) {
        targetSectionId = firstCategory.sections[0].id;
      } else {
        return NextResponse.json({ error: 'No sections available' }, { status: 400 });
      }
    }

    const item = await prisma.menuItem.create({
      data: {
        name,
        price: price || null,
        description: description || null,
        note: note || null,
        isPopular: isPopular || false,
        isActive: isActive !== false,
        sectionId: targetSectionId
      }
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error('Failed to create menu item:', error);
    return NextResponse.json({ error: 'Failed to create menu item' }, { status: 500 });
  }
}
