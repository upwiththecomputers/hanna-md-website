import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Hanna Mikulska-Delgaldo - Agente de Comercio Internacional',
    template: '%s | María González'
  },
  description: 'Especialista en comercio internacional con 15+ años conectando empresas globalmente.',
  keywords: ['comercio internacional', 'importación', 'exportación', 'logística'],
  authors: [{ name: 'María González' }],

  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://tudominio.com',
    siteName: 'María González - Comercio Internacional',
    title: 'María González - Agente de Comercio Internacional',
    description: 'Conectando empresas a nivel global con 15+ años de experiencia',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'María González - Comercio Internacional',
      }
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'María González - Comercio Internacional',
    description: 'Especialista en comercio internacional',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
