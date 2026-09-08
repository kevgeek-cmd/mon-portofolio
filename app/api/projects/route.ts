import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminFromCookies } from '@/lib/auth';
import { z } from 'zod';

const createProjectSchema = z.object({
  title: z.string().min(1, 'Le titre est requis'),
  slug: z.string().optional(),
  summary: z.string().min(1, 'Le résumé est requis'),
  description: z.string().optional().default(''),
  coverImage: z.string().min(1, 'Image de couverture requise'),
  images: z.array(z.string()).optional(),
  liveUrl: z.string().optional().nullable(),
  githubUrl: z.string().optional().nullable(),
  technologies: z.array(z.string()).optional().default([]),
  isFeatured: z.boolean().optional().default(true),
  order: z.number().int().optional().default(0),
  categoryId: z.string().optional().nullable(),
});

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: { category: true },
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(projects);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const admin = await getAdminFromCookies();
  if (!admin) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  try {
    const rawBody = await request.json();
    const validated = createProjectSchema.safeParse(rawBody);
    if (!validated.success) {
      return NextResponse.json({ error: 'Données invalides', details: validated.error.format() }, { status: 400 });
    }

    const body = validated.data;
    const project = await prisma.project.create({
      data: {
        title: body.title,
        slug: body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString().slice(-4),
        summary: body.summary,
        description: body.description || '',
        coverImage: body.coverImage,
        images: body.images || [body.coverImage],
        liveUrl: body.liveUrl || null,
        githubUrl: body.githubUrl || null,
        technologies: body.technologies || [],
        isFeatured: body.isFeatured ?? true,
        order: body.order ?? 0,
        categoryId: body.categoryId || null,
      },
    });
    return NextResponse.json(project);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const admin = await getAdminFromCookies();
  if (!admin) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID requis' }, { status: 400 });
    }

    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

