export type ScreenPath =
  | 'live-journey'
  | 'pnr-ticket-sanctuary'
  | 'station-amenities'
  | 'plan-availability'
  | 'gemini-rail-guide';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'gemini';
  text: string;
  time: string;
  chips?: string[];
  meta?: string;
  details?: {
    location?: string;
    points?: string[];
    notice?: string;
  };
}

export interface TrainOption {
  id: string;
  number: string;
  name: string;
  tag: string;
  badge?: string;
  depTime: string;
  depStation: string;
  depPlatform?: string;
  arrTime: string;
  arrStation: string;
  arrPlatform?: string;
  duration: string;
  distance: string;
  haltsCount: number;
  punctuality: string;
  description: string;
  featured?: boolean;
  classes: {
    code: string;
    name: string;
    seats: number;
    price: number;
    status: string;
    recommended?: boolean;
  }[];
}
