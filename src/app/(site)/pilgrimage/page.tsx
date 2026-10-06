'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { mockPilgrimageDarshanList } from '@/data/hotels';
import { mockTours } from '@/data/tours';
import { TourCard } from '@/components/ui/TourCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Landmark, Sparkles, Clock, ShieldCheck, Check, ArrowRight, Sun } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function PilgrimagePage() {
  const pilgrimageTours = mockTours.filter((t) => t.category === 'Pilgrimage');
  const [selectedTemple, setSelectedTemple] = useState(mockPilgrimageDarshanList[0]);
  const { setWhatsAppWidgetOpen } = useApp();

  return (
    <div className="pt-28 pb-20 bg-[#1C120B] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-saffron-950 via-saffron-900 to-[#1C120B] border border-saffron-600/50 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl space-y-3 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-saffron-500 text-ink-950 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Sacred Yatra Collection
            </span>
            <h1 className="text-4xl sm:text-6xl font-serif text-white font-bold leading-tight">
              Divine Indian Pilgrimage Tours & VIP Darshan
            </h1>
            <p className="text-xs sm:text-sm text-saffron-100 font-sans leading-relaxed">
              Experience hassle-free spiritual journeys to Ayodhya Ram Mandir, Kashi Vishwanath, Shirdi Sai Baba, Ujjain Mahakal, Tirupati & Char Dham with pure Satvik meals & VIP Queue Pass assistance.
            </p>

            <div className="pt-4 flex items-center gap-3">
              <button
                onClick={() => setWhatsAppWidgetOpen(true)}
                className="px-6 py-3 rounded-2xl bg-saffron-500 hover:bg-saffron-400 text-ink-950 font-bold text-xs flex items-center gap-2 shadow-lg"
              >
                <Landmark className="w-4 h-4" />
                <span>Book Yatra on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>

        {/* Live Darshan Timings & Guidelines Widget */}
        <div className="space-y-6">
          <SectionHeader
            badge="Divine Guidelines"
            title="Temple Timings & VIP Pass Guide"
            subtitle="Select a sacred temple to inspect darshan slots, dress code, and what to carry"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Temple Selector Pills */}
            <div className="lg:col-span-4 space-y-2">
              {mockPilgrimageDarshanList.map((tmpl) => {
                const isSel = selectedTemple.templeName === tmpl.templeName;

                return (
                  <div
                    key={tmpl.templeName}
                    onClick={() => setSelectedTemple(tmpl)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      isSel
                        ? 'bg-saffron-950 border-saffron-500 text-saffron-100 shadow-xl'
                        : 'bg-[#291A10] border-saffron-900/40 text-sand-200 hover:border-saffron-700/60'
                    }`}
                  >
                    <div>
                      <h4 className="text-sm font-bold font-serif">{tmpl.templeName}</h4>
                      <span className="text-[10px] opacity-75">{tmpl.location}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-saffron-400" />
                  </div>
                );
              })}
            </div>

            {/* Selected Temple Details Card */}
            <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-[#291A10] border border-saffron-700/40 space-y-5 shadow-2xl">
              <div className="relative w-full h-52 rounded-2xl overflow-hidden">
                <Image src={selectedTemple.image} alt={selectedTemple.templeName} fill className="object-cover" />
              </div>

              <div>
                <h3 className="text-2xl font-serif text-white font-bold">{selectedTemple.templeName}</h3>
                <span className="text-xs text-saffron-400 font-semibold">{selectedTemple.location}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-[#1C120B] border border-saffron-900/40">
                  <strong className="text-saffron-400 block mb-0.5">Darshan Timings:</strong>
                  {selectedTemple.darshanTimings}
                </div>
                <div className="p-3.5 rounded-xl bg-[#1C120B] border border-saffron-900/40">
                  <strong className="text-saffron-400 block mb-0.5">Dress Code:</strong>
                  {selectedTemple.dressCode}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-saffron-950/60 border border-saffron-700/40 text-xs text-saffron-200">
                <strong className="text-saffron-400 block mb-1">VIP Pass Assistance:</strong>
                {selectedTemple.vipPassInfo}
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase text-saffron-400 mb-2">What to Carry Checklist</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedTemple.carryChecklist.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-sand-200">
                      <Check className="w-3.5 h-3.5 text-saffron-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pilgrimage Packages Grid */}
        <div className="space-y-6">
          <SectionHeader
            badge="Sacred Yatras"
            title="Featured Devotional Tour Packages"
            subtitle="Includes VIP queue passes, Satvik vegetarian dining, and comfortable AC transport"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pilgrimageTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} layout="horizontal" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
