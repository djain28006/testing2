'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Tour } from '@/types';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  wishlist: Tour[];
  toggleWishlist: (tour: Tour) => void;
  isInWishlist: (tourId: string) => boolean;
  wishlistOpen: boolean;
  setWishlistOpen: (open: boolean) => void;

  compareList: Tour[];
  toggleCompare: (tour: Tour) => void;
  isInCompare: (tourId: string) => boolean;
  clearCompare: () => void;
  compareModalOpen: boolean;
  setCompareModalOpen: (open: boolean) => void;

  pilgrimageMode: boolean;
  setPilgrimageMode: (active: boolean) => void;

  whatsAppWidgetOpen: boolean;
  setWhatsAppWidgetOpen: (open: boolean) => void;

  commandKOpen: boolean;
  setCommandKOpen: (open: boolean) => void;

  vibeQuizOpen: boolean;
  setVibeQuizOpen: (open: boolean) => void;

  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<Tour[]>([]);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  const [compareList, setCompareList] = useState<Tour[]>([]);
  const [compareModalOpen, setCompareModalOpen] = useState(false);

  const [pilgrimageMode, setPilgrimageMode] = useState(false);
  const [whatsAppWidgetOpen, setWhatsAppWidgetOpen] = useState(false);
  const [commandKOpen, setCommandKOpen] = useState(false);
  const [vibeQuizOpen, setVibeQuizOpen] = useState(false);

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Keyboard Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandKOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = 'toast_' + Date.now();
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleWishlist = (tour: Tour) => {
    setWishlist((prev) => {
      const exists = prev.some((t) => t.id === tour.id);
      if (exists) {
        addToast({ title: 'Removed from My Trip Board', description: tour.title, type: 'info' });
        return prev.filter((t) => t.id !== tour.id);
      } else {
        addToast({ title: 'Saved to My Trip Board!', description: tour.title, type: 'success' });
        return [...prev, tour];
      }
    });
  };

  const isInWishlist = (tourId: string) => wishlist.some((t) => t.id === tourId);

  const toggleCompare = (tour: Tour) => {
    setCompareList((prev) => {
      const exists = prev.some((t) => t.id === tour.id);
      if (exists) {
        return prev.filter((t) => t.id !== tour.id);
      } else {
        if (prev.length >= 3) {
          addToast({ title: 'Comparison limit reached', description: 'You can compare up to 3 tours at once.', type: 'warning' });
          return prev;
        }
        addToast({ title: 'Added to Tour Comparison', description: tour.title, type: 'info' });
        return [...prev, tour];
      }
    });
  };

  const isInCompare = (tourId: string) => compareList.some((t) => t.id === tourId);
  const clearCompare = () => setCompareList([]);

  return (
    <AppContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isInWishlist,
        wishlistOpen,
        setWishlistOpen,
        compareList,
        toggleCompare,
        isInCompare,
        clearCompare,
        compareModalOpen,
        setCompareModalOpen,
        pilgrimageMode,
        setPilgrimageMode,
        whatsAppWidgetOpen,
        setWhatsAppWidgetOpen,
        commandKOpen,
        setCommandKOpen,
        vibeQuizOpen,
        setVibeQuizOpen,
        toasts,
        addToast,
        removeToast,
      }}
    >
      <div className={pilgrimageMode ? 'theme-pilgrimage' : ''}>{children}</div>
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
