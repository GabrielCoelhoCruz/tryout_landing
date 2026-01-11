import type { Metadata } from "next";
import { Bebas_Neue, Work_Sans } from "next/font/google";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
});

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://skyhighallstar.com.br'),
  title: "SkyHigh AllStar - Tryout 2026 | Inscreva-se Agora",
  description: "Seu talento merece ir mais alto. Venha elevar o nível com a gente. Inscrições abertas para times N2 e N3 (Coed, All Girl, Youth). Tryout 2026.",
  keywords: "cheerleading, tryout, 2026, N2, N3, Coed, All Girl, Youth, competição, equipe, SkyHigh AllStar, São Paulo",
  icons: {
    icon: '/logo/SkyHigh_Logo novo.png',
    apple: '/logo/SkyHigh_Logo novo.png',
  },
  openGraph: {
    title: "SkyHigh AllStar - Tryout 2026",
    description: "Seu talento merece ir mais alto. Venha elevar o nível com a gente.",
    images: ['/logo/SkyHigh_Logo novo.png'],
    locale: 'pt_BR',
    type: 'website',
    siteName: 'SkyHigh AllStar',
  },
  twitter: {
    card: 'summary_large_image',
    title: "SkyHigh AllStar - Tryout 2026",
    description: "Seu talento merece ir mais alto. Venha elevar o nível com a gente.",
    images: ['/logo/SkyHigh_Logo novo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${bebasNeue.variable} ${workSans.variable} antialiased`}
      >
        {children}
        <Toaster
          position="top-center"
          theme="dark"
          richColors
          toastOptions={{
            style: {
              background: 'rgba(0, 12, 31, 0.95)',
              border: '1px solid rgba(255, 127, 0, 0.3)',
              backdropFilter: 'blur(12px)',
            },
          }}
        />
        <Analytics />
      </body>
    </html>
  );
}
