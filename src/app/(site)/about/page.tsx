'use client';

import React from 'react';
import Image from 'next/image';
import { brandConfig } from '@/config/brand';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Compass, Award, ShieldCheck, Heart, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20 bg-ink-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <SectionHeader
          badge="Our Story"
          title={`About ${brandConfig.name}`}
          subtitle={brandConfig.subTagline}
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-ink-900/90 border border-teal-700/40 rounded-3xl p-8 shadow-2xl">
          <div className="md:col-span-6 space-y-4">
            <h3 className="text-2xl font-serif text-white font-bold">14+ Years of Crafting Memorable Indian Holidays</h3>
            <p className="text-xs sm:text-sm text-ink-300 leading-relaxed">
              Founded in {brandConfig.establishedYear}, {brandConfig.name} was established with a singular mission: to eliminate hidden costs, sub-standard hotels, and unpunctual drivers from Indian tourism.
            </p>
            <p className="text-xs sm:text-sm text-ink-300 leading-relaxed">
              Today, our team of 45+ travel experts manages everything from luxury beachfront resorts in Goa to sacred VIP Ram Lalla Darshan yatras in Ayodhya & Kashi.
            </p>
          </div>

          <div className="md:col-span-6 relative h-72 rounded-2xl overflow-hidden">
            <Image src="https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=800" alt="About Team" fill className="object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}
