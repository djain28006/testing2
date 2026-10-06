'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { mockTours } from '@/data/tours';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { formatCurrency } from '@/lib/utils';
import { Star, ChevronLeft, ChevronRight, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function FeaturedPackagesCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const featured = mockTours.filter((t) => t.featured);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + featured.length) % featured.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % featured.length);
  };

  return (
    <section className="py-20 bg-ink-950 text-white relative overflow-hidden">
      {/* Ref 2 Deep Teal Ocean Glow Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#0B3B3C_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Ref 2 • Center Focus Carousel"
          title="Featured Handcrafted Packages"
          subtitle="Explore our most loved, high-rating tours with all-inclusive transfers & verified 4★ hotels"
          actionText="View All Packages"
          actionHref="/tours"
        />

        {/* Carousel Container */}
        <div className="relative my-8">
          <div className="flex items-center justify-center gap-4 md:gap-6 min-h-[440px]">
            {featured.map((tour, idx) => {
              const isActive = idx === activeIndex;
              const isPrev = idx === (activeIndex - 1 + featured.length) % featured.length;
              const isNext = idx === (activeIndex + 1) % featured.length;

              if (!isActive && !isPrev && !isNext) return null;

              return (
                <motion.div
                  key={tour.id}
                  onClick={() => setActiveIndex(idx)}
                  animate={{
                    scale: isActive ? 1.05 : 0.88,
                    opacity: isActive ? 1 : 0.45,
                    zIndex: isActive ? 20 : 10,
                  }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 border shadow-2xl ${
                    isActive
                      ? 'w-full max-w-md sm:max-w-lg bg-ink-900 border-teal-500/80'
                      : 'w-64 hidden sm:block bg-ink-950 border-teal-900/30 filter blur-[0.5px]'
                  }`}
                >
                  <div className="relative w-full h-60 sm:h-64 overflow-hidden">
                    <Image src={tour.heroImage} alt={tour.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-teal-950/80 backdrop-blur-md text-teal-300 border border-teal-700/40">
                      {tour.category}
                    </span>
                    <span className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded-md text-xs font-bold bg-saffron-950/80 text-saffron-400 border border-saffron-800/60 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-saffron-400" /> {tour.rating}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-teal-400 font-medium mb-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{tour.duration}</span>
                    </div>

                    <h3 className="text-xl font-serif text-white font-bold">{tour.title}</h3>
                    <p className="text-xs text-ink-300 mt-1 line-clamp-2">{tour.overview}</p>

                    <div className="mt-5 pt-4 border-t border-ink-800 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-ink-300 block">Starting from</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-white">
                            {formatCurrency(tour.pricePerPerson)}
                          </span>
                          <span className="text-xs text-ink-300 line-through">
                            {formatCurrency(tour.originalPrice)}
                          </span>
                        </div>
                      </div>

                      {isActive && (
                        <Link
                          href={`/booking?tourId=${tour.id}`}
                          className="px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-teal-900/50"
                        >
                          <span>Book Now</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full bg-ink-900 border border-teal-700/40 text-white flex items-center justify-center hover:bg-teal-700 transition-colors"
              aria-label="Previous card"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-1.5">
              {featured.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === activeIndex ? 'w-8 bg-teal-400' : 'w-2 bg-ink-800'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full bg-ink-900 border border-teal-700/40 text-white flex items-center justify-center hover:bg-teal-700 transition-colors"
              aria-label="Next card"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
