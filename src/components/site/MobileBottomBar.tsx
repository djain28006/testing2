'use client';

import React from 'react';
import Link from 'next/link';
import { brandConfig } from '@/config/brand';
import { useApp } from '@/context/AppContext';
import { MessageSquare, Phone, Calendar } from 'lucide-react';

export function MobileBottomBar() {
  const { setWhatsAppWidgetOpen } = useApp();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-ink-950/95 border-t border-teal-900/40 backdrop-blur-xl p-3 pb-safe shadow-2xl">
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => setWhatsAppWidgetOpen(true)}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-emerald-950/80 border border-emerald-700/40 text-emerald-300 text-xs font-semibold"
        >
          <MessageSquare className="w-4 h-4 mb-0.5 text-emerald-400" />
          <span>WhatsApp</span>
        </button>

        <a
          href={`tel:${brandConfig.phone}`}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-ink-900 border border-teal-900/50 text-teal-300 text-xs font-semibold"
        >
          <Phone className="w-4 h-4 mb-0.5 text-teal-400" />
          <span>Call Us</span>
        </a>

        <Link
          href="/tours"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-teal-700 text-white text-xs font-bold shadow-lg shadow-teal-900/50"
        >
          <Calendar className="w-4 h-4 mb-0.5" />
          <span>Book Now</span>
        </Link>
      </div>
    </div>
  );
}
