import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminFromCookies } from '@/lib/auth';
import { z } from 'zod';

const updateSocialSchema = z.object({
  platform: z.string().min(1, 'Le nom de la plateforme est requis'),
  url: z.string().url('URL valide requise'),
  icon: z.string().min(1, "L'icône est requise"),
  isActive: z.boolean().optional().default(true),
  order: z.number().int().optional().default(0),
});

const paramSchema = z.object({
  id: z.string().min(1, 'ID invalide'),
});

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getAdminFromCookies();
  if (!admin) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  try {
    const rawParams = await params;
    const validatedParams = paramSchema.safeParse(rawParams);
    if (!validatedParams.success) {
      return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
    }
    const { id } = validatedParams.data;

    const rawBody = await request.json();
    const validatedBody = updateSocialSchema.safeParse(rawBody);
    if (!validatedBody.success) {
      return NextResponse.json({ error: 'Données invalides', details: validatedBody.error.format() }, { status: 400 });
    }

    const data = validatedBody.data;
    const updated = await prisma.socialLink.update({
      where: { id },
      data: {
        platform: data.platform,
        url: data.url,
        icon: data.icon,
        isActive: data.isActive,
        order: data.order,
      },
    });

    return NextResponse.json({ success: true, social: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Erreur lors de la mise à jour' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getAdminFromCookies();
  if (!admin) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  try {
    const rawParams = await params;
    const validatedParams = paramSchema.safeParse(rawParams);
    if (!validatedParams.success) {
      return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
    }
    const { id } = validatedParams.data;

    await prisma.socialLink.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Échec de la suppression' }, { status: 500 });
  }
}
