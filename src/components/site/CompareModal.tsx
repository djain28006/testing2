'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { X, Check, Star, ArrowRight, Scale } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatCurrency } from '@/lib/utils';

export function CompareModal() {
  const { compareList, compareModalOpen, setCompareModalOpen, toggleCompare, clearCompare } = useApp();

  return (
    <>
      {/* Floating Bottom Bar when items are selected */}
      {compareList.length > 0 && !compareModalOpen && (
        <div className="fixed bottom-20 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 bg-ink-950/95 border border-teal-500/50 rounded-2xl px-5 py-3 shadow-2xl backdrop-blur-xl flex items-center gap-4 text-white">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-teal-400" />
            <span className="text-xs font-semibold">
              Comparing <strong className="text-teal-300">{compareList.length}</strong> tours
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCompareModalOpen(true)}
              className="px-4 py-1.5 rounded-xl bg-teal-700 hover:bg-teal-600 text-white text-xs font-bold transition-all shadow-md"
            >
              Compare Side-by-Side
            </button>
            <button
              onClick={clearCompare}
              className="px-2.5 py-1.5 rounded-xl bg-ink-800 text-ink-300 hover:text-white text-xs"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Side-by-Side Modal */}
      <AnimatePresence>
        {compareModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-5xl bg-ink-900 border border-teal-700/40 rounded-3xl p-6 md:p-8 text-white relative shadow-2xl my-8 max-h-[90vh] flex flex-col"
            >
              <div className="flex items-center justify-between pb-4 border-b border-ink-800">
                <div>
                  <h3 className="text-2xl font-serif text-white">Side-by-Side Tour Comparison</h3>
                  <p className="text-xs text-ink-300">Compare inclusions, pricing, duration, and hotel categories</p>
                </div>
                <button
                  onClick={() => setCompareModalOpen(false)}
                  className="p-2 text-ink-300 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-x-auto py-6">
                <table className="w-full text-left text-xs min-w-[600px] border-collapse">
                  <thead>
                    <tr>
                      <th className="p-3 w-40 text-ink-300 font-normal">Feature</th>
                      {compareList.map((t) => (
                        <th key={t.id} className="p-3 min-w-[200px] align-top">
                          <div className="relative w-full h-32 rounded-xl overflow-hidden mb-2">
                            <Image src={t.heroImage} alt={t.title} fill className="object-cover" />
                            <button
                              onClick={() => toggleCompare(t)}
                              className="absolute top-2 right-2 p-1 rounded-full bg-ink-950/80 text-ink-300 hover:text-red-400"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <h4 className="text-sm font-serif font-bold text-white line-clamp-2">{t.title}</h4>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink-800">
                    <tr>
                      <td className="p-3 text-ink-300 font-semibold">Price per person</td>
                      {compareList.map((t) => (
                        <td key={t.id} className="p-3 font-bold text-teal-300 text-base">
                          {formatCurrency(t.pricePerPerson)}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 text-ink-300 font-semibold">Duration</td>
                      {compareList.map((t) => (
                        <td key={t.id} className="p-3 text-white">{t.duration}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 text-ink-300 font-semibold">Rating</td>
                      {compareList.map((t) => (
                        <td key={t.id} className="p-3 text-saffron-400 font-semibold flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-saffron-400" /> {t.rating} ({t.reviewsCount})
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 text-ink-300 font-semibold">Hotel Category</td>
                      {compareList.map((t) => (
                        <td key={t.id} className="p-3 text-white">{t.hotelCategory}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 text-ink-300 font-semibold">Meal Plan</td>
                      {compareList.map((t) => (
                        <td key={t.id} className="p-3 text-white">{t.mealPlan}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 text-ink-300 font-semibold">Top Inclusions</td>
                      {compareList.map((t) => (
                        <td key={t.id} className="p-3 text-ink-200">
                          <ul className="space-y-1">
                            {t.inclusions.slice(0, 3).map((inc, i) => (
                              <li key={i} className="flex items-start gap-1">
                                <Check className="w-3 h-3 text-teal-400 shrink-0 mt-0.5" />
                                <span>{inc}</span>
                              </li>
                            ))}
                          </ul>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 text-ink-300 font-semibold">Action</td>
                      {compareList.map((t) => (
                        <td key={t.id} className="p-3">
                          <Link
                            href={`/booking?tourId=${t.id}`}
                            onClick={() => setCompareModalOpen(false)}
                            className="w-full py-2 px-3 rounded-xl bg-teal-700 hover:bg-teal-600 text-white font-bold text-xs flex items-center justify-center gap-1"
                          >
                            <span>Book Package</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
