'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { mockDestinations } from '@/data/destinations';
import { MapPin, Calendar, Users, Filter, Search } from 'lucide-react';

export function SearchWidget() {
  const router = useRouter();
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('2026-11-15');
  const [travellers, setTravellers] = useState(2);
  const [category, setCategory] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destination) params.set('destination', destination);
    if (category) params.set('category', category);
    if (date) params.set('date', date);
    params.set('travellers', travellers.toString());
    router.push(`/tours?${params.toString()}`);
  };

  return (
    <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 -mt-10 sm:-mt-14 mb-16">
      <form
        onSubmit={handleSearch}
        className="bg-ink-900/95 border border-teal-700/50 rounded-3xl p-4 sm:p-6 shadow-2xl backdrop-blur-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-center"
      >
        {/* Destination Dropdown */}
        <div className="flex flex-col space-y-1">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" /> Destination
          </label>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full bg-ink-950 border border-teal-900/60 rounded-xl px-3 py-2.5 text-white text-xs focus:outline-none focus:border-teal-400"
          >
            <option value="">All India Places</option>
            {mockDestinations.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name} ({d.state})
              </option>
            ))}
          </select>
        </div>

        {/* Travel Date */}
        <div className="flex flex-col space-y-1">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" /> Travel Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-ink-950 border border-teal-900/60 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-teal-400"
          />
        </div>

        {/* Travellers Counter */}
        <div className="flex flex-col space-y-1">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" /> Travellers
          </label>
          <select
            value={travellers}
            onChange={(e) => setTravellers(Number(e.target.value))}
            className="w-full bg-ink-950 border border-teal-900/60 rounded-xl px-3 py-2.5 text-white text-xs focus:outline-none focus:border-teal-400"
          >
            <option value={1}>1 Solo Traveller</option>
            <option value={2}>2 Adults (Couple)</option>
            <option value={4}>4 Travellers (Family)</option>
            <option value={6}>6+ Travellers (Group)</option>
            <option value={12}>12+ Corporate / College</option>
          </select>
        </div>

        {/* Tour Type */}
        <div className="flex flex-col space-y-1">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5" /> Tour Type
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-ink-950 border border-teal-900/60 rounded-xl px-3 py-2.5 text-white text-xs focus:outline-none focus:border-teal-400"
          >
            <option value="">All Categories</option>
            <option value="Weekend">Weekend Getaway</option>
            <option value="Pilgrimage">Pilgrimage / Yatra</option>
            <option value="Family">Family Holiday</option>
            <option value="Group">Group & College</option>
            <option value="Adventure">Adventure</option>
            <option value="One Day">One Day Tour</option>
          </select>
        </div>

        {/* Search Submit */}
        <div className="flex flex-col justify-end">
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-teal-700 hover:bg-teal-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-teal-900/50 transition-all hover:scale-105"
          >
            <Search className="w-4 h-4" />
            <span>Search Packages</span>
          </button>
        </div>
      </form>
    </div>
  );
}
