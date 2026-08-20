import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

  const [posts, settings, seoSettings] = await Promise.all([
    prisma.blogPost
      .findMany({
        where: { status: 'PUBLISHED' },
        orderBy: { publishedAt: 'desc' },
        take: 20,
      })
      .catch(() => []),
    prisma.settings.findUnique({ where: { id: 'default' } }).catch(() => null),
    prisma.seoSettings.findUnique({ where: { id: 'default' } }).catch(() => null),
  ]);

  const companyName = (settings as any)?.companyName || 'Template Agency';
  const siteDescription = seoSettings?.siteDescription || 'Solutions numériques modernes et performantes';

  const rssItemsXml = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid>${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.publishedAt || post.createdAt).toUTCString()}</pubDate>
      <description><![CDATA[${post.excerpt}]]></description>
    </item>`
    )
    .join('');

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${companyName} - Blog RSS</title>
    <link>${baseUrl}</link>
    <description>${siteDescription}</description>
    <language>fr-fr</language>
    ${rssItemsXml}
  </channel>
</rss>`;

  return new NextResponse(rssFeed, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
