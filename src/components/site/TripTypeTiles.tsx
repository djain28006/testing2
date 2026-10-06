'use client';

import React from 'react';
import Link from 'next/link';
import { TourCategory } from '@/types';
import { Sun, CalendarDays, Users, Flame, Landmark, Compass, Briefcase, GraduationCap } from 'lucide-react';

interface Tile {
  title: TourCategory;
  count: string;
  icon: React.ReactNode;
}

export function TripTypeTiles() {
  const tiles: Tile[] = [
    { title: 'One Day', count: '12+ Packages', icon: <Sun className="w-6 h-6 text-saffron-400" /> },
    { title: 'Weekend', count: '24+ Getaways', icon: <CalendarDays className="w-6 h-6 text-teal-400" /> },
    { title: 'Family', count: '30+ Resorts', icon: <Users className="w-6 h-6 text-teal-400" /> },
    { title: 'Group', count: '18+ Treks', icon: <Flame className="w-6 h-6 text-saffron-400" /> },
    { title: 'Pilgrimage', count: '40+ Holy Yatras', icon: <Landmark className="w-6 h-6 text-saffron-400" /> },
    { title: 'Adventure', count: '15+ Expeditions', icon: <Compass className="w-6 h-6 text-teal-400" /> },
    { title: 'Corporate', count: 'MICE & Offsites', icon: <Briefcase className="w-6 h-6 text-teal-400" /> },
    { title: 'School/College', count: 'Study Tours', icon: <GraduationCap className="w-6 h-6 text-teal-400" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-xs font-semibold uppercase tracking-widest text-teal-400">Curated Experiences</span>
        <h2 className="text-3xl md:text-4xl font-serif text-white mt-1">What Type of Trip Are You Looking For?</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3.5">
        {tiles.map((tile) => (
          <Link
            key={tile.title}
            href={`/tours?category=${encodeURIComponent(tile.title)}`}
            className="group flex flex-col items-center justify-center p-4 rounded-2xl bg-ink-900/80 border border-teal-900/40 hover:border-teal-500/80 hover:bg-teal-950/60 transition-all duration-300 text-center hover:-translate-y-1 shadow-lg"
          >
            <div className="p-3 rounded-2xl bg-ink-950 border border-teal-900/60 group-hover:scale-110 transition-transform mb-2">
              {tile.icon}
            </div>
            <h4 className="text-xs font-bold text-white group-hover:text-teal-300 transition-colors">{tile.title}</h4>
            <span className="text-[10px] text-ink-300 mt-0.5">{tile.count}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
