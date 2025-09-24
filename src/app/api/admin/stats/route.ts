import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const [menuCategories, menuItems, instagramPosts, images] = await Promise.all([
      prisma.menuCategory.count(),
      prisma.menuItem.count(),
      prisma.instagramPost.count(),
      prisma.image.count()
    ]);

    return NextResponse.json({
      menuCategories,
      menuItems,
      instagramPosts,
      images
    });
  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
