import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SITE_NAME, SITE_TAGLINE, SITE_DESCRIPTION, SITE_URL } from '@/lib/constants';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const viewport: Viewport = {
  themeColor: '#e5232a',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} - ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'HIILLA',
    'bike delivery Lagos',
    'dispatch riders Lagos',
    'e-hailing delivery Nigeria',
    'express courier Lagos',
    'fleet management Nigeria',
    'same day delivery Lagos',
  ],
  authors: [{ name: 'HIILLA Transit Services' }],
  creator: 'HIILLA Transit Services',
  publisher: 'HIILLA Transit Services',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} - ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: '/assets/hero-bike.jpg',
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} Logistics & Bike Delivery`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@hiillahq',
    creator: '@hiillahq',
    title: `${SITE_NAME} - ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: ['/assets/hero-bike.jpg'],
  },
  icons: {
    icon: '/assets/favicon.png',
    apple: '/assets/favicon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
