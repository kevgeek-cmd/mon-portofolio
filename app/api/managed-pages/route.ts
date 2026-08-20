import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminFromCookies } from '@/lib/auth';

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
    const { name, platform, url, imageUrl, stats, description, order, isActive } = body;

    const newPage = await prisma.managedPage.create({
      data: {
        name,
        platform,
        url,
        imageUrl,
        stats,
        description,
        order: order || 0,
        isActive: isActive !== undefined ? isActive : true,
      },
    });

    return NextResponse.json({ success: true, page: newPage });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
