import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminFromCookies } from '@/lib/auth';
import { z } from 'zod';

const updateProjectSchema = z.object({
  title: z.string().min(1, 'Le titre est requis'),
  summary: z.string().min(1, 'Le résumé est requis'),
  description: z.string().optional().default(''),
  coverImage: z.string().min(1, 'Image de couverture requise'),
  images: z.array(z.string()).optional(),
  liveUrl: z.string().optional().nullable(),
  githubUrl: z.string().optional().nullable(),
  technologies: z.array(z.string()).optional().default([]),
  isFeatured: z.boolean().optional().default(false),
  order: z.number().int().optional().default(0),
  categoryId: z.string().optional().nullable(),
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
      return NextResponse.json({ error: 'ID invalide', details: validatedParams.error.format() }, { status: 400 });
    }
    const { id } = validatedParams.data;

    const rawBody = await request.json();
    const validatedBody = updateProjectSchema.safeParse(rawBody);
    if (!validatedBody.success) {
      return NextResponse.json({ error: 'Données invalides', details: validatedBody.error.format() }, { status: 400 });
    }

    const data = validatedBody.data;

    const updated = await prisma.project.update({
      where: { id },
      data: {
        title: data.title,
        summary: data.summary,
        description: data.description,
        coverImage: data.coverImage,
        images: data.images || (data.coverImage ? [data.coverImage] : []),
        liveUrl: data.liveUrl || null,
        githubUrl: data.githubUrl || null,
        technologies: data.technologies,
        isFeatured: data.isFeatured,
        order: data.order,
        categoryId: data.categoryId || null,
      },
      include: { category: true },
    });

    return NextResponse.json({ success: true, project: updated });
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
      return NextResponse.json({ error: 'ID invalide', details: validatedParams.error.format() }, { status: 400 });
    }
    const { id } = validatedParams.data;

    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Échec de la suppression' }, { status: 500 });
  }
}

