'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { mockTours } from '@/data/tours';
import { BestTimeHeatmapBar } from '@/components/ui/BestTimeHeatmapBar';
import { SplitCostCalculator } from '@/components/site/SplitCostCalculator';
import { formatCurrency } from '@/lib/utils';
import { useApp } from '@/context/AppContext';
import {
  Star, MapPin, Clock, Check, X, ShieldCheck,
  Calendar, Users, ArrowRight, Heart, Share2, ChevronRight, MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TourDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toggleWishlist, isInWishlist, addToast, setWhatsAppWidgetOpen } = useApp();

  const tourId = (params?.id as string) || 'goa-fun-escape';
  const tour = mockTours.find((t) => t.id === tourId || t.slug === tourId) || mockTours[0];

  const [activeTab, setActiveTab] = useState<'overview' | 'itinerary' | 'inclusions' | 'hotels' | 'policies'>('overview');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Booking Form State
  const [selectedDate, setSelectedDate] = useState('2026-11-15');
  const [adults, setAdults] = useState(2);
  const [pickup, setPickup] = useState(tour.pickupPoints[0]);

  const isSaved = isInWishlist(tour.id);
  const totalPrice = tour.pricePerPerson * adults;

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(
      `/booking?tourId=${tour.id}&date=${selectedDate}&adults=${adults}&pickup=${encodeURIComponent(pickup)}`
    );
  };

  return (
    <div className="pt-24 pb-20 bg-ink-950 text-white min-h-screen">
      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <div className="fixed inset-0 z-50 bg-ink-950/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="relative w-full max-w-4xl h-[70vh] rounded-3xl overflow-hidden shadow-2xl">
              <Image src={lightboxImage} alt="Gallery view" fill className="object-contain" />
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-ink-900 text-white hover:bg-teal-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb Header */}
        <div className="flex items-center justify-between gap-4 border-b border-ink-800 pb-4">
          <div className="flex items-center gap-2 text-xs text-ink-300">
            <Link href="/" className="hover:text-teal-400">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/tours" className="hover:text-teal-400">Tours</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-semibold line-clamp-1">{tour.title}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleWishlist(tour)}
              className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                isSaved ? 'bg-red-950 border-red-700 text-red-400' : 'bg-ink-900 border-teal-900/40 text-white hover:text-red-400'
              }`}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-red-500' : ''}`} />
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                addToast({ title: 'Link copied to clipboard!', type: 'info' });
              }}
              className="p-2 rounded-xl bg-ink-900 border border-teal-900/40 text-white hover:text-teal-400 text-xs font-semibold"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Title & Metadata Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-teal-950 text-teal-300 border border-teal-800">
              {tour.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-saffron-400 font-semibold px-2.5 py-0.5 rounded-md bg-saffron-950 border border-saffron-800">
              <Star className="w-3.5 h-3.5 fill-saffron-400" /> {tour.rating} ({tour.reviewsCount} reviews)
            </span>
            <span className="text-xs text-ink-300 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-teal-400" /> {tour.destinationName}, {tour.state}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif text-white font-bold leading-tight">
            {tour.title}
          </h1>
          <p className="text-sm text-ink-300 font-sans">{tour.subtitle}</p>
        </div>

        {/* Photo Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 h-80 sm:h-96 rounded-3xl overflow-hidden shadow-2xl">
          <div
            className="md:col-span-2 relative h-full cursor-pointer group"
            onClick={() => setLightboxImage(tour.gallery[0] || tour.heroImage)}
          >
            <Image src={tour.gallery[0] || tour.heroImage} alt={tour.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-ink-950/20 group-hover:bg-transparent transition-colors" />
          </div>

          <div className="hidden md:grid grid-rows-2 gap-3 md:col-span-1 h-full">
            <div
              className="relative h-full cursor-pointer group overflow-hidden rounded-xl"
              onClick={() => setLightboxImage(tour.gallery[1] || tour.heroImage)}
            >
              <Image src={tour.gallery[1] || tour.heroImage} alt="Gallery 2" fill className="object-cover group-hover:scale-105 transition-transform" />
            </div>
            <div
              className="relative h-full cursor-pointer group overflow-hidden rounded-xl"
              onClick={() => setLightboxImage(tour.gallery[2] || tour.heroImage)}
            >
              <Image src={tour.gallery[2] || tour.heroImage} alt="Gallery 3" fill className="object-cover group-hover:scale-105 transition-transform" />
            </div>
          </div>

          <div
            className="hidden md:block relative h-full cursor-pointer group overflow-hidden rounded-xl md:col-span-1"
            onClick={() => setLightboxImage(tour.gallery[3] || tour.heroImage)}
          >
            <Image src={tour.gallery[3] || tour.heroImage} alt="Gallery 4" fill className="object-cover group-hover:scale-105 transition-transform" />
            <div className="absolute inset-0 bg-ink-950/60 flex items-center justify-center text-white text-xs font-bold">
              View All Photos ({tour.gallery.length})
            </div>
          </div>
        </div>

        {/* Climate Heatmap Bar */}
        <BestTimeHeatmapBar heatmap={tour.bestTimeHeatmap} />

        {/* Main Grid: Content Tabs + Sticky Booking Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-8">
            {/* Tabs Bar */}
            <div className="flex items-center gap-2 border-b border-ink-800 pb-2 overflow-x-auto no-scrollbar">
              {(
                [
                  { id: 'overview', label: 'Overview' },
                  { id: 'itinerary', label: 'Animated Itinerary' },
                  { id: 'inclusions', label: 'Inclusions & Exclusions' },
                  { id: 'hotels', label: 'Hotel & Meals' },
                  { id: 'policies', label: 'Policies & FAQs' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'bg-teal-700 text-white shadow'
                      : 'bg-ink-900 text-ink-300 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab: Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-ink-900/80 border border-teal-900/40 space-y-4">
                  <h3 className="text-xl font-serif text-white font-bold">Package Overview</h3>
                  <p className="text-xs sm:text-sm text-ink-200 leading-relaxed">{tour.overview}</p>
                </div>

                <div className="p-6 rounded-3xl bg-ink-900/80 border border-teal-900/40 space-y-3">
                  <h3 className="text-lg font-serif text-white font-bold">Key Highlights</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {tour.highlights.map((hl, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-ink-100">
                        <Check className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <SplitCostCalculator basePrice={tour.pricePerPerson} tourTitle={tour.title} />
              </div>
            )}

            {/* Tab: Animated Route Itinerary */}
            {activeTab === 'itinerary' && (
              <div className="space-y-6">
                <h3 className="text-xl font-serif font-bold text-white">Day-by-Day Animated Itinerary</h3>
                <div className="relative pl-6 sm:pl-8 border-l-2 border-teal-700/60 space-y-8">
                  {tour.itinerary.map((day) => (
                    <div key={day.day} className="relative group">
                      {/* Day Pin Circle */}
                      <div className="absolute -left-[31px] sm:-left-[39px] top-0 w-8 h-8 rounded-full bg-teal-700 border-2 border-ink-950 text-white font-bold text-xs flex items-center justify-center shadow-lg">
                        {day.day}
                      </div>

                      <div className="p-5 rounded-2xl bg-ink-900/90 border border-teal-900/40 space-y-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-teal-400 font-semibold">Day {day.day} • {day.locationPin}</span>
                          <span className="text-ink-300">{day.stay}</span>
                        </div>

                        <h4 className="text-lg font-serif font-bold text-white">{day.title}</h4>
                        <p className="text-xs text-ink-300 leading-relaxed">{day.description}</p>

                        <div className="flex items-center gap-2 pt-2 text-[11px] text-saffron-400">
                          <strong>Meals Provided:</strong> {day.meals.join(', ')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Inclusions & Exclusions */}
            {activeTab === 'inclusions' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-3xl bg-ink-900/90 border border-teal-900/40 space-y-3">
                  <h4 className="text-base font-bold text-teal-300 font-serif">What is Included</h4>
                  <ul className="space-y-2 text-xs text-ink-200">
                    {tour.inclusions.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 rounded-3xl bg-ink-900/90 border border-teal-900/40 space-y-3">
                  <h4 className="text-base font-bold text-red-400 font-serif">What is Excluded</h4>
                  <ul className="space-y-2 text-xs text-ink-200">
                    {tour.exclusions.map((exc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Tab: Hotels */}
            {activeTab === 'hotels' && (
              <div className="p-6 rounded-3xl bg-ink-900/90 border border-teal-900/40 space-y-4">
                <h4 className="text-lg font-serif font-bold text-white">Accommodations & Meals Plan</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-ink-950 border border-teal-950">
                    <span className="text-ink-300 block mb-1">Hotel Rating</span>
                    <strong className="text-white text-sm">{tour.hotelCategory}</strong>
                  </div>
                  <div className="p-4 rounded-2xl bg-ink-950 border border-teal-950">
                    <span className="text-ink-300 block mb-1">Meal Plan</span>
                    <strong className="text-saffron-400 text-sm">{tour.mealPlan}</strong>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Policies */}
            {activeTab === 'policies' && (
              <div className="p-6 rounded-3xl bg-ink-900/90 border border-teal-900/40 space-y-4 text-xs text-ink-200 leading-relaxed">
                <h4 className="text-lg font-serif font-bold text-white">Cancellation & Modification Policy</h4>
                <p>• Full 100% refund for cancellation 15 days prior to travel.</p>
                <p>• Free date modification permitted up to 7 days before departure.</p>
                <p>• Aadhaar card or Govt Photo ID required at hotel check-in.</p>
              </div>
            )}
          </div>

          {/* Sticky Booking Sidebar */}
          <aside className="lg:col-span-4 sticky top-28">
            <div className="p-6 rounded-3xl bg-ink-900/95 border border-teal-700/50 shadow-2xl space-y-5 backdrop-blur-2xl">
              <div>
                <span className="text-xs text-ink-300 block">Total Price per person</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-white">{formatCurrency(tour.pricePerPerson)}</span>
                  <span className="text-xs text-ink-300 line-through">{formatCurrency(tour.originalPrice)}</span>
                </div>
              </div>

              <form onSubmit={handleBooking} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-teal-400 block mb-1">Select Departure Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-ink-950 border border-teal-900/60 text-white text-xs focus:outline-none focus:border-teal-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-teal-400 block mb-1">Number of Travellers</label>
                  <select
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl bg-ink-950 border border-teal-900/60 text-white text-xs focus:outline-none focus:border-teal-400"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Adult' : 'Adults'}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-teal-400 block mb-1">Pickup Point</label>
                  <select
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-ink-950 border border-teal-900/60 text-white text-xs focus:outline-none focus:border-teal-400"
                  >
                    {tour.pickupPoints.map((pt) => (
                      <option key={pt} value={pt}>
                        {pt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="p-3 rounded-xl bg-ink-950 border border-teal-950 flex justify-between items-center text-xs font-bold">
                  <span className="text-ink-300 font-normal">Calculated Total</span>
                  <span className="text-xl text-teal-300">{formatCurrency(totalPrice)}</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-teal-700 hover:bg-teal-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-teal-900/50"
                >
                  <span>Proceed to Booking</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <button
                onClick={() => setWhatsAppWidgetOpen(true)}
                className="w-full py-2.5 rounded-xl bg-emerald-950 border border-emerald-700/40 text-emerald-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Ask Question on WhatsApp</span>
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
