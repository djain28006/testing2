'use client';

import React, { useState } from 'react';
import { mockDepartures } from '@/data/departures';
import { Departure } from '@/types';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SeatProgressBar } from '@/components/ui/SeatProgressBar';
import { formatCurrency } from '@/lib/utils';
import { Calendar as CalendarIcon, Plus, Flame, Check } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function AdminDeparturesPage() {
  const [departures, setDepartures] = useState<Departure[]>(mockDepartures);
  const { addToast } = useApp();

  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white">Departures & Seat-Heatmap Calendar</h1>
          <p className="text-xs text-ink-300">Manage fixed departure dates, capacity limits, and seat heatmaps</p>
        </div>

        <button
          onClick={() => addToast({ title: 'New Departure Modal', description: 'Form active.', type: 'info' })}
          className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-600 text-white font-bold text-xs flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Create New Departure
        </button>
      </div>

      {/* Seat-Heatmap Calendar Grid */}
      <div className="p-6 rounded-3xl bg-ink-900 border border-teal-900/40 space-y-4 shadow-2xl">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-serif font-bold text-white flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-teal-400" />
            <span>November 2026 Seat Occupancy Heatmap</span>
          </h3>

          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="w-2.5 h-2.5 rounded bg-emerald-500" /> Available
            </span>
            <span className="flex items-center gap-1 text-saffron-400">
              <span className="w-2.5 h-2.5 rounded bg-saffron-500" /> Filling Fast
            </span>
            <span className="flex items-center gap-1 text-red-400">
              <span className="w-2.5 h-2.5 rounded bg-red-500" /> Sold Out
            </span>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
            <div key={d} className="text-ink-300 py-1">{d}</div>
          ))}

          {daysInMonth.map((dayNum) => {
            const dateStr = `2026-11-${dayNum < 10 ? '0' + dayNum : dayNum}`;
            const dep = departures.find((d) => d.departureDate === dateStr);

            let bg = 'bg-ink-950 text-ink-300 border-ink-800';
            if (dep) {
              if (dep.status === 'Sold Out') bg = 'bg-red-950/80 text-red-400 border-red-700 font-bold';
              else if (dep.status === 'Filling Fast') bg = 'bg-saffron-950/80 text-saffron-300 border-saffron-700 font-bold';
              else bg = 'bg-emerald-950/80 text-emerald-300 border-emerald-700 font-bold';
            }

            return (
              <div
                key={dayNum}
                onClick={() => {
                  if (dep) addToast({ title: `Editing ${dep.tourTitle}`, description: `${dep.bookedSeats}/${dep.totalSeats} seats filled`, type: 'info' });
                }}
                className={`p-3 rounded-2xl border flex flex-col items-center justify-between min-h-[70px] cursor-pointer hover:scale-105 transition-all ${bg}`}
              >
                <span className="text-xs">{dayNum}</span>
                {dep && (
                  <span className="text-[9px] mt-1 line-clamp-1 opacity-90">
                    {dep.bookedSeats}/{dep.totalSeats}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
