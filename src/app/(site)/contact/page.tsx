'use client';

import React, { useState } from 'react';
import { brandConfig } from '@/config/brand';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useApp } from '@/context/AppContext';
import { Phone, Mail, MapPin, Send, MessageSquare, Clock } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const { addToast, setWhatsAppWidgetOpen } = useApp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToast({ title: 'Message Sent!', description: 'Our travel manager will call you back shortly.', type: 'success' });
    setName('');
    setPhone('');
    setMessage('');
  };

  return (
    <div className="pt-28 pb-20 bg-ink-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHeader
          badge="Contact Us"
          title="Get in Touch with Our Concierge"
          subtitle="Have a question about a tour package or need custom group booking assistance?"
          centered
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Information */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-ink-900/90 border border-teal-700/50 space-y-6 shadow-2xl">
            <h3 className="text-xl font-serif font-bold text-white">Headquarters & Support</h3>

            <div className="space-y-4 text-xs font-sans text-ink-200">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-0.5">Office Address</strong>
                  {brandConfig.address}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-0.5">Phone & Call Support</strong>
                  {brandConfig.phone} / {brandConfig.altPhone}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-0.5">Email Inquiries</strong>
                  {brandConfig.email}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-0.5">Working Hours</strong>
                  Monday - Sunday: 8:00 AM - 10:00 PM IST
                </div>
              </div>
            </div>

            <button
              onClick={() => setWhatsAppWidgetOpen(true)}
              className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Instant Chat on WhatsApp</span>
            </button>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-ink-900/90 border border-teal-700/50 space-y-4 shadow-2xl">
            <h3 className="text-xl font-serif font-bold text-white">Send Us a Direct Message</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-teal-400 font-semibold block mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Rahul Sharma"
                  className="w-full px-4 py-2.5 rounded-xl bg-ink-950 border border-teal-900 text-white text-xs"
                />
              </div>

              <div>
                <label className="text-xs text-teal-400 font-semibold block mb-1">Mobile / WhatsApp Number</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-2.5 rounded-xl bg-ink-950 border border-teal-900 text-white text-xs"
                />
              </div>

              <div>
                <label className="text-xs text-teal-400 font-semibold block mb-1">Your Query / Destination</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="I want to enquire about Goa 3D2N package for 4 adults in November..."
                  className="w-full px-4 py-2.5 rounded-xl bg-ink-950 border border-teal-900 text-white text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-teal-700 hover:bg-teal-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg"
              >
                <Send className="w-4 h-4" />
                <span>Submit Query</span>
              </button>
            </form>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="rounded-3xl overflow-hidden h-72 border border-teal-900/40 relative bg-ink-900 flex items-center justify-center text-ink-300 text-xs">
          <div className="text-center space-y-1">
            <MapPin className="w-8 h-8 text-teal-400 mx-auto" />
            <p className="font-semibold text-white">{brandConfig.name} Fort HQ, Mumbai</p>
            <p className="text-[11px] text-ink-300">Google Maps Location Placeholder</p>
          </div>
        </div>
      </div>
    </div>
  );
}
