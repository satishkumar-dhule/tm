import React, { useState, useEffect } from 'react';
import { ScreenPath } from '../types';

interface LiveJourneyScreenProps {
  onNavigate: (path: ScreenPath) => void;
  onShowToast: (msg: string) => void;
  onOpenWallet: () => void;
  onOpenSOS: () => void;
}

export const LiveJourneyScreen: React.FC<LiveJourneyScreenProps> = ({
  onNavigate,
  onShowToast,
  onOpenWallet,
  onOpenSOS,
}) => {
  const [activeLayer, setActiveLayer] = useState<'gps' | 'platform3d'>('gps');
  const [offlineMode, setOfflineMode] = useState(true);
  const [countdownMinutes, setCountdownMinutes] = useState(38);
  const [speed, setSpeed] = useState(114);

  // Subtle speed and countdown simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setSpeed((s) => (s >= 118 ? 112 : s + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: '12952 Tejas Rajdhani Live Tracking',
        text: 'Tracking Train 12952 live on Transit OS. Next stop Vadodara Junction at 01:53 AM.',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      onShowToast('Live trip link copied to clipboard!');
    }
  };

  return (
    <div className="flex flex-col w-full pb-12 animate-fadeIn">
      {/* Google Transit OS Sub-Header / Search & Chips Ribbon */}
      <section className="bg-[#ffffff]/80 backdrop-blur-md border-b border-[#c4c8bc]/30 px-4 sm:px-6 lg:px-12 py-3.5 space-y-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Pill */}
          <div className="flex-1 max-w-2xl relative">
            <div className="w-full flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#f5f1ea] border border-[#c4c8bc]/40 hover:border-[#4a7c59]/50 focus-within:border-[#4a7c59] focus-within:bg-[#ffffff] focus-within:shadow-md transition-all">
              <span className="material-symbols-outlined text-[#4a7c59] text-[20px]">search</span>
              <input
                type="text"
                defaultValue="12952 Tejas Rajdhani (NDLS → MMCT)"
                className="w-full bg-transparent text-xs sm:text-sm font-medium text-[#2e3230] placeholder:text-[#74796e] border-none outline-none focus:ring-0 p-0"
              />
              <div className="flex items-center gap-1.5 shrink-0 text-[#4a4e4a]">
                <button
                  type="button"
                  onClick={() => onShowToast('Listening for station voice query...')}
                  className="p-1 rounded-full hover:bg-[#eae6de] transition-colors cursor-pointer"
                  title="Voice Search"
                >
                  <span className="material-symbols-outlined text-[19px] text-[#4a7c59]">mic</span>
                </button>
                <button
                  type="button"
                  onClick={() => onShowToast('Google Lens ticket scanner initialized')}
                  className="p-1 rounded-full hover:bg-[#eae6de] transition-colors cursor-pointer"
                  title="Google Lens Train/PNR OCR"
                >
                  <span className="material-symbols-outlined text-[19px] text-[#705c30]">
                    center_focus_strong
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 justify-end">
            <button
              onClick={onOpenSOS}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f0e8db] text-xs font-semibold text-[#5e5548] hover:bg-[#eae6de] transition-colors border border-[#c4c8bc]/20 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[#b83230] text-[16px]">emergency</span>
              <span>RailMadad 139</span>
            </button>
            <div className="h-6 w-px bg-[#c4c8bc]/40 hidden sm:block"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#4a7c59] text-white font-bold text-xs flex items-center justify-center shadow-xs">
                RK
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-bold text-[#2e3230] leading-tight">Rahul Kumar</span>
                <span className="text-[10px] text-[#74796e]">Pixel 9 Pro Connected</span>
              </div>
            </div>
          </div>
        </div>

        {/* At-a-Glance Quick Chips */}
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-x-auto pb-1 text-xs">
          <div className="flex items-center gap-2 shrink-0">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c8e8d0] text-[#002110] font-bold shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4a7c59] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4a7c59]"></span>
              </span>
              <span>12952 Rajdhani (Live GPS)</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eae6de] text-[#2e3230] font-semibold border border-[#c4c8bc]/30">
              <span className="material-symbols-outlined text-[15px] text-[#4a7c59]">confirmation_number</span>
              <span>PNR 2418-930214</span>
              <span className="text-[10px] text-[#4a7c59] font-bold px-1 rounded bg-[#4a7c59]/10">B4/31</span>
            </div>

            <button
              onClick={onOpenWallet}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f0ece4] text-[#2e3230] font-semibold hover:bg-[#eae6de] transition-colors border border-[#c4c8bc]/30 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[#4a7c59] text-[15px]">wallet</span>
              <span>Add to Google Wallet</span>
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f0ece4] text-[#2e3230] font-semibold hover:bg-[#eae6de] transition-colors border border-[#c4c8bc]/30 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px]">share</span>
              <span>Live Trip Share</span>
            </button>
          </div>

          <div className="flex items-center gap-2 shrink-0 pl-2 ml-auto">
            <label className="inline-flex items-center gap-2 cursor-pointer bg-[#f0ece4] px-2.5 py-1 rounded-full border border-[#c4c8bc]/20 text-[11px] font-semibold text-[#4a4e4a]">
              <input
                type="checkbox"
                checked={offlineMode}
                onChange={() => {
                  setOfflineMode(!offlineMode);
                  onShowToast(
                    !offlineMode
                      ? 'Pixel Offline Maps enabled with cached timetables.'
                      : 'Live CRIS satellite stream active.'
                  );
                }}
                className="accent-[#4a7c59] rounded w-3.5 h-3.5 cursor-pointer"
              />
              <span>Pixel Offline Maps & Rail Radar</span>
            </label>
          </div>
        </div>
      </section>

      {/* Main Content Canvas */}
      <main className="flex-1 px-4 sm:px-6 lg:px-12 py-8 flex flex-col gap-6 max-w-7xl w-full mx-auto">
        {/* Interactive Split View: Map (7 cols) vs Live Cards (5 cols) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT SIDE (7 Cols): Custom Vector SVG Transit Map */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="bg-[#ffffff]/90 backdrop-blur-md rounded-3xl border border-[#c4c8bc]/30 p-5 sm:p-6 shadow-xs flex flex-col gap-4 relative overflow-hidden">
              {/* Map Card Header with Map Filter Chips */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-2xl bg-[#c8e8d0] text-[#002110] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">map</span>
                  </div>
                  <div>
                    <h2 className="font-headline font-bold text-base text-[#2e3230]">
                      Western Rail High-Speed Corridor
                    </h2>
                    <p className="text-[11px] text-[#74796e]">
                      Ratlam Jn → Godhra Jn → Vadodara Jn (Section HDN-1)
                    </p>
                  </div>
                </div>

                {/* Layer Toggle Controls */}
                <div className="flex items-center gap-1.5 self-start sm:self-center">
                  <button
                    onClick={() => setActiveLayer('gps')}
                    className={`px-3 py-1 rounded-full text-[11px] font-bold shadow-xs flex items-center gap-1 cursor-pointer transition-colors ${
                      activeLayer === 'gps'
                        ? 'bg-[#4a7c59] text-white'
                        : 'bg-[#f0ece4] text-[#4a4e4a] hover:text-[#2e3230]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[13px]">radar</span>
                    <span>Live GPS</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveLayer('platform3d');
                      onNavigate('station-amenities');
                    }}
                    className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-colors flex items-center gap-1 cursor-pointer ${
                      activeLayer === 'platform3d'
                        ? 'bg-[#4a7c59] text-white'
                        : 'bg-[#f0ece4] text-[#4a4e4a] hover:text-[#2e3230]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[13px]">domain</span>
                    <span>BRC Platform 3D</span>
                  </button>
                </div>
              </div>

              {/* Custom Vector SVG Transit Map Visualization Canvas */}
              <div className="relative w-full h-[380px] sm:h-[420px] rounded-2xl bg-[#f5f1ea] border border-[#c4c8bc]/30 overflow-hidden flex flex-col justify-between p-4">
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox="0 0 700 420"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="bufferGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#4a7c59" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#78a886" stopOpacity="0.10" />
                    </linearGradient>
                  </defs>

                  {/* Soft River/Terrain Contours */}
                  <path
                    d="M-20,120 C180,90 280,240 450,190 C580,150 640,280 720,260"
                    fill="none"
                    stroke="#e4e0d8"
                    strokeWidth="28"
                    strokeLinecap="round"
                    opacity="0.6"
                  />
                  <path
                    d="M-20,120 C180,90 280,240 450,190 C580,150 640,280 720,260"
                    fill="none"
                    stroke="#d4ccbf"
                    strokeWidth="8"
                    strokeLinecap="round"
                    opacity="0.35"
                  />

                  {/* Delay Recovery Buffer Zone */}
                  <polygon
                    points="320,195 560,305 560,345 320,235"
                    fill="url(#bufferGradient)"
                  />

                  {/* Main Double Rail Line Track */}
                  <path
                    d="M40,60 Q180,110 320,200 T580,320 L660,350"
                    fill="none"
                    stroke="#c4c8bc"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                  <path
                    className="rail-flow-anim"
                    d="M40,60 Q180,110 320,200 T580,320 L660,350"
                    fill="none"
                    stroke="#4a7c59"
                    strokeWidth="2.5"
                  />

                  {/* Station Hub 1: Ratlam (Departed) */}
                  <g transform="translate(60, 68)">
                    <circle cx="0" cy="0" r="10" fill="#faf6f0" stroke="#4a7c59" strokeWidth="3" />
                    <circle cx="0" cy="0" r="4" fill="#4a7c59" />
                    <text
                      x="14"
                      y="4"
                      fill="#2e3230"
                      fontFamily="'Nunito Sans', sans-serif"
                      fontSize="12"
                      fontWeight="700"
                    >
                      Ratlam Jn
                    </text>
                    <text
                      x="14"
                      y="18"
                      fill="#74796e"
                      fontFamily="'Nunito Sans', sans-serif"
                      fontSize="10"
                    >
                      Dep 00:44 • Passed
                    </text>
                  </g>

                  {/* Godhra Yard Marker */}
                  <g transform="translate(320, 200)">
                    <circle cx="0" cy="0" r="8" fill="#faf6f0" stroke="#705c30" strokeWidth="2.5" />
                    <circle cx="0" cy="0" r="3" fill="#705c30" />
                    <text
                      x="12"
                      y="-4"
                      fill="#2e3230"
                      fontFamily="'Nunito Sans', sans-serif"
                      fontSize="11"
                      fontWeight="700"
                    >
                      Godhra Yard
                    </text>
                    <text
                      x="12"
                      y="10"
                      fill="#705c30"
                      fontFamily="'Nunito Sans', sans-serif"
                      fontSize="9"
                    >
                      Passed 01:14 AM
                    </text>
                  </g>

                  {/* Live Train Beacon (Current Position) */}
                  <g transform="translate(420, 252)">
                    <circle className="rail-beacon-ring" cx="0" cy="0" r="28" fill="#4a7c59" />
                    <circle
                      cx="0"
                      cy="0"
                      r="12"
                      fill="#4a7c59"
                      stroke="#ffffff"
                      strokeWidth="3"
                      filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.25))"
                    />
                    <path d="M-3,-4 L4,0 L-3,4 Z" fill="#ffffff" />
                  </g>

                  {/* Station Hub 2: Vadodara Jn (NEXT STOP) */}
                  <g transform="translate(580, 320)">
                    <circle cx="0" cy="0" r="14" fill="#faf6f0" stroke="#4a7c59" strokeWidth="4" />
                    <circle cx="0" cy="0" r="6" fill="#4a7c59" />
                    <text
                      x="-12"
                      y="32"
                      fill="#2e3230"
                      fontFamily="'Literata', serif"
                      fontSize="14"
                      fontWeight="800"
                    >
                      Vadodara Jn (BRC)
                    </text>
                    <text
                      x="-12"
                      y="46"
                      fill="#4a7c59"
                      fontFamily="'Nunito Sans', sans-serif"
                      fontSize="11"
                      fontWeight="700"
                    >
                      PF 1 • Arriving 01:53 AM
                    </text>
                  </g>
                </svg>

                {/* Map Overlay Floating Badges */}
                <div className="relative z-10 flex items-start justify-between">
                  <div className="bg-[#ffffff]/95 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-[#c4c8bc]/30 shadow-xs flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#4a7c59] animate-ping"></span>
                    <span className="text-xs font-bold text-[#2e3230]">Live Speed: {speed} km/h</span>
                    <span className="text-[10px] text-[#74796e] font-medium">(Section limit 130 km/h)</span>
                  </div>

                  <div className="bg-[#c8e8d0] text-[#002110] px-3 py-1.5 rounded-2xl font-bold text-xs shadow-xs flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">trending_up</span>
                    <span>Green Buffer: 6m delay absorbed</span>
                  </div>
                </div>

                {/* Map Bottom Platform Dock */}
                <div className="relative z-10 bg-[#ffffff]/95 backdrop-blur-md p-3.5 rounded-2xl border border-[#c4c8bc]/30 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-[#4a7c59] text-white font-bold text-[11px]">
                        BRC Platform 1
                      </span>
                      <span className="font-bold text-[#2e3230]">Coach A1 Berth Spot Alignment</span>
                    </div>
                    <span className="text-[11px] text-[#4a7c59] font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">elevator</span> Foot Overbridge 2
                    </span>
                  </div>

                  {/* Coach Diagram */}
                  <div className="relative bg-[#eae6de] h-10 rounded-xl p-1 flex items-center justify-between border border-[#c4c8bc]/20 overflow-hidden text-[10px]">
                    <div className="px-2 py-1 bg-[#f5f1ea] rounded font-bold text-[#74796e]">Engine</div>
                    <div className="px-2 py-1 bg-[#f5f1ea] rounded text-[#74796e]">B1-B3</div>
                    <div className="px-2.5 py-1 bg-[#4a7c59] text-white rounded-lg font-bold shadow-xs flex items-center gap-1 animate-pulse">
                      <span className="material-symbols-outlined text-[12px]">person_pin</span>
                      <span>A1 (You)</span>
                    </div>
                    <div className="px-2 py-1 bg-[#f5f1ea] rounded text-[#74796e]">A2-H1</div>
                    <div className="px-2 py-1 bg-[#f8e0a8] text-[#221a05] rounded font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px]">stairs</span>
                      <span>FOB Stairs</span>
                    </div>
                    <div className="px-2 py-1 bg-[#f5f1ea] rounded text-[#74796e]">B4-SLR</div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#4a4e4a]">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px] text-[#4a7c59]">
                        arrow_left_alt
                      </span>
                      Exit through Left Door directly opposite Escalator #1
                    </span>
                    <span className="font-semibold text-[#2e3230]">15 steps to FOB-2 Lift</span>
                  </div>
                </div>
              </div>

              {/* Mini Telemetry Strip */}
              <div className="grid grid-cols-3 gap-3 pt-1">
                <div className="p-3 rounded-2xl bg-[#f5f1ea] border border-[#c4c8bc]/20 flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#74796e]">
                    Section Signal
                  </span>
                  <span className="font-headline font-bold text-sm text-green-700 flex items-center gap-1 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-green-600"></span> Double Green
                  </span>
                  <span className="text-[10px] text-[#74796e]">Automatic Block 472</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#f5f1ea] border border-[#c4c8bc]/20 flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#74796e]">
                    Distance to BRC
                  </span>
                  <span className="font-headline font-bold text-sm text-[#2e3230] mt-0.5">
                    48 km remaining
                  </span>
                  <span className="text-[10px] text-[#4a7c59] font-semibold">Slack recovery zone</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#f5f1ea] border border-[#c4c8bc]/20 flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#74796e]">
                    Kavach Interlock
                  </span>
                  <span className="font-headline font-bold text-sm text-[#4a7c59] flex items-center gap-1 mt-0.5">
                    <span className="material-symbols-outlined text-[16px]">verified</span> Active Lock
                  </span>
                  <span className="text-[10px] text-[#74796e]">Safe braking &gt; 3.2 km</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE (5 Cols): Dynamic Card Deck */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Card 1: Live Arrival Hero Pill */}
            <div className="p-5 rounded-3xl bg-[#ffffff]/90 backdrop-blur-md border border-[#c4c8bc]/30 shadow-xs flex flex-col gap-3.5 relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-[#4a7c59]/10 blur-xl pointer-events-none"></div>
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-[#c8e8d0] text-[#002110] font-bold text-[11px] uppercase tracking-wide">
                  Next Approaching Stop
                </span>
                <div className="flex items-center gap-1 text-[11px] text-[#4a7c59] font-bold bg-[#4a7c59]/10 px-2 py-0.5 rounded-full">
                  <span className="material-symbols-outlined text-[14px]">bolt</span>
                  <span>6 mins recovered</span>
                </div>
              </div>
              <div className="flex items-baseline justify-between pt-1">
                <div>
                  <h3 className="font-headline font-black text-2xl sm:text-3xl text-[#2e3230] tracking-tight">
                    Vadodara Jn
                  </h3>
                  <p className="text-xs text-[#4a4e4a] font-semibold">
                    Platform 1 Guaranteed • Left Exit Door
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-headline font-extrabold text-2xl text-[#4a7c59]">
                    {countdownMinutes} mins
                  </div>
                  <div className="text-[11px] text-[#74796e] font-bold">Est. 01:53 AM</div>
                </div>
              </div>
              <div className="p-2.5 rounded-2xl bg-[#f0ece4] flex items-center gap-2.5 border border-[#c4c8bc]/20 text-xs">
                <span className="material-symbols-outlined text-[#4a7c59] text-[18px] shrink-0">speed</span>
                <span className="text-[#2e3230] font-medium leading-snug">
                  Punctuality score: <strong className="text-[#4a7c59] font-bold">98.4%</strong>. Driver
                  accelerated along the Godhra straightaway to regain lost slot.
                </span>
              </div>
            </div>

            {/* Card 2: Exit Door & Station Nav */}
            <div className="p-4 rounded-3xl bg-[#ffffff]/90 backdrop-blur-md border border-[#c4c8bc]/30 shadow-xs flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#2e3230] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#4a7c59] text-[18px]">door_front</span>
                  Exit & Station Nav
                </span>
                <span className="text-[11px] font-bold text-[#74796e]">Coach A1 (Berth 31)</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 rounded-2xl bg-[#f5f1ea] border border-[#c4c8bc]/20 flex flex-col gap-1">
                  <span className="text-[10px] text-[#74796e] font-bold uppercase">Exit Direction</span>
                  <span className="font-headline font-bold text-sm text-[#4a7c59] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">arrow_back</span> Left Side
                  </span>
                  <span className="text-[10px] text-[#74796e]">Facing train travel direction</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#f5f1ea] border border-[#c4c8bc]/20 flex flex-col gap-1">
                  <span className="text-[10px] text-[#74796e] font-bold uppercase">To Main Exit / Cab</span>
                  <span className="font-headline font-bold text-sm text-[#2e3230] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">directions_walk</span> 15 Steps
                  </span>
                  <span className="text-[10px] text-[#74796e]">Direct access to FOB-2 Lift</span>
                </div>
              </div>
            </div>

            {/* Card 3: Connecting Train Layover Radar */}
            <div className="p-4 rounded-3xl bg-[#ffffff]/90 backdrop-blur-md border border-[#c4c8bc]/30 shadow-xs flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#705c30] text-[18px]">alt_route</span>
                  <span className="font-bold text-[#2e3230]">Connecting Rail Layover Radar</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#c8e8d0] text-[#002110] font-bold text-[10px]">
                  98% Guaranteed
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-[#f0e8db]/60 border border-[#c4c8bc]/20 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-[#2e3230]">19020 Dehradun Express</div>
                  <div className="text-[11px] text-[#4a4e4a]">Departs BRC Platform 3 at 02:40 AM</div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black text-[#4a7c59] block">47m safe window</span>
                  <span className="text-[10px] text-[#74796e]">Walk time: 3 mins</span>
                </div>
              </div>
            </div>

            {/* Card 4: Pixel Boarding Pass */}
            <div className="p-5 rounded-3xl bg-[#ffffff]/90 backdrop-blur-md border border-[#c4c8bc]/30 shadow-xs flex flex-col gap-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#4a7c59] text-white flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">wallet</span>
                  </div>
                  <div>
                    <h4 className="font-headline font-bold text-sm text-[#2e3230]">Pixel Boarding Pass</h4>
                    <p className="text-[10px] text-[#74796e]">Live Lock Screen Dynamic Island</p>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#f0ece4] font-mono font-bold text-[#2e3230]">
                  PNR 2418-930214
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#f0ece4] to-[#eae6de] border border-[#c4c8bc]/30 flex items-center justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <div className="flex items-baseline gap-2">
                    <span className="font-headline font-black text-base text-[#2e3230]">NDLS</span>
                    <span className="material-symbols-outlined text-[#4a7c59] text-[14px]">
                      arrow_forward
                    </span>
                    <span className="font-headline font-black text-base text-[#2e3230]">MMCT</span>
                  </div>
                  <div className="text-[11px] text-[#4a4e4a] font-medium">
                    Rahul Kumar • Coach A1 • Berth 31 (LB)
                  </div>
                  <div className="text-[10px] text-[#4a7c59] font-bold flex items-center gap-1 mt-0.5">
                    <span className="material-symbols-outlined text-[13px]">
                      airline_seat_recline_extra
                    </span>
                    <span>Confirmed IRCTC E-Ticket</span>
                  </div>
                </div>

                <div className="p-1.5 bg-[#ffffff] rounded-xl border border-[#c4c8bc]/30 shrink-0">
                  <svg className="w-14 h-14" fill="none" viewBox="0 0 60 60">
                    <rect fill="#faf6f0" height="60" rx="4" width="60"></rect>
                    <rect fill="#2e3230" height="16" rx="2" width="16" x="6" y="6"></rect>
                    <rect fill="#faf6f0" height="8" width="8" x="10" y="10"></rect>
                    <rect fill="#4a7c59" height="4" width="4" x="12" y="12"></rect>
                    <rect fill="#2e3230" height="16" rx="2" width="16" x="38" y="6"></rect>
                    <rect fill="#faf6f0" height="8" width="8" x="42" y="10"></rect>
                    <rect fill="#4a7c59" height="4" width="4" x="44" y="12"></rect>
                    <rect fill="#2e3230" height="16" rx="2" width="16" x="6" y="38"></rect>
                    <rect fill="#faf6f0" height="8" width="8" x="10" y="42"></rect>
                    <rect fill="#4a7c59" height="4" width="4" x="12" y="44"></rect>
                    <rect fill="#2e3230" height="6" width="6" x="26" y="10"></rect>
                    <rect fill="#4a7c59" height="8" width="8" x="26" y="24"></rect>
                    <rect fill="#2e3230" height="8" width="8" x="38" y="38"></rect>
                    <rect fill="#4a7c59" height="6" width="6" x="48" y="48"></rect>
                  </svg>
                </div>
              </div>

              <button
                type="button"
                onClick={onOpenWallet}
                className="w-full py-2.5 rounded-2xl bg-[#4a7c59] hover:bg-[#3d694a] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">add_to_home_screen</span>
                <span>Push Live Pass to Google Wallet</span>
              </button>
            </div>
          </div>
        </section>

        {/* Multimodal Travel Assistant (Gemini Live Integration) */}
        <section className="rounded-3xl bg-gradient-to-r from-[#f0e8db]/90 via-[#f5f1ea] to-[#ffffff] p-5 sm:p-6 border border-[#c4c8bc]/30 shadow-xs flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-[#4a7c59] text-white flex items-center justify-center shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-[24px]">mic</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold uppercase tracking-wide text-[#4a7c59]">
                    Gemini Live Assistant
                  </span>
                  <span className="text-[10px] font-bold bg-[#4a7c59]/15 text-[#4a7c59] px-2 py-0.5 rounded-full">
                    Voice & Vision Ready
                  </span>
                </div>
                <p className="text-sm font-headline font-bold text-[#2e3230] mt-0.5">
                  "Tap to ask Gemini: 'Is the platform tea stall open at Vadodara?'"
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('gemini-rail-guide')}
              className="shrink-0 px-4 py-2.5 rounded-2xl bg-[#4a7c59] text-white hover:bg-[#3d694a] text-xs font-bold transition-all shadow-xs flex items-center gap-2 self-start md:self-center cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">graphic_eq</span>
              <span>Talk to Gemini</span>
            </button>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-1">
            <button
              type="button"
              onClick={() => onShowToast('Translating Vadodara Station Live Hindi/Gujarati tannoy to English...')}
              className="shrink-0 px-3.5 py-1.5 rounded-full bg-[#ffffff] hover:bg-[#f0ece4] border border-[#c4c8bc]/30 text-xs font-semibold text-[#2e3230] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-[#4a7c59]">translate</span>
              <span>Translate station announcements to English</span>
            </button>

            <button
              type="button"
              onClick={() => onShowToast('Opening IRCTC e-Catering for Vadodara Platform 1 delivery...')}
              className="shrink-0 px-3.5 py-1.5 rounded-full bg-[#ffffff] hover:bg-[#f0ece4] border border-[#c4c8bc]/30 text-xs font-semibold text-[#2e3230] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-[#705c30]">restaurant</span>
              <span>Order midnight snack via IRCTC Ecatering</span>
            </button>

            <button
              type="button"
              onClick={() => onShowToast('Trip ETA (08:35 AM Mumbai Central) dispatched to family emergency contact.')}
              className="shrink-0 px-3.5 py-1.5 rounded-full bg-[#ffffff] hover:bg-[#f0ece4] border border-[#c4c8bc]/30 text-xs font-semibold text-[#2e3230] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-[#4a7c59]">share_location</span>
              <span>Notify emergency contact</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('gemini-rail-guide')}
              className="shrink-0 px-3.5 py-1.5 rounded-full bg-[#ffffff] hover:bg-[#f0ece4] border border-[#c4c8bc]/30 text-xs font-semibold text-[#2e3230] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-[#4a4e4a]">shield_person</span>
              <span>Contact Coach Attendant</span>
            </button>
          </div>
        </section>

        {/* Station & Journey Pulse horizontal stepper */}
        <section className="rounded-3xl bg-[#ffffff]/90 backdrop-blur-md p-5 sm:p-6 border border-[#c4c8bc]/30 shadow-xs flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#c4c8bc]/20 pb-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#4a7c59] text-[20px]">linear_scale</span>
              <h3 className="font-headline font-bold text-base text-[#2e3230]">Station & Journey Pulse</h3>
              <span className="text-xs text-[#74796e] font-medium">• 1,384 km full itinerary</span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 font-semibold text-[#4a4e4a]">
                <span className="w-2 h-2 rounded-full bg-[#4a7c59]"></span> Passed
              </span>
              <span className="flex items-center gap-1 font-semibold text-[#4a7c59]">
                <span className="w-2 h-2 rounded-full bg-[#4a7c59] animate-ping"></span> Active Halt
              </span>
              <span className="flex items-center gap-1 font-semibold text-[#74796e]">
                <span className="w-2 h-2 rounded-full bg-[#c4c8bc]"></span> Upcoming
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-1">
            {/* Stop 1: Kota */}
            <div className="p-3.5 rounded-2xl bg-[#f5f1ea] border border-[#c4c8bc]/20 flex flex-col justify-between gap-3">
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 rounded-full bg-[#4a7c59]/10 text-[#4a7c59] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[15px]">check</span>
                </span>
                <span className="text-[10px] font-bold text-[#4a4e4a] bg-[#f0ece4] px-2 py-0.5 rounded-full">
                  PF 1
                </span>
              </div>
              <div>
                <h4 className="font-headline font-bold text-sm text-[#2e3230]">Kota Jn</h4>
                <p className="text-[11px] text-[#74796e]">Passed 22:14 (+4m)</p>
              </div>
              <div className="flex items-center justify-between text-[10px] text-[#74796e] pt-2 border-t border-[#c4c8bc]/20">
                <span>Halt: 10 mins</span>
                <span className="text-[#4a7c59] font-bold">Low crowd</span>
              </div>
            </div>

            {/* Stop 2: Ratlam */}
            <div className="p-3.5 rounded-2xl bg-[#f5f1ea] border border-[#c4c8bc]/20 flex flex-col justify-between gap-3">
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 rounded-full bg-[#4a7c59]/10 text-[#4a7c59] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[15px]">check</span>
                </span>
                <span className="text-[10px] font-bold text-[#4a4e4a] bg-[#f0ece4] px-2 py-0.5 rounded-full">
                  PF 4
                </span>
              </div>
              <div>
                <h4 className="font-headline font-bold text-sm text-[#2e3230]">Ratlam Jn</h4>
                <p className="text-[11px] text-[#74796e]">Departed 00:44 (+9m)</p>
              </div>
              <div className="flex items-center justify-between text-[10px] text-[#74796e] pt-2 border-t border-[#c4c8bc]/20">
                <span>Halt: 5 mins</span>
                <span className="text-[#705c30] font-bold">Moderate crowd</span>
              </div>
            </div>

            {/* Stop 3: Vadodara (NEXT ACTIVE) */}
            <div
              onClick={() => onNavigate('station-amenities')}
              className="p-3.5 rounded-2xl bg-[#4a7c59]/10 border-2 border-[#4a7c59] flex flex-col justify-between gap-3 shadow-xs cursor-pointer hover:bg-[#4a7c59]/15 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 rounded-full bg-[#4a7c59] text-white flex items-center justify-center animate-pulse">
                  <span className="material-symbols-outlined text-[15px]">navigation</span>
                </span>
                <span className="text-[10px] font-bold bg-[#4a7c59] text-white px-2 py-0.5 rounded-full">
                  PF 1 Verified
                </span>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <h4 className="font-headline font-extrabold text-sm text-[#2e3230]">Vadodara Jn</h4>
                  <span className="text-[9px] bg-[#4a7c59] text-white px-1.5 py-0.2 rounded font-bold">
                    NEXT
                  </span>
                </div>
                <p className="text-[11px] text-[#4a7c59] font-bold">In {countdownMinutes} mins (01:53 AM)</p>
              </div>
              <div className="flex items-center justify-between text-[10px] text-[#4a4e4a] pt-2 border-t border-[#4a7c59]/20">
                <span className="text-[#4a7c59] font-bold">+12m → +6m recov</span>
                <span className="text-[#4a7c59] font-bold">Night calm</span>
              </div>
            </div>

            {/* Stop 4: Surat */}
            <div className="p-3.5 rounded-2xl bg-[#ffffff] border border-[#c4c8bc]/20 flex flex-col justify-between gap-3 opacity-90">
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 rounded-full bg-[#f0ece4] text-[#74796e] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[14px]">schedule</span>
                </span>
                <span className="text-[10px] font-bold text-[#4a4e4a] bg-[#f0ece4] px-2 py-0.5 rounded-full">
                  PF 2
                </span>
              </div>
              <div>
                <h4 className="font-headline font-bold text-sm text-[#2e3230]">Surat</h4>
                <p className="text-[11px] text-[#74796e]">Expected 03:30 AM</p>
              </div>
              <div className="flex items-center justify-between text-[10px] text-[#74796e] pt-2 border-t border-[#c4c8bc]/20">
                <span>Halt: 5 mins</span>
                <span className="text-[#4a7c59] font-bold">RT Forecast</span>
              </div>
            </div>

            {/* Stop 5: Mumbai Central */}
            <div className="p-3.5 rounded-2xl bg-[#ffffff] border border-[#c4c8bc]/20 flex flex-col justify-between gap-3 opacity-80">
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 rounded-full bg-[#f0ece4] text-[#4a7c59] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[15px]">flag</span>
                </span>
                <span className="text-[10px] font-bold text-[#4a4e4a] bg-[#f0ece4] px-2 py-0.5 rounded-full">
                  PF 5
                </span>
              </div>
              <div>
                <h4 className="font-headline font-bold text-sm text-[#2e3230]">Mumbai Central</h4>
                <p className="text-[11px] text-[#74796e]">Arrival 08:35 AM</p>
              </div>
              <div className="flex items-center justify-between text-[10px] text-[#74796e] pt-2 border-t border-[#c4c8bc]/20">
                <span className="text-[#4a7c59] font-bold">Right Time</span>
                <span className="text-[#74796e]">Metro 3 Line Sync</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
