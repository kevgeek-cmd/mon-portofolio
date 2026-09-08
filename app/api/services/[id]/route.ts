import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminFromCookies } from '@/lib/auth';
import { z } from 'zod';

const updateServiceSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(5).optional(),
  icon: z.string().min(1).optional(),
  image: z.string().optional().nullable(),
  percentage: z.number().int().min(0).max(100).optional().nullable(),
  rating: z.number().int().min(1).max(5).optional().nullable(),
  tags: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  order: z.number().int().optional(),
});

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getAdminFromCookies();
  if (!admin) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  try {
    const { id } = await params;
    if (!id || typeof id !== 'string') {
      return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
    }

    const body = await request.json();
    const validated = updateServiceSchema.parse(body);

    const updated = await prisma.service.update({
      where: { id },
      data: validated as any,
    });

    return NextResponse.json({ success: true, service: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Validation échouée' }, { status: 400 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getAdminFromCookies();
  if (!admin) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  try {
    const { id } = await params;
    if (!id || typeof id !== 'string') {
      return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
    }

    await prisma.service.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Échec de la suppression' }, { status: 500 });
  }
}
