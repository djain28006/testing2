'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { brandConfig } from '@/config/brand';
import { useApp } from '@/context/AppContext';
import { Search, Heart, Menu, X, Phone, MessageSquare, Sparkles, User, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const {
    wishlist,
    setWishlistOpen,
    setCommandKOpen,
    setWhatsAppWidgetOpen,
    pilgrimageMode,
    setPilgrimageMode,
    addToast
  } = useApp();

  const [loginModalOpen, setLoginModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Tours', href: '/tours' },
    { name: 'Destinations', href: '/destinations' },
    { name: 'Pilgrimage', href: '/pilgrimage' },
    { name: 'Hotels', href: '/hotels' },
    { name: 'Car & Bus Rental', href: '/rentals' },
    { name: 'Airport Transfer', href: '/airport-transfer' },
    { name: 'Custom Tours', href: '/custom-tours' },
    { name: 'Offers', href: '/offers' },
    { name: 'About Us', href: '/about' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-ink-950/90 backdrop-blur-xl border-b border-teal-900/30 py-3 shadow-2xl'
            : 'bg-gradient-to-b from-ink-950/90 via-ink-950/40 to-transparent py-4 md:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-800 flex items-center justify-center text-white shadow-lg shadow-teal-900/50 group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold tracking-tight text-white leading-none">
                {brandConfig.shortName}
              </span>
              <span className="text-[10px] text-teal-400 uppercase tracking-widest font-sans font-semibold">
                Tours & Travels
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.slice(0, 8).map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  prefetch={true}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    active
                      ? 'text-teal-400 bg-teal-950/80 font-semibold'
                      : 'text-ink-100 hover:text-teal-300 hover:bg-ink-900/60'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Pilgrimage Mode Toggle */}
            <button
              onClick={() => {
                setPilgrimageMode(!pilgrimageMode);
                addToast({
                  title: !pilgrimageMode ? 'Pilgrimage Mode Activated 🚩' : 'Standard Mode Activated',
                  description: !pilgrimageMode ? 'Theme switched to sacred Saffron & Sand' : 'Switched back to Deep Teal ocean theme',
                  type: 'info',
                });
              }}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                pilgrimageMode
                  ? 'bg-saffron-500 text-ink-950 border-saffron-400 shadow-lg shadow-saffron-500/20'
                  : 'bg-ink-900/80 border-saffron-500/40 text-saffron-400 hover:bg-saffron-950/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{pilgrimageMode ? 'Pilgrimage ON' : 'Pilgrimage Mode'}</span>
            </button>

            {/* Search (Cmd+K) Trigger */}
            <button
              onClick={() => setCommandKOpen(true)}
              className="p-2 rounded-xl bg-ink-900/80 border border-teal-900/40 text-ink-100 hover:text-teal-400 hover:border-teal-700/60 transition-all"
              aria-label="Search"
              title="Search tours (Cmd+K)"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Wishlist Drawer Button */}
            <button
              onClick={() => setWishlistOpen(true)}
              className="relative p-2 rounded-xl bg-ink-900/80 border border-teal-900/40 text-ink-100 hover:text-red-400 hover:border-teal-700/60 transition-all"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-saffron-500 text-ink-950 font-bold text-[10px] flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* WhatsApp Trigger */}
            <button
              onClick={() => setWhatsAppWidgetOpen(true)}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>

            {/* Login Modal Button */}
            <button
              onClick={() => setLoginModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-ink-900/80 border border-teal-900/40 text-ink-100 hover:text-white text-xs font-medium transition-colors"
            >
              <User className="w-3.5 h-3.5 text-teal-400" />
              <span>Login</span>
            </button>

            {/* Book Now Button */}
            <Link
              href="/tours"
              className="hidden sm:inline-flex px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-600 text-white text-xs font-bold transition-transform hover:scale-105 shadow-lg shadow-teal-900/40"
            >
              Book Now
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-ink-900/80 border border-teal-900/40 text-white lg:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-16 left-0 right-0 z-30 bg-ink-950/98 border-b border-teal-900/40 backdrop-blur-2xl lg:hidden overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-3 max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-ink-800">
                <span className="text-xs text-ink-300">Contact Concierge</span>
                <a href={`tel:${brandConfig.phone}`} className="flex items-center gap-1.5 text-xs text-teal-400 font-semibold">
                  <Phone className="w-3.5 h-3.5" />
                  {brandConfig.phone}
                </a>
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-sm font-medium text-white hover:text-teal-300 border-b border-ink-900/60 flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <span className="text-xs text-ink-300">→</span>
                </Link>
              ))}

              <div className="pt-4 grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setWhatsAppWidgetOpen(true);
                  }}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" /> WhatsApp Chat
                </button>
                <Link
                  href="/booking"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 rounded-xl bg-teal-700 text-white text-xs font-semibold flex items-center justify-center"
                >
                  Quick Book
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Modal */}
      <AnimatePresence>
        {loginModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-ink-900 border border-teal-700/40 rounded-3xl p-6 sm:p-8 max-w-md w-full relative shadow-2xl"
            >
              <button
                onClick={() => setLoginModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-ink-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-2xl font-serif text-white mb-2">Welcome Back</h3>
              <p className="text-xs text-ink-300 mb-6">Login to view your travel vouchers, upcoming trips and rewards.</p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setLoginModalOpen(false);
                  addToast({ title: 'Logged in successfully!', description: 'Welcome back to VedicVibe.', type: 'success' });
                }}
                className="space-y-4"
              >
                <div>
                  <label className="text-xs text-ink-300 block mb-1">Mobile Number or Email</label>
                  <input
                    type="text"
                    required
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 rounded-xl bg-ink-950 border border-teal-900/60 text-white text-sm focus:border-teal-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-ink-300 block mb-1">OTP / Password</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 rounded-xl bg-ink-950 border border-teal-900/60 text-white text-sm focus:border-teal-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-teal-700 hover:bg-teal-600 text-white font-bold text-sm transition-colors shadow-lg shadow-teal-900/40"
                >
                  Sign In / Request OTP
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
