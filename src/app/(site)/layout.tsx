import React from 'react';
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';
import { MobileBottomBar } from '@/components/site/MobileBottomBar';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <MobileBottomBar />
    </div>
  );
}
