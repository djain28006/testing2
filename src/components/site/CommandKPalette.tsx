'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { mockTours } from '@/data/tours';
import { mockDestinations } from '@/data/destinations';
import { Search, MapPin, Calendar, Compass, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function CommandKPalette() {
  const { commandKOpen, setCommandKOpen } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  if (!commandKOpen) return null;

  const filteredTours = mockTours.filter(
    (t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.destinationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDestinations = mockDestinations.filter(
    (d) =>
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-ink-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="w-full max-w-2xl bg-ink-900 border border-teal-700/50 rounded-3xl shadow-2xl overflow-hidden text-white"
        >
          <div className="flex items-center gap-3 px-6 py-4 border-b border-ink-800">
            <Search className="w-5 h-5 text-teal-400 shrink-0" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Type destination, tour name, or pilgrimage spot..."
              className="w-full bg-transparent text-white placeholder-ink-300 text-sm focus:outline-none"
            />
            <button
              onClick={() => setCommandKOpen(false)}
              className="p-1 text-ink-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
            {/* Destinations */}
            {filteredDestinations.length > 0 && (
              <div>
                <span className="text-[11px] font-semibold text-teal-400 uppercase tracking-wider px-2 block mb-2">
                  Destinations
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {filteredDestinations.map((d) => (
                    <Link
                      key={d.id}
                      href={`/destinations/${d.id}`}
                      onClick={() => setCommandKOpen(false)}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-ink-800 transition-colors border border-transparent hover:border-teal-900/40"
                    >
                      <div className="w-8 h-8 rounded-lg bg-teal-950 flex items-center justify-center text-teal-400 shrink-0">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-white">{d.name}</h4>
                        <span className="text-[10px] text-ink-300">{d.state} • {d.tourCount} Tours</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Tours */}
            {filteredTours.length > 0 && (
              <div>
                <span className="text-[11px] font-semibold text-teal-400 uppercase tracking-wider px-2 block mb-2">
                  Packages & Tours
                </span>
                <div className="space-y-1">
                  {filteredTours.map((t) => (
                    <Link
                      key={t.id}
                      href={`/tours/${t.id}`}
                      onClick={() => setCommandKOpen(false)}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-ink-800 transition-colors border border-transparent hover:border-teal-900/40"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-teal-950 flex items-center justify-center text-teal-400 shrink-0">
                          <Compass className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold text-white">{t.title}</h4>
                          <span className="text-[10px] text-ink-300">{t.duration} • {t.destinationName}</span>
                        </div>
                      </div>

                      <span className="text-xs font-bold text-teal-300">
                        ₹{t.pricePerPerson.toLocaleString('en-IN')}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {filteredDestinations.length === 0 && filteredTours.length === 0 && (
              <div className="text-center py-10 text-ink-300 text-xs">
                No matching tour or destination found for &quot;{searchQuery}&quot;
              </div>
            )}
          </div>

          <div className="px-6 py-3 bg-ink-950 border-t border-ink-800 text-[11px] text-ink-300 flex items-center justify-between">
            <span>Press ESC to close</span>
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-teal-400" /> VedicVibe Search</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
