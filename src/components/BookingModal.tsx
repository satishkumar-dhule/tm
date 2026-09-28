import React, { useState } from 'react';

interface BookingModalProps {
  isOpen: boolean;
  trainName: string;
  selectedClass: string;
  price: number;
  onClose: () => void;
  onConfirm: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  trainName,
  selectedClass,
  price,
  onClose,
  onConfirm,
}) => {
  const [passengerName, setPassengerName] = useState('Rahul Kumar');
  const [berthPref, setBerthPref] = useState('Lower Berth (Window)');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleBooking = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onConfirm();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="w-full max-w-lg rounded-3xl bg-[#ffffff] p-6 sm:p-8 border border-[#c4c8bc]/40 shadow-2xl flex flex-col gap-5 relative">
        <div className="flex items-center justify-between pb-3 border-b border-[#e4e0d8]/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#4a7c59] text-white flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[20px]">lock</span>
            </div>
            <div>
              <h3 className="font-headline font-bold text-lg text-[#2e3230]">
                Instant Calm Booking
              </h3>
              <p className="text-xs text-[#4a4e4a]">Direct CRIS gateway seat reservation lock</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-[#f0ece4] text-[#4a4e4a] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Train Details Summary */}
        <div className="p-4 rounded-2xl bg-[#f5f1ea] border border-[#c4c8bc]/30 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm text-[#2e3230]">{trainName}</span>
            <span className="text-xs font-bold text-[#4a7c59] bg-[#c8e8d0] px-2 py-0.5 rounded-full">
              Class {selectedClass}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs text-[#4a4e4a]">
            <span>NDLS (16:55) → MMCT (08:35 Next Day)</span>
            <span className="font-semibold text-[#2e3230]">Tomorrow • Oct 03</span>
          </div>
        </div>

        {/* Passenger & Preferences Form */}
        <div className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-[#2e3230] mb-1">Primary Passenger</label>
            <input
              type="text"
              value={passengerName}
              onChange={(e) => setPassengerName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#faf6f0] border border-[#c4c8bc]/40 text-[#2e3230] font-medium focus:outline-none focus:border-[#4a7c59]"
            />
          </div>

          <div>
            <label className="block font-bold text-[#2e3230] mb-1">Berth Preference Guarantee</label>
            <select
              value={berthPref}
              onChange={(e) => setBerthPref(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#faf6f0] border border-[#c4c8bc]/40 text-[#2e3230] font-medium focus:outline-none focus:border-[#4a7c59]"
            >
              <option value="Lower Berth (Window)">Lower Berth (Window Side) - Guaranteed Quiet Bay</option>
              <option value="Lower Berth (Cabin)">Lower Berth (Cabin Inside)</option>
              <option value="Upper Berth">Upper Berth (Extra Privacy)</option>
            </select>
          </div>
        </div>

        {/* Fare Clarity */}
        <div className="p-3.5 rounded-2xl bg-[#f0e8db]/70 border border-[#c4c8bc]/30 flex items-center justify-between">
          <div>
            <span className="text-xs text-[#74796e] block">Total Guaranteed Fare</span>
            <span className="text-[11px] text-[#4a7c59] font-medium">No Tatkal or surge charges</span>
          </div>
          <span className="font-headline font-bold text-2xl text-[#4a7c59]">₹{price.toLocaleString()}</span>
        </div>

        {/* Booking Button */}
        <button
          onClick={handleBooking}
          disabled={isProcessing}
          className="w-full py-3.5 rounded-xl bg-[#4a7c59] hover:bg-[#3d694a] text-white font-headline font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
        >
          {isProcessing ? (
            <>
              <span className="material-symbols-outlined text-[18px] animate-spin">sync</span>
              <span>Locking Berth with CRIS Gateway...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span>Confirm & Issue Sanctuary Pass</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
