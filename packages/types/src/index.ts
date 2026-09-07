export type Language = 'th' | 'en';
export type LocalizedString = { th: string; en: string };
export type ThemeMode = 'dark' | 'light';

export type DistanceType = '10m' | '18m' | '30m' | '50m' | '70m';
export type LaneType = 'recurve' | 'compound' | 'barebow' | 'beginner_all';
export type LaneStatus = 'available' | 'reserved' | 'occupied' | 'maintenance';

export interface Lane {
  id: string;
  number: number;
  name: string;
  distance: DistanceType;
  type: LaneType;
  hourlyRate: number; // Baht per hour
  status: LaneStatus;
  maxShooters: number;
  currentBooking?: {
    bookingId?: string;
    bookingCode?: string;
    customerName: string;
    customerPhone?: string;
    startTime?: string; // "14:00"
    endTime: string;   // "15:00"
    durationMinutes?: number; // 60
    isWalkIn?: boolean;
    addonsCount?: number;
  };
}

export interface EquipmentItem {
  id: string;
  name: string;
  category: 'bow_recurve' | 'bow_compound' | 'bow_barebow' | 'arrows' | 'protection';
  drawWeight?: string; // e.g. "18 lbs", "22 lbs", "26 lbs"
  orientation?: 'right' | 'left';
  price: number;
  availableCount: number;
}

export interface Coach {
  id: string;
  name: string;
  nickname: string;
  experienceYears: number;
  specialty: string;
  ratePerSession: number;
  avatarUrl: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  type: 'monthly_unlimited' | 'punch_card' | 'annual_vip';
  price: number;
  validityDays: number;
  totalSessions?: number; // for punch card e.g. 10
  perks: string[];
}

export interface ShopBranding {
  primaryColor: string; // Hex code
  accentColor: string;
  logoUrl?: string;
  coverImageUrl?: string;
  lineOaId: string; // e.g. "@robinarchery"
  welcomeMessage: string;
  address: string;
  phone: string;
}

export interface Shop {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  subscriptionPlan: 'starter' | 'pro' | 'enterprise';
  subscriptionBilling: 'monthly' | 'annually';
  subscriptionStatus: 'active' | 'trial' | 'past_due';
  subscriptionRenewalDate: string;
  branding: ShopBranding;
  lanes: Lane[];
  equipment: EquipmentItem[];
  coaches: Coach[];
  membershipPlans: MembershipPlan[];
  openTime: string; // "10:00"
  closeTime: string; // "21:00"
  slotDurationMinutes: number; // 60
  bufferMinutes: number; // 10 min turnover
}

export interface Booking {
  id: string;
  bookingCode: string;
  shopId: string;
  customerLineId?: string;
  customerName: string;
  customerPhone: string;
  customerAvatar?: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "14:00 - 15:00"
  laneId: string;
  laneNumber: number;
  laneDistance: DistanceType;
  addons: {
    equipment?: { id: string; name: string; price: number; details: string }[];
    coach?: { id: string; name: string; price: number };
    extraShooters?: number;
  };
  hasSignedWaiver: boolean;
  waiverSignatureData?: string;
  paymentMethod: 'promptpay' | 'credit_card' | 'membership_quota' | 'cash' | 'counter';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  totalAmount: number;
  isWalkIn?: boolean;
  createdAt: string;
  checkedInAt?: string;
}

export interface ScoreEntry {
  id: string;
  date: string;
  shopName: string;
  distance: DistanceType;
  arrowsPerEnd: number;
  ends: number[][];
  totalScore: number;
  maxScore: number;
}
