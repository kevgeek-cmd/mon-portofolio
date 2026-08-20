import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Kevin Stéphane Assamoi — Digital & AI Product Builder',
  description: 'Portfolio de Kevin Stéphane Assamoi, professionnel du digital, Community Manager, Digital Project Manager et AI Product Builder spécialisé dans la création de produits numériques, SaaS, IA et expériences digitales.',
  keywords: ['Digital Builder', 'AI Builder', 'Product Builder', 'SaaS', 'Community Manager', 'Portfolio'],
  authors: [{ name: 'Kevin Stéphane Assamoi' }],
  openGraph: {
    title: 'Kevin Stéphane Assamoi — Digital & AI Product Builder',
    description: 'Portfolio de Kevin Stéphane Assamoi, professionnel du digital, Community Manager, Digital Project Manager et AI Product Builder spécialisé dans la création de produits numériques, SaaS, IA et expériences digitales.',
    url: 'https://kevinst-assamoi.com',
    siteName: 'Kevin Stéphane Assamoi',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kevin Stéphane Assamoi — Digital & AI Product Builder',
    description: 'Portfolio de Kevin Stéphane Assamoi, professionnel du digital, Community Manager, Digital Project Manager et AI Product Builder spécialisé dans la création de produits numériques, SaaS, IA et expériences digitales.',
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
    name: 'Kevin Stéphane Assamoi',
    url: 'https://kevinst-assamoi.com',
    jobTitle: 'Digital & AI Product Builder',
    description: 'Portfolio de Kevin Stéphane Assamoi, professionnel du digital, Community Manager, Digital Project Manager et AI Product Builder.',
  };

  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-brand-light text-brand-dark font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
