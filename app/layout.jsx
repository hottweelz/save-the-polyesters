import './globals.css';
import { EB_Garamond, Inter, Playfair_Display } from 'next/font/google';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import StickyDonate from '@/components/StickyDonate';
import CookieConsent from '@/components/CookieConsent';
import { SITE_URL } from '@/lib/site';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const garamond = EB_Garamond({ subsets: ['latin'], variable: '--font-serif', display: 'swap' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-display', display: 'swap' });

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Save The Polyesters — Protecting Earth’s Most Misunderstood Fiber-Bearing Mammal',
    template: '%s · Save The Polyesters',
  },
  description:
    'The Polyester Conservation Coalition is the world’s leading nonprofit dedicated to preserving wild polyester populations, restoring synthetic-fur habitats, and ending industrial fiber harvesting.',
  keywords: [
    'save the polyesters', 'polyester conservation', 'baby polyester', 'synthetic wildlife',
    'microfiber lung collapse', 'fast fashion habitat loss', 'data center wildlife impact',
  ],
  openGraph: {
    type: 'website',
    title: 'Save The Polyesters',
    description:
      'They cannot speak for themselves. Help us protect the last wild polyester populations from data centers, fast fashion, and habitat collapse.',
    siteName: 'Save The Polyesters',
    images: [{ url: '/media/opengraph_polyester.png', width: 1536, height: 1024, alt: 'Save The Polyesters' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Save The Polyesters',
    description: 'They cannot speak for themselves.',
    images: [{ url: '/media/opengraph_polyester.png', width: 1536, height: 1024, alt: 'Save The Polyesters' }],
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: '#fbf7f1',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${garamond.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'NGO',
              name: 'Polyester Conservation Coalition',
              alternateName: 'Save The Polyesters',
              url: SITE_URL,
              logo: `${SITE_URL}/media/polyester_sign-trans.webp`,
              description:
                'A nonprofit alliance dedicated to the protection of wild polyester populations and the restoration of microfiber habitats worldwide.',
              foundingDate: '2014-04-22',
              areaServed: 'Worldwide',
              sameAs: [],
            }),
          }}
        />
      </head>
      <body className="bg-paper text-moss-900">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-cream-50 focus:px-3 focus:py-2 focus:rounded focus:shadow-soft">Skip to content</a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <StickyDonate />
        <CookieConsent />
      </body>
    </html>
  );
}
