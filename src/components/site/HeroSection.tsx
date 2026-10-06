'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { mockDestinations } from '@/data/destinations';
import { mockTours } from '@/data/tours';
import { ChevronLeft, ChevronRight, Headphones, ShieldCheck, BadgePercent, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const heroDestinations = mockDestinations.slice(0, 5);
  const current = heroDestinations[activeIndex];

  // Auto slide every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroDestinations.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroDestinations.length]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + heroDestinations.length) % heroDestinations.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % heroDestinations.length);
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-ink-950 text-white pt-24 pb-12">
      {/* Background Image Crossfade (Ref 3 & Ref 1) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={current.image}
            alt={current.name}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center filter brightness-[0.65] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-ink-950/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950/90 via-transparent to-ink-950/70" />
        </motion.div>
      </AnimatePresence>

      {/* Floating Glass Chips (Ref 2 Style) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4">
        <div className="hidden sm:flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-teal-950/70 border border-teal-700/40 text-xs font-semibold text-teal-300 backdrop-blur-md shadow-lg">
            <Headphones className="w-3.5 h-3.5 text-teal-400" />
            <span>24/7 Dedicated Support Concierge</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-teal-950/70 border border-teal-700/40 text-xs font-semibold text-teal-300 backdrop-blur-md shadow-lg">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
            <span>Handpicked Verified 4★ & 5★ Hotels</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-teal-950/70 border border-teal-700/40 text-xs font-semibold text-teal-300 backdrop-blur-md shadow-lg">
            <BadgePercent className="w-3.5 h-3.5 text-saffron-400" />
            <span>Transparent Pricing • Zero Hidden Costs</span>
          </div>
        </div>
      </div>

      {/* Main Hero Body Grid (Ref 3 Condensed Display Title + Right Side Cards Rail) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side Titles & CTA */}
        <div className="lg:col-span-6 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-saffron-950/80 border border-saffron-600/50 text-saffron-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Top Indian Destinations 2026</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-xs uppercase tracking-widest text-teal-400 font-semibold block mb-1">
                {current.state}
              </span>
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-extrabold uppercase tracking-tight text-white leading-none">
                {current.name}
              </h1>
              <p className="text-base sm:text-lg font-serif text-sand-200 mt-2 italic max-w-md">
                &quot;{current.tagline}&quot;
              </p>
              <p className="text-xs sm:text-sm text-ink-300 mt-3 font-sans max-w-lg line-clamp-2">
                {current.description}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="pt-4 flex items-center gap-4 flex-wrap">
            <Link
              href={`/destinations/${current.id}`}
              className="px-6 py-3.5 rounded-2xl bg-teal-700 hover:bg-teal-600 text-white font-bold text-sm flex items-center gap-2 shadow-xl shadow-teal-900/60 transition-all hover:scale-105"
            >
              <span>Explore {current.name} Tours</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/custom-tours"
              className="px-6 py-3.5 rounded-2xl bg-ink-900/80 hover:bg-ink-800 border border-teal-700/40 text-teal-300 font-semibold text-sm backdrop-blur-md transition-colors"
            >
              Plan Custom Trip
            </Link>
          </div>
        </div>

        {/* Right Side Destination Card Rail (Ref 3 Globe Express Style) */}
        <div className="lg:col-span-6 relative">
          <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar">
            {heroDestinations.map((dest, idx) => {
              const active = idx === activeIndex;

              return (
                <motion.div
                  key={dest.id}
                  onClick={() => setActiveIndex(idx)}
                  whileHover={{ scale: 1.03 }}
                  className={`relative shrink-0 rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 ${
                    active
                      ? 'w-44 sm:w-52 h-64 sm:h-72 border-2 border-teal-400 shadow-2xl shadow-teal-500/30'
                      : 'w-32 sm:w-36 h-52 sm:h-60 border border-teal-900/40 opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={dest.image} alt={dest.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />

                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-[10px] text-teal-300 uppercase tracking-widest block font-semibold">
                      0{idx + 1}
                    </span>
                    <h4 className="text-sm font-bold text-white line-clamp-1">{dest.name}</h4>
                    <span className="text-[10px] text-ink-300 block">{dest.tourCount} Packages</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Prev / Next Arrows + Slide Counter "01" (Ref 3 & Ref 4) */}
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-ink-900/80 border border-teal-700/40 text-white flex items-center justify-center hover:bg-teal-700 transition-colors"
                aria-label="Previous destination"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-ink-900/80 border border-teal-700/40 text-white flex items-center justify-center hover:bg-teal-700 transition-colors"
                aria-label="Next destination"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Slide Index (Ref 4) */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-display font-extrabold text-teal-400">
                0{activeIndex + 1}
              </span>
              <span className="text-xs text-ink-300">/ 0{heroDestinations.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ref 1: Mountain Edge / Torn Paper Divider SVG at bottom */}
      <div className="relative z-10 w-full overflow-hidden leading-none mt-6">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-12 text-ink-950 fill-current"
        >
          <path d="M0,0 C150,90 350,-40 500,65 C650,140 900,10 1200,80 L1200,120 L0,120 Z" />
        </svg>
      </div>
    </div>
  );
}
