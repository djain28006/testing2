'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { mockDestinations } from '@/data/destinations';
import { Destination } from '@/types';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { MapPin, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function InteractiveIndiaMap() {
  const [activePin, setActivePin] = useState<Destination | null>(mockDestinations[0]);

  return (
    <section className="py-20 bg-ink-950 text-white relative border-t border-teal-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Interactive India Map"
          title="Explore Destinations by Geographic Map"
          subtitle="Hover or tap on pulsing pins to inspect tours across North, West, South, and Divine Belts"
          centered
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-ink-900/80 border border-teal-900/40 rounded-3xl p-6 md:p-10 shadow-2xl backdrop-blur-xl">
          {/* Custom Stylized India Map Container */}
          <div className="lg:col-span-7 relative h-[420px] sm:h-[480px] bg-ink-950/80 rounded-2xl border border-teal-950 flex items-center justify-center p-4 overflow-hidden">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#14A3A8_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />

            {/* Stylized India Silhouette SVG Path */}
            <svg viewBox="0 0 400 450" className="w-full h-full max-h-[440px] text-teal-900/40 fill-current">
              <path d="M 160 30 Q 190 20 220 35 L 240 70 L 260 90 L 310 130 L 320 160 L 280 170 L 250 190 L 270 240 L 220 280 L 190 340 L 160 410 L 140 370 L 130 300 L 90 250 L 70 200 L 90 150 L 110 100 Z" />
            </svg>

            {/* Pulsing Pins Overlay */}
            {mockDestinations.map((dest) => {
              const isSelected = activePin?.id === dest.id;

              return (
                <div
                  key={dest.id}
                  style={{ left: `${dest.mapPinX}%`, top: `${dest.mapPinY}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                  onMouseEnter={() => setActivePin(dest)}
                  onClick={() => setActivePin(dest)}
                >
                  <div className="relative">
                    {/* Pulsing Outer Ring */}
                    <span className="absolute -inset-2 rounded-full bg-teal-400/40 animate-ping" />

                    {/* Inner Marker */}
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-saffron-500 text-ink-950 scale-125 shadow-lg shadow-saffron-500/50'
                          : 'bg-teal-700 text-white hover:bg-teal-500 hover:scale-110'
                      }`}
                    >
                      <MapPin className="w-4 h-4" />
                    </div>

                    {/* Pin Name Tooltip */}
                    <span className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold px-2 py-0.5 rounded bg-ink-950 text-white border border-teal-800 shadow">
                      {dest.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Pin Detail Card */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              {activePin && (
                <motion.div
                  key={activePin.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 rounded-2xl bg-ink-950 border border-teal-700/50 space-y-4 shadow-xl"
                >
                  <div className="relative w-full h-44 rounded-xl overflow-hidden">
                    <Image src={activePin.image} alt={activePin.name} fill className="object-cover" />
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-saffron-950/90 text-saffron-400 border border-saffron-700">
                      Rank #{activePin.rank || 1}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs text-teal-400 font-semibold uppercase tracking-wider">
                      {activePin.state}
                    </span>
                    <h3 className="text-2xl font-serif text-white font-bold">{activePin.name}</h3>
                    <p className="text-xs text-ink-300 mt-1">{activePin.description}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-ink-900 border border-ink-800 text-xs text-ink-200">
                    <strong className="text-teal-400 block mb-0.5">Best Season:</strong>
                    {activePin.bestTimeToVisit}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-ink-300">{activePin.tourCount} Available Packages</span>
                    <Link
                      href={`/destinations/${activePin.id}`}
                      className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-600 text-white text-xs font-bold flex items-center gap-1.5 shadow"
                    >
                      <span>Explore Destination</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
