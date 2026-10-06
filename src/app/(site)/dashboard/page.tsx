'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { mockAdminBookings } from '@/data/adminMockData';
import { Booking } from '@/types';
import { formatCurrency, formatDate } from '@/lib/utils';
import { useApp } from '@/context/AppContext';
import { Ticket, Calendar, DollarSign, X, CheckCircle2, Compass, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CustomerDashboardPage() {
  const [bookings, setBookings] = useState<Booking[]>(mockAdminBookings);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [cancelDialogBooking, setCancelDialogBooking] = useState<Booking | null>(null);

  const { addToast } = useApp();

  const handleConfirmCancel = () => {
    if (!cancelDialogBooking) return;
    setBookings((prev) =>
      prev.map((b) => (b.id === cancelDialogBooking.id ? { ...b, status: 'Cancelled' as const } : b))
    );
    addToast({
      title: 'Booking Cancelled',
      description: `Refund request initiated for ${cancelDialogBooking.bookingCode}.`,
      type: 'info',
    });
    setCancelDialogBooking(null);
  };

  return (
    <div className="pt-28 pb-20 bg-ink-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-ink-800 pb-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-teal-400 font-semibold">Customer Portal</span>
            <h1 className="text-3xl font-serif text-white font-bold">My Bookings & Travel Passes</h1>
          </div>
          <Link
            href="/tours"
            className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-600 text-white text-xs font-bold shadow"
          >
            + Book New Tour
          </Link>
        </div>

        {/* Overview KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-ink-900 border border-teal-900/40 space-y-1">
            <span className="text-xs text-ink-300">Total Bookings</span>
            <div className="text-3xl font-bold text-white">{bookings.length}</div>
          </div>
          <div className="p-5 rounded-2xl bg-ink-900 border border-teal-900/40 space-y-1">
            <span className="text-xs text-ink-300">Active Upcoming Trips</span>
            <div className="text-3xl font-bold text-teal-300">
              {bookings.filter((b) => b.status === 'Confirmed').length}
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-ink-900 border border-teal-900/40 space-y-1">
            <span className="text-xs text-ink-300">Total Spent</span>
            <div className="text-3xl font-bold text-saffron-400">
              {formatCurrency(bookings.reduce((acc, b) => acc + b.paidAmount, 0))}
            </div>
          </div>
        </div>

        {/* Bookings Data Table */}
        <div className="rounded-3xl bg-ink-900 border border-teal-900/40 overflow-hidden shadow-2xl">
          <div className="p-5 border-b border-ink-800">
            <h3 className="text-lg font-serif font-bold text-white">Your Reservations</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-ink-200">
              <thead className="bg-ink-950 text-ink-300 uppercase tracking-wider font-semibold border-b border-ink-800">
                <tr>
                  <th className="p-4">Booking ID</th>
                  <th className="p-4">Tour Name</th>
                  <th className="p-4">Departure Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Amount Paid</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-800">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-ink-950/60 transition-colors">
                    <td className="p-4 font-mono font-bold text-saffron-400">{b.bookingCode}</td>
                    <td className="p-4 font-semibold text-white">{b.tourTitle}</td>
                    <td className="p-4">{formatDate(b.departureDate)}</td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          b.status === 'Confirmed'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-700'
                            : b.status === 'Pending'
                            ? 'bg-saffron-950 text-saffron-400 border border-saffron-700'
                            : 'bg-red-950 text-red-400 border border-red-700'
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-white">{formatCurrency(b.paidAmount)}</td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => setSelectedBooking(b)}
                        className="px-3 py-1.5 rounded-lg bg-teal-700 hover:bg-teal-600 text-white text-[11px] font-semibold"
                      >
                        View Voucher 🎫
                      </button>
                      {b.status === 'Confirmed' && (
                        <button
                          onClick={() => setCancelDialogBooking(b)}
                          className="px-3 py-1.5 rounded-lg bg-red-950 border border-red-800 text-red-400 hover:bg-red-900 text-[11px] font-semibold"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Cancel Confirmation Dialog */}
      <AnimatePresence>
        {cancelDialogBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-ink-900 border border-red-700/60 rounded-3xl p-6 max-w-md w-full space-y-4 text-white shadow-2xl"
            >
              <div className="flex items-center gap-3 text-red-400">
                <AlertTriangle className="w-8 h-8 shrink-0" />
                <h3 className="text-xl font-serif font-bold">Cancel Reservation?</h3>
              </div>
              <p className="text-xs text-ink-300 leading-relaxed">
                Are you sure you want to cancel booking <strong className="text-white">{cancelDialogBooking.bookingCode}</strong> for {cancelDialogBooking.tourTitle}? 100% refund will be credited back to your payment account within 3 business days.
              </p>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setCancelDialogBooking(null)}
                  className="w-1/2 py-2.5 rounded-xl bg-ink-800 text-ink-300 text-xs font-semibold"
                >
                  Keep Booking
                </button>
                <button
                  onClick={handleConfirmCancel}
                  className="w-1/2 py-2.5 rounded-xl bg-red-700 hover:bg-red-600 text-white text-xs font-bold"
                >
                  Yes, Confirm Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
