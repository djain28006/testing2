'use client';

import React from 'react';
import { mockAdminBookings } from '@/data/adminMockData';

export default function AdminCustomersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold text-white">Customer Database</h1>
        <p className="text-xs text-ink-300">Registered travellers, phone numbers, and past trip history</p>
      </div>

      <div className="rounded-3xl bg-ink-900 border border-teal-900/40 overflow-hidden shadow-2xl">
        <table className="w-full text-left text-xs text-ink-200">
          <thead className="bg-ink-950 text-ink-300 uppercase tracking-wider font-semibold border-b border-ink-800">
            <tr>
              <th className="p-4">Customer Name</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Email</th>
              <th className="p-4">Latest Booking</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-800">
            {mockAdminBookings.map((b) => (
              <tr key={b.id} className="hover:bg-ink-950/60">
                <td className="p-4 font-bold text-white">{b.customerName}</td>
                <td className="p-4 text-teal-300">{b.customerPhone}</td>
                <td className="p-4 text-ink-300">{b.customerEmail}</td>
                <td className="p-4 font-semibold text-white">{b.tourTitle}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
