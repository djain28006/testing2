'use client';

import React from 'react';
import { mockDestinations } from '@/data/destinations';
import { useApp } from '@/context/AppContext';
import { Plus } from 'lucide-react';

export default function AdminDestinationsPage() {
  const { addToast } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white">Destinations Manager</h1>
          <p className="text-xs text-ink-300">Manage tourist spots, ranks, best season heatmaps and SVG coordinates</p>
        </div>
        <button
          onClick={() => addToast({ title: 'Add Destination Modal', type: 'info' })}
          className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-600 text-white text-xs font-bold flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Add Destination
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockDestinations.map((d) => (
          <div key={d.id} className="p-4 rounded-2xl bg-ink-900 border border-teal-900/40 space-y-2">
            <h4 className="font-bold text-white text-sm">{d.name}</h4>
            <span className="text-xs text-teal-400 block">{d.state}</span>
            <div className="text-[11px] text-ink-300 pt-2 border-t border-ink-800 flex justify-between">
              <span>{d.tourCount} Packages</span>
              <span>Rank #{d.rank}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
