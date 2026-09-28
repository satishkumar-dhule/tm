import React from 'react';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="w-full max-w-sm rounded-3xl bg-[#ffffff] p-6 border border-[#c4c8bc]/40 shadow-2xl flex flex-col gap-4 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#4a7c59] text-white flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[22px]">wallet</span>
            </div>
            <div>
              <h3 className="font-headline font-bold text-base text-[#2e3230]">Google Wallet</h3>
              <p className="text-[11px] text-[#74796e]">Synced to Rahul's Pixel 9 Pro</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-[#f0ece4] text-[#4a4e4a] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Digital Pass Card */}
        <div className="p-4 rounded-2xl bg-[#f5f1ea] border border-[#c4c8bc]/30 flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#2e3230]">12952 Mumbai Tejas Rajdhani</span>
            <span className="text-[10px] font-bold text-[#4a7c59] bg-[#c8e8d0] px-2 py-0.5 rounded-full">
              CONFIRMED
            </span>
          </div>

          <div className="flex items-baseline justify-between pt-1">
            <div>
              <div className="text-xl font-headline font-bold text-[#2e3230]">NDLS → MMCT</div>
              <div className="text-[11px] text-[#4a4e4a]">Departs 16:55 • Today</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-[#4a7c59]">Coach A1</div>
              <div className="text-xs font-semibold text-[#2e3230]">Berth 31 (LB)</div>
            </div>
          </div>

          <div className="pt-2 border-t border-[#c4c8bc]/20 flex items-center justify-between text-[11px] text-[#4a4e4a]">
            <span>PNR: 2418-930214</span>
            <span className="text-[#4a7c59] font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4a7c59]"></span> Lock screen ready
            </span>
          </div>
        </div>

        <p className="text-[11px] text-[#4a4e4a] leading-relaxed">
          Dynamic Island and lock screen transit updates will display next halt time, platform alignment,
          and silent wake-up alarms automatically.
        </p>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-[#4a7c59] hover:bg-[#3d694a] text-white font-bold text-xs transition-colors cursor-pointer shadow-xs"
        >
          Done
        </button>
      </div>
    </div>
  );
};
