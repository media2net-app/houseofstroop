import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const categories = await prisma.menuCategory.findMany({
      include: {
        sections: {
          include: {
            items: {
              orderBy: { order: 'asc' }
            }
          },
          orderBy: { order: 'asc' }
        }
      },
      orderBy: { order: 'asc' }
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error('Failed to fetch menu categories:', error);
    return NextResponse.json({ error: 'Failed to fetch menu categories' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { title, order } = await request.json();

    const category = await prisma.menuCategory.create({
      data: {
        title,
        order: order || 0
      }
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error('Failed to create category:', error);
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}
