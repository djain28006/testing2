'use client';

import React, { useState, useMemo } from 'react';
import { mockTours } from '@/data/tours';
import { TourCard } from '@/components/ui/TourCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { TourCategory } from '@/types';
import { Search, LayoutGrid, List, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function ToursPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(30000);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [layoutMode, setLayoutMode] = useState<'grid' | 'horizontal'>('grid');

  const categories: string[] = ['All', 'Weekend', 'Pilgrimage', 'Family', 'Group', 'Adventure', 'One Day'];

  const filteredTours = useMemo(() => {
    return mockTours
      .filter((t) => {
        const matchesSearch =
          t.title.toLowerCase().includes(search.toLowerCase()) ||
          t.destinationName.toLowerCase().includes(search.toLowerCase());
        const matchesCat = selectedCategory === 'All' || t.category === selectedCategory;
        const matchesPrice = t.pricePerPerson <= maxPrice;
        const matchesRating = t.rating >= minRating;
        return matchesSearch && matchesCat && matchesPrice && matchesRating;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.pricePerPerson - b.pricePerPerson;
        if (sortBy === 'price-high') return b.pricePerPerson - a.pricePerPerson;
        if (sortBy === 'rating') return b.rating - a.rating;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [search, selectedCategory, maxPrice, minRating, sortBy]);

  const handleReset = () => {
    setSearch('');
    setSelectedCategory('All');
    setMaxPrice(30000);
    setMinRating(0);
    setSortBy('featured');
  };

  return (
    <div className="pt-28 pb-20 bg-ink-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Explore Packages"
          title="All Luxury & Pilgrimage Tour Packages"
          subtitle="Filter by category, budget, rating, and duration to find your dream Indian trip"
        />

        {/* Main Grid Layout: Filter Sidebar + Listings */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-3 bg-ink-900/90 border border-teal-900/40 rounded-3xl p-5 space-y-6 sticky top-28 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-ink-800">
              <h3 className="text-base font-serif font-bold text-white flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-teal-400" />
                <span>Filter Packages</span>
              </h3>
              <button
                onClick={handleReset}
                className="text-xs text-ink-300 hover:text-teal-400 flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </div>

            {/* Search Input */}
            <div className="space-y-1.5">
              <label className="text-xs text-ink-300 font-semibold">Keyword Search</label>
              <div className="relative">
                <Search className="w-4 h-4 text-ink-300 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Goa, Ayodhya, Kashmir..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-ink-950 border border-teal-900/60 text-white text-xs focus:outline-none focus:border-teal-400"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="space-y-1.5">
              <label className="text-xs text-ink-300 font-semibold">Tour Category</label>
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                      selectedCategory === cat
                        ? 'bg-teal-700 text-white border border-teal-400'
                        : 'bg-ink-950 text-ink-300 border border-ink-800 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-ink-300 font-semibold">Max Price</span>
                <span className="font-bold text-teal-300">{formatCurrency(maxPrice)}</span>
              </div>
              <input
                type="range"
                min={2000}
                max={30000}
                step={1000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-teal-400 cursor-pointer"
              />
            </div>

            {/* Minimum Rating */}
            <div className="space-y-1.5">
              <label className="text-xs text-ink-300 font-semibold">Minimum Rating</label>
              <select
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="w-full bg-ink-950 border border-teal-900/60 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-teal-400"
              >
                <option value={0}>Any Rating</option>
                <option value={4.5}>4.5★ & above</option>
                <option value={4.8}>4.8★ & above</option>
              </select>
            </div>
          </aside>

          {/* Listing Header Controls & Cards */}
          <main className="lg:col-span-9 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-ink-900/80 border border-teal-900/40">
              <span className="text-xs text-ink-300 font-semibold">
                Showing <strong className="text-white">{filteredTours.length}</strong> available tours
              </span>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-ink-950 border border-teal-900/60 rounded-xl px-3 py-1.5 text-white text-xs focus:outline-none focus:border-teal-400"
                >
                  <option value="featured">Sort by: Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>

                {/* View Layout Toggle */}
                <div className="flex items-center bg-ink-950 rounded-xl p-1 border border-teal-900/60">
                  <button
                    onClick={() => setLayoutMode('grid')}
                    className={`p-1.5 rounded-lg ${layoutMode === 'grid' ? 'bg-teal-700 text-white' : 'text-ink-300'}`}
                    aria-label="Grid view"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setLayoutMode('horizontal')}
                    className={`p-1.5 rounded-lg ${layoutMode === 'horizontal' ? 'bg-teal-700 text-white' : 'text-ink-300'}`}
                    aria-label="List view"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Tour Cards Grid / List */}
            {filteredTours.length === 0 ? (
              <div className="text-center py-20 bg-ink-900/60 border border-teal-900/40 rounded-3xl p-8">
                <Search className="w-12 h-12 text-ink-300 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white">No tours match your filters</h3>
                <p className="text-xs text-ink-300 mt-1">Try resetting search parameters or price limit.</p>
                <button
                  onClick={handleReset}
                  className="mt-4 px-4 py-2 rounded-xl bg-teal-700 text-white text-xs font-semibold"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div
                className={
                  layoutMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'space-y-4'
                }
              >
                {filteredTours.map((tour) => (
                  <TourCard key={tour.id} tour={tour} layout={layoutMode} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
