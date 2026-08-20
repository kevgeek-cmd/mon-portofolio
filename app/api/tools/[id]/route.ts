import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json();
    const tool = await prisma.tool.update({
      where: { id: params.id },
      data: {
        name: data.name,
        iconUrl: data.iconUrl,
        order: data.order,
        isActive: data.isActive,
      },
    });
    return NextResponse.json(tool);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update tool' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.tool.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete tool' }, { status: 500 });
  }
}
