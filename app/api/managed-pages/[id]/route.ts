import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminFromCookies } from '@/lib/auth';
import { z } from 'zod';

const updateManagedPageSchema = z.object({
  name: z.string().min(1).optional(),
  platform: z.string().min(1).optional(),
  url: z.string().optional().nullable(),
  imageUrl: z.string().min(1).optional(),
  stats: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  order: z.number().int().optional(),
  isActive: z.boolean().optional(),
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
    const validated = updateManagedPageSchema.parse(body);

    const updatedPage = await prisma.managedPage.update({
      where: { id },
      data: validated,
    });

    return NextResponse.json({ success: true, page: updatedPage });
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

    await prisma.managedPage.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
