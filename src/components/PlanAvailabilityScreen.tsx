import React, { useState } from 'react';
import { ScreenPath } from '../types';

interface PlanAvailabilityScreenProps {
  onNavigate: (path: ScreenPath) => void;
  onOpenBlueprint: (coachNumber: string) => void;
  onBookTrain: (trainName: string, selectedClass: string, price: number) => void;
  onShowToast: (msg: string) => void;
}

export const PlanAvailabilityScreen: React.FC<PlanAvailabilityScreenProps> = ({
  onNavigate,
  onOpenBlueprint,
  onBookTrain,
  onShowToast,
}) => {
  const [isOvernight, setIsOvernight] = useState(true);
  const [origin, setOrigin] = useState({ code: 'NDLS', name: 'New Delhi', zone: 'Northern Railway' });
  const [destination, setDestination] = useState({ code: 'MMCT', name: 'Mumbai Central', zone: 'Western Railway' });
  const [selectedClass12952, setSelectedClass12952] = useState<'1A' | '2A' | '3A'>('2A');
  const [activePreferences, setActivePreferences] = useState<string[]>(['ac', 'pantry', 'lower']);

  const handleSwap = () => {
    const temp = { ...origin };
    setOrigin(destination);
    setDestination(temp);
    onShowToast(`Route swapped: ${destination.name} ⇄ ${origin.name}`);
  };

  const togglePref = (key: string) => {
    setActivePreferences((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const prices: Record<'1A' | '2A' | '3A', number> = {
    '1A': 4850,
    '2A': 3240,
    '3A': 2380,
  };

  return (
    <div className="flex flex-col w-full pb-12 animate-fadeIn">
      {/* Top Calming Notification / Reassurance Ribbon */}
      <section className="w-full bg-[#f0e8db]/60 border-b border-[#c4c8bc]/20 px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs text-[#5e5548]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4a7c59] text-[18px]">verified</span>
            <span className="font-medium">
              Direct Indian Railways CRIS real-time feed • Seat availability refreshed 34 seconds ago
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#4a7c59] animate-pulse"></span>
              Low cancellation rate on this corridor
            </span>
            <span className="hidden sm:inline text-[#c4c8bc]">•</span>
            <span className="hidden sm:inline font-bold text-[#705c30]">
              Zero convenience fee on first mindful booking
            </span>
          </div>
        </div>
      </section>

      {/* Editorial Search & Wayfinding Section */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-12 pt-8 pb-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs uppercase tracking-widest font-bold text-[#705c30]">
                Calm Corridor Planner
              </span>
              <span className="w-8 h-px bg-[#c4c8bc]"></span>
              <span className="text-xs font-semibold text-[#4a7c59] bg-[#4a7c59]/10 px-2.5 py-0.5 rounded-full">
                High Availability Route
              </span>
            </div>
            <h1 className="font-headline text-3xl sm:text-4xl lg:text-5xl text-[#2e3230] font-semibold tracking-tight leading-tight">
              Find Your Restful Journey
            </h1>
            <p className="font-body text-base text-[#4a4e4a] mt-2 max-w-xl">
              {origin.name} ({origin.code}){' '}
              <span className="text-[#4a7c59] font-bold">→</span> {destination.name} ({destination.code})
              • Curated for undisturbed sleep, verified cleanliness, and predictable schedules.
            </p>
          </div>

          {/* Quick Route Rhythm Badges */}
          <div className="flex items-center gap-2 sm:gap-3 bg-[#f5f1ea] p-1.5 rounded-full shadow-xs shrink-0 border border-[#c4c8bc]/30">
            <button
              onClick={() => setIsOvernight(true)}
              className={`text-xs font-semibold px-4 py-2 rounded-full transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                isOvernight
                  ? 'bg-[#4a7c59] text-white shadow-xs'
                  : 'text-[#4a4e4a] hover:text-[#2e3230]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">bedtime</span>
              Sleep-through Overnight
            </button>
            <button
              onClick={() => setIsOvernight(false)}
              className={`text-xs font-semibold px-4 py-2 rounded-full transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                !isOvernight
                  ? 'bg-[#4a7c59] text-white shadow-xs'
                  : 'text-[#4a4e4a] hover:text-[#2e3230]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">wb_sunny</span>
              Scenic Daylight
            </button>
          </div>
        </div>

        {/* Minimal Elegant Search Strip Card */}
        <div className="bg-[#f0ece4] rounded-2xl p-4 sm:p-6 shadow-sm relative overflow-hidden border border-[#c4c8bc]/30">
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#4a7c59]/5 rounded-full blur-2xl pointer-events-none"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3.5 items-center">
            {/* Origin */}
            <div className="lg:col-span-3 bg-[#faf6f0] rounded-xl p-3.5 flex items-center gap-3 shadow-[0_2px_8px_rgba(46,50,48,0.03)] border border-[#c4c8bc]/20">
              <div className="w-9 h-9 rounded-full bg-[#f0e8db] flex items-center justify-center text-[#705c30] shrink-0">
                <span className="material-symbols-outlined text-[20px]">trip_origin</span>
              </div>
              <div className="min-w-0">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-[#74796e]">
                  From Origin
                </span>
                <span className="font-headline font-bold text-base text-[#2e3230] truncate block">
                  {origin.name} ({origin.code})
                </span>
                <span className="text-[11px] text-[#4a4e4a]">{origin.zone}</span>
              </div>
            </div>

            {/* Swap Icon Pin */}
            <div className="hidden lg:flex lg:col-span-1 justify-center -mx-4 z-10">
              <button
                onClick={handleSwap}
                aria-label="Swap stations"
                className="w-9 h-9 rounded-full bg-[#e4e0d8] hover:bg-[#dbd7cf] text-[#4a4e4a] flex items-center justify-center transition-transform hover:rotate-180 shadow-xs cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">sync_alt</span>
              </button>
            </div>

            {/* Destination */}
            <div className="lg:col-span-3 bg-[#faf6f0] rounded-xl p-3.5 flex items-center gap-3 shadow-[0_2px_8px_rgba(46,50,48,0.03)] border border-[#c4c8bc]/20">
              <div className="w-9 h-9 rounded-full bg-[#f0e8db] flex items-center justify-center text-[#4a7c59] shrink-0">
                <span className="material-symbols-outlined text-[20px]">location_on</span>
              </div>
              <div className="min-w-0">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-[#74796e]">
                  To Destination
                </span>
                <span className="font-headline font-bold text-base text-[#2e3230] truncate block">
                  {destination.name} ({destination.code})
                </span>
                <span className="text-[11px] text-[#4a4e4a]">{destination.zone}</span>
              </div>
            </div>

            {/* Date Picker Capsule */}
            <div className="lg:col-span-3 bg-[#faf6f0] rounded-xl p-3.5 flex items-center gap-3 shadow-[0_2px_8px_rgba(46,50,48,0.03)] border border-[#c4c8bc]/20">
              <div className="w-9 h-9 rounded-full bg-[#f0e8db] flex items-center justify-center text-[#6b6358] shrink-0">
                <span className="material-symbols-outlined text-[20px]">calendar_today</span>
              </div>
              <div className="min-w-0">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-[#74796e]">
                  Departure Date
                </span>
                <span className="font-headline font-bold text-base text-[#2e3230]">
                  Tomorrow • Fri, Oct 3
                </span>
                <span className="text-[11px] text-[#4a7c59] font-medium">Clear weather forecast</span>
              </div>
            </div>

            {/* Search Button */}
            <div className="lg:col-span-2 flex items-center">
              <button
                onClick={() => onShowToast('Searching verified real-time Indian Railways schedules...')}
                className="w-full h-[58px] bg-[#4a7c59] hover:bg-[#3d694a] text-white font-headline font-semibold text-base rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <span className="material-symbols-outlined text-[20px]">search</span>
                Search Trains
              </button>
            </div>
          </div>

          {/* Quick Filter Pills */}
          <div className="mt-4 pt-4 border-t border-[#c4c8bc]/30 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[#74796e] font-semibold">Preferences:</span>
            <button
              onClick={() => togglePref('ac')}
              className={`px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5 font-medium cursor-pointer ${
                activePreferences.includes('ac')
                  ? 'bg-[#4a7c59] text-white shadow-xs'
                  : 'bg-[#faf6f0] text-[#2e3230] hover:bg-[#e4e0d8]'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">airline_seat_recline_extra</span>
              All AC Classes
            </button>
            <button
              onClick={() => togglePref('pantry')}
              className={`px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5 font-medium cursor-pointer ${
                activePreferences.includes('pantry')
                  ? 'bg-[#4a7c59] text-white shadow-xs'
                  : 'bg-[#faf6f0] text-[#2e3230] hover:bg-[#e4e0d8]'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">restaurant</span>
              Pantry Car Attached
            </button>
            <button
              onClick={() => togglePref('lower')}
              className={`px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5 font-medium cursor-pointer ${
                activePreferences.includes('lower')
                  ? 'bg-[#4a7c59] text-white shadow-xs'
                  : 'bg-[#faf6f0] text-[#2e3230] hover:bg-[#e4e0d8]'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">bed</span>
              Guaranteed Lower Berth Preference
            </button>
            <button
              onClick={() => togglePref('fast')}
              className={`px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5 font-medium cursor-pointer ${
                activePreferences.includes('fast')
                  ? 'bg-[#4a7c59] text-white shadow-xs'
                  : 'bg-[#faf6f0] text-[#2e3230] hover:bg-[#e4e0d8]'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">speed</span>
              Fast Express (&lt; 16 hrs)
            </button>
          </div>
        </div>
      </section>

      {/* Gemini Rail Guide Advisor Banner */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-12 py-2">
        <div className="bg-[#f5f1ea] rounded-2xl p-5 shadow-xs border border-[#c4c8bc]/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#c4a66a]/25 text-[#705c30] flex items-center justify-center shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[22px]">psychology</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-headline font-bold text-sm text-[#2e3230]">
                  Gemini Travel Advisor Insight
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#f0e8db] text-[#5e5548]">
                  Friday Route Intelligence
                </span>
              </div>
              <p className="font-body text-sm text-[#4a4e4a] mt-1 leading-relaxed">
                "Friday departures to Mumbai experience strong business weekend traffic. Coach{' '}
                <strong className="text-[#2e3230]">2A on 12952 (Mumbai Tejas Rajdhani)</strong> maintains
                a 99% on-time record and superior sound isolation, making it our primary recommendation for
                restful sleep."
              </p>
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-2">
            <span className="text-xs text-[#4a4e4a]">
              Confidence: <strong className="text-[#4a7c59] font-bold">96% Optimal</strong>
            </span>
            <button
              onClick={() => onNavigate('gemini-rail-guide')}
              className="text-xs font-semibold text-[#4a7c59] hover:text-[#3d694a] transition-colors flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#faf6f0] shadow-xs cursor-pointer"
            >
              Ask Rail Guide
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Rail Availability Split Screen / Bento Layout */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-12 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Train Availability Cards (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* FEATURED PICK: 12952 Tejas Rajdhani */}
            <article className="bg-[#f0ece4] rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-all duration-300 border border-[#c4c8bc]/30 relative overflow-hidden">
              {/* Featured Tag Accent */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-2">
                  <span className="bg-[#4a7c59] text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1 shadow-xs">
                    <span className="material-symbols-outlined text-[14px]">award_star</span>
                    Top Restful Recommendation
                  </span>
                  <span className="bg-[#faf6f0] text-[#4a4e4a] text-xs px-2.5 py-1 rounded-full font-medium">
                    Daily Service
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#4a7c59] font-bold bg-[#4a7c59]/10 px-3 py-1 rounded-full">
                  <span className="material-symbols-outlined text-[16px]">timer</span>
                  98.4% Punctuality Rating
                </div>
              </div>

              {/* Train Main Heading & Identifier */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4">
                <div>
                  <h2 className="font-headline text-2xl sm:text-3xl font-bold text-[#2e3230] tracking-tight">
                    Mumbai Tejas Rajdhani
                  </h2>
                  <span className="text-sm font-semibold text-[#705c30]">
                    Train #12952 • The Premier Overnight Sanctuary
                  </span>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-xs text-[#74796e] block">Total Travel Time</span>
                  <span className="font-headline font-semibold text-lg text-[#2e3230]">15h 40m</span>
                </div>
              </div>

              {/* Station Run Timeline Grid */}
              <div className="bg-[#faf6f0] rounded-xl p-5 my-3 shadow-[0_1px_6px_rgba(46,50,48,0.03)] border border-[#c4c8bc]/20">
                <div className="grid grid-cols-12 items-center gap-2">
                  <div className="col-span-4">
                    <span className="font-headline text-2xl sm:text-3xl font-bold text-[#2e3230] block">
                      16:55
                    </span>
                    <span className="text-xs font-semibold text-[#2e3230] block">New Delhi</span>
                    <span className="text-[11px] text-[#74796e]">Platform 1 • Oct 03</span>
                  </div>

                  {/* Journey Progress Bar Graphic */}
                  <div className="col-span-4 flex flex-col items-center">
                    <div className="flex items-center justify-center gap-1 text-[11px] text-[#4a4e4a] font-medium mb-1">
                      <span>6 intermediate halts</span>
                    </div>
                    <div className="w-full flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#4a7c59] shrink-0"></div>
                      <div className="h-1 flex-1 bg-[#e4e0d8] rounded-full relative overflow-hidden">
                        <div className="h-full bg-[#4a7c59] w-2/3 rounded-full"></div>
                      </div>
                      <div className="w-2.5 h-2.5 rounded-full bg-[#705c30] shrink-0"></div>
                    </div>
                    <span className="text-[10px] text-[#74796e] mt-1 font-medium">1,386 km corridor</span>
                  </div>

                  <div className="col-span-4 text-right">
                    <span className="font-headline text-2xl sm:text-3xl font-bold text-[#2e3230] block">
                      08:35
                    </span>
                    <span className="text-xs font-semibold text-[#2e3230] block">Mumbai Central</span>
                    <span className="text-[11px] text-[#74796e]">Platform 5 • Oct 04 (Next Day)</span>
                  </div>
                </div>
              </div>

              {/* Calm Feature Chips */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 my-4">
                <div className="bg-[#f5f1ea] rounded-xl p-3 flex items-center gap-2.5 border border-[#c4c8bc]/20">
                  <span className="material-symbols-outlined text-[#4a7c59] text-[20px]">
                    night_shelter
                  </span>
                  <div className="text-xs">
                    <span className="font-bold text-[#2e3230] block">Quiet Hours Protocol</span>
                    <span className="text-[#74796e] text-[11px]">Lights dimmed 11 PM – 6 AM</span>
                  </div>
                </div>
                <div className="bg-[#f5f1ea] rounded-xl p-3 flex items-center gap-2.5 border border-[#c4c8bc]/20">
                  <span className="material-symbols-outlined text-[#705c30] text-[20px]">
                    soup_kitchen
                  </span>
                  <div className="text-xs">
                    <span className="font-bold text-[#2e3230] block">Curated Dining</span>
                    <span className="text-[#74796e] text-[11px]">Warm dinner & breakfast</span>
                  </div>
                </div>
                <div className="bg-[#f5f1ea] rounded-xl p-3 flex items-center gap-2.5 border border-[#c4c8bc]/20">
                  <span className="material-symbols-outlined text-[#4a7c59] text-[20px]">air</span>
                  <div className="text-xs">
                    <span className="font-bold text-[#2e3230] block">Smart Aeration</span>
                    <span className="text-[#74796e] text-[11px]">Filtered HEPA airflow</span>
                  </div>
                </div>
              </div>

              {/* Availability & Class Tiers with Peace-of-Mind Badges */}
              <div className="mt-5 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#74796e] block">
                  Select Class & Real-time Berth Confirmation
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Class 1A Tier */}
                  <div
                    onClick={() => setSelectedClass12952('1A')}
                    className={`rounded-xl p-4 cursor-pointer relative transition-all border ${
                      selectedClass12952 === '1A'
                        ? 'bg-[#4a7c59]/10 border-[#4a7c59] shadow-sm'
                        : 'bg-[#faf6f0] border-[#c4c8bc]/30 hover:bg-[#f5f1ea]'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-headline font-bold text-lg text-[#2e3230]">1A</span>
                      <span className="text-xs font-semibold text-[#4a7c59] bg-[#4a7c59]/10 px-2 py-0.5 rounded-full">
                        Available 08
                      </span>
                    </div>
                    <span className="text-xs text-[#4a4e4a] block mb-3">Executive Coupe Suite</span>
                    <div className="flex items-baseline justify-between pt-2">
                      <span className="font-headline font-bold text-xl text-[#2e3230]">₹4,850</span>
                      <span className="text-[11px] text-[#74796e] font-medium">All incl.</span>
                    </div>
                  </div>

                  {/* Class 2A Tier (Recommended) */}
                  <div
                    onClick={() => setSelectedClass12952('2A')}
                    className={`rounded-xl p-4 cursor-pointer relative transition-all border ${
                      selectedClass12952 === '2A'
                        ? 'bg-[#4a7c59]/10 border-[#4a7c59] shadow-sm ring-1 ring-[#4a7c59]'
                        : 'bg-[#faf6f0] border-[#c4c8bc]/30 hover:bg-[#f5f1ea]'
                    }`}
                  >
                    <div className="absolute -top-2.5 right-3 bg-[#705c30] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                      Most Peaceful
                    </div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-headline font-bold text-lg text-[#2e3230]">2A</span>
                      <span className="text-xs font-bold text-[#4a7c59] bg-[#faf6f0] px-2 py-0.5 rounded-full shadow-xs">
                        Available 42
                      </span>
                    </div>
                    <span className="text-xs text-[#4a4e4a] block mb-3">Spacious Two-Tier Cabin</span>
                    <div className="flex items-baseline justify-between pt-2">
                      <span className="font-headline font-bold text-xl text-[#4a7c59]">₹3,240</span>
                      <span className="text-[11px] text-[#4a7c59] font-semibold">Recommended</span>
                    </div>
                  </div>

                  {/* Class 3A Tier */}
                  <div
                    onClick={() => setSelectedClass12952('3A')}
                    className={`rounded-xl p-4 cursor-pointer relative transition-all border ${
                      selectedClass12952 === '3A'
                        ? 'bg-[#4a7c59]/10 border-[#4a7c59] shadow-sm'
                        : 'bg-[#faf6f0] border-[#c4c8bc]/30 hover:bg-[#f5f1ea]'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-headline font-bold text-lg text-[#2e3230]">3A</span>
                      <span className="text-xs font-semibold text-[#4a7c59] bg-[#4a7c59]/10 px-2 py-0.5 rounded-full">
                        Available 118
                      </span>
                    </div>
                    <span className="text-xs text-[#4a4e4a] block mb-3">Comfort Three-Tier</span>
                    <div className="flex items-baseline justify-between pt-2">
                      <span className="font-headline font-bold text-xl text-[#2e3230]">₹2,380</span>
                      <span className="text-[11px] text-[#74796e] font-medium">High certainty</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Instant Calm Booking CTA Row */}
              <div className="mt-6 pt-5 border-t border-[#c4c8bc]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-[#4a4e4a]">
                  <span className="material-symbols-outlined text-[#4a7c59] text-[18px]">verified_user</span>
                  <span>Guaranteed berth selection before IRCTC gateway lock</span>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => onOpenBlueprint('A1')}
                    className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-[#e4e0d8] hover:bg-[#dbd7cf] text-[#2e3230] text-sm font-semibold transition-colors cursor-pointer"
                  >
                    View Coach Blueprint
                  </button>
                  <button
                    onClick={() =>
                      onBookTrain('Mumbai Tejas Rajdhani (12952)', selectedClass12952, prices[selectedClass12952])
                    }
                    className="flex-1 sm:flex-initial px-6 py-3 rounded-xl bg-[#4a7c59] hover:bg-[#3d694a] text-white font-headline font-bold text-sm transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                  >
                    <span className="material-symbols-outlined text-[18px]">lock</span>
                    Instant Calm Booking
                  </button>
                </div>
              </div>
            </article>

            {/* ALTERNATIVE OPTION 1: August Kranti Tejas Rajdhani (12954) */}
            <article className="bg-[#f5f1ea] rounded-2xl p-6 shadow-xs hover:shadow-md transition-shadow border border-[#c4c8bc]/25">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <h3 className="font-headline font-bold text-xl text-[#2e3230]">
                    August Kranti Tejas Rajdhani
                  </h3>
                  <span className="text-xs text-[#74796e] font-semibold">#12954</span>
                </div>
                <span className="text-xs font-bold text-[#705c30] bg-[#f0e8db] px-2.5 py-1 rounded-full">
                  Gentle Evening Departure
                </span>
              </div>
              <p className="text-xs text-[#4a4e4a] mb-4">
                A classic choice with slightly later departure from Nizamuddin / NDLS, offering a smooth
                journey through Kota and Vadodara.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-[#faf6f0] p-4 rounded-xl border border-[#c4c8bc]/20">
                <div className="sm:col-span-3">
                  <span className="font-headline font-bold text-xl text-[#2e3230]">17:15</span>
                  <span className="text-xs text-[#74796e] block">NDLS Departure</span>
                </div>
                <div className="sm:col-span-3 text-center sm:text-left">
                  <span className="text-xs font-bold text-[#4a4e4a]">16h 50m</span>
                  <span className="text-[11px] text-[#74796e] block">7 Halts</span>
                </div>
                <div className="sm:col-span-3">
                  <span className="font-headline font-bold text-xl text-[#2e3230]">10:05</span>
                  <span className="text-xs text-[#74796e] block">MMCT Arrival (Next Day)</span>
                </div>
                <div className="sm:col-span-3 text-right">
                  <span className="text-xs font-bold text-[#4a7c59] block">2A Avail: 19 berths</span>
                  <span className="font-headline font-bold text-lg text-[#2e3230]">₹3,180</span>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-[#4a4e4a]">
                  <span className="material-symbols-outlined text-[16px] text-[#4a7c59]">eco</span>
                  <span>Smooth electric locomotive • 96% punctuality</span>
                </div>
                <button
                  onClick={() => onBookTrain('August Kranti Tejas Rajdhani (12954)', '2A', 3180)}
                  className="font-semibold text-[#4a7c59] hover:underline transition-colors flex items-center gap-1 cursor-pointer"
                >
                  Select 12954 Details
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </button>
              </div>
            </article>

            {/* ALTERNATIVE OPTION 2: Golden Temple Mail (12904) */}
            <article className="bg-[#f5f1ea] rounded-2xl p-6 shadow-xs hover:shadow-md transition-shadow border border-[#c4c8bc]/25">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <h3 className="font-headline font-bold text-xl text-[#2e3230]">Golden Temple Mail</h3>
                  <span className="text-xs text-[#74796e] font-semibold">#12904</span>
                  <span className="text-[11px] font-semibold text-[#705c30] bg-[#c4a66a]/20 px-2 py-0.5 rounded-full">
                    Heritage Leisure
                  </span>
                </div>
                <span className="text-xs text-[#4a4e4a]">Affordable & Timeless</span>
              </div>
              <p className="text-xs text-[#4a4e4a] mb-4">
                Ideal for unhurried travelers wanting a nostalgic rail experience with vintage culinary service
                and heritage route sights.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-[#faf6f0] p-4 rounded-xl border border-[#c4c8bc]/20">
                <div className="sm:col-span-3">
                  <span className="font-headline font-bold text-xl text-[#2e3230]">07:20</span>
                  <span className="text-xs text-[#74796e] block">NDLS (Daylight option)</span>
                </div>
                <div className="sm:col-span-3 text-center sm:text-left">
                  <span className="text-xs font-bold text-[#4a4e4a]">21h 35m</span>
                  <span className="text-[11px] text-[#74796e] block">Leisure corridor</span>
                </div>
                <div className="sm:col-span-3">
                  <span className="font-headline font-bold text-xl text-[#2e3230]">04:55</span>
                  <span className="text-xs text-[#74796e] block">MMCT Arrival (Day 2)</span>
                </div>
                <div className="sm:col-span-3 text-right">
                  <span className="text-xs font-bold text-[#4a7c59] block">3A Avail: 54 berths</span>
                  <span className="font-headline font-bold text-lg text-[#2e3230]">₹1,720</span>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-[#4a4e4a]">
                  <span className="material-symbols-outlined text-[16px] text-[#705c30]">history_edu</span>
                  <span>Century-old prestigious express • Fresh pantry breakfast</span>
                </div>
                <button
                  onClick={() => onBookTrain('Golden Temple Mail (12904)', '3A', 1720)}
                  className="font-semibold text-[#4a7c59] hover:underline transition-colors flex items-center gap-1 cursor-pointer"
                >
                  Select 12904 Details
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </button>
              </div>
            </article>
          </div>

          {/* Right Column: Smart Planning Features & Reassurance Sidebar (4 Cols) */}
          <aside className="lg:col-span-4 flex flex-col gap-6">
            {/* 1. Seat Selection Preference Sanctuary */}
            <div className="bg-[#f0ece4] rounded-2xl p-6 shadow-xs border border-[#c4c8bc]/30">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-full bg-[#4a7c59]/10 text-[#4a7c59] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">airline_seat_legroom_extra</span>
                </div>
                <div>
                  <h3 className="font-headline font-bold text-base text-[#2e3230] leading-tight">
                    Seat Sanctuary Match
                  </h3>
                  <span className="text-[11px] text-[#74796e]">Smart coach algorithm</span>
                </div>
              </div>
              <p className="text-xs text-[#4a4e4a] leading-relaxed mb-4">
                We prioritize matching your anatomical comfort preferences without splitting travelling companions.
              </p>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#faf6f0] border border-[#c4c8bc]/20 shadow-2xs">
                  <span className="flex items-center gap-2 text-xs font-semibold text-[#2e3230]">
                    <span className="material-symbols-outlined text-[#4a7c59] text-[18px]">bed</span>
                    Window Lower Berth (LB)
                  </span>
                  <span className="text-[11px] font-bold text-[#4a7c59] bg-[#4a7c59]/10 px-2 py-0.5 rounded-full">
                    Guaranteed
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#faf6f0] border border-[#c4c8bc]/20 shadow-2xs">
                  <span className="flex items-center gap-2 text-xs font-semibold text-[#2e3230]">
                    <span className="material-symbols-outlined text-[#705c30] text-[18px]">volume_off</span>
                    Far from Restrooms & Doors
                  </span>
                  <span className="text-[11px] text-[#4a4e4a] bg-[#f0ece4] px-2 py-0.5 rounded-full">
                    Cabin Middle
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#faf6f0] border border-[#c4c8bc]/20 shadow-2xs">
                  <span className="flex items-center gap-2 text-xs font-semibold text-[#2e3230]">
                    <span className="material-symbols-outlined text-[#74796e] text-[18px]">family_restroom</span>
                    Family Cluster Together
                  </span>
                  <span className="text-[11px] text-[#4a4e4a] bg-[#f0ece4] px-2 py-0.5 rounded-full">
                    Same Bay
                  </span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-[#c4c8bc]/30 flex items-center gap-2 text-[11px] text-[#4a4e4a]">
                <span className="material-symbols-outlined text-[#4a7c59] text-[16px]">check_circle</span>
                <span>94% seat placement precision for Rahul K.</span>
              </div>
            </div>

            {/* 2. Tatkal & Dynamic Fare Clarity (Zero Surge Anxiety) */}
            <div className="bg-[#f0ece4] rounded-2xl p-6 shadow-xs border border-[#c4c8bc]/30">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#705c30] text-[20px]">price_check</span>
                  <h3 className="font-headline font-bold text-base text-[#2e3230]">Fare Clarity Promise</h3>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#4a7c59] bg-[#4a7c59]/10 px-2 py-0.5 rounded-full">
                  No Hidden Fees
                </span>
              </div>
              <p className="text-xs text-[#4a4e4a] mb-4">
                Transparent price architecture for Train 12952 (Class 2A). Absolutely zero last-second surge
                markups at checkout.
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 text-[#4a4e4a]">
                  <span>Base IRCTC Railway Fare</span>
                  <span className="font-semibold text-[#2e3230]">₹2,420</span>
                </div>
                <div className="flex justify-between py-1 text-[#4a4e4a]">
                  <span>Superfast & Tejas Charge</span>
                  <span className="font-semibold text-[#2e3230]">₹450</span>
                </div>
                <div className="flex justify-between py-1 text-[#4a4e4a]">
                  <span>Curated Gourmet Meals (Dinner & Breakfast)</span>
                  <span className="font-semibold text-[#2e3230]">₹370</span>
                </div>
                <div className="flex justify-between py-1 text-[#4a4e4a]">
                  <span>Dynamic Surge Factor</span>
                  <span className="font-semibold text-[#4a7c59]">₹0.00 (Locked Base)</span>
                </div>
                <div className="flex justify-between py-1 text-[#4a4e4a]">
                  <span>Train Bro Mindful Concierge</span>
                  <span className="font-semibold text-[#4a7c59]">Free</span>
                </div>
                <div className="pt-3 mt-2 bg-[#faf6f0] p-3 rounded-xl flex justify-between items-baseline border border-[#c4c8bc]/20">
                  <div>
                    <span className="font-headline font-bold text-sm text-[#2e3230] block">
                      Total Reassurance Price
                    </span>
                    <span className="text-[10px] text-[#74796e]">Inclusive of GST and railway insurance</span>
                  </div>
                  <span className="font-headline font-bold text-xl text-[#4a7c59]">₹3,240</span>
                </div>
              </div>
            </div>

            {/* 3. Photo Card: Restful Sleeper Experience */}
            <div className="bg-[#f0ece4] rounded-2xl overflow-hidden shadow-xs border border-[#c4c8bc]/30 flex flex-col">
              <div className="relative h-44 w-full bg-[#dbd7cf]">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvSANjumb9YKlbOP1xQjpxVL4ib3X5kVPMupxkqxjSXdOVRtBsacCHqtE3wQmpA-l902OD0XVgjklXr1pErIGe0QlE6Qy8CRWzNKfn5aQsuHhpwRzoHQz7rdSfzbKhEOLAQLvM7GCYvdyhu-Bw-GDlgkKWmA6C-4Ofyo-3BTUGtdAWPJ-2VoX14SfJTi0_t1gn5BMosflNLdZhOxLCJ02T2upP_FmAXylgMMhHmaoYI-pR-RzUC6Ea4A"
                  alt="Modern Indian Railways Tejas Rajdhani First AC coupe at dusk with warm ambient brass reading light and neatly folded earthy linen"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#f0ece4] via-transparent to-transparent"></div>
                <span className="absolute bottom-3 left-4 text-xs font-bold text-[#2e3230] bg-[#faf6f0]/95 backdrop-blur-md px-2.5 py-1 rounded-full shadow-xs">
                  Tejas Smart Berths • Coach 2A
                </span>
              </div>
              <div className="p-4 text-xs text-[#4a4e4a]">
                <p className="leading-relaxed">
                  Featuring noise-absorbing vestibules, anti-microbial headrests, and whisper-quiet suspension
                  tuned for deep sleep across the northern plains.
                </p>
              </div>
            </div>

            {/* 4. Need Human Assistance Card */}
            <div className="bg-[#f0e8db]/70 rounded-2xl p-5 shadow-2xs border border-[#c4c8bc]/20 flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#f0e8db] flex items-center justify-center text-[#705c30] shrink-0 border border-[#c4c8bc]/30">
                <span className="material-symbols-outlined text-[20px]">support_agent</span>
              </div>
              <div className="text-xs">
                <span className="font-headline font-bold text-[#2e3230] block">
                  Travelling with Senior Citizens or Infants?
                </span>
                <span className="text-[#4a4e4a]">
                  Our station porter & battery buggy desk is ready at NDLS Platform 1.
                </span>
                <button
                  onClick={() => onShowToast('Dialing 139 Special Assistance Desk for Platform 1 Buggy...')}
                  className="font-bold text-[#4a7c59] hover:underline block mt-1 cursor-pointer text-left"
                >
                  Dial 139 Special Assistance →
                </button>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};
