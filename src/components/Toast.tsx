import React, { useEffect } from 'react';

interface ToastProps {
  message: string | null;
  onClear: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClear }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClear();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [message, onClear]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-[#2e3230] text-[#f5f0e8] px-5 py-3 rounded-2xl shadow-xl border border-[#74796e]/30 flex items-center gap-3 text-xs font-semibold animate-fadeIn">
      <span className="material-symbols-outlined text-[#8ecf9e] text-[20px]">check_circle</span>
      <span>{message}</span>
      <button
        onClick={onClear}
        className="ml-2 text-[#c4c8bc] hover:text-white transition-colors cursor-pointer"
      >
        <span className="material-symbols-outlined text-[16px]">close</span>
      </button>
    </div>
  );
};
