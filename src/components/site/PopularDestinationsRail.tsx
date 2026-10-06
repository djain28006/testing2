'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { mockDestinations } from '@/data/destinations';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Trophy, ArrowRight, Play } from 'lucide-react';

export function PopularDestinationsRail() {
  const ranked = mockDestinations.filter((d) => d.isPopular);

  return (
    <section className="py-16 md:py-24 bg-ink-950 text-white relative border-t border-teal-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <SectionHeader
            badge="Ref 4 • Cinematic Ranking"
            title="India’s Top Ranked Destinations"
            subtitle="Curated by 12,000+ traveller reviews and seasonal highlights"
          />
          <div className="flex items-center gap-2 text-xs font-mono text-teal-400 pb-4">
            <span>SWIPE &gt;&gt;</span>
          </div>
        </div>

        {/* Horizontal Ranked Cards (Ref 4 Style) */}
        <div className="flex gap-5 overflow-x-auto pb-6 no-scrollbar">
          {ranked.map((dest) => (
            <Link
              key={dest.id}
              href={`/destinations/${dest.id}`}
              className="group relative shrink-0 w-64 sm:w-72 h-96 rounded-3xl overflow-hidden border border-teal-900/40 hover:border-teal-500/80 transition-all duration-300 hover:-translate-y-1.5 shadow-2xl"
            >
              <Image
                src={dest.image}
                alt={dest.name}
                fill
                sizes="300px"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent opacity-90" />

              {/* Rank Badge at Top */}
              <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-ink-950/80 backdrop-blur-md border border-saffron-500/40 text-saffron-400 text-xs font-bold">
                <Trophy className="w-3.5 h-3.5" />
                <span>{dest.rank}{dest.rank === 1 ? 'st' : dest.rank === 2 ? 'nd' : dest.rank === 3 ? 'rd' : 'th'} Place</span>
              </div>

              {/* Card Footer */}
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

        {/* Video Thumbnail Tiles Section (Ref 4 Style) */}
        <div className="mt-16 rounded-3xl bg-teal-950/40 border border-teal-900/40 p-6 md:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 space-y-3">
            <span className="text-xs text-teal-400 font-semibold uppercase tracking-widest">Visual Journeys</span>
            <h3 className="text-2xl md:text-3xl font-serif text-white">Experience Your Holiday Before You Book</h3>
            <p className="text-xs md:text-sm text-ink-300">
              Watch 4K drone reels of Dal Lake houseboats, Baga beach parasailing, and sunset Ganga Aarti.
            </p>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 gap-4">
            <div className="relative h-40 rounded-2xl overflow-hidden group cursor-pointer border border-teal-700/40">
              <Image
                src="https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=80&w=600"
                alt="Kashmir Drone Reel"
                fill
                className="object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-ink-950/40 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-teal-500/90 text-ink-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
              </div>
              <span className="absolute bottom-2 left-3 text-[11px] font-semibold text-white">Kashmir 4K Reel</span>
            </div>

            <div className="relative h-40 rounded-2xl overflow-hidden group cursor-pointer border border-teal-700/40">
              <Image
                src="https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=600"
                alt="Ayodhya Ganga Aarti Reel"
                fill
                className="object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-ink-950/40 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-saffron-500/90 text-ink-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
              </div>
              <span className="absolute bottom-2 left-3 text-[11px] font-semibold text-white">Ayodhya & Kashi Aarti</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
