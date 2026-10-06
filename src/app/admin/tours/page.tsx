'use client';

import React from 'react';
import { mockTours } from '@/data/tours';
import { formatCurrency } from '@/lib/utils';
import { useApp } from '@/context/AppContext';
import { Plus } from 'lucide-react';

export default function AdminToursPage() {
  const { addToast } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white">Tours & Packages Catalogue</h1>
          <p className="text-xs text-ink-300">Create & edit tour packages, itineraries, and inclusions</p>
        </div>
        <button
          onClick={() => addToast({ title: 'Create Tour Modal', description: 'Form active.', type: 'info' })}
          className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-600 text-white text-xs font-bold flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Add New Package
        </button>
      </div>

      <div className="rounded-3xl bg-ink-900 border border-teal-900/40 overflow-hidden shadow-2xl">
        <table className="w-full text-left text-xs text-ink-200">
          <thead className="bg-ink-950 text-ink-300 uppercase tracking-wider font-semibold border-b border-ink-800">
            <tr>
              <th className="p-4">Package Title</th>
              <th className="p-4">Destination</th>
              <th className="p-4">Category</th>
              <th className="p-4">Duration</th>
              <th className="p-4">Price / Person</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-800">
            {mockTours.map((t) => (
              <tr key={t.id} className="hover:bg-ink-950/60">
                <td className="p-4 font-bold text-white">{t.title}</td>
                <td className="p-4 text-teal-300">{t.destinationName}</td>
                <td className="p-4">{t.category}</td>
                <td className="p-4">{t.duration}</td>
                <td className="p-4 font-bold text-white">{formatCurrency(t.pricePerPerson)}</td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => addToast({ title: 'Editing Tour', description: t.title, type: 'info' })}
                    className="px-3 py-1.5 rounded-xl bg-ink-800 hover:bg-ink-700 text-white text-[11px] font-semibold"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
