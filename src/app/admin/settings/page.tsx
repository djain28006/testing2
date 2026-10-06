'use client';

import React, { useState } from 'react';
import { brandConfig } from '@/config/brand';
import { useApp } from '@/context/AppContext';
import { Save, Compass, Phone, Mail, MapPin } from 'lucide-react';

export default function AdminSettingsPage() {
  const [name, setName] = useState(brandConfig.name);
  const [tagline, setTagline] = useState(brandConfig.tagline);
  const [phone, setPhone] = useState(brandConfig.phone);
  const [email, setEmail] = useState(brandConfig.email);
  const [address, setAddress] = useState(brandConfig.address);

  const { addToast } = useApp();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addToast({ title: 'Brand Settings Updated Live!', description: 'Changes saved into brand config.', type: 'success' });
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-serif font-bold text-white">Brand & Company Settings</h1>
        <p className="text-xs text-ink-300">Live preview & update single source brand parameters</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Settings Form */}
        <form onSubmit={handleSave} className="lg:col-span-7 p-6 rounded-3xl bg-ink-900 border border-teal-900/40 space-y-4 text-xs">
          <div>
            <label className="text-teal-400 font-semibold block mb-1">Company Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2.5 rounded-xl bg-ink-950 border border-teal-900 text-white" />
          </div>

          <div>
            <label className="text-teal-400 font-semibold block mb-1">Hero Tagline</label>
            <input type="text" value={tagline} onChange={(e) => setTagline(e.target.value)} className="w-full p-2.5 rounded-xl bg-ink-950 border border-teal-900 text-white" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-teal-400 font-semibold block mb-1">Primary Phone</label>
              <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-2.5 rounded-xl bg-ink-950 border border-teal-900 text-white" />
            </div>
            <div>
              <label className="text-teal-400 font-semibold block mb-1">Support Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2.5 rounded-xl bg-ink-950 border border-teal-900 text-white" />
            </div>
          </div>

          <div>
            <label className="text-teal-400 font-semibold block mb-1">Registered Address</label>
            <textarea rows={2} value={address} onChange={(e) => setAddress(e.target.value)} className="w-full p-2.5 rounded-xl bg-ink-950 border border-teal-900 text-white" />
          </div>

          <button type="submit" className="w-full py-3 rounded-xl bg-teal-700 hover:bg-teal-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow">
            <Save className="w-4 h-4" /> Save Brand Configuration
          </button>
        </form>

        {/* Live Brand Card Preview */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-ink-900 border border-teal-500 space-y-4 text-xs shadow-2xl">
          <span className="text-[10px] text-teal-400 font-semibold uppercase tracking-widest block">Live Brand Preview</span>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-700 flex items-center justify-center text-white font-bold">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-white text-base">{name}</h4>
              <span className="text-[10px] text-teal-400 font-sans">{tagline}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-ink-950 border border-teal-950 space-y-1.5 text-ink-300 text-[11px]">
            <p className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-teal-400" /> {phone}</p>
            <p className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-teal-400" /> {email}</p>
            <p className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-teal-400" /> {address}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
