import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const updateToolSchema = z.object({
  name: z.string().min(1).optional(),
  iconUrl: z.string().min(1).optional(),
  order: z.number().int().optional(),
  isActive: z.boolean().optional(),
});

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    if (!id || typeof id !== 'string') {
      return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
    }

    const body = await request.json();
    const validated = updateToolSchema.parse(body);

    const tool = await prisma.tool.update({
      where: { id },
      data: validated,
    });
    return NextResponse.json(tool);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update tool' }, { status: 400 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    if (!id || typeof id !== 'string') {
      return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
    }

    await prisma.tool.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to delete tool' }, { status: 400 });
  }
}
