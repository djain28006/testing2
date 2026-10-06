'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  actionText?: string;
  actionHref?: string;
  centered?: boolean;
}

export function SectionHeader({ badge, title, subtitle, actionText, actionHref, centered = false }: SectionHeaderProps) {
  return (
    <div className={`flex flex-col ${centered ? 'items-center text-center' : 'items-start text-left'} justify-between gap-4 mb-10 md:mb-14`}>
      <div className="max-w-2xl">
        {badge && (
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-teal-900/60 border border-teal-700/40 text-teal-400 mb-3">
            {badge}
          </span>
        )}
        <h2 className="text-3xl md:text-5xl font-serif text-white font-normal leading-tight tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm md:text-base text-ink-300 mt-3 font-sans leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {actionText && actionHref && (
        <Link
          href={actionHref}
          className="inline-flex items-center gap-2 text-sm font-semibold text-teal-400 hover:text-teal-300 group transition-colors mt-2"
        >
          <span>{actionText}</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
}
