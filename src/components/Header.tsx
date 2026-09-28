import React, { useState } from 'react';
import { ScreenPath } from '../types';

interface HeaderProps {
  currentPath: ScreenPath;
  onNavigate: (path: ScreenPath) => void;
  onOpenSOS: () => void;
  onOpenWallet: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  onOpenSOS,
  onOpenWallet,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { path: ScreenPath; label: string; icon: string }[] = [
    { path: 'live-journey', label: 'Live Journey', icon: 'explore' },
    { path: 'pnr-ticket-sanctuary', label: 'PNR & Ticket Sanctuary', icon: 'airplane_ticket' },
    { path: 'station-amenities', label: 'Station & Amenities', icon: 'domain' },
    { path: 'plan-availability', label: 'Plan & Availability', icon: 'calendar_month' },
    { path: 'gemini-rail-guide', label: 'Gemini Rail Guide', icon: 'psychology' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-[#faf6f0]/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(46,50,48,0.05)] border-b border-[#c4c8bc]/20">
      <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-3">
        {/* Brand Lockup */}
        <button
          onClick={() => onNavigate('plan-availability')}
          className="flex items-center gap-3 shrink-0 text-left focus:outline-none group"
        >
          <div className="w-11 h-11 rounded-full bg-[#4a7c59] flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
            <span className="material-symbols-outlined text-[24px]">forest</span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline text-lg font-bold tracking-tight text-[#2e3230] leading-tight group-hover:text-[#4a7c59] transition-colors">
              Train Bro
            </span>
            <span className="font-body text-xs text-[#4a4e4a] tracking-normal">
              Calm Journey Companion
            </span>
          </div>
        </button>

        {/* Desktop Navigation Pill Bar */}
        <nav className="hidden xl:flex items-center gap-1 p-1.5 rounded-full bg-[#f5f1ea]">
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <button
                key={item.path}
                onClick={() => onNavigate(item.path)}
                className={`text-sm px-4 py-2 rounded-full transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#f0e8db] text-[#5e5548] font-bold shadow-xs'
                    : 'text-[#4a4e4a] hover:text-[#2e3230] hover:bg-[#eae6de]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Section Actions & Profile */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Active Train Indicator */}
          <button
            onClick={() => onNavigate('live-journey')}
            className="hidden lg:flex items-center gap-2 bg-[#f5f1ea] hover:bg-[#f0ece4] transition-colors px-3.5 py-1.5 rounded-full border border-[#c4c8bc]/30 text-left cursor-pointer"
            title="View Live Journey for 12952"
          >
            <span className="material-symbols-outlined text-[#4a7c59] text-[18px]">train</span>
            <div className="text-xs">
              <span className="font-semibold text-[#2e3230]">12952 Tejas</span>
              <span className="text-[#74796e] mx-1.5">•</span>
              <span className="text-[#4a4e4a]">A1, 31 (LB)</span>
            </div>
          </button>

          {/* 139 Help Button */}
          <button
            onClick={onOpenSOS}
            className="hidden sm:flex items-center gap-1.5 bg-[#f0e8db] px-3 py-1.5 rounded-full hover:bg-[#eae6de] transition-colors text-[#5e5548] cursor-pointer"
            title="RailMadad 139 Special Assistance"
          >
            <span className="material-symbols-outlined text-[#705c30] text-[16px]">support_agent</span>
            <span className="text-xs font-semibold">139 Help</span>
          </button>

          {/* Profile Pill */}
          <div
            onClick={onOpenWallet}
            className="flex items-center gap-2.5 pl-1 cursor-pointer group"
            title="Rahul Kumar (Peace of Mind Mode) - Click to view Google Wallet Pass"
          >
            <div className="text-right hidden md:block">
              <span className="block text-xs font-bold text-[#2e3230] leading-tight">Rahul K.</span>
              <span className="block text-[11px] text-[#4a7c59] font-medium leading-none">
                Peace of Mind Mode
              </span>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#4a7c59] text-white flex items-center justify-center font-bold text-xs shadow-xs group-hover:ring-2 group-hover:ring-[#4a7c59]/40 transition-all">
              <span className="material-symbols-outlined text-[18px]">person</span>
            </div>
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-full hover:bg-[#f0ece4] text-[#2e3230] transition-colors"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#faf6f0] border-t border-[#c4c8bc]/30 px-6 py-4 space-y-2 shadow-lg animate-fadeIn">
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <button
                key={item.path}
                onClick={() => {
                  onNavigate(item.path);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm transition-colors ${
                  isActive
                    ? 'bg-[#f0e8db] text-[#5e5548] font-bold'
                    : 'text-[#4a4e4a] hover:bg-[#f5f1ea]'
                }`}
              >
                <span className="material-symbols-outlined text-[20px] text-[#4a7c59]">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-2 border-t border-[#c4c8bc]/20 flex items-center justify-between text-xs text-[#4a4e4a]">
            <span>Active: 12952 Tejas (A1-31)</span>
            <button
              onClick={() => {
                onOpenSOS();
                setMobileMenuOpen(false);
              }}
              className="text-[#705c30] font-bold underline"
            >
              Dial 139 Help
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
