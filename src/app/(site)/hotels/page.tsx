'use client';

import React from 'react';
import Image from 'next/image';
import { mockHotels } from '@/data/hotels';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { formatCurrency } from '@/lib/utils';
import { Star, MapPin, Check } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function HotelsPage() {
  const { setWhatsAppWidgetOpen } = useApp();

  return (
    <div className="pt-28 pb-20 bg-ink-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <SectionHeader
          badge="Handpicked Accommodations"
          title="Verified Luxury & Heritage Hotels"
          subtitle="Stay in top 4★ & 5★ properties, beachfront resorts, and Satvik pilgrimage hotels"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockHotels.map((h) => (
            <div key={h.id} className="p-6 rounded-3xl bg-ink-900/90 border border-teal-900/40 space-y-4 shadow-xl">
              <div className="relative w-full h-48 rounded-2xl overflow-hidden">
                <Image src={h.image} alt={h.name} fill className="object-cover" />
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold bg-saffron-950/80 text-saffron-400 border border-saffron-700 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-saffron-400" /> {h.starRating} Star
                </span>
              </div>

              <div>
                <span className="text-xs text-teal-400 font-semibold flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> {h.destination}
                </span>
                <h3 className="text-xl font-serif font-bold text-white mt-0.5">{h.name}</h3>
                <p className="text-[11px] text-ink-300 mt-1">{h.address}</p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {h.amenities.map((am, i) => (
                  <span key={i} className="text-[10px] text-teal-300 px-2 py-0.5 rounded-md bg-teal-950 border border-teal-900">
                    {am}
                  </span>
                ))}
              </div>

              <div className="pt-4 border-t border-ink-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-ink-300">Room Rate</span>
                  <span className="text-lg font-bold text-white block">{formatCurrency(h.pricePerNight)}/night</span>
                </div>
                <button
                  onClick={() => setWhatsAppWidgetOpen(true)}
                  className="px-4 py-2 rounded-xl bg-teal-700 text-white text-xs font-semibold"
                >
                  Inquire Room
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
