import React, { useState } from 'react';

interface StationAmenitiesScreenProps {
  onShowToast: (msg: string) => void;
  onOpenSOS: () => void;
}

export const StationAmenitiesScreen: React.FC<StationAmenitiesScreenProps> = ({
  onShowToast,
  onOpenSOS,
}) => {
  const [sahayakBooked, setSahayakBooked] = useState(false);
  const [selectedCoach, setSelectedCoach] = useState('A1');

  const toggleSahayak = () => {
    if (!sahayakBooked) {
      setSahayakBooked(true);
      onShowToast('✓ Sahayak Ramesh Solanki confirmed at Coach A1 door at 01:53 AM');
    } else {
      setSahayakBooked(false);
      onShowToast('Sahayak reservation cancelled');
    }
  };

  return (
    <div className="flex flex-col w-full pb-12 animate-fadeIn">
      {/* Calm Organic Atmospheric Header */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#f5f1ea] via-[#f0ece4] to-[#faf6f0] px-4 sm:px-6 lg:px-12 py-10 border-b border-[#c4c8bc]/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#4a7c59]/10 text-[#4a7c59] px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>Verified Platform 1 Arrival Sync</span>
            </div>
            <h1 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#2e3230] leading-[1.15]">
              Vadodara Junction <span className="font-normal text-[#6b6358]">(BRC)</span>
            </h1>
            <p className="font-headline text-lg sm:text-xl text-[#4a7c59] font-medium italic">
              Friendly Station Guide & Arrival Sanctuary
            </p>
            <p className="text-sm sm:text-base text-[#4a4e4a] font-body leading-relaxed">
              Everything you need to know before stepping down from Coach A1 onto Platform 1 in{' '}
              <strong className="text-[#2e3230]">38 minutes</strong>. Breathe easy; we have verified
              every detail ahead.
            </p>
          </div>

          {/* Station Mood Pill Card */}
          <div className="w-full md:w-auto bg-[#ffffff]/85 backdrop-blur-md p-5 rounded-2xl shadow-sm border border-[#c4c8bc]/30 space-y-3 shrink-0 max-w-sm">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs uppercase tracking-wider font-bold text-[#705c30]">
                Station Mood
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-[#4a7c59] font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#4a7c59] animate-pulse"></span>
                Calm & Peaceful
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#f0e8db] flex items-center justify-center text-[#5e5548] shrink-0">
                <span className="material-symbols-outlined text-[20px]">nightlight</span>
              </div>
              <div>
                <div className="text-sm font-semibold text-[#2e3230]">Quiet Night Halt • 23°C</div>
                <div className="text-xs text-[#4a4e4a]">Cool breeze, gentle concourse ambient</div>
              </div>
            </div>
            <div className="pt-2 border-t border-[#c4c8bc]/20 flex items-center justify-between text-xs text-[#4a4e4a]">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[#4a7c59] text-[14px]">shield</span>
                24/7 RPF Patrol
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[#4a7c59] text-[14px]">lightbulb</span>
                100% Well-lit
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[#4a7c59] text-[14px]">wifi</span>
                RailWire Active
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main 2-Column Content Layout */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Station Topology & Doorway Guidance (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step-out Orientation Card */}
            <div className="bg-[#ffffff] rounded-2xl p-6 sm:p-8 shadow-sm border border-[#c4c8bc]/25 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#705c30]">
                    Step-Out Orientation
                  </span>
                  <h2 className="font-headline text-2xl font-bold text-[#2e3230] mt-1">
                    Platform 1 directly outside Coach A1
                  </h2>
                </div>
                <div className="inline-flex items-center gap-2 bg-[#f0e8db] px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#5e5548] self-start sm:self-auto border border-[#c4c8bc]/20">
                  <span className="material-symbols-outlined text-[16px]">door_sliding</span>
                  Door opens toward Concourse
                </div>
              </div>

              {/* Coach Alignment Interactive Diagram */}
              <div className="bg-[#f5f1ea] rounded-2xl p-5 sm:p-6 space-y-4 border border-[#c4c8bc]/25">
                <div className="flex items-center justify-between text-xs font-semibold text-[#4a4e4a] mb-1">
                  <span>← Locomotive (North / New Delhi direction)</span>
                  <span>Rear Coaches (South) →</span>
                </div>

                {/* Stylized Train & Platform Visual */}
                <div className="relative w-full overflow-x-auto pb-2">
                  <div className="min-w-[560px] flex flex-col gap-3">
                    {/* Train coaches */}
                    <div className="flex items-center gap-1.5 bg-[#eae6de] p-2 rounded-xl">
                      <button
                        onClick={() => setSelectedCoach('H1')}
                        className={`px-3 py-1.5 rounded-lg text-[11px] font-mono transition-colors cursor-pointer ${
                          selectedCoach === 'H1' ? 'bg-[#4a7c59] text-white font-bold' : 'bg-[#faf6f0] text-[#4a4e4a]'
                        }`}
                      >
                        H1 (1AC)
                      </button>

                      <button
                        onClick={() => setSelectedCoach('A1')}
                        className="relative px-5 py-2.5 rounded-xl bg-[#4a7c59] text-white text-xs font-bold shadow-md flex items-center gap-1.5 cursor-pointer ring-2 ring-white"
                      >
                        <span className="material-symbols-outlined text-[15px]">my_location</span>
                        Coach A1 (Your Berth 31)
                        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[#4a7c59]"></span>
                      </button>

                      <button
                        onClick={() => setSelectedCoach('A2')}
                        className={`px-3 py-1.5 rounded-lg text-[11px] font-mono transition-colors cursor-pointer ${
                          selectedCoach === 'A2' ? 'bg-[#4a7c59] text-white font-bold' : 'bg-[#faf6f0] text-[#4a4e4a]'
                        }`}
                      >
                        A2 (2AC)
                      </button>
                      <button
                        onClick={() => setSelectedCoach('B1')}
                        className={`px-3 py-1.5 rounded-lg text-[11px] font-mono transition-colors cursor-pointer ${
                          selectedCoach === 'B1' ? 'bg-[#4a7c59] text-white font-bold' : 'bg-[#faf6f0] text-[#4a4e4a]'
                        }`}
                      >
                        B1 (3AC)
                      </button>
                      <button
                        onClick={() => setSelectedCoach('B2')}
                        className={`px-3 py-1.5 rounded-lg text-[11px] font-mono transition-colors cursor-pointer ${
                          selectedCoach === 'B2' ? 'bg-[#4a7c59] text-white font-bold' : 'bg-[#faf6f0] text-[#4a4e4a]'
                        }`}
                      >
                        B2 (3AC)
                      </button>
                      <button
                        onClick={() => setSelectedCoach('Pantry')}
                        className={`px-3 py-1.5 rounded-lg text-[11px] font-mono transition-colors cursor-pointer ${
                          selectedCoach === 'Pantry' ? 'bg-[#4a7c59] text-white font-bold' : 'bg-[#faf6f0] text-[#4a4e4a]'
                        }`}
                      >
                        Pantry Car
                      </button>
                    </div>

                    {/* Platform Walking Vectors */}
                    <div className="grid grid-cols-4 gap-2 pt-2 text-center text-xs">
                      <div className="p-2.5 rounded-xl bg-[#faf6f0] flex flex-col items-center gap-1 border border-[#c4c8bc]/20">
                        <span className="material-symbols-outlined text-[#4a7c59] text-[18px]">
                          water_drop
                        </span>
                        <span className="font-bold text-[#2e3230]">18 paces left</span>
                        <span className="text-[11px] text-[#4a4e4a]">Water ATM (₹5/L)</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-[#c8e8d0] text-[#002110] flex flex-col items-center gap-1 shadow-xs font-semibold">
                        <span className="material-symbols-outlined text-[#4a7c59] text-[18px]">
                          elevator
                        </span>
                        <span className="font-bold text-[#002110]">Directly Facing</span>
                        <span className="text-[11px] text-[#2a6038]">FOB-2 Lift & Ramp</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-[#faf6f0] flex flex-col items-center gap-1 border border-[#c4c8bc]/20">
                        <span className="material-symbols-outlined text-[#705c30] text-[18px]">
                          accessible
                        </span>
                        <span className="font-bold text-[#2e3230]">25 paces right</span>
                        <span className="text-[11px] text-[#4a4e4a]">Wheelchair Booth</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-[#faf6f0] flex flex-col items-center gap-1 border border-[#c4c8bc]/20">
                        <span className="material-symbols-outlined text-[#4a7c59] text-[18px]">
                          bakery_dining
                        </span>
                        <span className="font-bold text-[#2e3230]">40 paces right</span>
                        <span className="text-[11px] text-[#4a4e4a]">Hot Chai & Fafda</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-[#4a4e4a] italic">
                  Tip: The platform is flush with Coach A1; no steep leap required. Automatic safety lights
                  switch on 10 minutes prior to arrival.
                </p>
              </div>

              {/* Micro Paces Navigation Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Safe Drinking Water */}
                <div className="p-4 rounded-2xl bg-[#f5f1ea] hover:bg-[#f0ece4] transition-colors flex items-start gap-3.5 border border-[#c4c8bc]/20">
                  <div className="w-10 h-10 rounded-full bg-[#4a7c59]/10 text-[#4a7c59] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px]">local_drink</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-[#2e3230]">Clean RO Water ATM</span>
                      <span className="text-xs font-semibold text-[#4a7c59]">~15 secs</span>
                    </div>
                    <p className="text-xs text-[#4a4e4a] leading-relaxed">
                      18 paces to your left. Tested TDS &lt; 90 ppm. Chilled and regular water dispensers
                      available.
                    </p>
                  </div>
                </div>

                {/* Escalator & FOB 2 Lift */}
                <div className="p-4 rounded-2xl bg-[#f5f1ea] hover:bg-[#f0ece4] transition-colors flex items-start gap-3.5 border border-[#c4c8bc]/20">
                  <div className="w-10 h-10 rounded-full bg-[#4a7c59]/10 text-[#4a7c59] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px]">stairs</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-[#2e3230]">Escalator & FOB-2</span>
                      <span className="text-xs font-semibold text-[#4a7c59]">0 paces</span>
                    </div>
                    <p className="text-xs text-[#4a4e4a] leading-relaxed">
                      Directly straight when stepping off Coach A1 door. Glass lift operational 24/7 to all
                      platforms.
                    </p>
                  </div>
                </div>

                {/* Wheelchair & Sahayak Booth */}
                <div className="p-4 rounded-2xl bg-[#f5f1ea] hover:bg-[#f0ece4] transition-colors flex items-start gap-3.5 border border-[#c4c8bc]/20">
                  <div className="w-10 h-10 rounded-full bg-[#f0e8db] text-[#5e5548] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px]">assist_walker</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-[#2e3230]">Sahayak Assistance</span>
                      <span className="text-xs font-semibold text-[#705c30]">25 paces</span>
                    </div>
                    <p className="text-xs text-[#4a4e4a] leading-relaxed">
                      Dedicated desk with station wheelchairs, battery cart dispatch, and registered coolie
                      desk.
                    </p>
                  </div>
                </div>

                {/* Authentic Vadodara Refreshment */}
                <div className="p-4 rounded-2xl bg-[#f5f1ea] hover:bg-[#f0ece4] transition-colors flex items-start gap-3.5 border border-[#c4c8bc]/20">
                  <div className="w-10 h-10 rounded-full bg-[#f0e8db] text-[#5e5548] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px]">restaurant</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-[#2e3230]">Fafda & Masala Chai</span>
                      <span className="text-xs font-semibold text-[#705c30]">40 paces</span>
                    </div>
                    <p className="text-xs text-[#4a4e4a] leading-relaxed">
                      Famous Jagdish & Mahavir snack stall on PF 1. Fresh hot sev khamani and cardamom tea.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cleanliness & Restroom Rating Sanctuary */}
            <div className="bg-[#ffffff] rounded-2xl p-6 sm:p-8 shadow-sm border border-[#c4c8bc]/25 space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#4a7c59]">
                    Comfort & Hygiene
                  </span>
                  <h3 className="font-headline text-xl font-bold text-[#2e3230]">
                    Sanitary & Rest Sanctuary Ratings
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4a7c59]/10 text-[#4a7c59] text-xs font-bold">
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                  <span>Grade A Audited</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Executive Lounge Box */}
                <div className="p-5 rounded-2xl bg-[#f5f1ea] space-y-3 border border-[#c4c8bc]/20">
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-[#2e3230] text-sm">IRCTC Executive Lounge</div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#c8e8d0] text-[#002110]">
                      Air-Conditioned
                    </span>
                  </div>
                  <p className="text-xs text-[#4a4e4a] leading-relaxed">
                    Platform 1, near main portico. Recliner seating, clean western showers, Wi-Fi, and hot
                    buffet. ₹150 for 2 hours.
                  </p>
                  <div className="flex items-center gap-2 pt-1 text-xs text-[#4a7c59] font-semibold">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    <span>Inspected 22 mins ago • Spotless</span>
                  </div>
                </div>

                {/* Accessible Washroom Box */}
                <div className="p-5 rounded-2xl bg-[#f5f1ea] space-y-3 border border-[#c4c8bc]/20">
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-[#2e3230] text-sm">PF 1 Modern Restrooms</div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#f0e8db] text-[#5e5548]">
                      Wheelchair Access
                    </span>
                  </div>
                  <p className="text-xs text-[#4a4e4a] leading-relaxed">
                    Direct ramp access, touchless sensor taps, and baby care station. Continuous housekeeping
                    attendant present.
                  </p>
                  <div className="flex items-center gap-2 pt-1 text-xs text-[#4a7c59] font-semibold">
                    <span className="material-symbols-outlined text-[16px]">sentiment_satisfied</span>
                    <span>Cleanliness Score: 4.8 / 5.0</span>
                  </div>
                </div>
              </div>

              {/* Station Visual Snippet */}
              <div
                className="relative w-full h-44 rounded-2xl overflow-hidden shadow-inner bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCzP8dAInzbdyiTeCJjMWkDAnDklsx_UPM5nmN_CUusBOZn5fWVf0SjpZVlNkZ5xQfqPb8B0cmik58GoAFFfrfBpd9w-RZSbm9R2ZHLSHuoHySx6rB72PvJLqoMKGO-h0Vxbf_B_j3VX5q6-h_FF9EgSCjsUzlJ9L7uyGE05ZlEDAR5a2Ru4JOufKPxD8tDKXnTShp3A7lO4rwn-VOFLoWYsRbTrk6bVd-oTVsjdz-uycRltWJN5Fe2Dg')`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#2e3230]/85 via-[#2e3230]/30 to-transparent flex items-end p-5">
                  <div className="text-white space-y-0.5">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#8ecf9e]">
                      Vadodara Station Concourse
                    </p>
                    <p className="text-sm font-headline font-semibold">
                      Wide open architectural corridors designed for effortless gentle movement
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Live Departures, Connections & On-Station Support (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Live Departures */}
            <div className="bg-[#ffffff] rounded-2xl p-6 shadow-sm border border-[#c4c8bc]/25 space-y-5">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#705c30]">
                    Live Platform Sync
                  </span>
                  <h3 className="font-headline text-xl font-bold text-[#2e3230]">Upcoming Departures</h3>
                </div>
                <span className="text-[11px] text-[#4a4e4a] font-mono bg-[#f0ece4] px-2.5 py-1 rounded-full border border-[#c4c8bc]/20">
                  Synced 1m ago
                </span>
              </div>

              {/* Departure Items */}
              <div className="space-y-3">
                {/* Current Train */}
                <div className="p-3.5 rounded-2xl bg-[#c8e8d0]/40 border border-[#4a7c59]/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#4a7c59] animate-ping"></span>
                      <span className="font-bold text-sm text-[#2e3230]">12952 Tejas Rajdhani</span>
                    </div>
                    <span className="text-xs font-bold text-[#4a7c59] bg-[#4a7c59]/10 px-2 py-0.5 rounded-full">
                      On Time
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#4a4e4a]">
                    <span>Arrival: 01:53 AM • PF 1 (Direct Halt)</span>
                    <span className="font-medium text-[#2e3230]">10 min peaceful halt</span>
                  </div>
                  <div className="text-[11px] text-[#4a7c59] flex items-center gap-1 font-medium pt-0.5">
                    <span className="material-symbols-outlined text-[14px]">bedtime</span>
                    <span>Passengers sleeping; no loud horn protocol active</span>
                  </div>
                </div>

                {/* Connection Train 1 */}
                <div className="p-3.5 rounded-2xl bg-[#f5f1ea] hover:bg-[#f0ece4] transition-colors space-y-2 border border-[#c4c8bc]/20">
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-sm text-[#2e3230]">19020 Dehradun Express</div>
                    <span className="text-xs font-semibold text-[#4a4e4a] bg-[#faf6f0] px-2 py-0.5 rounded-full border border-[#c4c8bc]/20">
                      PF 3
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#4a4e4a]">
                    <span>Departs: 02:40 AM</span>
                    <span className="text-[#4a7c59] font-medium">Relaxed 47m connection buffer</span>
                  </div>
                </div>

                {/* Upcoming 2 */}
                <div className="p-3.5 rounded-2xl bg-[#f5f1ea] hover:bg-[#f0ece4] transition-colors space-y-2 border border-[#c4c8bc]/20">
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-sm text-[#2e3230]">12954 August Kranti Rajdhani</div>
                    <span className="text-xs font-semibold text-[#4a4e4a] bg-[#faf6f0] px-2 py-0.5 rounded-full border border-[#c4c8bc]/20">
                      PF 2
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#4a4e4a]">
                    <span>Arrival: 02:15 AM</span>
                    <span className="text-[#4a4e4a]">Expected right on time</span>
                  </div>
                </div>
              </div>

              {/* Transfer Security Card */}
              <div className="p-4 rounded-2xl bg-[#f0e8db]/70 space-y-2 border border-[#c4c8bc]/30">
                <div className="flex items-center gap-2 text-[#5e5548] font-semibold text-xs uppercase tracking-wide">
                  <span className="material-symbols-outlined text-[16px] text-[#705c30]">alt_route</span>
                  Transfer Reassurance: 19020 Connection
                </div>
                <p className="text-xs text-[#5e5548] leading-relaxed">
                  Platform 3 is seamlessly reachable using the ramp directly opposite Coach A1. You do not
                  need to lift bags across steps; the entire walkway is barrier-free.
                </p>
              </div>
            </div>

            {/* One-Tap Station Sahayak (Porter) Booking */}
            <div className="bg-[#ffffff] rounded-2xl p-6 shadow-sm border border-[#c4c8bc]/25 space-y-5">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#4a7c59]">
                    Station Concierge
                  </span>
                  <h3 className="font-headline text-xl font-bold text-[#2e3230]">Pre-Book Sahayak</h3>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#4a7c59]/10 text-[#4a7c59] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">luggage</span>
                </div>
              </div>
              <p className="text-xs text-[#4a4e4a] leading-relaxed">
                Eliminate platform bargaining stress. Official Railway certified Sahayak meets you directly at
                Coach A1 door with your name board.
              </p>
              <div className="bg-[#f5f1ea] p-4 rounded-2xl flex items-center justify-between border border-[#c4c8bc]/20">
                <div>
                  <div className="text-xs text-[#4a4e4a] font-medium">Standard IRCTC Tariff</div>
                  <div className="font-headline text-2xl font-bold text-[#2e3230] mt-0.5">
                    ₹150{' '}
                    <span className="text-xs font-normal text-[#4a4e4a] font-body">/ Up to 2 heavy bags</span>
                  </div>
                </div>
                <div className="text-right text-xs text-[#4a7c59] font-semibold">
                  <span className="block">Badge #412 Assigned</span>
                  <span className="text-[11px] text-[#74796e] font-normal">Sahayak: Ramesh Solanki</span>
                </div>
              </div>
              <button
                onClick={toggleSahayak}
                className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer ${
                  sahayakBooked
                    ? 'bg-[#eae6de] text-[#2e3230] hover:bg-[#e4e0d8]'
                    : 'bg-[#4a7c59] hover:bg-[#3d694a] text-white'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">person_check</span>
                <span>{sahayakBooked ? 'Sahayak Reserved for Rahul' : 'Confirm Sahayak at Coach A1'}</span>
              </button>
              {sahayakBooked && (
                <div className="p-3 rounded-xl bg-[#c8e8d0] text-[#002110] text-xs font-medium text-center transition-all animate-fadeIn">
                  ✓ Ramesh notified. He will be positioned at door A1 at 01:50 AM with a display board for Rahul K.
                </div>
              )}
            </div>

            {/* Station Emergency & Health Guidance */}
            <div className="bg-[#ffffff] rounded-2xl p-6 shadow-sm border border-[#c4c8bc]/25 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#ffdad8] text-[#b83230] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[16px]">local_pharmacy</span>
                </div>
                <h4 className="font-headline text-base font-bold text-[#2e3230]">
                  Emergency & Medical Facilities
                </h4>
              </div>
              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#f5f1ea] border border-[#c4c8bc]/20">
                  <span className="material-symbols-outlined text-[#4a7c59] text-[18px] shrink-0 mt-0.5">
                    medication
                  </span>
                  <div>
                    <span className="font-bold text-[#2e3230] block">
                      Pradhan Mantri Jan Aushadhi Kendra
                    </span>
                    <span className="text-[#4a4e4a]">
                      Concourse hall, near VIP exit gate. 24/7 generic medicines and first aid supplies.
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#f5f1ea] border border-[#c4c8bc]/20">
                  <span className="material-symbols-outlined text-[#705c30] text-[18px] shrink-0 mt-0.5">
                    medical_services
                  </span>
                  <div>
                    <span className="font-bold text-[#2e3230] block">
                      Railway Emergency Medical Room
                    </span>
                    <span className="text-[#4a4e4a]">
                      Platform 1, adjacent to Station Superintendent office. On-duty doctor available.
                    </span>
                  </div>
                </div>
              </div>
              <div className="pt-2 border-t border-[#c4c8bc]/20 flex items-center justify-between text-xs text-[#4a4e4a]">
                <span>Direct Station SOS:</span>
                <button
                  onClick={onOpenSOS}
                  className="font-bold text-[#4a7c59] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">call</span>
                  Dial 139 (Option 1)
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
