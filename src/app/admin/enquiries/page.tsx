'use client';

import React from 'react';
import { mockAdminEnquiries } from '@/data/adminMockData';
import { formatDate, formatCurrency } from '@/lib/utils';
import { useApp } from '@/context/AppContext';

export default function AdminEnquiriesPage() {
  const { addToast } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold text-white">Incoming Trip Enquiries</h1>
        <p className="text-xs text-ink-300">Leads captured from website form & WhatsApp</p>
      </div>

      <div className="rounded-3xl bg-ink-900 border border-teal-900/40 overflow-hidden shadow-2xl">
        <table className="w-full text-left text-xs text-ink-200">
          <thead className="bg-ink-950 text-ink-300 uppercase tracking-wider font-semibold border-b border-ink-800">
            <tr>
              <th className="p-4">Customer Name</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Destination</th>
              <th className="p-4">Budget / Person</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-800">
            {mockAdminEnquiries.map((e) => (
              <tr key={e.id} className="hover:bg-ink-950/60">
                <td className="p-4 font-semibold text-white">{e.customerName}</td>
                <td className="p-4 text-teal-300">{e.customerPhone}</td>
                <td className="p-4">{e.destination}</td>
                <td className="p-4 font-bold text-white">{formatCurrency(e.budgetPerPerson)}</td>
                <td className="p-4">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-saffron-950 text-saffron-400 border border-saffron-700">
                    {e.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => addToast({ title: 'Quote Builder Opened', description: `Pre-filled for ${e.customerName}`, type: 'info' })}
                    className="px-3 py-1.5 rounded-xl bg-teal-700 hover:bg-teal-600 text-white font-semibold text-[11px]"
                  >
                    Build Quote
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
