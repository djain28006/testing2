'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { mockDestinations } from '@/data/destinations';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Trophy, ArrowRight, MapPin } from 'lucide-react';

export default function DestinationsListingPage() {
  return (
    <div className="pt-28 pb-20 bg-ink-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <SectionHeader
          badge="Destinations Guide"
          title="All Popular Indian Travel Destinations"
          subtitle="Discover beaches, hill stations, divine pilgrimage centers, royal forts, and snow valleys"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockDestinations.map((dest) => (
            <Link
              key={dest.id}
              href={`/destinations/${dest.id}`}
              className="group relative h-96 rounded-3xl overflow-hidden border border-teal-900/40 hover:border-teal-500/80 transition-all duration-300 shadow-2xl"
            >
              <Image src={dest.image} alt={dest.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent opacity-90" />

              <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-ink-950/80 border border-saffron-500/40 text-saffron-400 text-xs font-bold">
                <Trophy className="w-3.5 h-3.5" />
                <span>Rank #{dest.rank || 1}</span>
              </div>

              <div className="absolute bottom-5 left-5 right-5">
                <span className="text-xs text-teal-400 font-semibold uppercase tracking-wider block">
                  {dest.state}
                </span>
                <h3 className="text-xl font-serif text-white font-bold mt-0.5 group-hover:text-teal-300 transition-colors">
                  {dest.name}
                </h3>
                <p className="text-xs text-ink-300 mt-1 line-clamp-2">{dest.tagline}</p>
                <div className="mt-3 flex items-center justify-between text-xs font-semibold text-teal-300">
                  <span>{dest.tourCount} Packages</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
