import { Shop, Booking, ScoreEntry, Lane } from '@archery/types';
import { INITIAL_SHOPS, INITIAL_BOOKINGS } from './mock-data';

const STORAGE_KEY_SHOPS = 'archery_thai_shops_v2';
const STORAGE_KEY_BOOKINGS = 'archery_thai_bookings_v2';
const STORAGE_KEY_SCORES = 'archery_thai_scores_v2';

export const getStoredShops = (): Shop[] => {
  if (typeof window === 'undefined') return INITIAL_SHOPS;
  try {
    const data = localStorage.getItem(STORAGE_KEY_SHOPS);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_SHOPS, JSON.stringify(INITIAL_SHOPS));
      return INITIAL_SHOPS;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_SHOPS;
  }
};

export const saveShops = (shops: Shop[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_SHOPS, JSON.stringify(shops));
  window.dispatchEvent(new Event('archery-shops-updated'));
};

export const getShopBySlug = (slug: string): Shop | undefined => {
  const shops = getStoredShops();
  return shops.find((s) => s.slug === slug || s.id === slug);
};

export const updateShop = (updatedShop: Shop) => {
  const shops = getStoredShops();
  const index = shops.findIndex((s) => s.id === updatedShop.id);
  if (index !== -1) {
    shops[index] = updatedShop;
  } else {
    shops.push(updatedShop);
  }
  saveShops(shops);
};

export const getStoredBookings = (shopId?: string): Booking[] => {
  if (typeof window === 'undefined') return INITIAL_BOOKINGS;
  try {
    const data = localStorage.getItem(STORAGE_KEY_BOOKINGS);
    const bookings: Booking[] = data ? JSON.parse(data) : INITIAL_BOOKINGS;
    if (!data) {
      localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(INITIAL_BOOKINGS));
    }
    if (shopId) {
      return bookings.filter((b) => b.shopId === shopId);
    }
    return bookings;
  } catch {
    return INITIAL_BOOKINGS;
  }
};

export const createBooking = (booking: Booking) => {
  if (typeof window === 'undefined') return;
  const bookings = getStoredBookings();
  bookings.unshift(booking);
  localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(bookings));

  // Update lane status
  const shops = getStoredShops();
  const shop = shops.find((s) => s.id === booking.shopId);
  if (shop) {
    const lane = shop.lanes.find((l) => l.id === booking.laneId);
    if (lane) {
      lane.status = 'occupied';
      const parts = booking.timeSlot.split(' - ');
      lane.currentBooking = {
        bookingId: booking.id,
        bookingCode: booking.bookingCode,
        customerName: booking.customerName,
        customerPhone: booking.customerPhone,
        startTime: parts[0] || '14:00',
        endTime: parts[1] || '15:00',
        durationMinutes: 60,
        isWalkIn: booking.isWalkIn,
        addonsCount: (booking.addons.equipment?.length || 0) + (booking.addons.coach ? 1 : 0),
      };
      updateShop(shop);
    }
  }

  window.dispatchEvent(new Event('archery-bookings-updated'));
};

export interface WalkInParams {
  shopId: string;
  laneId: string;
  customerName: string;
  customerPhone: string;
  durationMinutes: number; // 30, 60, 90, 120
  equipmentAddons: { id: string; name: string; price: number; details: string }[];
  coachAddon?: { id: string; name: string; price: number };
  paymentMethod: 'cash' | 'promptpay' | 'credit_card' | 'membership_quota';
  totalAmount: number;
}

