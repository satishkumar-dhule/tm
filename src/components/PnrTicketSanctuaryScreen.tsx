import React, { useState } from 'react';

interface PnrTicketSanctuaryScreenProps {
  onShowToast: (msg: string) => void;
  onOpenWallet: () => void;
}

export const PnrTicketSanctuaryScreen: React.FC<PnrTicketSanctuaryScreenProps> = ({
  onShowToast,
  onOpenWallet,
}) => {
  const [walletSaved, setWalletSaved] = useState(false);
  const [porterReserved, setPorterReserved] = useState(false);

  const handleWalletClick = () => {
    setWalletSaved(true);
    onOpenWallet();
  };

  const handleSharePass = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Rahul Kumar • Train 12952 Sanctuary Pass',
        text: 'Train 12952 Tejas Rajdhani • Coach A1, Berth 31 (Confirmed). Track my journey live on Train Bro.',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      onShowToast('Sanctuary Pass link copied to clipboard!');
    }
  };

  return (
    <div className="flex flex-col w-full pb-12 animate-fadeIn">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 lg:py-12 space-y-10 lg:space-y-14">
        {/* Reassurance Sanctuary Top Banner */}
        <section className="relative overflow-hidden bg-[#f0ece4] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xs border border-[#c4c8bc]/30">
          <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-[#4a7c59]/10 blur-3xl pointer-events-none"></div>
          <div className="absolute -left-12 -bottom-12 w-64 h-64 rounded-full bg-[#c4a66a]/15 blur-2xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#c8e8d0] text-[#2a6038] text-xs font-bold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-[#4a7c59] animate-pulse"></span>
                100% Guaranteed Berth • Final Chart Prepared
              </div>
              <h1 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#2e3230] leading-tight tracking-tight">
                You're all set, Rahul. Berth confirmed and ready for your restful overnight voyage.
              </h1>
              <div className="flex flex-wrap items-center gap-3 pt-2 text-sm text-[#4a4e4a]">
                <span className="inline-flex items-center gap-1.5 font-medium bg-[#faf6f0] px-3 py-1.5 rounded-xl shadow-xs text-[#2e3230] border border-[#c4c8bc]/20">
                  <span className="material-symbols-outlined text-[#4a7c59] text-[18px]">
                    airplane_ticket
                  </span>
                  PNR:{' '}
                  <strong className="font-headline tracking-wider ml-1 text-[#2e3230]">2418-930214</strong>
                </span>
                <span className="text-[#c4c8bc]">•</span>
                <span className="font-medium text-[#2e3230]">Mumbai Tejas Rajdhani (12952)</span>
                <span className="text-[#c4c8bc]">•</span>
                <span className="inline-flex items-center gap-1 text-[#4a7c59] font-medium">
                  <span className="material-symbols-outlined text-[16px]">verified_user</span>
                  Sanctuary Verified
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <button
                onClick={handleWalletClick}
                className="inline-flex items-center justify-center gap-2.5 bg-[#4a7c59] hover:bg-[#3d694a] text-white font-semibold px-6 py-3.5 rounded-xl shadow-sm transition-all active:scale-[0.98] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
                {walletSaved ? 'View in Google Wallet' : 'Save to Google Wallet'}
              </button>
              <button
                onClick={handleSharePass}
                className="inline-flex items-center justify-center gap-2 bg-[#faf6f0] text-[#2e3230] hover:bg-[#eae6de] font-semibold px-5 py-3 rounded-xl shadow-xs border border-[#c4c8bc]/30 transition-colors text-sm cursor-pointer"
              >
                <span className="material-symbols-outlined text-[#6b6358] text-[18px]">share</span>
                Share Sanctuary Pass
              </button>
            </div>
          </div>
        </section>

        {/* Main Grid: Pass & ML Clarity */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* The Human Boarding Pass & Berth Sanctuary Card (8 Cols) */}
          <section className="lg:col-span-8 space-y-6">
            <div className="bg-[#ffffff] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm border border-[#c4c8bc]/25 relative overflow-hidden">
              {/* Header Meta */}
              <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-[#e4e0d8]/50">
                <div>
                  <span className="text-xs uppercase font-bold tracking-widest text-[#6b6358] block mb-1">
                    Boarding Document
                  </span>
                  <h2 className="font-headline text-2xl font-bold text-[#2e3230]">
                    New Delhi (NDLS) → Mumbai Central (MMCT)
                  </h2>
                  <p className="text-sm text-[#4a4e4a] mt-1">Platform 16 • Departs Today at 16:55 IST</p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 bg-[#f0e8db] text-[#5e5548] rounded-full text-xs font-bold border border-[#c4c8bc]/20">
                    AC First Class (1A)
                  </span>
                  <p className="text-xs text-[#4a4e4a] mt-1.5">Scheduled Arrival: 08:35 IST (+1)</p>
                </div>
              </div>

              {/* Calm Visual Rail Route Bar */}
              <div className="bg-[#f5f1ea] rounded-2xl p-5 my-6 border border-[#c4c8bc]/20">
                <div className="flex items-center justify-between text-xs text-[#4a4e4a] mb-2">
                  <span className="font-semibold text-[#2e3230]">Origin: NDLS</span>
                  <span className="text-[#4a7c59] font-medium">1,384 km • 15h 40m gentle ride</span>
                  <span className="font-semibold text-[#2e3230]">Destination: MMCT</span>
                </div>
                <div className="relative w-full h-3 bg-[#e4e0d8] rounded-full overflow-hidden">
                  <div className="absolute left-0 top-0 h-full bg-[#4a7c59] rounded-full" style={{ width: '42%' }}></div>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#6b6358] mt-2">
                  <span>Gate opens 16:15</span>
                  <span className="font-semibold text-[#4a7c59]">En Route (Approaching BRC)</span>
                  <span>Morning arrival at Bay 1</span>
                </div>
              </div>

              {/* Passenger Details with Reassuring Human Touch */}
              <div className="bg-[#f0ece4] rounded-2xl p-6 space-y-6 border border-[#c4c8bc]/25">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-full bg-[#c8e8d0] flex items-center justify-center text-[#4a7c59] font-bold font-headline text-lg border border-[#4a7c59]/20">
                      RK
                    </div>
                    <div>
                      <h3 className="font-headline text-lg font-bold text-[#2e3230]">Rahul Kumar</h3>
                      <p className="text-xs text-[#4a4e4a]">32 yrs • Male • Primary Guest</p>
                    </div>
                  </div>
                  <div className="bg-[#faf6f0] px-4 py-2 rounded-xl text-left sm:text-right shadow-xs border border-[#c4c8bc]/20">
                    <span className="text-[11px] uppercase tracking-wider text-[#6b6358] font-bold block">
                      Assigned Space
                    </span>
                    <span className="font-headline text-lg font-bold text-[#4a7c59]">
                      Coach A1 • Berth 31
                    </span>
                    <span className="text-xs text-[#4a4e4a] block">Lower Window • Quiet Bay 5</span>
                  </div>
                </div>

                {/* In-coach amenities & comfort status */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="bg-[#ffffff] p-3.5 rounded-xl flex items-center gap-3 border border-[#c4c8bc]/20 shadow-2xs">
                    <span className="material-symbols-outlined text-[#4a7c59] text-[22px]">bed</span>
                    <div>
                      <div className="text-xs font-bold text-[#2e3230]">Sealed Pure Linen</div>
                      <div className="text-[11px] text-[#4a4e4a]">Sanitized, 2 warm blankets</div>
                    </div>
                  </div>
                  <div className="bg-[#ffffff] p-3.5 rounded-xl flex items-center gap-3 border border-[#c4c8bc]/20 shadow-2xs">
                    <span className="material-symbols-outlined text-[#4a7c59] text-[22px]">power</span>
                    <div>
                      <div className="text-xs font-bold text-[#2e3230]">220V Port Verified</div>
                      <div className="text-[11px] text-[#4a4e4a]">Beside pillow & operational</div>
                    </div>
                  </div>
                  <div className="bg-[#ffffff] p-3.5 rounded-xl flex items-center gap-3 border border-[#c4c8bc]/20 shadow-2xs">
                    <span className="material-symbols-outlined text-[#4a7c59] text-[22px]">lock</span>
                    <div>
                      <div className="text-xs font-bold text-[#2e3230]">Under-Seat Lock Ring</div>
                      <div className="text-[11px] text-[#4a4e4a]">Fits up to 30" trolley safely</div>
                    </div>
                  </div>
                </div>

                {/* Meal & Care details */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs bg-[#f5f1ea] px-4 py-3 rounded-xl border border-[#c4c8bc]/20">
                  <div className="flex items-center gap-2 text-[#2e3230]">
                    <span className="material-symbols-outlined text-[#705c30] text-[18px]">
                      restaurant
                    </span>
                    <span>
                      <strong>Meal Choice:</strong> Fresh Hot Veggie Breakfast + Ginger Masala Tea
                    </span>
                  </div>
                  <span className="text-[#4a7c59] font-medium">Included with IRCTC Ticket</span>
                </div>
              </div>

              {/* Soft Perforated Divider Simulation */}
              <div className="relative py-8 flex items-center justify-between">
                <div className="w-7 h-7 -ml-9 sm:-ml-12 rounded-full bg-[#faf6f0] border-r border-[#c4c8bc]/30"></div>
                <div className="flex-1 border-t-2 border-dashed border-[#c4c8bc]/60 mx-3"></div>
                <div className="w-7 h-7 -mr-9 sm:-mr-12 rounded-full bg-[#faf6f0] border-l border-[#c4c8bc]/30"></div>
              </div>

              {/* Pass Footer: Attendant, QR & Barcode */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="w-12 h-12 rounded-full bg-[#eae6de] flex items-center justify-center shrink-0 border border-[#c4c8bc]/30">
                    <span className="material-symbols-outlined text-[#4a4e4a] text-[24px]">
                      support_agent
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#6b6358] font-bold block">
                      Your Coach Attendant
                    </span>
                    <span className="font-headline font-bold text-[#2e3230]">
                      Rajesh K. • Berth Bay 1
                    </span>
                    <span className="text-xs text-[#4a7c59] block">On duty until Vadodara Junction</span>
                  </div>
                </div>

                {/* Stylized QR Section */}
                <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                  <div className="text-right hidden sm:block">
                    <div className="text-xs font-bold text-[#2e3230] font-headline tracking-widest">
                      2418 9302 1400
                    </div>
                    <div className="text-[11px] text-[#4a4e4a]">TTE Quick Scan Ready</div>
                  </div>
                  <div className="w-16 h-16 bg-[#f5f1ea] p-1.5 rounded-xl shadow-inner border border-[#c4c8bc]/30 flex items-center justify-center shrink-0">
                    <svg className="w-full h-full text-[#2e3230]" fill="currentColor" viewBox="0 0 44 44">
                      <rect fill="currentColor" fillOpacity="0.1" height="12" rx="2" width="12" x="2" y="2"></rect>
                      <rect height="8" rx="1" width="8" x="4" y="4"></rect>
                      <rect fill="#faf6f0" height="4" width="4" x="6" y="6"></rect>
                      <rect fill="currentColor" fillOpacity="0.1" height="12" rx="2" width="12" x="30" y="2"></rect>
                      <rect height="8" rx="1" width="8" x="32" y="4"></rect>
                      <rect fill="#faf6f0" height="4" width="4" x="34" y="6"></rect>
                      <rect fill="currentColor" fillOpacity="0.1" height="12" rx="2" width="12" x="2" y="30"></rect>
                      <rect height="8" rx="1" width="8" x="4" y="32"></rect>
                      <rect fill="#faf6f0" height="4" width="4" x="6" y="34"></rect>
                      <circle cx="22" cy="10" r="2"></circle>
                      <circle cx="22" cy="22" r="3"></circle>
                      <circle cx="10" cy="22" r="2"></circle>
                      <circle cx="34" cy="22" r="2"></circle>
                      <circle cx="22" cy="34" r="2"></circle>
                      <circle cx="30" cy="32" r="2"></circle>
                      <circle cx="38" cy="38" r="2"></circle>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Gentle Visual Sanctuary Note */}
            <div className="bg-[#f0ece4] rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 border border-[#c4c8bc]/25">
              <span className="material-symbols-outlined text-[#4a7c59] text-[20px] mt-0.5">spa</span>
              <p className="text-xs sm:text-sm text-[#4a4e4a] leading-relaxed">
                <strong className="text-[#2e3230] font-semibold">Quiet Voyage Promise:</strong> In Coach
                A1, cabin lights dim gently at 22:00. Chilled mineral water and warm earplugs are provided
                upon boarding by Attendant Rajesh.
              </p>
            </div>
          </section>

          {/* Right Column: Machine Learning Confirmation Forecast & RAC Timeline (4 Cols) */}
          <section className="lg:col-span-4 space-y-6">
            {/* Confirmation Insight Card */}
            <div className="bg-[#ffffff] rounded-3xl p-6 sm:p-8 shadow-sm border border-[#c4c8bc]/25 space-y-6">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#705c30] uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[16px]">psychology</span>
                  Confidence Engine
                </div>
                <span className="text-xs bg-[#c8e8d0] text-[#2a6038] px-2.5 py-1 rounded-full font-bold">
                  100% Locked
                </span>
              </div>
              <div>
                <h3 className="font-headline text-xl font-bold text-[#2e3230]">
                  Why your berth was effortlessly secured
                </h3>
                <p className="text-xs text-[#4a4e4a] mt-1.5 leading-relaxed">
                  You initially held WL-2. Train Bro’s predictive model analyzed 8 years of Tuesday Tejas
                  departures to map your seat progress safely.
                </p>
              </div>

              {/* Empathetic Gauge Visualization */}
              <div className="bg-[#f5f1ea] rounded-2xl p-5 flex flex-col items-center justify-center text-center border border-[#c4c8bc]/20">
                <div className="relative w-36 h-36 flex items-center justify-center my-2">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      className="text-[#e4e0d8]"
                      cx="50"
                      cy="50"
                      fill="transparent"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                    ></circle>
                    <circle
                      className="text-[#4a7c59]"
                      cx="50"
                      cy="50"
                      fill="transparent"
                      r="40"
                      stroke="currentColor"
                      strokeDasharray="251.2"
                      strokeDashoffset="0"
                      strokeLinecap="round"
                      strokeWidth="8"
                    ></circle>
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="font-headline text-3xl font-bold text-[#2e3230]">100%</span>
                    <span className="text-[10px] uppercase font-bold text-[#4a7c59] tracking-wide">
                      Confirmed
                    </span>
                  </div>
                </div>
                <p className="text-xs text-[#4a4e4a] mt-2 font-medium">
                  Chart closed with 4 surplus berths remaining in A1.
                </p>
              </div>

              {/* Progression Steps */}
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#4a7c59] flex items-center justify-center text-white text-xs shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[14px]">check</span>
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-[#2e3230] block">Booking Date: WL-2 Assigned</span>
                    <span className="text-[#4a4e4a]">Historical clearance rate: 96% within 48 hours</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#4a7c59] flex items-center justify-center text-white text-xs shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[14px]">check</span>
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-[#2e3230] block">24h Pre-departure: Moved to RAC 1</span>
                    <span className="text-[#4a4e4a]">VIP & Defence quota release shifted seats forward</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#4a7c59] flex items-center justify-center text-white text-xs shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[14px]">done_all</span>
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-[#4a7c59] block">Final Chart: Berth 31 Confirmed</span>
                    <span className="text-[#4a4e4a]">Allocated Lower Window Berth automatically</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-[#f0e8db]/70 rounded-xl text-xs text-[#5e5548] flex items-center gap-2 border border-[#c4c8bc]/30">
                <span className="material-symbols-outlined text-[#705c30] text-[18px]">lightbulb</span>
                <span>Return leg (Mumbai to Delhi on Sunday) is trending at 98% confirmation confidence.</span>
              </div>
            </div>

            {/* Coach Orientation Peep */}
            <div className="bg-[#f0ece4] rounded-3xl p-6 space-y-3 border border-[#c4c8bc]/25">
              <div className="flex items-center justify-between text-xs font-bold text-[#2e3230]">
                <span>Coach Positioning</span>
                <span className="text-[#4a7c59] font-medium">Engine + 4 Coaches</span>
              </div>
              <p className="text-xs text-[#4a4e4a] leading-relaxed">
                Your coach <strong className="text-[#2e3230]">A1</strong> will stop near Escalator 3 on
                Platform 16 at New Delhi Station. Enter through Gate 2 for shortest walking distance.
              </p>
            </div>
          </section>
        </div>

        {/* Peace of Mind Travel Checklist & Add-ons Bento Grid */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-[#4a7c59]">
                Pre-Boarding Harmony
              </span>
              <h2 className="font-headline text-2xl sm:text-3xl font-bold text-[#2e3230]">
                Peace-of-Mind Preparation
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#4a4e4a]">
              Everything curated so you step onto the train with zero stress
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: ID & Entry Checklist */}
            <div className="bg-[#ffffff] p-6 sm:p-7 rounded-3xl shadow-sm border border-[#c4c8bc]/25 flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-2xl bg-[#f0e8db] flex items-center justify-center text-[#5e5548] border border-[#c4c8bc]/20">
                  <span className="material-symbols-outlined text-[22px]">badge</span>
                </div>
                <div>
                  <h3 className="font-headline text-lg font-bold text-[#2e3230]">Valid ID Ready</h3>
                  <p className="text-xs text-[#4a4e4a] mt-1">
                    Carrying any one of the following physical or digital (DigiLocker) IDs is accepted:
                  </p>
                </div>
                <ul className="text-xs text-[#2e3230] space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#4a7c59] text-[16px]">check_circle</span>
                    <span>Aadhaar Card / m-Aadhaar</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#4a7c59] text-[16px]">check_circle</span>
                    <span>Original Driving Licence</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#4a7c59] text-[16px]">check_circle</span>
                    <span>Voter ID or Passport</span>
                  </li>
                </ul>
              </div>
              <div className="pt-4 border-t border-[#e4e0d8]/50 flex items-center justify-between text-xs text-[#4a4e4a]">
                <span>DigiLocker sync</span>
                <span className="text-[#4a7c59] font-bold">Auto-Linked</span>
              </div>
            </div>

            {/* Card 2: Luggage & Porter Service */}
            <div className="bg-[#ffffff] p-6 sm:p-7 rounded-3xl shadow-sm border border-[#c4c8bc]/25 flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-2xl bg-[#c8e8d0] flex items-center justify-center text-[#4a7c59]">
                  <span className="material-symbols-outlined text-[22px]">luggage</span>
                </div>
                <div>
                  <h3 className="font-headline text-lg font-bold text-[#2e3230]">Luggage & Porter Service</h3>
                  <p className="text-xs text-[#4a4e4a] mt-1">
                    First AC allowance: up to 70 kg per passenger free of charge.
                  </p>
                </div>
                <div className="bg-[#f5f1ea] p-3.5 rounded-xl space-y-2 border border-[#c4c8bc]/20">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#2e3230]">Coolie / Porter Pre-book</span>
                    <span className="text-[#4a7c59] font-bold">Fixed ₹120 standard</span>
                  </div>
                  <p className="text-[11px] text-[#4a4e4a]">
                    A verified railway porter will meet you at Car Drop-Off Point (Gate 2).
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setPorterReserved(!porterReserved);
                  onShowToast(
                    porterReserved
                      ? 'Porter reservation cancelled'
                      : '✓ Porter reserved at NDLS Gate 2 for Rahul Kumar (₹120)'
                  );
                }}
                className="w-full py-2.5 px-4 bg-[#faf6f0] hover:bg-[#f0ece4] text-[#2e3230] text-xs font-semibold rounded-xl border border-[#c4c8bc]/30 transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">hail</span>
                {porterReserved ? 'Porter Reserved at NDLS ✓' : 'Reserve Porter at NDLS'}
              </button>
            </div>

            {/* Card 3: Instant Refund Protection */}
            <div className="bg-[#ffffff] p-6 sm:p-7 rounded-3xl shadow-sm border border-[#c4c8bc]/25 flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-2xl bg-[#f0e8db] flex items-center justify-center text-[#705c30]">
                  <span className="material-symbols-outlined text-[22px]">security_update_good</span>
                </div>
                <div>
                  <h3 className="font-headline text-lg font-bold text-[#2e3230]">
                    Train Bro Trip Assurance
                  </h3>
                  <p className="text-xs text-[#4a4e4a] mt-1">
                    Zero anxiety cancellation protection active on your booking.
                  </p>
                </div>
                <div className="space-y-2.5 text-xs text-[#4a4e4a]">
                  <div className="flex items-center justify-between">
                    <span>Free cancellation window:</span>
                    <span className="font-semibold text-[#2e3230]">Until 12:55 IST</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Estimated refund speed:</span>
                    <span className="font-semibold text-[#4a7c59]">&lt; 110 minutes</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Direct payout to:</span>
                    <span className="font-semibold text-[#2e3230]">Original UPI ID</span>
                  </div>
                </div>
              </div>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 text-[11px] text-[#6b6358] font-medium">
                  <span className="material-symbols-outlined text-[14px]">shield</span>
                  Backed by Train Bro Human Guarantee
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Journey Add-ons & Pre-ordered Comforts */}
        <section className="bg-[#ffffff] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm border border-[#c4c8bc]/25 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#6b6358] block mb-1">
                Pre-Arranged Delights
              </span>
              <h2 className="font-headline text-2xl font-bold text-[#2e3230]">
                En-Route Add-ons & Orders
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4a7c59] animate-pulse"></span>
              <span className="text-xs font-semibold text-[#4a7c59]">All Vendors Notified</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Food Pre-order Card */}
            <div className="bg-[#f0ece4] rounded-2xl p-5 sm:p-6 flex flex-col justify-between space-y-4 border border-[#c4c8bc]/25">
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-[#eae6de] overflow-hidden shrink-0 flex items-center justify-center border border-[#c4c8bc]/20">
                    <span className="material-symbols-outlined text-[#4a7c59] text-[32px]">
                      takeout_dining
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="inline-block px-2 py-0.5 bg-[#f8e0a8] text-[#221a05] text-[10px] font-bold rounded-md">
                      Midnight Cravings
                    </div>
                    <h4 className="font-headline text-base font-bold text-[#2e3230]">
                      Haldiram's Gourmet Pack
                    </h4>
                    <p className="text-xs text-[#4a4e4a]">
                      Order #8839 • Rajbhog, Paneer Tikka Wrap & Dry Fruit Lassi
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#4a7c59] bg-[#c8e8d0] px-2.5 py-1 rounded-full shrink-0">
                  Confirmed
                </span>
              </div>
              <div className="bg-[#faf6f0] px-4 py-3 rounded-xl flex items-center justify-between text-xs border border-[#c4c8bc]/20">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#6b6358] text-[16px]">location_on</span>
                  <span className="text-[#2e3230]">Vadodara Jn (BRC) • Platform 2</span>
                </div>
                <span className="text-[#4a4e4a] font-medium">Delivery at 01:53 AM</span>
              </div>
            </div>

            {/* Extra Pillow & Comfort Card */}
            <div className="bg-[#f0ece4] rounded-2xl p-5 sm:p-6 flex flex-col justify-between space-y-4 border border-[#c4c8bc]/25">
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-[#eae6de] overflow-hidden shrink-0 flex items-center justify-center border border-[#c4c8bc]/20">
                    <span className="material-symbols-outlined text-[#4a7c59] text-[32px]">single_bed</span>
                  </div>
                  <div className="space-y-1">
                    <div className="inline-block px-2 py-0.5 bg-[#f0e8db] text-[#5e5548] text-[10px] font-bold rounded-md">
                      Sanctuary Sleep Pack
                    </div>
                    <h4 className="font-headline text-base font-bold text-[#2e3230]">
                      Extra Soft Feather Pillow
                    </h4>
                    <p className="text-xs text-[#4a4e4a]">
                      Request ID #441 • Sealed memory pillow with fresh cotton sleeve
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#4a7c59] bg-[#c8e8d0] px-2.5 py-1 rounded-full shrink-0">
                  Placed on Berth
                </span>
              </div>
              <div className="bg-[#faf6f0] px-4 py-3 rounded-xl flex items-center justify-between text-xs border border-[#c4c8bc]/20">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#6b6358] text-[16px]">room_service</span>
                  <span className="text-[#2e3230]">Attendant Rajesh K. assigned</span>
                </div>
                <span className="text-[#4a7c59] font-medium">Ready at Boarding</span>
              </div>
            </div>
          </div>
        </section>

        {/* Warm Human Departure Footer Note */}
        <div className="text-center py-4 space-y-2">
          <p className="font-headline italic text-[#2e3230] text-base sm:text-lg">
            "May the rhythmic hum of the tracks bring you deep rest tonight."
          </p>
          <p className="text-xs text-[#74796e]">
            Need assistance midway? SMS "CLEAN A1 31" to 58888 or tap 139 from your top bar at any station.
          </p>
        </div>
      </div>
    </div>
  );
};
