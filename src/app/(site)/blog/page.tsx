'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { mockArticles } from '@/data/tours';
import { Calendar, User, ArrowRight } from 'lucide-react';

export default function BlogListingPage() {
  return (
    <div className="pt-28 pb-20 bg-ink-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <SectionHeader
          badge="Travel Journal & Guides"
          title="Insider Travel Advice & Itineraries"
          subtitle="Tips, temple guidelines, packing lists, and best places to eat written by local experts"
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockArticles.map((art) => (
            <Link
              key={art.id}
              href={`/blog/${art.id}`}
              className="group p-5 rounded-3xl bg-ink-900/90 border border-teal-900/40 hover:border-teal-500/60 transition-all flex flex-col justify-between shadow-xl"
            >
              <div className="space-y-3">
                <div className="relative w-full h-48 rounded-2xl overflow-hidden">
                  <Image src={art.image} alt={art.title} fill className="object-cover group-hover:scale-105 transition-transform" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-teal-950 text-teal-300 border border-teal-700">
                    {art.category}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-[11px] text-ink-300">
                  <span className="flex items-center gap-1"><User className="w-3 h-3 text-teal-400" /> {art.author}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-teal-400" /> {art.date}</span>
                </div>

                <h3 className="text-lg font-serif font-bold text-white group-hover:text-teal-300 transition-colors line-clamp-2">
                  {art.title}
                </h3>
                <p className="text-xs text-ink-300 line-clamp-2">{art.excerpt}</p>
              </div>

              <div className="pt-4 mt-4 border-t border-ink-800 flex items-center justify-between text-xs font-semibold text-teal-400">
                <span>Read Full Article</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
