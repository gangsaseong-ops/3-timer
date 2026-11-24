import React, { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-neutral-900 text-white border border-neutral-700/80 rounded-xl shadow-2xl p-4 flex items-start gap-3 animate-fadeIn">
      <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
      <div className="text-xs sm:text-sm font-medium leading-relaxed flex-1 text-neutral-200">
        {message}
      </div>
      <button
        type="button"
        onClick={onClose}
        className="text-neutral-400 hover:text-white transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
