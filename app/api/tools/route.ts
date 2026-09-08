import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const createToolSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  iconUrl: z.string().min(1, "L'URL de l'icône est requise"),
  order: z.number().int().optional().default(0),
  isActive: z.boolean().optional().default(true),
});

export async function GET() {
  try {
    const tools = await prisma.tool.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(tools);
  } catch (error) {
    console.error('Error fetching tools:', error);
    return NextResponse.json({ error: 'Failed to fetch tools' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = createToolSchema.parse(body);

    const tool = await prisma.tool.create({
      data: {
        name: validated.name,
        iconUrl: validated.iconUrl,
        order: validated.order,
        isActive: validated.isActive,
      },
    });
    return NextResponse.json(tool, { status: 201 });
  } catch (error: any) {
    console.error('Error creating tool:', error);
    return NextResponse.json({ error: error.message || 'Failed to create tool' }, { status: 400 });
  }
}
