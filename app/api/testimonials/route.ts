import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminFromCookies } from '@/lib/auth';
import { z } from 'zod';

const createTestimonialSchema = z.object({
  clientName: z.string().min(1, 'Le nom est requis'),
  role: z.string().min(1, 'Le rôle est requis'),
  company: z.string().min(1, "L'entreprise est requise"),
  avatar: z.string().optional().nullable(),
  quote: z.string().min(5, 'Le témoignage est requis'),
  rating: z.number().int().min(1).max(5).default(5),
  order: z.number().int().optional().default(0),
});

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(testimonials);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Erreur lors du chargement des témoignages' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const admin = await getAdminFromCookies();
  if (!admin) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  try {
    const body = await request.json();
    const validated = createTestimonialSchema.parse(body);

    const testimonial = await prisma.testimonial.create({
      data: {
        clientName: validated.clientName,
        role: validated.role,
        company: validated.company,
        avatar: validated.avatar || null,
        quote: validated.quote,
        rating: validated.rating,
        order: validated.order,
      },
    });

    return NextResponse.json({ success: true, testimonial }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Validation échouée' }, { status: 400 });
  }
}
