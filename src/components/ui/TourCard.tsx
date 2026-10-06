'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Tour } from '@/types';
import { useApp } from '@/context/AppContext';
import { Star, Heart, ArrowRight, Check, MapPin, Clock } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface TourCardProps {
  tour: Tour;
  layout?: 'grid' | 'horizontal';
  priorityImage?: boolean;
}

export function TourCard({ tour, layout = 'grid', priorityImage = false }: TourCardProps) {
  const { toggleWishlist, isInWishlist, toggleCompare, isInCompare } = useApp();
  const isSaved = isInWishlist(tour.id);
  const isCompared = isInCompare(tour.id);

  if (layout === 'horizontal') {
    return (
      <div className="group relative flex flex-col md:flex-row bg-ink-900/90 border border-teal-900/40 rounded-2xl overflow-hidden hover:border-teal-700/60 transition-all duration-300 shadow-xl">
        <div className="relative w-full md:w-72 h-48 md:h-auto shrink-0 overflow-hidden">
          <Image
            src={tour.heroImage}
            alt={tour.title}
            fill
            sizes="(max-width: 768px) 100vw, 300px"
            priority={priorityImage}
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <button
            onClick={() => toggleWishlist(tour)}
            className="absolute top-3 right-3 p-2.5 rounded-full bg-ink-950/60 backdrop-blur-md text-white hover:text-red-400 transition-colors z-10"
            aria-label="Save to wishlist"
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
          </button>
          <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-teal-950/80 backdrop-blur-md text-teal-300 border border-teal-700/40">
            {tour.category}
          </span>
        </div>

        <div className="flex-1 p-5 md:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="flex items-center gap-1.5 text-xs text-ink-300">
                <MapPin className="w-3.5 h-3.5 text-teal-400" />
                {tour.destinationName}, {tour.state}
              </span>
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold bg-saffron-950/60 text-saffron-400 border border-saffron-800/50">
                <Star className="w-3 h-3 fill-saffron-400" />
                {tour.rating} ({tour.reviewsCount})
              </span>
            </div>

            <h3 className="text-xl font-serif text-white group-hover:text-teal-300 transition-colors line-clamp-1">
              {tour.title}
            </h3>
            <p className="text-xs text-ink-300 mt-1 line-clamp-2">{tour.subtitle}</p>

            <div className="flex flex-wrap gap-2 mt-3">
              <span className="flex items-center gap-1 text-[11px] text-ink-300 px-2 py-0.5 rounded-md bg-ink-800">
                <Clock className="w-3 h-3 text-teal-400" /> {tour.duration}
              </span>
              {tour.vibes.map((v) => (
                <span key={v} className="text-[10px] text-teal-300 px-2 py-0.5 rounded-md bg-teal-950/80 border border-teal-800/40">
                  {v}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 mt-4 border-t border-ink-800">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-white">{formatCurrency(tour.pricePerPerson)}</span>
                {tour.originalPrice > tour.pricePerPerson && (
                  <span className="text-xs text-ink-300 line-through">{formatCurrency(tour.originalPrice)}</span>
                )}
              </div>
              <span className="text-[10px] text-ink-300">per person (incl. taxes)</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleCompare(tour)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  isCompared ? 'bg-teal-900/80 border-teal-500 text-teal-300' : 'bg-ink-800 border-ink-700 text-ink-300 hover:text-white'
                }`}
              >
                {isCompared ? <Check className="w-3.5 h-3.5 inline mr-1" /> : null} Compare
              </button>
              <Link
                href={`/tours/${tour.id}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-600 text-white text-xs font-semibold transition-colors"
              >
                <span>View Tour</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative flex flex-col bg-ink-900/90 border border-teal-900/40 rounded-2xl overflow-hidden hover:border-teal-700/60 transition-all duration-300 hover:-translate-y-1 shadow-xl">
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <Image
          src={tour.heroImage}
          alt={tour.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priorityImage}
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent opacity-80" />

        {/* Wishlist Button */}
        <button
          onClick={() => toggleWishlist(tour)}
          className="absolute top-3 right-3 p-2.5 rounded-full bg-ink-950/60 backdrop-blur-md text-white hover:text-red-400 transition-colors z-10"
          aria-label="Save to wishlist"
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
        </button>

        {/* Category Chip */}
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-teal-950/80 backdrop-blur-md text-teal-300 border border-teal-700/40">
          {tour.category}
        </span>

        {/* Duration badge at bottom left of image */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-ink-950/80 backdrop-blur-md text-xs text-ink-100">
          <Clock className="w-3 h-3 text-teal-400" />
          <span>{tour.duration}</span>
        </div>

        {/* Rating at bottom right */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold bg-saffron-950/80 backdrop-blur-md text-saffron-400 border border-saffron-800/50">
          <Star className="w-3 h-3 fill-saffron-400" />
          <span>{tour.rating}</span>
        </div>
      </div>

      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-teal-400 font-medium mb-1.5">
            <MapPin className="w-3.5 h-3.5" />
            <span>{tour.destinationName}, {tour.state}</span>
          </div>

          <h3 className="text-lg font-serif text-white group-hover:text-teal-300 transition-colors line-clamp-1 leading-snug">
            {tour.title}
          </h3>

          <p className="text-xs text-ink-300 mt-1 line-clamp-2 font-sans">
            {tour.subtitle}
          </p>
        </div>

        <div className="pt-4 mt-4 border-t border-ink-800/60">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-xs text-ink-300 block">Starting from</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-bold text-white">{formatCurrency(tour.pricePerPerson)}</span>
                {tour.originalPrice > tour.pricePerPerson && (
                  <span className="text-xs text-ink-300 line-through">{formatCurrency(tour.originalPrice)}</span>
                )}
              </div>
            </div>

            <button
              onClick={() => toggleCompare(tour)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                isCompared
                  ? 'bg-teal-900/80 border-teal-500 text-teal-300'
                  : 'bg-ink-800/60 border-ink-700 text-ink-300 hover:text-white'
              }`}
            >
              {isCompared ? 'Compared' : '+ Compare'}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              href={`/tours/${tour.id}`}
              className="w-full text-center py-2 rounded-xl bg-ink-800 hover:bg-ink-700 text-white text-xs font-medium transition-colors"
            >
              View Details
            </Link>
            <Link
              href={`/booking?tourId=${tour.id}`}
              className="w-full text-center py-2 rounded-xl bg-teal-700 hover:bg-teal-600 text-white text-xs font-semibold transition-colors"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
