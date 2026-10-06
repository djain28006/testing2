'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { brandConfig } from '@/config/brand';
import { useApp } from '@/context/AppContext';
import { Compass, Mail, Phone, MapPin, Send, ShieldCheck, Headphones, BadgePercent, Heart } from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const { addToast } = useApp();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    addToast({
      title: 'Subscribed to VIP Travel Deals! 📩',
      description: `We have sent a welcome discount coupon to ${email}`,
      type: 'success',
    });
    setEmail('');
  };

  return (
    <footer className="relative bg-ink-950 text-white border-t border-teal-900/40 pt-16 pb-24 md:pb-16 overflow-hidden">
      {/* Wave / Mist Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-48 bg-teal-900/10 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Newsletter Wave Box (Ref 1 Style) */}
        <div className="relative rounded-3xl bg-gradient-to-r from-teal-950 via-teal-900 to-ink-900 border border-teal-700/40 p-8 md:p-12 mb-16 shadow-2xl overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800')] bg-cover opacity-15 mix-blend-overlay hidden md:block" />

          <div className="max-w-2xl relative z-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-teal-400">Exclusive Travel Club</span>
            <h3 className="text-2xl md:text-4xl font-serif text-white mt-1">Get Secret Deals & Weekend Getaway Drops</h3>
            <p className="text-xs md:text-sm text-ink-300 mt-2 font-sans">
              Subscribe to get ₹1,000 off discount codes, upcoming departure alerts, and curated itineraries.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 mt-6">
              <div className="relative flex-1">
                <Mail className="w-5 h-5 text-ink-300 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  required
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-ink-950/80 border border-teal-700/40 text-white placeholder-ink-300 text-sm focus:outline-none focus:border-teal-400 transition-colors"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3.5 rounded-2xl bg-teal-700 hover:bg-teal-600 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-teal-900/50 shrink-0"
              >
                <span>Subscribe</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* 4 Feature Pills */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 border-b border-ink-800/80 pb-12">
          {brandConfig.features.map((feat, idx) => (
            <div key={idx} className="flex items-start gap-3 p-4 rounded-2xl bg-ink-900/60 border border-teal-950">
              <div className="w-10 h-10 rounded-xl bg-teal-950 border border-teal-800/40 flex items-center justify-center text-teal-400 shrink-0">
                {idx === 0 && <Headphones className="w-5 h-5" />}
                {idx === 1 && <ShieldCheck className="w-5 h-5" />}
                {idx === 2 && <BadgePercent className="w-5 h-5" />}
                {idx === 3 && <Compass className="w-5 h-5" />}
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">{feat.title}</h4>
                <p className="text-xs text-ink-300 mt-0.5">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Footer Links Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-teal-700 flex items-center justify-center text-white">
                <Compass className="w-5 h-5" />
              </div>
              <span className="font-serif text-2xl font-bold text-white">{brandConfig.name}</span>
            </Link>
            <p className="text-xs text-ink-300 leading-relaxed mb-4 max-w-sm">
              {brandConfig.subTagline}. Crafting unforgettable journeys across Goa, Rajasthan, Kashmir, Kerala, and sacred Pilgrimage centers with zero hidden costs.
            </p>
            <div className="space-y-2 text-xs text-ink-300 font-sans">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0" />
                <span>{brandConfig.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <span>{brandConfig.phone} / {brandConfig.altPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span>{brandConfig.email}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-l-2 border-teal-500 pl-2">
              Popular Tours
            </h4>
            <ul className="space-y-2.5 text-xs text-ink-300">
              <li><Link href="/tours/goa-fun-escape" className="hover:text-teal-400 transition-colors">Goa 3D2N Beach Escape</Link></li>
              <li><Link href="/tours/ayodhya-kashi-divine" className="hover:text-teal-400 transition-colors">Ayodhya Ram Mandir & Kashi Yatra</Link></li>
              <li><Link href="/tours/rajasthan-royal-heritage" className="hover:text-teal-400 transition-colors">Rajasthan Royal Palaces</Link></li>
              <li><Link href="/tours/kashmir-paradise-sojourn" className="hover:text-teal-400 transition-colors">Kashmir Dal Lake Houseboat Tour</Link></li>
              <li><Link href="/tours/shirdi-sai-blessings" className="hover:text-teal-400 transition-colors">Shirdi Sai VIP Darshan</Link></li>
              <li><Link href="/pilgrimage" className="hover:text-saffron-400 transition-colors font-semibold">🚩 All Pilgrimage Packages</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-l-2 border-teal-500 pl-2">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-ink-300">
              <li><Link href="/rentals" className="hover:text-teal-400 transition-colors">Car & Bus Rentals</Link></li>
              <li><Link href="/airport-transfer" className="hover:text-teal-400 transition-colors">Airport Transfers</Link></li>
              <li><Link href="/hotels" className="hover:text-teal-400 transition-colors">Handpicked Hotels</Link></li>
              <li><Link href="/custom-tours" className="hover:text-teal-400 transition-colors">Plan My Trip (Custom)</Link></li>
              <li><Link href="/dashboard" className="hover:text-teal-400 transition-colors">Customer Dashboard</Link></li>
              <li><Link href="/admin" className="hover:text-saffron-400 transition-colors font-semibold">💼 Admin Panel</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-l-2 border-teal-500 pl-2">
              Legal & Credentials
            </h4>
            <div className="space-y-2 text-xs text-ink-300">
              <p><strong className="text-white">GSTIN:</strong> {brandConfig.gstin}</p>
              <p><strong className="text-white">Licence No:</strong> {brandConfig.licenseNo}</p>
              <p className="mt-2 text-[11px] leading-relaxed">
                Registered Tour Operator under Maharashtra Tourism Department.
              </p>
              <div className="pt-2 flex flex-col gap-1 text-[11px]">
                <Link href="/terms" className="hover:underline text-ink-300">Terms & Conditions</Link>
                <Link href="/privacy" className="hover:underline text-ink-300">Privacy Policy</Link>
                <Link href="/cancellation" className="hover:underline text-ink-300">Cancellation & Refund Policy</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-ink-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-300">
          <p>© {new Date().getFullYear()} {brandConfig.name}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" /> for Indian Travellers.
          </p>
        </div>
      </div>
    </footer>
  );
}
