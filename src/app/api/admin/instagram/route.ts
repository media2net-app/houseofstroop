import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const posts = await prisma.instagramPost.findMany({
      orderBy: { order: 'asc' }
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Failed to fetch Instagram posts:', error);
    return NextResponse.json({ error: 'Failed to fetch Instagram posts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { imageUrl, caption, permalink, isActive, order } = await request.json();

    if (!imageUrl || !caption) {
      return NextResponse.json({ error: 'Image URL and caption are required' }, { status: 400 });
    }

    const post = await prisma.instagramPost.create({
      data: {
        imageUrl,
        caption,
        permalink: permalink || '',
        isActive: isActive !== false,
        order: order || 0
      }
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error('Failed to create Instagram post:', error);
    return NextResponse.json({ error: 'Failed to create Instagram post' }, { status: 500 });
  }
}
