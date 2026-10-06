'use client';

import React from 'react';
import Link from 'next/link';
import { mockDepartures } from '@/data/departures';
import { SeatProgressBar } from '@/components/ui/SeatProgressBar';
import { Calendar, ArrowRight, Flame } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';

export function UpcomingDeparturesTicker() {
  return (
    <section className="py-12 bg-gradient-to-r from-ink-950 via-teal-950 to-ink-950 border-y border-teal-900/40 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-saffron-950 border border-saffron-600/40 text-saffron-400">
              <Flame className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-white">Upcoming Guaranteed Departures</h3>
              <p className="text-xs text-ink-300">Live seat count updated real-time • Instant confirmation</p>
            </div>
          </div>

          <Link
            href="/tours"
            className="text-xs font-semibold text-teal-400 hover:text-teal-300 flex items-center gap-1"
          >
            <span>View All Fixed Departures</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Departure Rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockDepartures.slice(0, 6).map((dep) => (
            <div
              key={dep.id}
              className="p-4 rounded-2xl bg-ink-900/90 border border-teal-900/40 hover:border-teal-700/60 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-teal-400 font-medium mb-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(dep.departureDate)}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-teal-950 border border-teal-800 text-[10px] text-teal-300">
                    {dep.destinationName}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white line-clamp-1">{dep.tourTitle}</h4>

                <div className="mt-3">
                  <SeatProgressBar totalSeats={dep.totalSeats} bookedSeats={dep.bookedSeats} />
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-ink-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-ink-300">Fixed Rate</span>
                  <span className="text-sm font-bold text-white block">{formatCurrency(dep.pricePerPerson)}</span>
                </div>

                <Link
                  href={`/booking?tourId=${dep.tourId}&departureId=${dep.id}`}
                  className="px-3.5 py-1.5 rounded-xl bg-teal-700 hover:bg-teal-600 text-white text-xs font-semibold shadow"
                >
                  Book Seat
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
