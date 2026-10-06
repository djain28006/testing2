'use client';

import React, { useState } from 'react';
import { brandConfig } from '@/config/brand';
import { formatCurrency } from '@/lib/utils';
import { Users, Share2, Calculator, MessageSquare } from 'lucide-react';

interface SplitCostCalculatorProps {
  basePrice?: number;
  tourTitle?: string;
}

export function SplitCostCalculator({
  basePrice = 8999,
  tourTitle = 'Goa 3D2N Escape',
}: SplitCostCalculatorProps) {
  const [friendsCount, setFriendsCount] = useState<number>(4);

  // Group discounts: 4+ friends gets 5% off, 8+ friends gets 10% off
  let discountPct = 0;
  if (friendsCount >= 8) discountPct = 10;
  else if (friendsCount >= 4) discountPct = 5;

  const totalBeforeDiscount = basePrice * friendsCount;
  const discountAmount = Math.round(totalBeforeDiscount * (discountPct / 100));
  const finalTotal = totalBeforeDiscount - discountAmount;
  const perPersonPrice = Math.round(finalTotal / friendsCount);

  const whatsappMessage = encodeURIComponent(
    `Hey guys! Let's plan a trip to ${tourTitle}! Total for ${friendsCount} friends is ${formatCurrency(
      finalTotal
    )} (${formatCurrency(perPersonPrice)} per person after ${discountPct}% group discount). Check it out on ${brandConfig.name}!`
  );

  return (
    <div className="rounded-2xl bg-ink-900 border border-teal-700/40 p-5 md:p-6 text-white space-y-4 shadow-xl">
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-xl bg-teal-950 border border-teal-800 text-teal-400">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-base font-bold font-serif text-white">Split-The-Cost Calculator</h4>
          <p className="text-xs text-ink-300">Calculate per-person cost & unlock group discounts</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="text-ink-300 font-semibold flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-teal-400" /> Number of Friends Travelling
          </span>
          <span className="font-bold text-teal-300 text-sm">{friendsCount} People</span>
        </div>
        <input
          type="range"
          min={2}
          max={16}
          step={1}
          value={friendsCount}
          onChange={(e) => setFriendsCount(Number(e.target.value))}
          className="w-full accent-teal-400 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-ink-300">
          <span>2 Friends</span>
          <span>8 Friends (10% OFF)</span>
          <span>16 Friends</span>
        </div>
      </div>

      <div className="p-3.5 rounded-xl bg-ink-950 border border-teal-950 space-y-2 text-xs">
        <div className="flex justify-between text-ink-300">
          <span>Package Base Price per person</span>
          <span>{formatCurrency(basePrice)}</span>
        </div>
        {discountPct > 0 && (
          <div className="flex justify-between text-saffron-400 font-semibold">
            <span>Group Discount ({discountPct}% OFF)</span>
            <span>-{formatCurrency(discountAmount)}</span>
          </div>
        )}
        <div className="flex justify-between items-baseline font-bold text-white pt-2 border-t border-ink-800">
          <span>Final Cost per Person</span>
          <span className="text-xl text-teal-300">{formatCurrency(perPersonPrice)}</span>
        </div>
      </div>

      <a
        href={`https://wa.me/?text=${whatsappMessage}`}
        target="_blank"
        rel="noreferrer"
        className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow"
      >
        <MessageSquare className="w-4 h-4" />
        <span>Share Split Quote on WhatsApp Group</span>
      </a>
    </div>
  );
}
