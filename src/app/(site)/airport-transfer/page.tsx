'use client';

import React, { useState } from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { formatCurrency } from '@/lib/utils';
import { useApp } from '@/context/AppContext';
import { Plane, MapPin, Calendar, Clock, ArrowRight, ShieldCheck, Phone } from 'lucide-react';

export default function AirportTransferPage() {
  const [airport, setAirport] = useState('Mumbai International Airport (BOM)');
  const [dropLocation, setDropLocation] = useState('South Mumbai / Bandra');
  const [vehicleType, setVehicleType] = useState('AC Sedan (Dzire)');
  const [transferType, setTransferType] = useState<'pickup' | 'drop'>('pickup');
  const [flightNo, setFlightNo] = useState('6E-2102');

  const { addToast } = useApp();

  let estimatedFare = 1800;
  if (vehicleType.includes('SUV')) estimatedFare = 2800;
  if (vehicleType.includes('Tempo')) estimatedFare = 4500;

  const handleBookTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    addToast({ title: 'Airport Transfer Reserved!', description: 'Driver assignment details sent to phone.', type: 'success' });
  };

  return (
    <div className="pt-28 pb-20 bg-ink-950 text-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <SectionHeader
          badge="Airport Pickup & Drop"
          title="Airport Transfer Cab Booking"
          subtitle="Fixed fare airport pickups with flight tracking, driver meet & greet, and zero surge pricing"
          centered
        />

        <div className="p-6 sm:p-10 rounded-3xl bg-ink-900/90 border border-teal-700/50 shadow-2xl space-y-6">
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setTransferType('pickup')}
              className={`px-5 py-2 rounded-xl text-xs font-semibold border ${
                transferType === 'pickup' ? 'bg-teal-700 text-white border-teal-400' : 'bg-ink-950 text-ink-300 border-ink-800'
              }`}
            >
              Airport Pickup (Arrival)
            </button>
            <button
              onClick={() => setTransferType('drop')}
              className={`px-5 py-2 rounded-xl text-xs font-semibold border ${
                transferType === 'drop' ? 'bg-teal-700 text-white border-teal-400' : 'bg-ink-950 text-ink-300 border-ink-800'
              }`}
            >
              Airport Drop (Departure)
            </button>
          </div>

          <form onSubmit={handleBookTransfer} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-teal-400 font-semibold block mb-1">Select Airport</label>
                <select
                  value={airport}
                  onChange={(e) => setAirport(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-ink-950 border border-teal-900 text-white text-xs"
                >
                  <option value="Mumbai International Airport (BOM)">Mumbai Airport (BOM)</option>
                  <option value="Goa MOPA Airport (GOX)">Goa MOPA Airport (GOX)</option>
                  <option value="Goa Dabolim Airport (GOI)">Goa Dabolim Airport (GOI)</option>
                  <option value="Ayodhya Airport (AYJ)">Ayodhya Airport (AYJ)</option>
                  <option value="Varanasi Airport (VNS)">Varanasi Airport (VNS)</option>
                  <option value="Srinagar Airport (SXR)">Srinagar Airport (SXR)</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-teal-400 font-semibold block mb-1">City Drop/Pickup Address</label>
                <input
                  type="text"
                  value={dropLocation}
                  onChange={(e) => setDropLocation(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-ink-950 border border-teal-900 text-white text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-teal-400 font-semibold block mb-1">Vehicle Type</label>
                <select
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-ink-950 border border-teal-900 text-white text-xs"
                >
                  <option value="AC Sedan (Dzire)">AC Sedan (4 Seater Dzire/Etios)</option>
                  <option value="AC SUV (Innova Crysta)">AC SUV (6 Seater Innova Crysta)</option>
                  <option value="AC Tempo Traveller">AC Tempo Traveller (13 Seater)</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-teal-400 font-semibold block mb-1">Flight Number (For Live Tracking)</label>
                <input
                  type="text"
                  value={flightNo}
                  onChange={(e) => setFlightNo(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-ink-950 border border-teal-900 text-white text-xs"
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-ink-950 border border-teal-950 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-ink-300 block">All-Inclusive Fixed Fare</span>
                <span className="text-2xl font-bold text-teal-300">{formatCurrency(estimatedFare)}</span>
              </div>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-teal-700 hover:bg-teal-600 text-white font-bold text-xs flex items-center gap-2 shadow"
              >
                <span>Reserve Transfer Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
