'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { X, ZoomIn } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function GalleryPage() {
  const images = [
    { url: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800', title: 'Goa Sunset Beach', location: 'Goa' },
    { url: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=800', title: 'Ganga Evening Aarti', location: 'Varanasi' },
    { url: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=80&w=800', title: 'Dal Lake Houseboat', location: 'Kashmir' },
    { url: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=800', title: 'Amber Fort Jaipur', location: 'Rajasthan' },
    { url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800', title: 'Tiger Point Fog', location: 'Lonavala' },
    { url: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?q=80&w=800', title: 'Shirdi Temple Corridor', location: 'Shirdi' },
  ];

  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <div className="pt-28 pb-20 bg-ink-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <SectionHeader
          badge="Ref 1 • Visual Storytelling"
          title="Masonry Photo Gallery & Moments"
          subtitle="Glimpses of happy travellers across India's most breathtaking landscapes"
          centered
        />

        <AnimatePresence>
          {lightbox && (
            <div className="fixed inset-0 z-50 bg-ink-950/90 backdrop-blur-md flex items-center justify-center p-4">
              <div className="relative w-full max-w-4xl h-[70vh]">
                <Image src={lightbox} alt="Enlarged gallery view" fill className="object-contain" />
                <button
                  onClick={() => setLightbox(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-ink-900 text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
          )}
        </AnimatePresence>

        <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
          {images.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setLightbox(img.url)}
              className="relative rounded-2xl overflow-hidden cursor-pointer group border border-teal-900/40"
            >
              <Image src={img.url} alt={img.title} width={600} height={400} className="w-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-ink-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <span className="text-xs font-bold text-white">{img.title}</span>
                <span className="text-[10px] text-teal-400">{img.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
