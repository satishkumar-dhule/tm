import React, { useState } from 'react';

interface CoachBlueprintModalProps {
  isOpen: boolean;
  coachNumber: string;
  onClose: () => void;
  onSelectBerth?: (berth: number) => void;
}

export const CoachBlueprintModal: React.FC<CoachBlueprintModalProps> = ({
  isOpen,
  coachNumber,
  onClose,
}) => {
  const [selectedBerth, setSelectedBerth] = useState<number>(31);

  if (!isOpen) return null;

  const bays = [
    { bay: 'Bay 1', berths: [{ num: 1, type: 'LB' }, { num: 2, type: 'UB' }, { num: 3, type: 'SL' }, { num: 4, type: 'SU' }] },
    { bay: 'Bay 2', berths: [{ num: 5, type: 'LB' }, { num: 6, type: 'UB' }, { num: 7, type: 'SL' }, { num: 8, type: 'SU' }] },
    { bay: 'Bay 3', berths: [{ num: 9, type: 'LB' }, { num: 10, type: 'UB' }, { num: 11, type: 'SL' }, { num: 12, type: 'SU' }] },
    { bay: 'Bay 4', berths: [{ num: 13, type: 'LB' }, { num: 14, type: 'UB' }, { num: 15, type: 'SL' }, { num: 16, type: 'SU' }] },
    { bay: 'Quiet Bay 5 (Your Cabin)', berths: [{ num: 29, type: 'UB' }, { num: 30, type: 'MB' }, { num: 31, type: 'LB (You)', isUser: true }, { num: 32, type: 'SL' }] },
    { bay: 'Bay 6', berths: [{ num: 33, type: 'LB' }, { num: 34, type: 'UB' }, { num: 35, type: 'SL' }, { num: 36, type: 'SU' }] },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="w-full max-w-2xl rounded-3xl bg-[#ffffff] p-6 sm:p-7 border border-[#c4c8bc]/40 shadow-2xl flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-[#e4e0d8]/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#c8e8d0] text-[#002110] flex items-center justify-center font-bold">
              {coachNumber}
            </div>
            <div>
              <h3 className="font-headline font-bold text-lg text-[#2e3230]">
                Coach {coachNumber} Blueprint & Berth Geometry
              </h3>
              <p className="text-xs text-[#4a4e4a]">
                Tejas Smart Coach • Two-Tier (2A) Soundproof Sanctuary
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-[#f0ece4] text-[#4a4e4a] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-xs bg-[#f5f1ea] p-3 rounded-2xl border border-[#c4c8bc]/20">
          <span className="text-[#74796e] font-semibold">Key:</span>
          <span className="flex items-center gap-1.5 font-medium">
            <span className="w-3.5 h-3.5 rounded bg-[#4a7c59] text-white flex items-center justify-center text-[9px] font-bold">
              ✓
            </span>
            Your Berth (31 LB)
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <span className="w-3.5 h-3.5 rounded bg-[#c8e8d0] border border-[#4a7c59]/40"></span>
            Available (Quiet Zone)
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <span className="w-3.5 h-3.5 rounded bg-[#e4e0d8]"></span>
            Booked
          </span>
          <span className="flex items-center gap-1.5 font-medium text-[#705c30]">
            <span className="material-symbols-outlined text-[14px]">volume_off</span>
            Far from Restrooms
          </span>
        </div>

        {/* Coach Corridor Visual */}
        <div className="p-4 rounded-2xl bg-[#faf6f0] border border-[#c4c8bc]/30 space-y-4">
          <div className="flex items-center justify-between text-xs text-[#74796e] font-bold">
            <span>← Door 1 • Attendant Station (Rajesh)</span>
            <span>Door 2 • Restrooms →</span>
          </div>

          <div className="space-y-3">
            {bays.map((bay, bIdx) => (
              <div
                key={bIdx}
                className={`p-3 rounded-xl border transition-all ${
                  bay.bay.includes('Your')
                    ? 'bg-[#4a7c59]/10 border-[#4a7c59] shadow-xs'
                    : 'bg-[#ffffff] border-[#c4c8bc]/30'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-semibold text-[#2e3230] mb-2">
                  <span className={bay.bay.includes('Your') ? 'text-[#4a7c59] font-bold' : ''}>
                    {bay.bay}
                  </span>
                  {bay.bay.includes('Your') && (
                    <span className="text-[10px] bg-[#4a7c59] text-white px-2 py-0.5 rounded-full font-bold">
                      Middle Cabin • Minimal Footfall
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {bay.berths.map((b) => {
                    const isSelected = selectedBerth === b.num;
                    const isUserBerth = b.isUser;
                    return (
                      <button
                        key={b.num}
                        type="button"
                        onClick={() => setSelectedBerth(b.num)}
                        className={`p-2.5 rounded-lg text-xs flex flex-col items-center justify-center gap-0.5 transition-all cursor-pointer ${
                          isUserBerth
                            ? 'bg-[#4a7c59] text-white font-bold shadow-xs ring-2 ring-[#4a7c59]/40'
                            : isSelected
                            ? 'bg-[#c8e8d0] text-[#002110] font-bold'
                            : 'bg-[#f5f1ea] hover:bg-[#eae6de] text-[#2e3230]'
                        }`}
                      >
                        <span className="font-headline font-bold text-sm">#{b.num}</span>
                        <span className="text-[10px] opacity-80">{b.type}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Berth Spec */}
        <div className="p-4 rounded-2xl bg-[#f0e8db]/70 border border-[#c4c8bc]/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div>
            <div className="font-bold text-[#2e3230] text-sm">
              Berth 31 (Lower Berth, Window side)
            </div>
            <div className="text-[#5e5548] mt-0.5">
              Equipped with reading lamp, 220V plug, luggage lock clamp, and blackout blind.
            </div>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#4a7c59] hover:bg-[#3d694a] text-white font-bold rounded-xl shrink-0 cursor-pointer shadow-xs"
          >
            Confirm Selection
          </button>
        </div>
      </div>
    </div>
  );
};
