'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { mockDestinations } from '@/data/destinations';
import { mockTours } from '@/data/tours';
import { TourCard } from '@/components/ui/TourCard';
import { MapPin, Calendar, Compass, Check } from 'lucide-react';

export default function DestinationDetailPage() {
  const params = useParams();
  const destId = (params?.id as string) || 'goa';
  const dest = mockDestinations.find((d) => d.id === destId || d.slug === destId) || mockDestinations[0];

  const matchingTours = mockTours.filter(
    (t) => t.destinationId === dest.id || t.destinationName.toLowerCase() === dest.name.toLowerCase()
  );

  return (
    <div className="pt-24 pb-20 bg-ink-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Destination Hero */}
        <div className="relative w-full h-[380px] rounded-3xl overflow-hidden shadow-2xl flex items-end p-8 sm:p-12">
          <Image src={dest.image} alt={dest.name} fill className="object-cover brightness-75" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />

          <div className="relative z-10 max-w-2xl space-y-2">
            <span className="text-xs uppercase tracking-widest text-teal-400 font-semibold">{dest.state}</span>
            <h1 className="text-4xl sm:text-6xl font-serif text-white font-bold leading-tight">{dest.name}</h1>
            <p className="text-sm text-sand-200 italic font-serif">&quot;{dest.tagline}&quot;</p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <div className="p-6 rounded-3xl bg-ink-900/90 border border-teal-900/40 space-y-3">
              <h3 className="text-xl font-serif font-bold text-white">About {dest.name}</h3>
              <p className="text-xs sm:text-sm text-ink-300 leading-relaxed">{dest.description}</p>
            </div>

            <div className="p-6 rounded-3xl bg-ink-900/90 border border-teal-900/40 space-y-3">
              <h3 className="text-lg font-serif font-bold text-white">Top Tourist Attractions</h3>
              <div className="grid grid-cols-2 gap-3 text-xs text-ink-200">
                {dest.attractions.map((attr, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>{attr}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 p-6 rounded-3xl bg-ink-900/90 border border-teal-700/50 space-y-4">
            <h4 className="text-lg font-serif font-bold text-white">Best Season to Visit</h4>
            <div className="p-4 rounded-2xl bg-ink-950 border border-teal-950 text-xs text-ink-200">
              <span className="text-teal-400 block font-semibold mb-1">Recommended Months:</span>
              {dest.bestTimeToVisit}
            </div>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="space-y-6">
          <h2 className="text-2xl font-serif font-bold text-white">Available Packages for {dest.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {matchingTours.length > 0 ? (
              matchingTours.map((t) => <TourCard key={t.id} tour={t} />)
            ) : (
              <p className="text-xs text-ink-300">Showing standard recommended tours below:</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
