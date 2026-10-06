'use client';

import React from 'react';
import { mockCoupons } from '@/data/adminMockData';
import { formatCurrency } from '@/lib/utils';
import { useApp } from '@/context/AppContext';
import { Plus } from 'lucide-react';

export default function AdminCouponsPage() {
  const { addToast } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white">Coupons & Discount Codes</h1>
          <p className="text-xs text-ink-300">Manage promo codes and active discounts</p>
        </div>
        <button
          onClick={() => addToast({ title: 'Add Coupon Modal', type: 'info' })}
          className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-600 text-white text-xs font-bold flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Create Coupon
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {mockCoupons.map((c) => (
          <div key={c.code} className="p-5 rounded-2xl bg-ink-900 border border-teal-900/40 space-y-2">
            <span className="font-mono text-base font-bold text-saffron-400 block">{c.code}</span>
            <p className="text-xs text-ink-200">{c.description}</p>
            <div className="text-[11px] text-ink-300 pt-2 border-t border-ink-800 flex justify-between">
              <span>Min Order: {formatCurrency(c.minBookingValue)}</span>
              <span>Valid till {c.validUntil}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
