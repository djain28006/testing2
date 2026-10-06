'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export function ToastContainer() {
  const { toasts, removeToast } = useApp();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto flex items-start gap-3 p-4 rounded-xl bg-ink-900/95 border border-teal-700/30 text-white shadow-2xl backdrop-blur-md"
          >
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />}
            {toast.type === 'warning' && <AlertCircle className="w-5 h-5 text-saffron-500 shrink-0 mt-0.5" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />}
            {(!toast.type || toast.type === 'info') && <Info className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />}

            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-white leading-tight">{toast.title}</h4>
              {toast.description && <p className="text-xs text-ink-300 mt-1 line-clamp-2">{toast.description}</p>}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-ink-300 hover:text-white transition-colors p-1"
              aria-label="Close toast"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
