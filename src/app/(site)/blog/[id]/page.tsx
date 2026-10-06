'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { mockArticles } from '@/data/tours';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function BlogArticlePage() {
  const params = useParams();
  const { addToast } = useApp();
  const artId = (params?.id as string) || mockArticles[0].id;
  const article = mockArticles.find((a) => a.id === artId) || mockArticles[0];

  return (
    <div className="pt-28 pb-20 bg-ink-950 text-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs text-teal-400 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Blog List
        </Link>

        <div className="space-y-3">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-teal-950 text-teal-300 border border-teal-800">
            {article.category}
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif text-white font-bold leading-tight">{article.title}</h1>
          <div className="flex items-center gap-4 text-xs text-ink-300 pt-1">
            <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-teal-400" /> By {article.author}</span>
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-teal-400" /> Published {article.date}</span>
          </div>
        </div>

        <div className="relative w-full h-80 sm:h-96 rounded-3xl overflow-hidden shadow-2xl">
          <Image src={article.image} alt={article.title} fill className="object-cover" />
        </div>

        <div className="p-6 sm:p-10 rounded-3xl bg-ink-900/90 border border-teal-900/40 text-xs sm:text-sm text-ink-200 leading-relaxed space-y-4">
          <p className="font-semibold text-white text-base">{article.excerpt}</p>
          <p>
            Planning a trip to {article.category === 'Spiritual' ? 'Ayodhya' : 'Goa'} requires careful preparation regarding hotel bookings and local transport. Always ensure you carry your physical Govt Photo ID and book VIP slot passes early.
          </p>
          <p>
            At VedicVibe Tours & Travels, our travel concierges assist you with 24/7 on-ground support, luxury transport options, and verified 4-star hotels.
          </p>
        </div>
      </div>
    </div>
  );
}
