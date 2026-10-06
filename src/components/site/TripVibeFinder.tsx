'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { mockTours } from '@/data/tours';
import { Tour } from '@/types';
import { Sparkles, Check, ArrowRight, RotateCcw } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { motion } from 'framer-motion';

export function TripVibeFinder() {
  const [mood, setMood] = useState<'Chill' | 'Adventure' | 'Spiritual' | 'Family'>('Chill');
  const [budget, setBudget] = useState<number>(15000);
  const [days, setDays] = useState<number>(3);
  const [results, setResults] = useState<Tour[] | null>(null);

  const handleCalculate = () => {
    const matched = mockTours
      .map((tour) => {
        let score = 70;
        if (tour.vibes.includes(mood)) score += 20;
        if (tour.pricePerPerson <= budget) score += 10;
        return { tour, matchScore: Math.min(99, score) };
      })
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 3);

    setResults(matched.map((m) => ({ ...m.tour, matchScore: m.matchScore } as any)));
  };

  return (
    <section className="py-20 bg-ink-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-teal-950 via-ink-900 to-teal-950 border border-teal-700/40 p-6 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron-950/80 text-saffron-400 border border-saffron-600/40 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" /> Interactive Match Quiz
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-white mt-2">Find Your Perfect Trip Vibe</h2>
            <p className="text-xs md:text-sm text-ink-300 mt-1">
              Answer 3 quick questions and get instant AI-calculated match percentage tour recommendations!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Q1: Mood */}
            <div className="p-4 rounded-2xl bg-ink-900/90 border border-teal-900/40 space-y-2">
              <label className="text-xs font-semibold text-teal-400 block">1. What is your Trip Vibe?</label>
              <div className="grid grid-cols-2 gap-2">
                {(['Chill', 'Adventure', 'Spiritual', 'Family'] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMood(m)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                      mood === m
                        ? 'bg-teal-700 border-teal-400 text-white shadow-md'
                        : 'bg-ink-950 border-ink-800 text-ink-300 hover:text-white'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Q2: Max Budget per person */}
            <div className="p-4 rounded-2xl bg-ink-900/90 border border-teal-900/40 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-teal-400">2. Max Budget per person</label>
                <span className="font-bold text-white">{formatCurrency(budget)}</span>
              </div>
              <input
                type="range"
                min={3000}
                max={30000}
                step={1000}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full accent-teal-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-ink-300">
                <span>₹3,000</span>
                <span>₹30,000</span>
              </div>
            </div>

            {/* Q3: Duration */}
            <div className="p-4 rounded-2xl bg-ink-900/90 border border-teal-900/40 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-teal-400">3. Trip Days Available</label>
                <span className="font-bold text-white">{days} Days</span>
              </div>
              <input
                type="range"
                min={1}
                max={7}
                step={1}
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full accent-teal-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-ink-300">
                <span>1 Day</span>
                <span>7 Days</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleCalculate}
              className="px-6 py-3 rounded-2xl bg-teal-700 hover:bg-teal-600 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-teal-900/60"
            >
              <Sparkles className="w-4 h-4 text-saffron-400" />
              <span>Calculate My Trip Match</span>
            </button>

            {results && (
              <button
                onClick={() => setResults(null)}
                className="px-4 py-3 rounded-2xl bg-ink-900 border border-ink-800 text-ink-300 hover:text-white text-xs flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Results Grid */}
          {results && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 pt-8 border-t border-teal-900/60"
            >
              <h3 className="text-xl font-serif text-white mb-4">Top 3 Recommended Matches for You</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {results.map((tour: any) => (
                  <div
                    key={tour.id}
                    className="p-4 rounded-2xl bg-ink-950 border border-teal-700/40 relative flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-saffron-950 border border-saffron-600 text-saffron-400 text-[11px] font-bold">
                          {tour.matchScore || 95}% Match
                        </span>
                        <span className="text-xs text-teal-400">{tour.duration}</span>
                      </div>
                      <h4 className="text-base font-bold text-white font-serif">{tour.title}</h4>
                      <p className="text-xs text-ink-300 mt-1 line-clamp-2">{tour.subtitle}</p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-ink-800 flex items-center justify-between">
                      <span className="text-sm font-bold text-white">{formatCurrency(tour.pricePerPerson)}</span>
                      <Link
                        href={`/tours/${tour.id}`}
                        className="px-3 py-1.5 rounded-xl bg-teal-700 hover:bg-teal-600 text-white text-xs font-semibold flex items-center gap-1"
                      >
                        <span>View</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
