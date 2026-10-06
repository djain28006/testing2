import type { Metadata } from 'next';
import { Bebas_Neue, Playfair_Display, Inter } from 'next/font/google';
import '@/app/globals.css';
import { brandConfig } from '@/config/brand';
import { AppProvider } from '@/context/AppContext';
import { ToastContainer } from '@/components/ui/ToastContainer';
import { WishlistDrawer } from '@/components/site/WishlistDrawer';
import { CompareModal } from '@/components/site/CompareModal';
import { CommandKPalette } from '@/components/site/CommandKPalette';
import { WhatsAppChatWidget } from '@/components/site/WhatsAppChatWidget';

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
});

const playfair = Playfair_Display({
  weight: ['400', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-playfair',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: `${brandConfig.name} - ${brandConfig.tagline}`,
  description: brandConfig.subTagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebas.variable} ${playfair.variable} ${inter.variable}`}>
      <body className="antialiased bg-ink-950 text-white min-h-screen flex flex-col selection:bg-teal-500 selection:text-ink-950">
        <AppProvider>
          {children}

          {/* Floating UI Drawers & Widgets */}
          <ToastContainer />
          <WishlistDrawer />
          <CompareModal />
          <CommandKPalette />
          <WhatsAppChatWidget />
        </AppProvider>
      </body>
    </html>
  );
}