export const createWalkInBooking = (params: WalkInParams): Booking | null => {
  if (typeof window === 'undefined') return null;

  const shops = getStoredShops();
  const shop = shops.find((s) => s.id === params.shopId);
  if (!shop) return null;

  const lane = shop.lanes.find((l) => l.id === params.laneId);
  if (!lane) return null;

  const now = new Date();
  const startHours = now.getHours().toString().padStart(2, '0');
  const startMinutes = now.getMinutes().toString().padStart(2, '0');
  const startTime = `${startHours}:${startMinutes}`;

  const endTimestamp = new Date(now.getTime() + params.durationMinutes * 60000);
  const endHours = endTimestamp.getHours().toString().padStart(2, '0');
  const endMinutes = endTimestamp.getMinutes().toString().padStart(2, '0');
  const endTime = `${endHours}:${endMinutes}`;
  const timeSlot = `${startTime} - ${endTime}`;

  const randomNum = Math.floor(10000 + Math.random() * 90000);
  const bookingCode = `WK-${randomNum}`;

  const newBooking: Booking = {
    id: 'bkg-walkin-' + Date.now(),
    bookingCode,
    shopId: shop.id,
    customerName: params.customerName || 'ลูกค้า Walk-in ทั่วไป',
    customerPhone: params.customerPhone || 'Walk-in',
    date: now.toISOString().split('T')[0],
    timeSlot,
    laneId: lane.id,
    laneNumber: lane.number,
    laneDistance: lane.distance,
    addons: {
      equipment: params.equipmentAddons,
      coach: params.coachAddon,
    },
    hasSignedWaiver: true,
    paymentMethod: params.paymentMethod,
    paymentStatus: 'paid',
    totalAmount: params.totalAmount,
    isWalkIn: true,
    createdAt: now.toISOString(),
    checkedInAt: now.toISOString(), // Immediately checked-in for walk-in
  };

  createBooking(newBooking);

  // Directly set lane current booking details
  lane.status = 'occupied';
  lane.currentBooking = {
    bookingId: newBooking.id,
    bookingCode,
    customerName: newBooking.customerName,
    customerPhone: newBooking.customerPhone,
    startTime,
    endTime,
    durationMinutes: params.durationMinutes,
    isWalkIn: true,
    addonsCount: params.equipmentAddons.length + (params.coachAddon ? 1 : 0),
  };
  updateShop(shop);

  return newBooking;
};

export const extendLaneSession = (shopId: string, laneId: string, additionalMinutes: number) => {
  if (typeof window === 'undefined') return;
  const shops = getStoredShops();
  const shop = shops.find((s) => s.id === shopId);
  if (!shop) return;

  const lane = shop.lanes.find((l) => l.id === laneId);
  if (!lane || !lane.currentBooking) return;

  const currentEnd = lane.currentBooking.endTime.split(':');
  const endHours = parseInt(currentEnd[0], 10);
  const endMins = parseInt(currentEnd[1], 10);

  const newEndDate = new Date();
  newEndDate.setHours(endHours);
  newEndDate.setMinutes(endMins + additionalMinutes);

  const updatedEndHours = newEndDate.getHours().toString().padStart(2, '0');
  const updatedEndMins = newEndDate.getMinutes().toString().padStart(2, '0');

  lane.currentBooking.endTime = `${updatedEndHours}:${updatedEndMins}`;
  lane.currentBooking.durationMinutes = (lane.currentBooking.durationMinutes || 60) + additionalMinutes;

  updateShop(shop);
  window.dispatchEvent(new Event('archery-shops-updated'));
};

export const finishLaneSession = (shopId: string, laneId: string) => {
  if (typeof window === 'undefined') return;
  const shops = getStoredShops();
  const shop = shops.find((s) => s.id === shopId);
  if (!shop) return;

  const lane = shop.lanes.find((l) => l.id === laneId);
  if (!lane) return;

  lane.status = 'available';
  lane.currentBooking = undefined;

  updateShop(shop);
  window.dispatchEvent(new Event('archery-shops-updated'));
};

export const checkInBooking = (bookingId: string) => {
  if (typeof window === 'undefined') return;
  const bookings = getStoredBookings();
  const booking = bookings.find((b) => b.id === bookingId);
  if (booking) {
    booking.checkedInAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(bookings));
    window.dispatchEvent(new Event('archery-bookings-updated'));
  }
};

export const getStoredScores = (customerLineId?: string): ScoreEntry[] => {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY_SCORES);
    const scores: ScoreEntry[] = data ? JSON.parse(data) : [];
    return scores;
  } catch {
    return [];
  }
};

export const saveScoreEntry = (score: ScoreEntry) => {
  if (typeof window === 'undefined') return;
  const scores = getStoredScores();
  scores.unshift(score);
  localStorage.setItem(STORAGE_KEY_SCORES, JSON.stringify(scores));
  window.dispatchEvent(new Event('archery-scores-updated'));
};
