'use client';

import React, { useState } from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useApp } from '@/context/AppContext';
import { Sparkles, CheckCircle2, ArrowRight, MessageSquare, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CustomToursPage() {
  const [step, setStep] = useState(1);
  const [destination, setDestination] = useState('Goa');
  const [travelDate, setTravelDate] = useState('2026-11-20');
  const [travellers, setTravellers] = useState('Family (2 Adults + 1 Child)');
  const [budget, setBudget] = useState('₹15,000 - ₹25,000');
  const [hotelType, setHotelType] = useState('4★ Luxury Resort');
  const [transport, setTransport] = useState('Private AC SUV');
  const [notes, setNotes] = useState('Request beachfront resort with balcony & sunset boat cruise.');

  const [submitted, setSubmitted] = useState(false);
  const { setWhatsAppWidgetOpen, addToast } = useApp();

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    addToast({ title: 'Custom Trip Request Submitted!', description: 'Our specialist will WhatsApp your itinerary in 15 mins.', type: 'success' });
  };

  return (
    <div className="pt-28 pb-20 bg-ink-950 text-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <SectionHeader
          badge="Plan My Trip"
          title="Tailor-Made Custom Tour Generator"
          subtitle="Tell us your preferences and our senior travel specialists will design a custom itinerary with live pricing"
          centered
        />

        {!submitted ? (
          <div className="p-6 sm:p-10 rounded-3xl bg-ink-900/90 border border-teal-700/50 shadow-2xl space-y-6">
            {/* Step Progress Pills */}
            <div className="flex justify-between items-center text-xs font-semibold border-b border-ink-800 pb-4">
              <span>Step {step} of 3</span>
              <span className="text-teal-400">
                {step === 1 ? 'Destination & Dates' : step === 2 ? 'Hotel & Vehicle' : 'Special Preferences'}
              </span>
            </div>

            <form onSubmit={handleFinish} className="space-y-4">
              {step === 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-teal-400 block mb-1">Where do you want to travel?</label>
                    <input
                      type="text"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      placeholder="e.g. Goa, Kashmir, Rajasthan, Ayodhya..."
                      className="w-full px-4 py-3 rounded-xl bg-ink-950 border border-teal-900 text-white text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-teal-400 block mb-1">Travel Date</label>
                      <input
                        type="date"
                        value={travelDate}
                        onChange={(e) => setTravelDate(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-ink-950 border border-teal-900 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-teal-400 block mb-1">Travellers Group</label>
                      <input
                        type="text"
                        value={travellers}
                        onChange={(e) => setTravellers(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-ink-950 border border-teal-900 text-white text-xs"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full py-3 rounded-xl bg-teal-700 hover:bg-teal-600 text-white font-bold text-xs flex items-center justify-center gap-2"
                  >
                    <span>Next: Stay & Transport</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-teal-400 block mb-1">Hotel Category</label>
                    <select
                      value={hotelType}
                      onChange={(e) => setHotelType(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-ink-950 border border-teal-900 text-white text-xs"
                    >
                      <option value="5★ Super Luxury Resort">5★ Super Luxury Resort</option>
                      <option value="4★ Luxury Resort">4★ Luxury Resort</option>
                      <option value="3★ Heritage Boutique Hotel">3★ Heritage Boutique Hotel</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-teal-400 block mb-1">Preferred Mode of Transport</label>
                    <select
                      value={transport}
                      onChange={(e) => setTransport(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-ink-950 border border-teal-900 text-white text-xs"
                    >
                      <option value="Private AC SUV (Innova)">Private AC SUV (Innova Crysta)</option>
                      <option value="Private AC Sedan (Dzire)">Private AC Sedan (Dzire)</option>
                      <option value="Luxury Tempo Traveller (13 Seater)">Luxury Tempo Traveller (13 Seater)</option>
                    </select>
                  </div>

                  <div className="flex gap-3">
                    <button type="button" onClick={() => setStep(1)} className="px-4 py-2.5 rounded-xl bg-ink-800 text-xs">
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="flex-1 py-2.5 rounded-xl bg-teal-700 text-white font-bold text-xs flex items-center justify-center gap-2"
                    >
                      <span>Next: Special Requests</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-teal-400 block mb-1">Special Preferences / Notes</label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-ink-950 border border-teal-900 text-white text-xs"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button type="button" onClick={() => setStep(2)} className="px-4 py-2.5 rounded-xl bg-ink-800 text-xs">
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3.5 rounded-xl bg-teal-700 hover:bg-teal-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Submit Custom Plan Request</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </form>
          </div>
        ) : (
          <div className="p-8 rounded-3xl bg-ink-900/90 border border-teal-500 text-center space-y-4 shadow-2xl">
            <CheckCircle2 className="w-16 h-16 text-teal-400 mx-auto" />
            <h3 className="text-2xl font-serif font-bold text-white">Custom Trip Request Received!</h3>
            <p className="text-xs text-ink-300 max-w-md mx-auto">
              Our travel concierge is crafting your custom itinerary for {destination} ({hotelType}, {transport}). You will receive a PDF quote on WhatsApp shortly.
            </p>
            <button
              onClick={() => setWhatsAppWidgetOpen(true)}
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold inline-flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" /> Chat on WhatsApp Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
