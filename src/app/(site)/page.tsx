'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HeroSection } from '@/components/site/HeroSection';
import { SearchWidget } from '@/components/site/SearchWidget';
import { TripTypeTiles } from '@/components/site/TripTypeTiles';
import { PopularDestinationsRail } from '@/components/site/PopularDestinationsRail';
import { FeaturedPackagesCarousel } from '@/components/site/FeaturedPackagesCarousel';
import { UpcomingDeparturesTicker } from '@/components/site/UpcomingDeparturesTicker';
import { TripVibeFinder } from '@/components/site/TripVibeFinder';
import { InteractiveIndiaMap } from '@/components/site/InteractiveIndiaMap';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { mockReviews } from '@/data/hotels';
import { Star, ShieldCheck, Clock, Headphones, ChevronDown, ArrowRight, MessageSquare } from 'lucide-react';
import { brandConfig } from '@/config/brand';
import { useApp } from '@/context/AppContext';

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { setWhatsAppWidgetOpen } = useApp();

  const faqs = [
    {
      q: 'Are all hotel accommodations 4-star and verified?',
      a: 'Yes! We only partner with handpicked, verified 4-star & luxury resorts that meet strict cleanliness, safety, and hospitality audits.',
    },
    {
      q: 'How does VIP Ram Lalla Darshan token work in Ayodhya package?',
      a: 'Our on-ground spiritual tour guide manages your Sugam VIP Darshan passes, so you bypass general entry queues and get convenient darshan slots.',
    },
    {
      q: 'Are there any hidden taxes or driver allowances?',
      a: 'Zero hidden fees. Every quote includes GST, driver stay/allowances, state permits, toll taxes, and complimentary breakfast.',
    },
    {
      q: 'Can I customize the itinerary or add extra days?',
      a: 'Absolutey! You can use our "Plan My Trip" conversational wizard or message our WhatsApp concierge to tailor any itinerary to your group pace.',
    },
    {
      q: 'What is the refund policy if I cancel my booking?',
      a: '100% refund is issued for cancellations made 15+ days prior to departure. You can also reschedule your trip date for free up to 7 days before departure.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-ink-950 text-white overflow-hidden">
      {/* 1. Cinematic Hero Section */}
      <HeroSection />

      {/* 2. Floating Search Widget */}
      <SearchWidget />

      {/* 3. Trip Type Selector Tiles */}
      <TripTypeTiles />

      {/* 4. Ranked Popular Destinations Rail & Video Tiles */}
      <PopularDestinationsRail />

      {/* 5. Center Focus Featured Packages Carousel */}
      <FeaturedPackagesCarousel />

      {/* 6. Live Upcoming Departures Seat Fill Ticker */}
      <UpcomingDeparturesTicker />

      {/* 7. Trip Vibe Finder Quiz */}
      <TripVibeFinder />

      {/* 8. Interactive India SVG Map */}
      <InteractiveIndiaMap />

      {/* 9. Why Choose Us Section */}
      <section className="py-20 bg-ink-950 text-white border-t border-teal-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="The VedicVibe Advantage"
            title="Why 12,000+ Travellers Trust Us"
            subtitle="Designed for seamless, luxury & sacred Indian holiday experiences"
            centered
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-ink-900/80 border border-teal-900/40 hover:border-teal-500/60 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-teal-950 border border-teal-800 flex items-center justify-center text-teal-400 mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-serif font-bold text-white">Verified 4★ Properties</h4>
              <p className="text-xs text-ink-300 mt-2 leading-relaxed">
                Stay only in audited luxury resorts with swimming pools, buffet breakfasts, and pristine hygiene.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-ink-900/80 border border-teal-900/40 hover:border-teal-500/60 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-teal-950 border border-teal-800 flex items-center justify-center text-saffron-400 mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-serif font-bold text-white">VIP Temple Access</h4>
              <p className="text-xs text-ink-300 mt-2 leading-relaxed">
                Enjoy priority entry token assistance for Ram Mandir, Kashi Vishwanath Corridor, and Shirdi.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-ink-900/80 border border-teal-900/40 hover:border-teal-500/60 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-teal-950 border border-teal-800 flex items-center justify-center text-teal-400 mb-4">
                <Headphones className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-serif font-bold text-white">24/7 On-Trip Concierge</h4>
              <p className="text-xs text-ink-300 mt-2 leading-relaxed">
                Dedicated WhatsApp tour manager assigned to your booking from arrival until departure.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-ink-900/80 border border-teal-900/40 hover:border-teal-500/60 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-teal-950 border border-teal-800 flex items-center justify-center text-saffron-400 mb-4">
                <Star className="w-6 h-6 fill-saffron-400" />
              </div>
              <h4 className="text-lg font-serif font-bold text-white">Guaranteed Pricing</h4>
              <p className="text-xs text-ink-300 mt-2 leading-relaxed">
                No last-minute surges or surprise toll fees. What you see is exactly what you pay.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Testimonials Grid */}
      <section className="py-20 bg-gradient-to-b from-ink-950 via-teal-950/40 to-ink-950 border-t border-teal-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Traveller Stories"
            title="Real Reviews from Happy Families"
            subtitle="Read verified feedback from our recent guests"
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockReviews.map((rev) => (
              <div
                key={rev.id}
                className="p-6 rounded-3xl bg-ink-900/90 border border-teal-900/40 flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="flex items-center gap-1 text-saffron-400 mb-3">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-saffron-400" />
                    ))}
                  </div>
                  <p className="text-xs text-ink-200 italic leading-relaxed">&quot;{rev.comment}&quot;</p>
                </div>

                <div className="pt-4 mt-4 border-t border-ink-800 flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-teal-500">
                    <Image src={rev.authorAvatar} alt={rev.authorName} fill className="object-cover" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">{rev.authorName}</h5>
                    <span className="text-[10px] text-ink-300">{rev.authorLocation} • {rev.tourTitle}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. FAQ Accordion */}
      <section className="py-20 bg-ink-950 border-t border-teal-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Got Questions?"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know before booking your trip with VedicVibe"
            centered
          />

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;

              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-ink-900/80 border border-teal-900/40 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left font-serif text-sm font-semibold text-white flex items-center justify-between gap-4"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-teal-400 shrink-0 transform transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-ink-300 font-sans leading-relaxed border-t border-ink-800/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 12. Final CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-teal-950 via-teal-900 to-ink-900 border-t border-teal-700/40 text-white relative">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl font-serif font-bold leading-tight">
            Ready for Your Next Unforgettable Indian Journey?
          </h2>
          <p className="text-xs sm:text-base text-sand-200 max-w-2xl mx-auto font-sans">
            Talk to our AI WhatsApp travel assistant or browse 50+ all-inclusive packages today.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap pt-2">
            <button
              onClick={() => setWhatsAppWidgetOpen(true)}
              className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center gap-2 shadow-xl"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Chat with AI Agent on WhatsApp</span>
            </button>

            <Link
              href="/tours"
              className="px-6 py-3.5 rounded-2xl bg-teal-700 hover:bg-teal-600 text-white font-bold text-sm flex items-center gap-2 shadow-xl"
            >
              <span>Explore All Tours</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
