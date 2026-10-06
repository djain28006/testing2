'use client';

import React from 'react';
import { mockVehicles } from '@/data/hotels';
import { useApp } from '@/context/AppContext';
import { Plus } from 'lucide-react';

export default function AdminVehiclesPage() {
  const { addToast } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white">Fleet & Vehicles Catalogue</h1>
          <p className="text-xs text-ink-300">Cars, SUVs, Tempo Travellers & Luxury Buses</p>
        </div>
        <button
          onClick={() => addToast({ title: 'Add Vehicle Modal', type: 'info' })}
          className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-600 text-white text-xs font-bold flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Add Vehicle
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockVehicles.map((v) => (
          <div key={v.id} className="p-5 rounded-2xl bg-ink-900 border border-teal-900/40 space-y-2">
            <h4 className="font-bold text-white text-sm">{v.name}</h4>
            <span className="text-xs text-teal-400 block">{v.category} • {v.seats} Seats</span>
            <div className="text-xs text-ink-300 pt-2 border-t border-ink-800 flex justify-between">
              <span>Rate: ₹{v.pricePerKm}/km</span>
              <span>Allowance: ₹{v.driverAllowancePerDay}/day</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
