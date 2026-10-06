'use client';

import React, { useState } from 'react';
import { mockAdminQuotations, mockAdminEnquiries } from '@/data/adminMockData';
import { Quotation } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { useApp } from '@/context/AppContext';
import { Plus, Send, Trash2, Check, FileText } from 'lucide-react';

export default function AdminQuotationsPage() {
  const [quotations, setQuotations] = useState<Quotation[]>(mockAdminQuotations);
  const [showBuilder, setShowBuilder] = useState(false);

  // Builder State
  const [custName, setCustName] = useState('Deepak Saxena');
  const [custPhone, setCustPhone] = useState('+91 98110 55667');
  const [tourTitle, setTourTitle] = useState('Kerala Backwaters Honeymoon');
  const [lineItems, setLineItems] = useState([
    { description: '2 Nights Houseboat Stay with Meals', amount: 28000 },
    { description: 'Private SUV Airport Transfer', amount: 12000 },
  ]);

  const { addToast } = useApp();

  const total = lineItems.reduce((acc, item) => acc + item.amount, 0);

  const handleSendQuote = () => {
    addToast({ title: 'Quotation Generated & Sent!', description: `PDF quote of ${formatCurrency(total)} sent via WhatsApp to ${custName}`, type: 'success' });
    setShowBuilder(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white">Quotation Builder & Proposals</h1>
          <p className="text-xs text-ink-300">Convert incoming enquiries into itemised PDF quotes & WhatsApp links</p>
        </div>

        <button
          onClick={() => setShowBuilder(true)}
          className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-600 text-white font-bold text-xs flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Create New Quote
        </button>
      </div>

      {showBuilder && (
        <div className="p-6 rounded-3xl bg-ink-900 border border-teal-500 space-y-4 shadow-2xl text-xs">
          <h3 className="text-lg font-serif font-bold text-white">Enquiry to Quotation Builder</h3>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-teal-400 font-semibold block mb-1">Customer Name</label>
              <input type="text" value={custName} onChange={(e) => setCustName(e.target.value)} className="w-full p-2.5 rounded-xl bg-ink-950 border border-teal-900 text-white" />
            </div>
            <div>
              <label className="text-teal-400 font-semibold block mb-1">WhatsApp Phone</label>
              <input type="text" value={custPhone} onChange={(e) => setCustPhone(e.target.value)} className="w-full p-2.5 rounded-xl bg-ink-950 border border-teal-900 text-white" />
            </div>
            <div>
              <label className="text-teal-400 font-semibold block mb-1">Proposal Title</label>
              <input type="text" value={tourTitle} onChange={(e) => setTourTitle(e.target.value)} className="w-full p-2.5 rounded-xl bg-ink-950 border border-teal-900 text-white" />
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <span className="text-teal-400 font-semibold block">Line Items</span>
            {lineItems.map((item, idx) => (
              <div key={idx} className="flex gap-3 items-center">
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => {
                    const copy = [...lineItems];
                    copy[idx].description = e.target.value;
                    setLineItems(copy);
                  }}
                  className="flex-1 p-2.5 rounded-xl bg-ink-950 border border-teal-900 text-white"
                />
                <input
                  type="number"
                  value={item.amount}
                  onChange={(e) => {
                    const copy = [...lineItems];
                    copy[idx].amount = Number(e.target.value);
                    setLineItems(copy);
                  }}
                  className="w-32 p-2.5 rounded-xl bg-ink-950 border border-teal-900 text-white"
                />
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-ink-950 border border-teal-950 flex justify-between items-center text-sm font-bold">
            <span>Total Quotation Amount</span>
            <span className="text-xl text-teal-300">{formatCurrency(total)}</span>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setShowBuilder(false)} className="px-4 py-2 rounded-xl bg-ink-800 text-xs">
              Cancel
            </button>
            <button onClick={handleSendQuote} className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2">
              <Send className="w-4 h-4" /> Send Quotation PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
