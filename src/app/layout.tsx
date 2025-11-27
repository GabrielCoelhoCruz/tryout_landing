import type { Metadata } from "next";
import { Bebas_Neue, Work_Sans } from "next/font/google";
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
  title: "SkyHigh AllStar - Tryout 2026 | Inscreva-se Agora",
  description: "Faça parte da equipe SkyHigh AllStar que está elevando o nível do cheerleading. Inscrições abertas para times N2 e N3 (Coed, All Girl, All Boy). Tryout 2026.",
  keywords: "cheerleading, tryout, 2026, N2, N3, Coed, All Girl, All Boy, competição, equipe, SkyHigh AllStar",
  icons: {
    icon: '/logo/logo-shield.jpg',
    apple: '/logo/logo-shield.jpg',
  },
  openGraph: {
    title: "SkyHigh AllStar - Tryout 2026",
    description: "Faça parte da equipe que está elevando o nível do cheerleading",
    images: ['/logo/logo-shield.jpg'],
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
      </body>
    </html>
  );
}
