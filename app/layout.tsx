import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Space_Grotesk } from 'next/font/google';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Kevin Assamoi — Product Builder, UI/UX & AI',
  description: 'Portfolio de Kevin Assamoi, Product Builder, UI/UX Designer et AI Architect spécialisé dans la conception d’expériences digitales haut de gamme et d’architectures IA.',
  keywords: ['Kevin Assamoi', 'Product Builder', 'AI Builder', 'UI/UX Designer', 'Next.js', 'Design Systems', 'Portfolio'],
  authors: [{ name: 'Kevin Assamoi' }],
  openGraph: {
    title: 'Kevin Assamoi — Product Builder, UI/UX & AI',
    description: 'Portfolio de Kevin Assamoi, Product Builder, UI/UX Designer et AI Architect spécialisé dans la conception d’expériences digitales haut de gamme.',
    url: 'https://mon-portofolio-smoky.vercel.app',
    siteName: 'Kevin Assamoi Studio',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kevin Assamoi — Product Builder, UI/UX & AI',
    description: 'Portfolio de Kevin Assamoi, Product Builder, UI/UX Designer et AI Architect.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Kevin Assamoi',
    url: 'https://mon-portofolio-smoky.vercel.app',
    jobTitle: 'Product Builder & AI Designer',
    description: 'Portfolio de Kevin Assamoi, Product Builder, UI/UX Designer et AI Architect.',
  };

  return (
    <html lang="fr" className={`${plusJakarta.variable} ${spaceGrotesk.variable} dark scroll-smooth`}>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#090909] text-[#F5F5F5] font-sans antialiased selection:bg-[#FF7A00] selection:text-black">
        {children}
      </body>
    </html>
  );
}
