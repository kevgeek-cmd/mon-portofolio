import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminFromCookies } from '@/lib/auth';
import { z } from 'zod';

const createManagedPageSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  platform: z.string().min(1, 'La plateforme est requise'),
  url: z.string().optional().nullable(),
  imageUrl: z.string().min(1, "L'image est requise"),
  stats: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  order: z.number().int().optional().default(0),
  isActive: z.boolean().optional().default(true),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const publicOnly = searchParams.get('public') === 'true';

    const where = publicOnly ? { isActive: true } : {};

    const pages = await prisma.managedPage.findMany({
      where,
      orderBy: { order: 'asc' },
    });
    
    return NextResponse.json({ success: true, pages });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const admin = await getAdminFromCookies();
  if (!admin) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  try {
    const body = await request.json();
    const validated = createManagedPageSchema.parse(body);

    const newPage = await prisma.managedPage.create({
      data: {
        name: validated.name,
        platform: validated.platform,
        url: validated.url || null,
        imageUrl: validated.imageUrl,
        stats: validated.stats || null,
        description: validated.description || null,
        order: validated.order,
        isActive: validated.isActive,
      },
    });

    return NextResponse.json({ success: true, page: newPage });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Validation échouée' }, { status: 400 });
  }
}
