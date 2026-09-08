import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminFromCookies } from '@/lib/auth';
import { z } from 'zod';

const createServiceSchema = z.object({
  title: z.string().min(1, 'Le titre est requis'),
  slug: z.string().optional(),
  description: z.string().min(5, 'La description est requise'),
  icon: z.string().min(1, "L'icône est requise"),
  tags: z.string().optional().nullable(),
  isActive: z.boolean().optional().default(true),
  order: z.number().int().optional().default(0),
});

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(services);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Erreur lors du chargement des compétences' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const admin = await getAdminFromCookies();
  if (!admin) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  try {
    const body = await request.json();
    const validated = createServiceSchema.parse(body);

    const slug = validated.slug || validated.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now();

    const service = await prisma.service.create({
      data: {
        title: validated.title,
        slug,
        description: validated.description,
        icon: validated.icon,
        tags: validated.tags || null,
        isActive: validated.isActive,
        order: validated.order,
      },
    });

    return NextResponse.json({ success: true, service }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Validation échouée' }, { status: 400 });
  }
}
