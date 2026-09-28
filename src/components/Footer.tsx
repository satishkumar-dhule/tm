import React from 'react';

interface FooterProps {
  onOpenSOS: () => void;
  onShowToast: (msg: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSOS, onShowToast }) => {
  return (
    <footer className="w-full bg-[#f5f1ea] border-t border-[#c4c8bc]/20 mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#4a7c59] flex items-center justify-center text-white shadow-xs">
              <span className="material-symbols-outlined text-[16px]">nature</span>
            </div>
            <div>
              <span className="font-headline font-semibold text-[#2e3230] text-sm block">
                Train Bro Journey Companion
              </span>
              <span className="text-xs text-[#4a4e4a]">
                Crafted for mindful travel & quiet reassurance
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#4a4e4a]">
            <button
              onClick={onOpenSOS}
              className="hover:text-[#4a7c59] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[14px]">call</span>
              RailMadad 139
            </button>
            <button
              onClick={() => onShowToast('Connecting to IRCTC e-Catering for Vadodara Platform 1 delivery...')}
              className="hover:text-[#4a7c59] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[14px]">restaurant</span>
              IRCTC e-Catering
            </button>
            <button
              onClick={() => onShowToast('Railway Emergency Medical Officer on duty at Platform 1 Superintendent office.')}
              className="hover:text-[#4a7c59] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[14px]">medical_services</span>
              Medical Support
            </button>
          </div>

          <div className="text-xs text-[#4a4e4a] font-medium bg-[#faf6f0] px-4 py-2 rounded-full shadow-[0_1px_4px_rgba(46,50,48,0.04)] border border-[#c4c8bc]/20">
            Have a restful journey, Rahul 🌱
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#c4c8bc]/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#74796e]">
          <p>© 2025 Train Bro. Grounded, human, and always on track.</p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4a7c59] animate-pulse"></span>
            <span>GPS Location & Coach Status synced offline-ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
