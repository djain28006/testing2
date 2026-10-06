'use client';

import React from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { mockCoupons } from '@/data/adminMockData';
import { formatCurrency } from '@/lib/utils';
import { useApp } from '@/context/AppContext';
import { Tag, Copy, Check } from 'lucide-react';

export default function OffersPage() {
  const { addToast } = useApp();

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    addToast({ title: 'Coupon Code Copied!', description: `Code ${code} copied to clipboard.`, type: 'success' });
  };

  return (
    <div className="pt-28 pb-20 bg-ink-950 text-white min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <SectionHeader
          badge="Special Discounts"
          title="Exclusive Coupons & Promo Offers"
          subtitle="Copy discount codes below and apply them during tour package booking checkout"
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockCoupons.map((c) => (
            <div
              key={c.code}
              className="p-6 rounded-3xl bg-gradient-to-br from-teal-950 via-ink-900 to-ink-950 border border-teal-700/50 space-y-4 shadow-2xl relative"
            >
              <div className="w-10 h-10 rounded-xl bg-saffron-950 border border-saffron-600 text-saffron-400 flex items-center justify-center">
                <Tag className="w-5 h-5" />
              </div>

              <div>
                <span className="font-mono text-xl font-bold text-saffron-400 block tracking-wider">{c.code}</span>
                <p className="text-xs text-ink-200 mt-1">{c.description}</p>
              </div>

              <div className="pt-3 border-t border-ink-800 text-[11px] text-ink-300 flex justify-between">
                <span>Min Booking: {formatCurrency(c.minBookingValue)}</span>
                <span>Valid: {c.validUntil}</span>
              </div>

              <button
                onClick={() => handleCopy(c.code)}
                className="w-full py-2.5 rounded-xl bg-teal-700 hover:bg-teal-600 text-white font-bold text-xs flex items-center justify-center gap-2"
              >
                <Copy className="w-3.5 h-3.5" /> Copy Code
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
