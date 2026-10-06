'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { brandConfig } from '@/config/brand';
import {
  LayoutDashboard, Calendar, Users, Compass, MapPin, Building,
  Truck, FileText, DollarSign, Tag, Star, Settings, MessageSquare,
  Search, Bell, Shield, LogOut, Menu, X, CheckSquare
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const adminNav = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'WhatsApp Inbox', href: '/admin/whatsapp', icon: MessageSquare, badge: 'AI Live' },
    { name: 'Bookings', href: '/admin/bookings', icon: Calendar },
    { name: 'Enquiries', href: '/admin/enquiries', icon: FileText },
    { name: 'Quotations', href: '/admin/quotations', icon: DollarSign },
    { name: 'Departures', href: '/admin/departures', icon: CheckSquare },
    { name: 'Tours', href: '/admin/tours', icon: Compass },
    { name: 'Destinations', href: '/admin/destinations', icon: MapPin },
    { name: 'Hotels', href: '/admin/hotels', icon: Building },
    { name: 'Vehicles', href: '/admin/vehicles', icon: Truck },
    { name: 'Customers', href: '/admin/customers', icon: Users },
    { name: 'Coupons', href: '/admin/coupons', icon: Tag },
    { name: 'Staff & Roles', href: '/admin/staff', icon: Shield },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-ink-950 text-white font-sans overflow-hidden">
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-ink-900 border-r border-teal-900/40 shrink-0">
        <div className="p-5 border-b border-ink-800 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-700 flex items-center justify-center font-bold text-white text-xs">
              VV
            </div>
            <div>
              <span className="font-serif font-bold text-sm text-white block">{brandConfig.shortName} Admin</span>
              <span className="text-[10px] text-teal-400 uppercase tracking-widest font-mono">Control Panel</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {adminNav.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                  active
                    ? 'bg-teal-700 text-white font-semibold shadow'
                    : 'text-ink-300 hover:text-white hover:bg-ink-950'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-teal-400" />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-[10px] font-bold border border-emerald-800">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-ink-800 flex items-center justify-between text-xs text-ink-300">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-teal-950 flex items-center justify-center text-teal-300 font-bold">
              SA
            </div>
            <div>
              <span className="font-semibold text-white block">Super Admin</span>
              <span className="text-[10px] text-ink-300">admin@vedicvibe.in</span>
            </div>
          </div>
          <Link href="/" title="Exit to Website" className="hover:text-red-400">
            <LogOut className="w-4 h-4" />
          </Link>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-ink-900/90 border-b border-teal-900/40 px-4 sm:px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 text-ink-300 hover:text-white lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider hidden sm:block">
              {adminNav.find((n) => n.href === pathname)?.name || 'Admin Management'}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-3 py-1.5 rounded-xl bg-ink-950 border border-teal-900 text-teal-300 text-xs font-medium hover:text-white"
            >
              ← Public Site
            </Link>
            <div className="p-2 rounded-xl bg-ink-950 border border-teal-900 text-ink-300 relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-saffron-500" />
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-ink-950">
          {children}
        </main>
      </div>
    </div>
  );
}
