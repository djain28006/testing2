'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { X, Trash2, Calendar, ArrowRight, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatCurrency } from '@/lib/utils';

export function WishlistDrawer() {
  const { wishlist, toggleWishlist, wishlistOpen, setWishlistOpen, addToast, setWhatsAppWidgetOpen } = useApp();

  const totalEstimate = wishlist.reduce((acc, tour) => acc + tour.pricePerPerson, 0);

  return (
    <AnimatePresence>
      {wishlistOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setWishlistOpen(false)}
            className="fixed inset-0 bg-ink-950/80 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-ink-900 border-l border-teal-900/40 text-white z-50 p-6 flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between pb-4 border-b border-ink-800">
              <div>
                <h3 className="text-xl font-serif text-white flex items-center gap-2">
                  <span>My Trip Board</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-950 text-teal-300 border border-teal-800">
                    {wishlist.length} saved
                  </span>
                </h3>
                <p className="text-xs text-ink-300 mt-0.5">Your saved wishlist tours & custom trip plan</p>
              </div>

              <button
                onClick={() => setWishlistOpen(false)}
                className="p-2 text-ink-300 hover:text-white transition-colors"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {wishlist.length === 0 ? (
                <div className="text-center py-16 px-4">
                  <div className="w-16 h-16 rounded-full bg-ink-800 flex items-center justify-center mx-auto mb-4 text-ink-300">
                    <Calendar className="w-8 h-8 text-teal-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-white">Your Trip Board is Empty</h4>
                  <p className="text-xs text-ink-300 mt-1 max-w-xs mx-auto">
                    Click the heart icon on any tour card to save your favorite destinations for easy planning!
                  </p>
                  <button
                    onClick={() => setWishlistOpen(false)}
                    className="mt-6 px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-600 text-white text-xs font-semibold"
                  >
                    Browse Tours Now
                  </button>
                </div>
              ) : (
                wishlist.map((tour) => (
                  <div
                    key={tour.id}
                    className="flex gap-3 p-3 rounded-2xl bg-ink-950/80 border border-teal-950 relative group"
                  >
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                      <Image src={tour.heroImage} alt={tour.title} fill className="object-cover" />
                    </div>

                    <div className="flex-1 min-w-0 pr-6">
                      <h4 className="text-sm font-serif font-semibold text-white truncate">{tour.title}</h4>
                      <p className="text-xs text-teal-400">{tour.duration}</p>
                      <div className="mt-2 text-sm font-bold text-white">
                        {formatCurrency(tour.pricePerPerson)}
                        <span className="text-[10px] text-ink-300 font-normal"> / person</span>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleWishlist(tour)}
                      className="absolute top-3 right-3 p-1 text-ink-300 hover:text-red-400 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {wishlist.length > 0 && (
              <div className="pt-4 border-t border-ink-800 space-y-3">
                <div className="flex items-center justify-between text-sm font-sans">
                  <span className="text-ink-300">Combined Total Estimate</span>
                  <span className="text-xl font-bold text-teal-300">{formatCurrency(totalEstimate)}</span>
                </div>

                <button
                  onClick={() => {
                    setWishlistOpen(false);
                    setWhatsAppWidgetOpen(true);
                    addToast({
                      title: 'Requesting Group Quote!',
                      description: `Request quote sent for ${wishlist.length} saved tours.`,
                      type: 'success',
                    });
                  }}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Request Custom Combo Quote on WhatsApp</span>
                </button>

                <Link
                  href="/custom-tours"
                  onClick={() => setWishlistOpen(false)}
                  className="w-full py-3 rounded-xl bg-teal-700 hover:bg-teal-600 text-white font-bold text-xs flex items-center justify-center gap-2"
                >
                  <span>Build Custom Itinerary</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
