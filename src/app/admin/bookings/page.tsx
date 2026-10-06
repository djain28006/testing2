'use client';

import React, { useState } from 'react';
import { mockAdminBookings, mockAdminEnquiries } from '@/data/adminMockData';
import { mockVehicles, mockHotels } from '@/data/hotels';
import { Booking } from '@/types';
import { formatCurrency, formatDate } from '@/lib/utils';
import { useApp } from '@/context/AppContext';
import { Search, Calendar, Truck, Building, Eye, CheckCircle2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>(mockAdminBookings);
  const [search, setSearch] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const { addToast } = useApp();

  const filtered = bookings.filter(
    (b) =>
      b.bookingCode.toLowerCase().includes(search.toLowerCase()) ||
      b.customerName.toLowerCase().includes(search.toLowerCase()) ||
      b.tourTitle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white">Bookings Management</h1>
          <p className="text-xs text-ink-300">Assign vehicles, hotels, record payments, and issue digital vouchers</p>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-ink-900 border border-teal-900/40 flex items-center gap-3 max-w-md">
        <Search className="w-4 h-4 text-ink-300" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by code or customer name..."
          className="w-full bg-transparent text-white text-xs focus:outline-none"
        />
      </div>

      <div className="rounded-3xl bg-ink-900 border border-teal-900/40 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-ink-200">
            <thead className="bg-ink-950 text-ink-300 uppercase tracking-wider font-semibold border-b border-ink-800">
              <tr>
                <th className="p-4">Booking ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Tour Title</th>
                <th className="p-4">Date</th>
                <th className="p-4">Vehicle Assigned</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-800">
              {filtered.map((b) => (
                <tr key={b.id} className="hover:bg-ink-950/60 transition-colors">
                  <td className="p-4 font-mono font-bold text-saffron-400">{b.bookingCode}</td>
                  <td className="p-4">
                    <span className="font-semibold text-white block">{b.customerName}</span>
                    <span className="text-[10px] text-ink-300">{b.customerPhone}</span>
                  </td>
                  <td className="p-4 font-medium text-white">{b.tourTitle}</td>
                  <td className="p-4">{formatDate(b.departureDate)}</td>
                  <td className="p-4 text-teal-300 font-semibold">{b.assignedVehicle || 'Unassigned'}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                      {b.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedBooking(b)}
                      className="px-3 py-1.5 rounded-xl bg-teal-700 hover:bg-teal-600 text-white font-semibold text-[11px]"
                    >
                      Assign Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assign Details Side Drawer */}
      <AnimatePresence>
        {selectedBooking && (
          <div className="fixed inset-0 z-50 flex justify-end bg-ink-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="w-full max-w-md bg-ink-900 border-l border-teal-900/40 p-6 space-y-6 text-white h-full overflow-y-auto shadow-2xl"
            >
              <div className="flex justify-between items-center border-b border-ink-800 pb-4">
                <div>
                  <h3 className="text-xl font-serif font-bold text-white">Manage Booking</h3>
                  <span className="font-mono text-xs text-saffron-400">{selectedBooking.bookingCode}</span>
                </div>
                <button onClick={() => setSelectedBooking(null)} className="p-2 text-ink-300 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="text-teal-400 font-semibold block mb-1">Assign Fleet Vehicle</label>
                  <select
                    value={selectedBooking.assignedVehicle || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSelectedBooking({ ...selectedBooking, assignedVehicle: val });
                      addToast({ title: 'Vehicle Assigned!', description: val, type: 'success' });
                    }}
                    className="w-full p-2.5 rounded-xl bg-ink-950 border border-teal-900 text-white text-xs"
                  >
                    <option value="">Select Fleet Vehicle</option>
                    {mockVehicles.map((v) => (
                      <option key={v.id} value={v.name}>{v.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-teal-400 font-semibold block mb-1">Assign Partner Hotel</label>
                  <select
                    value={selectedBooking.assignedHotel || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSelectedBooking({ ...selectedBooking, assignedHotel: val });
                      addToast({ title: 'Hotel Assigned!', description: val, type: 'success' });
                    }}
                    className="w-full p-2.5 rounded-xl bg-ink-950 border border-teal-900 text-white text-xs"
                  >
                    <option value="">Select Partner Hotel</option>
                    {mockHotels.map((h) => (
                      <option key={h.id} value={h.name}>{h.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
