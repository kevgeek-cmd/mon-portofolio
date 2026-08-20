import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

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
    const data = await request.json();
    const tool = await prisma.tool.create({
      data: {
        name: data.name,
        iconUrl: data.iconUrl,
        order: data.order || 0,
        isActive: data.isActive !== undefined ? data.isActive : true,
      },
    });
    return NextResponse.json(tool, { status: 201 });
  } catch (error) {
    console.error('Error creating tool:', error);
    return NextResponse.json({ error: 'Failed to create tool' }, { status: 500 });
  }
}
