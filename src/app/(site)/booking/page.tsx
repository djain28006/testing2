'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { mockTours } from '@/data/tours';
import { formatCurrency } from '@/lib/utils';
import { useApp } from '@/context/AppContext';
import { Check, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

function BookingWizardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addToast } = useApp();

  const tourId = searchParams?.get('tourId') || 'goa-fun-escape';
  const tour = mockTours.find((t) => t.id === tourId) || mockTours[0];

  const [step, setStep] = useState(1);

  // Form State
  const [departureDate, setDepartureDate] = useState('2026-11-15');
  const [pickupPoint, setPickupPoint] = useState(tour.pickupPoints[0] || 'Airport');
  const [adults, setAdults] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);

  // Add-ons
  const [addOns, setAddOns] = useState<{ [key: string]: boolean }>({
    vipPass: false,
    dinner: false,
    insurance: true,
  });

  // Customer Details
  const [fullName, setFullName] = useState('Rahul Sharma');
  const [email, setEmail] = useState('rahul.sharma@gmail.com');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [paymentType, setPaymentType] = useState<'Full' | 'Advance'>('Full');

  // Pricing calculations
  const baseCost = tour.pricePerPerson * adults;
  const addOnCost =
    (addOns.vipPass ? 1500 : 0) +
    (addOns.dinner ? 2000 : 0) +
    (addOns.insurance ? 499 * (adults + childrenCount) : 0);

  const subTotal = baseCost + addOnCost;
  const grandTotal = Math.max(0, subTotal - appliedDiscount);
  const advanceAmount = Math.round(grandTotal * 0.25);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'FESTIVE10') {
      const disc = Math.round(subTotal * 0.1);
      setAppliedDiscount(disc);
      addToast({ title: 'Coupon Applied! 🎉', description: '10% discount subtracted.', type: 'success' });
    } else if (couponCode.toUpperCase() === 'VEDICVIBE500') {
      setAppliedDiscount(500);
      addToast({ title: 'Coupon Applied! 🎉', description: 'Flat ₹500 subtracted.', type: 'success' });
    } else {
      addToast({ title: 'Invalid Coupon Code', description: 'Try FESTIVE10 or VEDICVIBE500', type: 'error' });
    }
  };

  const handleFinishBooking = () => {
    addToast({ title: 'Booking Confirmed!', description: 'Generating digital boarding pass voucher...', type: 'success' });
    router.push('/booking/confirmation');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Wizard Header & Step Progress Bar */}
      <div className="text-center space-y-2">
        <span className="text-xs uppercase tracking-widest text-teal-400 font-semibold">Easy 4-Step Checkout</span>
        <h1 className="text-3xl sm:text-4xl font-serif text-white font-bold">Complete Your Booking</h1>
      </div>

      <div className="grid grid-cols-4 gap-2 text-center text-xs font-semibold">
        {[
          { s: 1, label: 'Date & Pickup' },
          { s: 2, label: 'Travellers & Addons' },
          { s: 3, label: 'Contact Details' },
          { s: 4, label: 'Payment & Confirm' },
        ].map((item) => (
          <div
            key={item.s}
            onClick={() => item.s < step && setStep(item.s)}
            className={`p-3 rounded-2xl border transition-all cursor-pointer ${
              step === item.s
                ? 'bg-teal-700 text-white border-teal-400 shadow-lg'
                : step > item.s
                ? 'bg-teal-950 text-teal-300 border-teal-800'
                : 'bg-ink-900 text-ink-300 border-ink-800'
            }`}
          >
            <div className="text-[10px] opacity-75">Step {item.s}</div>
            <div className="truncate">{item.label}</div>
          </div>
        ))}
      </div>

      {/* Wizard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Step Form Content */}
        <div className="lg:col-span-8 bg-ink-900/90 border border-teal-900/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          {step === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <h3 className="text-xl font-serif font-bold text-white">Select Departure & Pickup Point</h3>

              <div>
                <label className="text-xs font-semibold text-teal-400 block mb-1">Departure Date</label>
                <input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-ink-950 border border-teal-900/60 text-white text-sm focus:outline-none focus:border-teal-400"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-teal-400 block mb-1">Preferred Pickup Point</label>
                <select
                  value={pickupPoint}
                  onChange={(e) => setPickupPoint(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-ink-950 border border-teal-900/60 text-white text-sm focus:outline-none focus:border-teal-400"
                >
                  {tour.pickupPoints.map((pt) => (
                    <option key={pt} value={pt}>
                      {pt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-xl bg-teal-700 hover:bg-teal-600 text-white font-bold text-xs flex items-center gap-2"
                >
                  <span>Next: Travellers</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h3 className="text-xl font-serif font-bold text-white">Travellers & Add-on Services</h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-teal-400 block mb-1">Adults (12+ yrs)</label>
                  <select
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl bg-ink-950 border border-teal-900/60 text-white text-xs"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10].map((n) => (
                      <option key={n} value={n}>{n} Adults</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-teal-400 block mb-1">Children (5-11 yrs)</label>
                  <select
                    value={childrenCount}
                    onChange={(e) => setChildrenCount(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl bg-ink-950 border border-teal-900/60 text-white text-xs"
                  >
                    {[0, 1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>{n} Children</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <span className="text-xs font-semibold text-teal-400 block">Optional Add-ons</span>

                <label className="flex items-center justify-between p-3 rounded-xl bg-ink-950 border border-teal-950 cursor-pointer">
                  <div className="flex items-center gap-2 text-xs">
                    <input
                      type="checkbox"
                      checked={addOns.vipPass}
                      onChange={(e) => setAddOns({ ...addOns, vipPass: e.target.checked })}
                      className="accent-teal-400"
                    />
                    <span>VIP Express Temple / Monument Entry Slot</span>
                  </div>
                  <span className="text-xs font-bold text-teal-300">+₹1,500</span>
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-ink-950 border border-teal-950 cursor-pointer">
                  <div className="flex items-center gap-2 text-xs">
                    <input
                      type="checkbox"
                      checked={addOns.dinner}
                      onChange={(e) => setAddOns({ ...addOns, dinner: e.target.checked })}
                      className="accent-teal-400"
                    />
                    <span>Special Beachside Candlelight Dinner</span>
                  </div>
                  <span className="text-xs font-bold text-teal-300">+₹2,000</span>
                </label>
              </div>

              <div className="pt-4 flex justify-between">
                <button onClick={() => setStep(1)} className="px-4 py-2.5 rounded-xl bg-ink-800 text-xs text-ink-300">
                  Back
                </button>
                <button onClick={() => setStep(3)} className="px-6 py-2.5 rounded-xl bg-teal-700 text-white font-bold text-xs flex items-center gap-2">
                  <span>Next: Customer Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <h3 className="text-xl font-serif font-bold text-white">Lead Traveller Contact Details</h3>

              <div>
                <label className="text-xs font-semibold text-teal-400 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-ink-950 border border-teal-900/60 text-white text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-teal-400 block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-ink-950 border border-teal-900/60 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-teal-400 block mb-1">Mobile WhatsApp Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-ink-950 border border-teal-900/60 text-white text-sm"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button onClick={() => setStep(2)} className="px-4 py-2.5 rounded-xl bg-ink-800 text-xs text-ink-300">
                  Back
                </button>
                <button onClick={() => setStep(4)} className="px-6 py-2.5 rounded-xl bg-teal-700 text-white font-bold text-xs flex items-center gap-2">
                  <span>Next: Payment & Coupon</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h3 className="text-xl font-serif font-bold text-white">Payment Options & Coupon Code</h3>

              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon (e.g. FESTIVE10)"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-ink-950 border border-teal-900/60 text-white text-xs uppercase"
                />
                <button type="submit" className="px-4 py-2.5 rounded-xl bg-teal-700 text-white font-bold text-xs">
                  Apply Coupon
                </button>
              </form>

              <div className="space-y-2">
                <span className="text-xs font-semibold text-teal-400 block">Select Payment Plan</span>
                <div className="grid grid-cols-2 gap-4">
                  <div
                    onClick={() => setPaymentType('Full')}
                    className={`p-4 rounded-2xl border cursor-pointer ${
                      paymentType === 'Full'
                        ? 'bg-teal-950 border-teal-400 text-white'
                        : 'bg-ink-950 border-ink-800 text-ink-300'
                    }`}
                  >
                    <h4 className="font-bold text-xs">Pay Full Amount</h4>
                    <p className="text-lg font-bold text-teal-300 mt-1">{formatCurrency(grandTotal)}</p>
                    <span className="text-[10px] text-ink-300">Get instant receipt & confirmed voucher</span>
                  </div>

                  <div
                    onClick={() => setPaymentType('Advance')}
                    className={`p-4 rounded-2xl border cursor-pointer ${
                      paymentType === 'Advance'
                        ? 'bg-teal-950 border-teal-400 text-white'
                        : 'bg-ink-950 border-ink-800 text-ink-300'
                    }`}
                  >
                    <h4 className="font-bold text-xs">Pay 25% Advance Deposit</h4>
                    <p className="text-lg font-bold text-saffron-400 mt-1">{formatCurrency(advanceAmount)}</p>
                    <span className="text-[10px] text-ink-300">Balance due 3 days prior to departure</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-between items-center">
                <button onClick={() => setStep(3)} className="px-4 py-2.5 rounded-xl bg-ink-800 text-xs text-ink-300">
                  Back
                </button>
                <button
                  onClick={handleFinishBooking}
                  className="px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center gap-2 shadow-xl"
                >
                  <Check className="w-5 h-5" />
                  <span>Confirm & Pay {formatCurrency(paymentType === 'Full' ? grandTotal : advanceAmount)}</span>
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Live Price Summary Sidebar Drawer */}
        <div className="lg:col-span-4 sticky top-28 bg-ink-900/95 border border-teal-700/50 rounded-3xl p-6 text-white space-y-4 shadow-2xl backdrop-blur-2xl">
          <h3 className="text-lg font-serif font-bold text-white border-b border-ink-800 pb-3">
            Booking Summary
          </h3>

          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-teal-300 text-sm">{tour.title}</h4>
            <p className="text-ink-300">{tour.duration}</p>
            <div className="pt-2 space-y-1 text-ink-200">
              <div className="flex justify-between">
                <span>Date:</span> <strong>{departureDate}</strong>
              </div>
              <div className="flex justify-between">
                <span>Pickup:</span> <strong className="truncate max-w-[120px]">{pickupPoint}</strong>
              </div>
              <div className="flex justify-between">
                <span>Travellers:</span> <strong>{adults} Adults</strong>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-ink-800 space-y-1.5 text-xs">
            <div className="flex justify-between text-ink-300">
              <span>Base Fare</span>
              <span>{formatCurrency(baseCost)}</span>
            </div>
            {addOnCost > 0 && (
              <div className="flex justify-between text-ink-300">
                <span>Add-ons</span>
                <span>+{formatCurrency(addOnCost)}</span>
              </div>
            )}
            {appliedDiscount > 0 && (
              <div className="flex justify-between text-saffron-400 font-semibold">
                <span>Discount Coupon</span>
                <span>-{formatCurrency(appliedDiscount)}</span>
              </div>
            )}

            <div className="flex justify-between items-baseline font-bold text-white pt-2 border-t border-ink-800 text-sm">
              <span>Total Amount</span>
              <span className="text-xl text-teal-300">{formatCurrency(grandTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingWizardPage() {
  return (
    <div className="pt-28 pb-20 bg-ink-950 text-white min-h-screen">
      <Suspense fallback={<div className="text-center py-20 text-xs text-ink-300">Loading booking wizard...</div>}>
        <BookingWizardContent />
      </Suspense>
    </div>
  );
}
