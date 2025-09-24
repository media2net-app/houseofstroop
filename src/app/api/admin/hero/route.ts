import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const heroContent = await prisma.heroContent.findFirst({
      where: { isActive: true }
    });

    return NextResponse.json(heroContent);
  } catch (error) {
    console.error('Failed to fetch hero content:', error);
    return NextResponse.json({ error: 'Failed to fetch hero content' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, title, subtitle, backgroundImage, isActive } = await request.json();

    if (!title || !subtitle || !backgroundImage) {
      return NextResponse.json({ error: 'Title, subtitle, and background image are required' }, { status: 400 });
    }

    const heroContent = await prisma.heroContent.upsert({
      where: { id: id || 'main-hero' },
      update: {
        title,
        subtitle,
        backgroundImage,
        isActive: isActive !== false
      },
      create: {
        id: 'main-hero',
        title,
        subtitle,
        backgroundImage,
        isActive: isActive !== false
      }
    });

    return NextResponse.json(heroContent);
  } catch (error) {
    console.error('Failed to update hero content:', error);
    return NextResponse.json({ error: 'Failed to update hero content' }, { status: 500 });
  }
}
