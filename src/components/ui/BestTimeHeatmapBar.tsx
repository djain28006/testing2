'use client';

import React from 'react';
import { BestTimeHeatmap } from '@/types';
import { Sun, CloudRain, Flame } from 'lucide-react';

interface BestTimeHeatmapBarProps {
  heatmap: BestTimeHeatmap[];
}

export function BestTimeHeatmapBar({ heatmap }: BestTimeHeatmapBarProps) {
  return (
    <div className="w-full bg-ink-900/80 border border-teal-900/40 rounded-2xl p-4 md:p-6 backdrop-blur-md">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-base font-semibold text-white">Best Time to Visit - 12 Month Climate Heatmap</h4>
          <p className="text-xs text-ink-300">Hover or tap on any month to inspect weather and temperature</p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5 text-teal-400">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500 inline-block" /> Best Season
          </span>
          <span className="flex items-center gap-1.5 text-saffron-400">
            <span className="w-2.5 h-2.5 rounded-full bg-saffron-500 inline-block" /> Moderate
          </span>
          <span className="flex items-center gap-1.5 text-ink-300">
            <span className="w-2.5 h-2.5 rounded-full bg-ink-700 inline-block" /> Off Season
          </span>
        </div>
      </div>

      <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5 md:gap-2">
        {heatmap.map((item) => {
          let bg = 'bg-ink-800 text-ink-300 border-ink-700';
          let icon = <Sun className="w-3.5 h-3.5 text-ink-300" />;

          if (item.status === 'great') {
            bg = 'bg-teal-900/80 text-teal-300 border-teal-600/50 hover:bg-teal-800';
            icon = <Sun className="w-3.5 h-3.5 text-teal-400" />;
          } else if (item.status === 'okay') {
            bg = 'bg-saffron-950/80 text-saffron-300 border-saffron-700/50 hover:bg-saffron-900';
            icon = <CloudRain className="w-3.5 h-3.5 text-saffron-400" />;
          } else {
            icon = <Flame className="w-3.5 h-3.5 text-red-400" />;
          }

          return (
            <div
              key={item.month}
              className={`group relative flex flex-col items-center justify-center p-2.5 rounded-xl border text-center cursor-pointer transition-all ${bg}`}
            >
              <span className="text-xs font-semibold">{item.month}</span>
              <div className="my-1">{icon}</div>
              <span className="text-[10px] opacity-80">{item.temp}</span>

              {/* Tooltip on hover */}
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block w-32 bg-ink-950 text-white text-[11px] p-2 rounded-lg border border-teal-700/40 shadow-xl z-20 pointer-events-none">
                <p className="font-semibold">{item.month}: {item.temp}</p>
                <p className="text-ink-300 text-[10px] mt-0.5">{item.weather}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
