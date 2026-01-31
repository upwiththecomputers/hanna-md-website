import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import type { Metadata } from 'next'
import '../globals.css'

export const metadata: Metadata = {
  title: {
    default: 'María González - International Trade Agent',
    template: '%s | María González'
  },
  description: 'International trade specialist with 15+ years connecting companies globally.',
  keywords: ['international trade', 'import', 'export', 'logistics'],
  authors: [{ name: 'María González' }],

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tudominio.com',
    siteName: 'María González - International Trade',
    title: 'María González - International Trade Agent',
    description: 'Connecting companies globally with 15+ years of experience',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'María González - International Trade',
      }
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'María González - International Trade',
    description: 'International trade specialist',
    images: ['/og-image.jpg'],
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
}

export default async function LocaleLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
