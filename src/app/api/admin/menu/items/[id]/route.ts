import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { isActive, name, price, description, note, isPopular } = await request.json();

    const item = await prisma.menuItem.update({
      where: { id: params.id },
      data: {
        ...(isActive !== undefined && { isActive }),
        ...(name && { name }),
        ...(price !== undefined && { price }),
        ...(description !== undefined && { description }),
        ...(note !== undefined && { note }),
        ...(isPopular !== undefined && { isPopular })
      }
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error('Failed to update item:', error);
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.menuItem.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete item:', error);
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
  }
}
