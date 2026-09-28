import React from 'react';

interface SosModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerSilentAlert: () => void;
}

export const SosModal: React.FC<SosModalProps> = ({
  isOpen,
  onClose,
  onTriggerSilentAlert,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="w-full max-w-md rounded-3xl bg-[#ffffff] p-6 sm:p-7 border border-[#c4c8bc]/40 shadow-2xl flex flex-col gap-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#e4e0d8]/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#ffdad8] text-[#b83230] flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">emergency</span>
            </div>
            <div>
              <h3 className="font-headline font-bold text-lg text-[#2e3230]">
                RailMadad 139 Hotline
              </h3>
              <p className="text-xs text-[#4a4e4a]">Indian Railways 24/7 Security & Medical Desk</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-[#f0ece4] text-[#4a4e4a] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="bg-[#f5f1ea] p-4 rounded-2xl border border-[#c4c8bc]/20 text-xs space-y-2">
          <div className="font-bold text-[#2e3230]">Active Passenger Context:</div>
          <div className="flex justify-between text-[#4a4e4a]">
            <span>Train 12952 Tejas</span>
            <span className="font-semibold text-[#2e3230]">Coach A1, Berth 31</span>
          </div>
          <div className="flex justify-between text-[#4a4e4a]">
            <span>Current Sector</span>
            <span className="font-semibold text-[#2e3230]">Approaching Vadodara (BRC)</span>
          </div>
        </div>

        <div className="space-y-2.5">
          <a
            href="tel:139"
            className="w-full py-3 px-4 rounded-xl bg-[#4a7c59] hover:bg-[#3d694a] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px]">call</span>
            <span>Dial Official 139 Helpline Now</span>
          </a>

          <button
            onClick={() => {
              onTriggerSilentAlert();
              onClose();
            }}
            className="w-full py-3 px-4 rounded-xl bg-[#b83230] hover:bg-[#9e2b29] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px]">shield</span>
            <span>Trigger Silent SOS to Train Captain & RPF</span>
          </button>
        </div>

        <p className="text-[11px] text-[#74796e] text-center">
          Station Superintendent and On-Duty Doctor at Vadodara Jn Platform 1 are notified on high priority.
        </p>
      </div>
    </div>
  );
};
