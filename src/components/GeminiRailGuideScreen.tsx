import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';

interface GeminiRailGuideScreenProps {
  onShowToast: (msg: string) => void;
  onOpenSOS: () => void;
}

export const GeminiRailGuideScreen: React.FC<GeminiRailGuideScreenProps> = ({
  onShowToast,
  onOpenSOS,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'user',
      text: 'Is it safe to step out at Vadodara at 1:50 AM to get tea?',
      time: '1:28 AM',
    },
    {
      id: 'm2',
      sender: 'gemini',
      text: 'Yes, Rahul! Vadodara (BRC) has a scheduled 10-minute halt on Platform 1.',
      time: '1:28 AM',
      meta: 'Verified with Train Master Schedule',
      details: {
        location: 'Coach A1 Alignment Details:',
        points: [
          'Your coach door opens directly facing the 24-hour certified IRCTC tea stall.',
          'There is an RPF Police assistance booth only 18 meters to your left.',
          'Platform 1 is brightly illuminated with CCTV coverage.',
        ],
        notice: 'Keep an ear out for the two whistle chimes at the 7-minute mark so you can leisurely re-board.',
      },
      chips: ['Set 1:45 AM departure buzzer', 'Show tea stall menu'],
    },
    {
      id: 'm3',
      sender: 'user',
      text: 'Where will my luggage be while I sleep?',
      time: '1:34 AM',
    },
    {
      id: 'm4',
      sender: 'gemini',
      text: 'Your 24-inch trolley fits securely under Berth 31 (Lower Berth). There is an integrated stainless anchor clamp beneath your berth cushion if you have a cable lock.',
      time: '1:34 AM',
      meta: 'Coach A1 Security Protocol',
      details: {
        points: [
          'Vestibule Doors: Electronically secured past 11:00 PM.',
          'Night Watch: Attendant Rajesh stationed near Door 1.',
        ],
      },
    },
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [attendantState, setAttendantState] = useState<'idle' | 'notified' | 'arriving'>('idle');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (userText?: string) => {
    const textToSend = userText || inputVal.trim();
    if (!textToSend || isTyping) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      time: timeStr,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!userText) setInputVal('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: messages.map((m) => ({
            role: m.sender === 'user' ? 'user' : 'model',
            text: m.text,
          })),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const geminiMsg: ChatMessage = {
          id: `g-${Date.now()}`,
          sender: 'gemini',
          text: data.text,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          meta: data.source === 'gemini' ? 'Gemini 3.8 Live Telemetry' : 'Train Bro Verified Intelligence',
        };
        setMessages((prev) => [...prev, geminiMsg]);
      } else {
        throw new Error('API request failed');
      }
    } catch {
      // Local fallback
      setTimeout(() => {
        const geminiMsg: ChatMessage = {
          id: `g-${Date.now()}`,
          sender: 'gemini',
          text: `I've checked the live train logs for 12952. Your coach A1 is moving along smoothly on schedule with comfortable ambient temperature.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          meta: 'Cached Route Protocol',
        };
        setMessages((prev) => [...prev, geminiMsg]);
      }, 700);
    } finally {
      setIsTyping(false);
    }
  };

  const handleBuzzAttendant = () => {
    setAttendantState('notified');
    onShowToast('Attendant Rajesh Kumar notified for Coach A1, Berth 31');
    setTimeout(() => {
      setAttendantState('arriving');
    }, 2500);
  };

  const handleComfortRequest = (item: string) => {
    onShowToast(`Request sent: ${item} dispatched to Berth 31`);
    handleSend(`Please bring me an ${item}.`);
  };

  const handleResetStream = () => {
    setMessages([
      {
        id: 'init-1',
        sender: 'gemini',
        text: 'Hello Rahul! I am your Gemini Rail Companion on the 12952 Mumbai Tejas Rajdhani. How can I help make your overnight voyage restful tonight?',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        meta: 'Sub-second Latency Active',
      },
    ]);
    onShowToast('Chat stream reset to quiet standby mode');
  };

  return (
    <div className="flex flex-col w-full pb-12 animate-fadeIn">
      {/* Top Copilot Ribbon */}
      <div className="relative overflow-hidden w-full bg-[#f5f1ea]/80 py-8 lg:py-10 px-4 sm:px-6 lg:px-12 border-b border-[#c4c8bc]/25">
        <div className="absolute -top-24 -right-16 w-96 h-96 rounded-full bg-[#4a7c59]/5 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 left-1/4 w-80 h-80 rounded-full bg-[#705c30]/5 blur-2xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto flex flex-col gap-6 relative">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c8e8d0] text-[#002110] font-semibold text-xs tracking-wide">
                <span className="w-2 h-2 rounded-full bg-[#4a7c59] animate-pulse"></span>
                GEMINI RAIL COPILOT
              </span>
              <span className="text-xs text-[#4a4e4a] font-medium">
                Model 2.5 RailMind • Sub-second Latency
              </span>
            </div>

            <div className="inline-flex items-center gap-2.5 bg-[#faf6f0] px-4 py-2 rounded-full shadow-xs border border-[#c4c8bc]/20">
              <span className="material-symbols-outlined text-[#4a7c59] text-[18px]">train</span>
              <span className="text-xs font-semibold text-[#2e3230]">12952 Rajdhani</span>
              <span className="text-xs text-[#c4c8bc]">•</span>
              <span className="text-xs text-[#4a4e4a]">Near Vadodara (BRC)</span>
              <span className="text-xs text-[#c4c8bc]">•</span>
              <span className="text-xs font-bold text-[#705c30] bg-[#f0e8db] px-2 py-0.5 rounded-full">
                Coach A1, Berth 31
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-8 space-y-2">
              <h1 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#2e3230] leading-tight">
                Gemini Rail Companion{' '}
                <span className="font-normal italic text-[#4a7c59]">Your Caring Journey Assistant</span>
              </h1>
              <p className="text-base text-[#4a4e4a] max-w-2xl font-body leading-relaxed">
                Ask anything about your train, midnight stops, luggage peace-of-mind, pantry timing,
                platform layout, or coach safety.
              </p>
            </div>

            <div className="lg:col-span-4 flex lg:justify-end items-center gap-3">
              <div className="flex items-center gap-3 bg-[#faf6f0] p-3 rounded-2xl shadow-xs border border-[#c4c8bc]/20 w-full sm:w-auto">
                <div className="w-10 h-10 rounded-full bg-[#f0e8db] flex items-center justify-center text-[#4a7c59] shrink-0">
                  <span className="material-symbols-outlined text-[20px]">verified_user</span>
                </div>
                <div>
                  <div className="text-xs font-bold text-[#2e3230]">IRCTC Verified Assistant</div>
                  <div className="text-[11px] text-[#4a4e4a]">Official Berth & Station Context Synced</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat & Toolbelt Area */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-12 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Chat Stream & Input (8 Cols) */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
            <div className="bg-[#ffffff] rounded-2xl p-5 sm:p-7 shadow-[0_4px_24px_rgba(46,50,48,0.05)] border border-[#c4c8bc]/25 flex flex-col gap-6 min-h-[580px]">
              {/* Chat Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#e4e0d8]/60">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-[#4a7c59] flex items-center justify-center text-white shadow-xs">
                      <span className="material-symbols-outlined text-[22px]">psychology</span>
                    </div>
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#78a886] ring-2 ring-white"></span>
                  </div>
                  <div>
                    <h3 className="font-headline font-semibold text-base text-[#2e3230] flex items-center gap-1.5">
                      Gemini RailMind
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-[#f0ece4] px-2 py-0.5 rounded text-[#4a4e4a]">
                        Active
                      </span>
                    </h3>
                    <p className="text-xs text-[#4a4e4a]">
                      Grounded in Live GPS, Coach Sensor Telemetry & RPF Logbooks
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleResetStream}
                  className="text-xs text-[#4a4e4a] hover:text-[#4a7c59] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[15px]">refresh</span>
                  Reset Stream
                </button>
              </div>

              {/* Chat Stream Window */}
              <div className="flex flex-col gap-5 overflow-y-auto max-h-[540px] pr-2 scroll-smooth">
                {messages.map((msg) => {
                  if (msg.sender === 'user') {
                    return (
                      <div
                        key={msg.id}
                        className="flex justify-end items-end gap-2.5 max-w-[88%] ml-auto animate-fadeIn"
                      >
                        <div className="bg-[#f0e8db] text-[#5e5548] px-5 py-3.5 rounded-2xl rounded-tr-xs shadow-xs text-sm leading-relaxed">
                          {msg.text}
                          <div className="text-[10px] text-[#5e5548]/70 text-right mt-1 font-medium">
                            {msg.time}
                          </div>
                        </div>
                        <div className="w-7 h-7 rounded-full bg-[#4a7c59]/20 text-[#4a7c59] flex items-center justify-center text-xs font-bold shrink-0">
                          RK
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div key={msg.id} className="flex items-start gap-3 max-w-[94%] animate-fadeIn">
                      <div className="w-8 h-8 rounded-full bg-[#4a7c59] flex items-center justify-center text-white shrink-0 shadow-xs mt-0.5">
                        <span className="material-symbols-outlined text-[18px]">forest</span>
                      </div>
                      <div className="flex flex-col gap-2 w-full">
                        <div className="bg-[#f5f1ea] text-[#2e3230] px-5 py-4 rounded-2xl rounded-tl-xs shadow-xs text-sm leading-relaxed space-y-3 border border-[#c4c8bc]/20">
                          <p>{msg.text}</p>

                          {msg.details && (
                            <div className="bg-[#faf6f0] p-3.5 rounded-xl space-y-2 border border-[#c4c8bc]/20">
                              {msg.details.location && (
                                <div className="flex items-center gap-2 text-xs font-bold text-[#2e3230]">
                                  <span className="material-symbols-outlined text-[#4a7c59] text-[16px]">
                                    pin_drop
                                  </span>
                                  {msg.details.location}
                                </div>
                              )}
                              {msg.details.points && (
                                <ul className="text-xs text-[#4a4e4a] space-y-1.5 list-disc list-inside">
                                  {msg.details.points.map((pt, idx) => (
                                    <li key={idx}>{pt}</li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          )}

                          {msg.details?.notice && (
                            <div className="flex items-center gap-2 text-xs text-[#705c30] font-medium bg-[#f0e8db]/70 p-2.5 rounded-lg border border-[#c4c8bc]/20">
                              <span className="material-symbols-outlined text-[16px]">
                                notification_important
                              </span>
                              {msg.details.notice}
                            </div>
                          )}

                          <div className="text-[10px] text-[#74796e] text-right font-medium">
                            {msg.time} • {msg.meta || 'Train Master Schedule'}
                          </div>
                        </div>

                        {msg.chips && msg.chips.length > 0 && (
                          <div className="flex flex-wrap gap-2 pt-1 pl-1">
                            {msg.chips.map((chip, i) => (
                              <button
                                key={i}
                                onClick={() => handleSend(chip)}
                                className="text-xs bg-[#faf6f0] hover:bg-[#f0ece4] transition-all px-3 py-1.5 rounded-full text-[#4a4e4a] flex items-center gap-1 shadow-xs border border-[#c4c8bc]/20 cursor-pointer"
                              >
                                <span className="material-symbols-outlined text-[14px] text-[#4a7c59]">
                                  {i === 0 ? 'alarm' : 'storefront'}
                                </span>
                                {chip}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {isTyping && (
                  <div className="flex items-center gap-3 max-w-[94%] animate-fadeIn">
                    <div className="w-8 h-8 rounded-full bg-[#4a7c59] flex items-center justify-center text-white shrink-0 shadow-xs">
                      <span className="material-symbols-outlined text-[18px]">forest</span>
                    </div>
                    <div className="bg-[#f5f1ea] px-4 py-3 rounded-2xl rounded-tl-xs text-xs text-[#4a4e4a] flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#4a7c59] animate-ping"></span>
                      <span>Consulting Western Railway live sensors & Vadodara schedule...</span>
                    </div>
                  </div>
                )}
                <div ref={chatBottomRef} />
              </div>

              {/* Quick Preset Queries & Input Bar */}
              <div className="space-y-3 pt-2 border-t border-[#c4c8bc]/20">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-[#74796e] uppercase tracking-wider">
                    Quick Inquiries
                  </span>
                  <span className="h-px flex-1 bg-[#c4c8bc]/30"></span>
                </div>

                <div className="flex flex-wrap gap-2 overflow-x-auto pb-1">
                  <button
                    onClick={() => handleSend("Order Haldiram's midnight snack")}
                    className="text-xs font-medium bg-[#f0ece4] hover:bg-[#f0e8db] text-[#2e3230] px-3.5 py-2 rounded-full transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[15px] text-[#705c30]">
                      bakery_dining
                    </span>
                    Order Haldiram's midnight snack
                  </button>
                  <button
                    onClick={() => handleSend('Wake me up 20 mins before Surat')}
                    className="text-xs font-medium bg-[#f0ece4] hover:bg-[#f0e8db] text-[#2e3230] px-3.5 py-2 rounded-full transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[15px] text-[#4a7c59]">bedtime</span>
                    Wake me up 20 mins before Surat
                  </button>
                  <button
                    onClick={() => handleSend('What time does breakfast get served?')}
                    className="text-xs font-medium bg-[#f0ece4] hover:bg-[#f0e8db] text-[#2e3230] px-3.5 py-2 rounded-full transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[15px] text-[#705c30]">
                      breakfast_dining
                    </span>
                    What time does breakfast get served?
                  </button>
                  <button
                    onClick={() => handleSend('Where is the charging switch for Berth 31?')}
                    className="text-xs font-medium bg-[#f0ece4] hover:bg-[#f0e8db] text-[#2e3230] px-3.5 py-2 rounded-full transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[15px] text-[#4a7c59]">power</span>
                    Where is the charging switch?
                  </button>
                </div>

                {/* Input Form */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="relative mt-2"
                >
                  <div className="bg-[#f5f1ea] rounded-2xl p-2 pl-4 flex items-center gap-2 border border-[#c4c8bc]/30 focus-within:border-[#4a7c59] focus-within:ring-2 focus-within:ring-[#4a7c59]/20 transition-all shadow-inner">
                    <button
                      type="button"
                      onClick={() => onShowToast('Ticket & berth context auto-attached (PNR 2418-930214)')}
                      className="w-9 h-9 rounded-full hover:bg-[#f0ece4] text-[#4a4e4a] hover:text-[#4a7c59] flex items-center justify-center transition-colors cursor-pointer"
                      title="Attach Ticket or SMS"
                    >
                      <span className="material-symbols-outlined text-[20px]">attach_file</span>
                    </button>

                    <input
                      type="text"
                      value={inputVal}
                      onChange={(e) => setInputVal(e.target.value)}
                      placeholder="Ask about halts, hot water, bedding, food, speed, or berth help..."
                      className="w-full bg-transparent text-sm text-[#2e3230] placeholder:text-[#74796e] focus:outline-none py-2"
                    />

                    <button
                      type="button"
                      onClick={() => {
                        onShowToast('Microphone ready. Say your question...');
                        handleSend('Is there hot water for morning tea in Coach A1?');
                      }}
                      className="w-9 h-9 rounded-full hover:bg-[#f0ece4] text-[#4a4e4a] hover:text-[#4a7c59] flex items-center justify-center transition-colors cursor-pointer"
                      title="Speak Query"
                    >
                      <span className="material-symbols-outlined text-[20px]">mic</span>
                    </button>

                    <button
                      type="submit"
                      disabled={isTyping}
                      className="w-10 h-10 rounded-xl bg-[#4a7c59] text-white hover:bg-[#3d694a] flex items-center justify-center shadow-xs shrink-0 transition-transform active:scale-95 cursor-pointer disabled:opacity-50"
                    >
                      <span className="material-symbols-outlined text-[20px]">send</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Offline & Silent Night Protocols */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#f5f1ea] rounded-2xl p-4 flex items-center gap-4 border border-[#c4c8bc]/20">
                <div className="w-12 h-12 rounded-xl bg-[#faf6f0] flex items-center justify-center text-[#4a7c59] shadow-xs shrink-0 border border-[#c4c8bc]/20">
                  <span className="material-symbols-outlined text-[26px]">wifi_tethering</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#2e3230]">Train Bro Offline Memory</h4>
                  <p className="text-xs text-[#4a4e4a] mt-0.5">
                    This chat caches key berth, coach, and route facts even through network shadows.
                  </p>
                </div>
              </div>

              <div className="bg-[#f5f1ea] rounded-2xl p-4 flex items-center gap-4 border border-[#c4c8bc]/20">
                <div className="w-12 h-12 rounded-xl bg-[#faf6f0] flex items-center justify-center text-[#705c30] shrink-0 shadow-xs border border-[#c4c8bc]/20">
                  <span className="material-symbols-outlined text-[26px]">volume_off</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#2e3230]">Silent Night Protocol</h4>
                  <p className="text-xs text-[#4a4e4a] mt-0.5">
                    Gemini suppresses noisy chimes between 11 PM and 6 AM, using soft haptics only.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Journey Toolbelt (4-5 Cols) */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
            <div className="bg-[#ffffff] rounded-2xl p-6 shadow-[0_4px_24px_rgba(46,50,48,0.05)] border border-[#c4c8bc]/25 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#4a7c59]/10 flex items-center justify-center text-[#4a7c59]">
                    <span className="material-symbols-outlined text-[18px]">build</span>
                  </div>
                  <h2 className="font-headline font-bold text-lg text-[#2e3230]">Journey Toolbelt</h2>
                </div>
                <span className="text-[11px] font-semibold text-[#4a7c59] bg-[#c8e8d0] px-2.5 py-0.5 rounded-full">
                  Instant Sync
                </span>
              </div>

              {/* Coach Attendant Card */}
              <div className="bg-[#f5f1ea] rounded-2xl p-4 space-y-3 border border-[#c4c8bc]/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-11 h-11 rounded-full bg-[#e4e0d8] flex items-center justify-center overflow-hidden border border-[#c4c8bc]/30">
                        <img
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUAKv-nbzicWwIVd66NQmPMXHwCoznrNxfPUGOrvJzuytdhmFYyv2-KW1j5MuHp84cY8S2fh9NvELJYHBFA6GV4y7KdcH8dphNcseVBlw4s0lOWetDGw0KzOZQItXp0gbEJa4icZ7SymI9QEsmCuSELXFpB7tOwqcFnP14ESF6Ud6NDjZ2espKqC1OLJEVTnTljA43bH-5lAh0uicJuCAC03BISeedC5qlwHq0TI7WgCBQ5t6xAlcctA"
                          alt="Rajesh Kumar, Coach A1 Attendant"
                          className="w-full h-full object-cover"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#4a7c59] ring-2 ring-white"></span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#2e3230] leading-tight">Rajesh Kumar</h4>
                      <p className="text-xs text-[#4a4e4a]">Coach A1 Attendant • Night Duty</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-[#4a7c59] block">~2 min</span>
                    <span className="text-[10px] text-[#74796e] block">Avg Response</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={handleBuzzAttendant}
                    className="flex items-center justify-center gap-1.5 bg-[#4a7c59] hover:bg-[#3d694a] text-white text-xs font-semibold py-2.5 px-3 rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">notifications_active</span>
                    Buzz Attendant
                  </button>
                  <button
                    onClick={() => {
                      setInputVal('Hi Rajesh, could you please adjust the AC temperature in coupe A1-31?');
                    }}
                    className="flex items-center justify-center gap-1.5 bg-[#faf6f0] hover:bg-[#f0ece4] text-[#2e3230] text-xs font-semibold py-2.5 px-3 rounded-xl border border-[#c4c8bc]/30 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#4a7c59]">chat</span>
                    Quick Message
                  </button>
                </div>

                {attendantState !== 'idle' && (
                  <p className="text-[11px] text-center pt-1 text-[#4a7c59] font-medium animate-fadeIn">
                    {attendantState === 'notified'
                      ? 'Attendant notified for Berth 31! Rajesh will arrive shortly.'
                      : 'Rajesh is on the way to Coupe A1-31.'}
                  </p>
                )}
              </div>

              {/* Bedroll & Comfort Requests */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-[#2e3230] uppercase tracking-wider">
                    Bedroll & Comfort Requests
                  </h3>
                  <span className="text-[11px] text-[#74796e]">No charge (AC Tier)</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <button
                    onClick={() => handleComfortRequest('Extra Fleece Blanket')}
                    className="group p-3 bg-[#faf6f0] hover:bg-[#f0e8db] transition-all rounded-2xl border border-[#c4c8bc]/20 shadow-xs flex flex-col items-center gap-1.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[#4a7c59] text-[22px] group-hover:scale-110 transition-transform">
                      bed
                    </span>
                    <span className="text-[11px] font-semibold text-[#2e3230] leading-tight">
                      Extra Blanket
                    </span>
                    <span className="text-[10px] text-[#74796e]">Soft wool</span>
                  </button>
                  <button
                    onClick={() => handleComfortRequest('Sealed Linen Pack')}
                    className="group p-3 bg-[#faf6f0] hover:bg-[#f0e8db] transition-all rounded-2xl border border-[#c4c8bc]/20 shadow-xs flex flex-col items-center gap-1.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[#4a7c59] text-[22px] group-hover:scale-110 transition-transform">
                      dry_cleaning
                    </span>
                    <span className="text-[11px] font-semibold text-[#2e3230] leading-tight">
                      Sterile Linen
                    </span>
                    <span className="text-[10px] text-[#74796e]">Fresh packet</span>
                  </button>
                  <button
                    onClick={() => handleComfortRequest('Quiet Travel Earplugs')}
                    className="group p-3 bg-[#faf6f0] hover:bg-[#f0e8db] transition-all rounded-2xl border border-[#c4c8bc]/20 shadow-xs flex flex-col items-center gap-1.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[#4a7c59] text-[22px] group-hover:scale-110 transition-transform">
                      hearing
                    </span>
                    <span className="text-[11px] font-semibold text-[#2e3230] leading-tight">
                      Earplugs
                    </span>
                    <span className="text-[10px] text-[#74796e]">Noise block</span>
                  </button>
                </div>
              </div>

              {/* SOS Bridge */}
              <div className="bg-[#f0ece4] rounded-2xl p-4 space-y-3 border border-[#c4c8bc]/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#b83230] text-[18px]">emergency</span>
                    <span className="text-xs font-bold text-[#2e3230] uppercase tracking-wider">
                      RailMadad SOS Bridge
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-[#b83230] bg-[#ffdad8] px-2 py-0.5 rounded-full">
                    24x7 Direct
                  </span>
                </div>
                <p className="text-xs text-[#4a4e4a] leading-relaxed">
                  Official Indian Railways grievance & medical dispatch. Broadcasts your live coordinates,
                  PNR, and coach index instantly.
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={onOpenSOS}
                    className="flex-1 bg-[#e4e0d8] hover:bg-[#b83230] hover:text-white text-[#2e3230] transition-colors py-2 px-3 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">call</span>
                    Call 139
                  </button>
                  <button
                    onClick={() => onShowToast('Silent RPF & Train Captain Bridge Triggered. Stand by.')}
                    className="flex-1 bg-[#b83230] text-white hover:opacity-90 py-2 px-3 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">shield</span>
                    Silent Alert
                  </button>
                </div>
              </div>

              {/* Vadodara Halt Outlook */}
              <div className="bg-[#f5f1ea] rounded-2xl p-4 space-y-3 border border-[#c4c8bc]/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#705c30] text-[18px]">
                      partly_cloudy_day
                    </span>
                    <span className="text-xs font-bold text-[#2e3230] uppercase tracking-wider">
                      Vadodara Halt Outlook
                    </span>
                  </div>
                  <span className="text-[11px] text-[#4a7c59] font-bold">ETA 01:50 AM</span>
                </div>
                <div className="grid grid-cols-2 gap-3 items-center pt-1">
                  <div className="bg-[#faf6f0] p-3 rounded-xl border border-[#c4c8bc]/20">
                    <div className="text-[11px] text-[#74796e]">Night Ambient</div>
                    <div className="text-xl font-headline font-bold text-[#2e3230] mt-0.5">24°C</div>
                    <div className="text-[10px] text-[#4a4e4a] flex items-center gap-1 mt-0.5">
                      <span className="material-symbols-outlined text-[12px] text-[#4a7c59]">air</span>
                      Gentle breeze 8 km/h
                    </div>
                  </div>
                  <div className="bg-[#faf6f0] p-3 rounded-xl border border-[#c4c8bc]/20">
                    <div className="text-[11px] text-[#74796e]">Platform Air Quality</div>
                    <div className="text-xl font-headline font-bold text-[#4a7c59] mt-0.5">AQI 58</div>
                    <div className="text-[10px] text-[#4a4e4a] flex items-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4a7c59]"></span>
                      Clean & Breathable
                    </div>
                  </div>
                </div>
                <div className="text-[11px] text-[#4a4e4a] flex items-center gap-1.5 bg-[#faf6f0] px-3 py-2 rounded-xl border border-[#c4c8bc]/20">
                  <span className="material-symbols-outlined text-[#4a7c59] text-[15px]">cloud_download</span>
                  Halt duration: <strong className="text-[#2e3230]">10 mins</strong> (Surat next at 03:22 AM)
                </div>
              </div>
            </div>

            {/* Social Proof */}
            <div className="bg-[#f5f1ea] rounded-2xl p-4 flex items-center gap-3 border border-[#c4c8bc]/20">
              <div className="w-10 h-10 rounded-full bg-[#4a7c59]/10 flex items-center justify-center text-[#4a7c59] shrink-0">
                <span className="material-symbols-outlined text-[20px]">thumb_up</span>
              </div>
              <div className="text-xs text-[#4a4e4a] leading-relaxed">
                Over <strong className="text-[#2e3230]">18,200 travelers</strong> on the Western Line use
                Gemini Rail Guide for peaceful night journeys.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
