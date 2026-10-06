'use client';

import React from 'react';
import Link from 'next/link';
import { mockAdminBookings, mockAdminEnquiries } from '@/data/adminMockData';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Calendar, DollarSign, Users, MessageSquare, AlertCircle, TrendingUp, CheckCircle2 } from 'lucide-react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, AreaChart, Area
} from 'recharts';

export default function AdminDashboardPage() {
  const chartData = [
    { month: 'Jun', revenue: 450000, bookings: 32 },
    { month: 'Jul', revenue: 580000, bookings: 45 },
    { month: 'Aug', revenue: 620000, bookings: 48 },
    { month: 'Sep', revenue: 780000, bookings: 56 },
    { month: 'Oct', revenue: 950000, bookings: 72 },
  ];

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-serif font-bold text-white">Operations & Revenue Dashboard</h1>
        <p className="text-xs text-ink-300">Live booking performance, departure seats filled, and incoming WhatsApp leads</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-ink-900 border border-teal-900/40 space-y-2">
          <div className="flex justify-between items-center text-xs text-ink-300">
            <span>Today&apos;s Revenue</span>
            <DollarSign className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-2xl font-bold text-teal-300">₹1,48,990</div>
          <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +18.4% from yesterday
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-ink-900 border border-teal-900/40 space-y-2">
          <div className="flex justify-between items-center text-xs text-ink-300">
            <span>Active Bookings</span>
            <Calendar className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-2xl font-bold text-white">128</div>
          <span className="text-[10px] text-ink-300">14 pending confirmation</span>
        </div>

        <div className="p-5 rounded-2xl bg-ink-900 border border-teal-900/40 space-y-2">
          <div className="flex justify-between items-center text-xs text-ink-300">
            <span>WhatsApp AI Conversations</span>
            <MessageSquare className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400">42 Chats</div>
          <span className="text-[10px] text-emerald-300 font-semibold">92% AI Auto-Resolved</span>
        </div>

        <div className="p-5 rounded-2xl bg-ink-900 border border-teal-900/40 space-y-2">
          <div className="flex justify-between items-center text-xs text-ink-300">
            <span>New Enquiries</span>
            <AlertCircle className="w-4 h-4 text-saffron-400" />
          </div>
          <div className="text-2xl font-bold text-saffron-400">18 Leads</div>
          <span className="text-[10px] text-saffron-300">Quotation pending for 5</span>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 p-6 rounded-3xl bg-ink-900 border border-teal-900/40 space-y-4">
          <h3 className="text-base font-serif font-bold text-white">Monthly Revenue Trend (INR)</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14A3A8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#14A3A8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#5A6363" fontSize={12} />
                <YAxis stroke="#5A6363" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#0E1111', borderColor: '#14A3A8' }} />
                <Area type="monotone" dataKey="revenue" stroke="#14A3A8" fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 p-6 rounded-3xl bg-ink-900 border border-teal-900/40 space-y-4">
          <h3 className="text-base font-serif font-bold text-white">Bookings Volume</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="month" stroke="#5A6363" fontSize={12} />
                <YAxis stroke="#5A6363" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#0E1111', borderColor: '#F59E0B' }} />
                <Bar dataKey="bookings" fill="#F59E0B" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="rounded-3xl bg-ink-900 border border-teal-900/40 overflow-hidden space-y-4">
        <div className="p-6 border-b border-ink-800 flex items-center justify-between">
          <h3 className="text-base font-serif font-bold text-white">Recent Customer Bookings</h3>
          <Link href="/admin/bookings" className="text-xs text-teal-400 font-semibold hover:underline">
            View All Bookings →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-ink-200">
            <thead className="bg-ink-950 text-ink-300 uppercase tracking-wider font-semibold border-b border-ink-800">
              <tr>
                <th className="p-4">Booking ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Tour Title</th>
                <th className="p-4">Departure Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Total Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-800">
              {mockAdminBookings.map((b) => (
                <tr key={b.id} className="hover:bg-ink-950/60 transition-colors">
                  <td className="p-4 font-mono font-bold text-saffron-400">{b.bookingCode}</td>
                  <td className="p-4 font-semibold text-white">{b.customerName}</td>
                  <td className="p-4 text-ink-300">{b.tourTitle}</td>
                  <td className="p-4">{formatDate(b.departureDate)}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                      {b.status}
                    </span>
                  </td>
                  <td className="p-4 text-right font-bold text-white">{formatCurrency(b.totalAmount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
