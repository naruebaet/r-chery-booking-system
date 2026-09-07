import { Shop, Lane, Booking, ScoreEntry } from '@archery/types';
export declare function getShops(): Promise<Shop[]>;
export declare function getShopBySlug(slugOrId: string): Promise<Shop | null>;
export declare function createShop(shop: Shop): Promise<Shop>;
export declare function updateShop(shop: Shop): Promise<void>;
export declare function getBookings(shopId?: string): Promise<Booking[]>;
export declare function createBooking(booking: Booking): Promise<Booking>;
export declare function checkInBooking(bookingId: string): Promise<Booking | null>;
export declare function extendLaneSession(shopId: string, laneId: string, additionalMinutes: number): Promise<Lane | null>;
export declare function finishLaneSession(shopId: string, laneId: string): Promise<void>;
export declare function updateLane(laneId: string, updates: Partial<Lane>): Promise<void>;
export declare function getScores(customerLineId?: string): Promise<ScoreEntry[]>;
export declare function saveScore(score: ScoreEntry): Promise<ScoreEntry>;
//# sourceMappingURL=repositories.d.ts.map