import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminFromCookies } from '@/lib/auth';
import { z } from 'zod';

const createSocialSchema = z.object({
  platform: z.string().min(1, 'Le nom de la plateforme est requis'),
  url: z.string().url('URL valide requise'),
  icon: z.string().min(1, "L'icône est requise"),
  isActive: z.boolean().optional().default(true),
  order: z.number().int().optional().default(0),
});

export async function GET() {
  try {
    const socials = await prisma.socialLink.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(socials);
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
    const validated = createSocialSchema.safeParse(rawBody);
    if (!validated.success) {
      return NextResponse.json({ error: 'Données invalides', details: validated.error.format() }, { status: 400 });
    }

    const data = validated.data;
    const social = await prisma.socialLink.create({
      data: {
        platform: data.platform,
        url: data.url,
        icon: data.icon,
        isActive: data.isActive,
        order: data.order,
      },
    });

    return NextResponse.json(social);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Erreur lors de la création' }, { status: 500 });
  }
}
