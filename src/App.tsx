/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ScreenPath } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PlanAvailabilityScreen } from './components/PlanAvailabilityScreen';
import { GeminiRailGuideScreen } from './components/GeminiRailGuideScreen';
import { StationAmenitiesScreen } from './components/StationAmenitiesScreen';
import { PnrTicketSanctuaryScreen } from './components/PnrTicketSanctuaryScreen';
import { LiveJourneyScreen } from './components/LiveJourneyScreen';
import { WalletModal } from './components/WalletModal';
import { CoachBlueprintModal } from './components/CoachBlueprintModal';
import { BookingModal } from './components/BookingModal';
import { SosModal } from './components/SosModal';
import { Toast } from './components/Toast';

export default function App() {
  const [currentPath, setCurrentPath] = useState<ScreenPath>('plan-availability');
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [isSosOpen, setIsSosOpen] = useState(false);
  const [blueprintCoach, setBlueprintCoach] = useState<string | null>(null);
  const [bookingState, setBookingState] = useState<{
    isOpen: boolean;
    trainName: string;
    selectedClass: string;
    price: number;
  }>({
    isOpen: false,
    trainName: 'Mumbai Tejas Rajdhani (12952)',
    selectedClass: '2A',
    price: 3240,
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync hash routing if present
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '') as ScreenPath;
      if (
        hash === 'live-journey' ||
        hash === 'pnr-ticket-sanctuary' ||
        hash === 'station-amenities' ||
        hash === 'plan-availability' ||
        hash === 'gemini-rail-guide'
      ) {
        setCurrentPath(hash);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleNavigate = (path: ScreenPath) => {
    setCurrentPath(path);
    window.location.hash = path;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const handleOpenBooking = (trainName: string, selectedClass: string, price: number) => {
    setBookingState({
      isOpen: true,
      trainName,
      selectedClass,
      price,
    });
  };

  const handleConfirmBooking = () => {
    setBookingState((prev) => ({ ...prev, isOpen: false }));
    showToast(`✓ Booking confirmed for ${bookingState.trainName}. PNR issued!`);
    handleNavigate('pnr-ticket-sanctuary');
  };

  return (
    <div className="bg-[#faf6f0] font-sans text-[#2e3230] min-h-screen flex flex-col selection:bg-[#4a7c59]/20 selection:text-[#4a7c59]">
      <Header
        currentPath={currentPath}
        onNavigate={handleNavigate}
        onOpenSOS={() => setIsSosOpen(true)}
        onOpenWallet={() => setIsWalletOpen(true)}
      />

      <main className="w-full pt-20 bg-[#faf6f0] flex-1">
        {currentPath === 'plan-availability' && (
          <PlanAvailabilityScreen
            onNavigate={handleNavigate}
            onOpenBlueprint={(coach) => setBlueprintCoach(coach)}
            onBookTrain={handleOpenBooking}
            onShowToast={showToast}
          />
        )}

        {currentPath === 'gemini-rail-guide' && (
          <GeminiRailGuideScreen
            onShowToast={showToast}
            onOpenSOS={() => setIsSosOpen(true)}
          />
        )}

        {currentPath === 'station-amenities' && (
          <StationAmenitiesScreen
            onShowToast={showToast}
            onOpenSOS={() => setIsSosOpen(true)}
          />
        )}

        {currentPath === 'pnr-ticket-sanctuary' && (
          <PnrTicketSanctuaryScreen
            onShowToast={showToast}
            onOpenWallet={() => setIsWalletOpen(true)}
          />
        )}

        {currentPath === 'live-journey' && (
          <LiveJourneyScreen
            onNavigate={handleNavigate}
            onShowToast={showToast}
            onOpenWallet={() => setIsWalletOpen(true)}
            onOpenSOS={() => setIsSosOpen(true)}
          />
        )}
      </main>

      <Footer onOpenSOS={() => setIsSosOpen(true)} onShowToast={showToast} />

      {/* Shared Interactive Modals */}
      <WalletModal isOpen={isWalletOpen} onClose={() => setIsWalletOpen(false)} />

      <CoachBlueprintModal
        isOpen={blueprintCoach !== null}
        coachNumber={blueprintCoach || 'A1'}
        onClose={() => setBlueprintCoach(null)}
      />

      <BookingModal
        isOpen={bookingState.isOpen}
        trainName={bookingState.trainName}
        selectedClass={bookingState.selectedClass}
        price={bookingState.price}
        onClose={() => setBookingState((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={handleConfirmBooking}
      />

      <SosModal
        isOpen={isSosOpen}
        onClose={() => setIsSosOpen(false)}
        onTriggerSilentAlert={() => {
          showToast('Silent RPF & Train Captain Bridge Triggered. Stand by.');
        }}
      />

      <Toast message={toastMessage} onClear={() => setToastMessage(null)} />
    </div>
  );
}
