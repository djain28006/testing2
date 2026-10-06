'use client';

import React from 'react';
import { mockHotels } from '@/data/hotels';
import { formatCurrency } from '@/lib/utils';
import { useApp } from '@/context/AppContext';
import { Plus } from 'lucide-react';

export default function AdminHotelsPage() {
  const { addToast } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white">Partner Hotels & Resorts</h1>
          <p className="text-xs text-ink-300">Handpicked 4★ & 5★ properties list</p>
        </div>
        <button
          onClick={() => addToast({ title: 'Add Hotel Modal', type: 'info' })}
          className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-600 text-white text-xs font-bold flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Add Hotel
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {mockHotels.map((h) => (
          <div key={h.id} className="p-5 rounded-2xl bg-ink-900 border border-teal-900/40 space-y-2">
            <h4 className="font-bold text-white text-sm">{h.name}</h4>
            <span className="text-xs text-teal-400 block">{h.destination} • {h.starRating} Star</span>
            <div className="text-xs font-bold text-white pt-2 border-t border-ink-800">
              {formatCurrency(h.pricePerNight)} / night
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
