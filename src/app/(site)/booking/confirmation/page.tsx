'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { brandConfig } from '@/config/brand';
import { formatCurrency } from '@/lib/utils';
import { CheckCircle2, Download, Printer, Share2, Compass, QrCode, Home, MessageSquare } from 'lucide-react';

export default function BookingConfirmationPage() {
  const bookingCode = 'VV-89210';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="pt-28 pb-20 bg-ink-950 text-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Animated Checkmark Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-emerald-950 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-2xl animate-pulse">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <span className="text-xs uppercase tracking-widest text-teal-400 font-semibold">Payment Received</span>
          <h1 className="text-3xl sm:text-4xl font-serif text-white font-bold">Booking Confirmed!</h1>
          <p className="text-xs sm:text-sm text-ink-300">
            We have sent your confirmation SMS & WhatsApp message with voucher PDF link to your phone.
          </p>
        </div>

        {/* Boarding Pass Ticket Voucher (Perforated Edge Style) */}
        <div className="relative rounded-3xl bg-gradient-to-b from-ink-900 to-ink-950 border border-teal-700/50 shadow-2xl overflow-hidden print:bg-white print:text-black">
          {/* Top Ticket Header */}
          <div className="bg-teal-950 border-b border-teal-800/60 p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-700 flex items-center justify-center text-white">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-white">{brandConfig.name}</h3>
                <p className="text-[10px] text-teal-400 uppercase tracking-widest font-semibold">Digital Travel Pass</p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-ink-300 block">Booking Reference</span>
              <span className="text-lg font-mono font-bold text-saffron-400">{bookingCode}</span>
            </div>
          </div>

          {/* Ticket Content Grid */}
          <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-4">
              <div>
                <span className="text-[10px] text-ink-300 uppercase tracking-wider block">Package Name</span>
                <h4 className="text-xl font-serif font-bold text-white">Goa Coastal Sun & Spice Escape</h4>
                <span className="text-xs text-teal-400">3 Days / 2 Nights • 4★ Beach Resort Stay</span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs pt-2 border-t border-ink-800/60">
                <div>
                  <span className="text-ink-300 block">Departure Date</span>
                  <strong className="text-white text-sm">15 Nov 2026</strong>
                </div>
                <div>
                  <span className="text-ink-300 block">Travellers</span>
                  <strong className="text-white text-sm">2 Adults</strong>
                </div>
                <div>
                  <span className="text-ink-300 block">Pickup Point</span>
                  <strong className="text-white text-sm">MOPA Airport (GOX)</strong>
                </div>
                <div>
                  <span className="text-ink-300 block">Total Paid</span>
                  <strong className="text-emerald-400 text-sm">₹17,998 (FULL)</strong>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-ink-300">
                <strong>Lead Passenger:</strong> Rahul Sharma (+91 98765 43210)
              </div>
            </div>

            {/* QR Code Placeholder on Right */}
            <div className="md:col-span-4 flex flex-col items-center justify-center p-4 rounded-2xl bg-ink-950 border border-teal-950 text-center">
              <div className="relative w-32 h-32 bg-white p-2 rounded-xl shadow mb-2">
                <Image
                  src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=VV-89210"
                  alt="Boarding Pass QR"
                  width={120}
                  height={120}
                />
              </div>
              <span className="text-[10px] text-ink-300">Scan at Driver/Hotel Boarding</span>
            </div>
          </div>

          {/* Perforated Edge Divider */}
          <div className="relative w-full h-4 bg-ink-950 border-y border-dashed border-teal-900/60 flex items-center justify-between px-2">
            <div className="w-4 h-4 rounded-full bg-ink-950 -ml-4 border border-teal-900" />
            <div className="w-4 h-4 rounded-full bg-ink-950 -mr-4 border border-teal-900" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 print:hidden">
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-600 text-white font-bold text-xs flex items-center gap-2 shadow-lg"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF Voucher</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl bg-ink-900 border border-teal-900/40 text-white hover:text-teal-400 font-semibold text-xs flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Invoice</span>
          </button>

          <Link
            href="/dashboard"
            className="px-5 py-2.5 rounded-xl bg-ink-900 border border-teal-900/40 text-white hover:text-teal-400 font-semibold text-xs flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Go to My Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
