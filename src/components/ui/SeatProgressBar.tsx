'use client';

import React from 'react';

interface SeatProgressBarProps {
  totalSeats: number;
  bookedSeats: number;
  className?: string;
}

export function SeatProgressBar({ totalSeats, bookedSeats, className = '' }: SeatProgressBarProps) {
  const seatsLeft = Math.max(0, totalSeats - bookedSeats);
  const percentage = Math.min(100, Math.round((bookedSeats / totalSeats) * 100));

  let barColor = 'bg-teal-500';
  let badgeColor = 'text-teal-400 bg-teal-950/80 border-teal-800/60';

  if (seatsLeft <= 5) {
    barColor = 'bg-red-500 animate-pulse';
    badgeColor = 'text-red-400 bg-red-950/80 border-red-800/60';
  } else if (seatsLeft <= 12) {
    barColor = 'bg-saffron-500';
    badgeColor = 'text-saffron-400 bg-saffron-950/80 border-saffron-800/60';
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between text-xs mb-1.5 font-sans">
        <span className="text-ink-300">Seats Capacity ({bookedSeats}/{totalSeats} filled)</span>
        <span className={`px-2 py-0.5 rounded-md text-[11px] font-semibold border ${badgeColor}`}>
          {seatsLeft === 0 ? 'SOLD OUT' : `Only ${seatsLeft} seats left!`}
        </span>
      </div>
      <div className="w-full h-2 bg-ink-800 rounded-full overflow-hidden">
        <div
          className={`h-full ${barColor} transition-all duration-500 rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
