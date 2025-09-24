import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { isActive, imageUrl, caption, permalink, order } = await request.json();

    const post = await prisma.instagramPost.update({
      where: { id: params.id },
      data: {
        ...(isActive !== undefined && { isActive }),
        ...(imageUrl && { imageUrl }),
        ...(caption && { caption }),
        ...(permalink !== undefined && { permalink }),
        ...(order !== undefined && { order })
      }
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error('Failed to update Instagram post:', error);
    return NextResponse.json({ error: 'Failed to update Instagram post' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.instagramPost.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete Instagram post:', error);
    return NextResponse.json({ error: 'Failed to delete Instagram post' }, { status: 500 });
  }
}
