'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { mockVehicles } from '@/data/hotels';
import { Vehicle } from '@/types';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { calculateEstimatedRentalCost, formatCurrency } from '@/lib/utils';
import { useApp } from '@/context/AppContext';
import { Car, Bus, Users, Luggage, Check, Calculator, MessageSquare } from 'lucide-react';

export default function RentalsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [calcKms, setCalcKms] = useState<number>(350);
  const [calcDays, setCalcDays] = useState<number>(3);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>(mockVehicles[0]);

  const { setWhatsAppWidgetOpen, addToast } = useApp();

  const categories = ['All', 'Cars', 'SUVs', 'Tempo Travellers', 'Buses'];

  const filteredVehicles = mockVehicles.filter(
    (v) => activeCategory === 'All' || v.category === activeCategory
  );

  const estimatedFare = calculateEstimatedRentalCost(
    calcKms,
    calcDays,
    selectedVehicle.pricePerKm,
    selectedVehicle.driverAllowancePerDay,
    selectedVehicle.baseFarePerDay
  );

  return (
    <div className="pt-28 pb-20 bg-ink-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHeader
          badge="Fleet Rental Services"
          title="Car, SUV, Tempo Traveller & Bus Rentals"
          subtitle="Clean, sanitised vehicles with polite uniformed drivers for Outstation, Sightseeing & Corporate Trips"
        />

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-teal-700 text-white shadow-lg'
                  : 'bg-ink-900 text-ink-300 hover:text-white border border-teal-900/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Vehicle Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((v) => (
            <div
              key={v.id}
              className="p-6 rounded-3xl bg-ink-900/90 border border-teal-900/40 flex flex-col justify-between shadow-xl hover:border-teal-600/60 transition-all"
            >
              <div className="space-y-4">
                <div className="relative w-full h-44 rounded-2xl overflow-hidden">
                  <Image src={v.image} alt={v.name} fill className="object-cover" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-teal-950/90 text-teal-300 border border-teal-700">
                    {v.category}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-serif font-bold text-white">{v.name}</h3>
                  <div className="flex items-center gap-4 text-xs text-ink-300 mt-1">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-teal-400" /> {v.seats} Seats
                    </span>
                    <span className="flex items-center gap-1">
                      <Luggage className="w-3.5 h-3.5 text-teal-400" /> {v.luggageCapacity}
                    </span>
                  </div>
                </div>

                <div className="space-y-1 pt-2 border-t border-ink-800 text-xs text-ink-200">
                  {v.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-teal-400" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-ink-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-ink-300 block">Rate per KM</span>
                  <span className="text-lg font-bold text-white">₹{v.pricePerKm}/km</span>
                </div>
                <button
                  onClick={() => {
                    setSelectedVehicle(v);
                    addToast({ title: 'Vehicle selected for cost calculator!', description: v.name, type: 'info' });
                  }}
                  className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-600 text-white text-xs font-semibold"
                >
                  Select & Calculate
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Instant Fare Estimator Card */}
        <div className="rounded-3xl bg-gradient-to-r from-teal-950 via-ink-900 to-teal-950 border border-teal-700/40 p-6 sm:p-10 shadow-2xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2 text-teal-400 text-xs font-semibold uppercase tracking-wider">
              <Calculator className="w-4 h-4" /> Instant Quote Generator
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif text-white font-bold">Estimate Outstation Rental Price</h3>
            <p className="text-xs text-ink-300">
              Selected Vehicle: <strong className="text-white">{selectedVehicle.name}</strong> (₹{selectedVehicle.pricePerKm}/km)
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-ink-300 block mb-1">Est. Distance (KM)</label>
                <input
                  type="number"
                  value={calcKms}
                  onChange={(e) => setCalcKms(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-ink-950 border border-teal-900 text-white text-xs"
                />
              </div>
              <div>
                <label className="text-xs text-ink-300 block mb-1">Trip Duration (Days)</label>
                <input
                  type="number"
                  value={calcDays}
                  onChange={(e) => setCalcDays(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-ink-950 border border-teal-900 text-white text-xs"
                />
              </div>
            </div>
          </div>

          <div className="md:col-span-6 p-6 rounded-2xl bg-ink-950 border border-teal-900 space-y-4 text-center">
            <span className="text-xs text-ink-300 block">Estimated All-Inclusive Rental Fare</span>
            <div className="text-4xl font-bold text-teal-300">{formatCurrency(estimatedFare)}</div>
            <p className="text-[11px] text-ink-300">
              Includes vehicle fare, driver allowance for {calcDays} days & fuel charges. Tolls extra at actuals.
            </p>

            <button
              onClick={() => setWhatsAppWidgetOpen(true)}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Book Vehicle on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
