import { client, db } from './client';
import {
  shopsTable,
  lanesTable,
  equipmentTable,
  coachesTable,
  membershipPlansTable,
  bookingsTable,
} from './schema';
import { INITIAL_SHOPS, INITIAL_BOOKINGS } from './seed-data';
import { eq } from 'drizzle-orm';

let isInitialized = false;

export async function ensureDatabaseInitialized() {
  if (isInitialized) return;

  // 1. Create tables if not exist
  await client.execute(`
    CREATE TABLE IF NOT EXISTS shops (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      tagline TEXT NOT NULL,
      subscription_plan TEXT NOT NULL DEFAULT 'pro',
      subscription_billing TEXT NOT NULL DEFAULT 'annually',
      subscription_status TEXT NOT NULL DEFAULT 'active',
      subscription_renewal_date TEXT NOT NULL,
      branding TEXT NOT NULL,
      open_time TEXT NOT NULL DEFAULT '10:00',
      close_time TEXT NOT NULL DEFAULT '21:00',
      slot_duration_minutes INTEGER NOT NULL DEFAULT 60,
      buffer_minutes INTEGER NOT NULL DEFAULT 10,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS lanes (
      id TEXT PRIMARY KEY,
      shop_id TEXT NOT NULL,
      number INTEGER NOT NULL,
      name TEXT NOT NULL,
      distance TEXT NOT NULL,
      type TEXT NOT NULL,
      hourly_rate INTEGER NOT NULL DEFAULT 250,
      status TEXT NOT NULL DEFAULT 'available',
      max_shooters INTEGER NOT NULL DEFAULT 2,
      current_booking TEXT,
      updated_at TEXT NOT NULL,
      FOREIGN KEY (shop_id) REFERENCES shops(id)
    );
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS equipment (
      id TEXT PRIMARY KEY,
      shop_id TEXT NOT NULL,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      draw_weight TEXT,
      orientation TEXT,
      price INTEGER NOT NULL DEFAULT 0,
      available_count INTEGER NOT NULL DEFAULT 1,
      FOREIGN KEY (shop_id) REFERENCES shops(id)
    );
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS coaches (
      id TEXT PRIMARY KEY,
      shop_id TEXT NOT NULL,
      name TEXT NOT NULL,
      nickname TEXT NOT NULL,
      experience_years INTEGER NOT NULL DEFAULT 1,
      specialty TEXT NOT NULL,
      rate_per_session INTEGER NOT NULL DEFAULT 400,
      avatar_url TEXT NOT NULL,
      FOREIGN KEY (shop_id) REFERENCES shops(id)
    );
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS membership_plans (
      id TEXT PRIMARY KEY,
      shop_id TEXT NOT NULL,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      price INTEGER NOT NULL,
      validity_days INTEGER NOT NULL DEFAULT 30,
      total_sessions INTEGER,
      perks TEXT NOT NULL,
      FOREIGN KEY (shop_id) REFERENCES shops(id)
    );
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS bookings (
      id TEXT PRIMARY KEY,
      booking_code TEXT UNIQUE NOT NULL,
      shop_id TEXT NOT NULL,
      customer_line_id TEXT,
      customer_name TEXT NOT NULL,
      customer_phone TEXT NOT NULL,
      customer_avatar TEXT,
      date TEXT NOT NULL,
      time_slot TEXT NOT NULL,
      lane_id TEXT NOT NULL,
      lane_number INTEGER NOT NULL,
      lane_distance TEXT NOT NULL,
      addons TEXT NOT NULL,
      has_signed_waiver INTEGER NOT NULL DEFAULT 0,
      waiver_signature_data TEXT,
      payment_method TEXT NOT NULL,
      payment_status TEXT NOT NULL DEFAULT 'pending',
      total_amount INTEGER NOT NULL,
      is_walk_in INTEGER DEFAULT 0,
      created_at TEXT NOT NULL,
      checked_in_at TEXT,
      FOREIGN KEY (shop_id) REFERENCES shops(id),
      FOREIGN KEY (lane_id) REFERENCES lanes(id)
    );
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS scores (
      id TEXT PRIMARY KEY,
      customer_line_id TEXT,
      date TEXT NOT NULL,
      shop_name TEXT NOT NULL,
      distance TEXT NOT NULL,
      arrows_per_end INTEGER NOT NULL DEFAULT 3,
      ends TEXT NOT NULL,
      total_score INTEGER NOT NULL,
      max_score INTEGER NOT NULL,
      created_at TEXT NOT NULL
    );
  `);

  // 2. Check if shops exist, if not seed initial shops and bookings
  const existingShops = await db.select().from(shopsTable).limit(1);
  if (existingShops.length === 0) {
    const now = new Date().toISOString();
    for (const s of INITIAL_SHOPS) {
      await db.insert(shopsTable).values({
        id: s.id,
        slug: s.slug,
        name: s.name,
        tagline: s.tagline,
        subscriptionPlan: s.subscriptionPlan,
        subscriptionBilling: s.subscriptionBilling,
        subscriptionStatus: s.subscriptionStatus,
        subscriptionRenewalDate: s.subscriptionRenewalDate,
        branding: s.branding,
        openTime: s.openTime,
        closeTime: s.closeTime,
        slotDurationMinutes: s.slotDurationMinutes,
        bufferMinutes: s.bufferMinutes,
        createdAt: now,
        updatedAt: now,
      });

      // Seed lanes
      for (const lane of s.lanes) {
        await db.insert(lanesTable).values({
          id: lane.id,
          shopId: s.id,
          number: lane.number,
          name: lane.name,
          distance: lane.distance,
          type: lane.type,
          hourlyRate: lane.hourlyRate,
          status: lane.status,
          maxShooters: lane.maxShooters,
          currentBooking: lane.currentBooking || null,
          updatedAt: now,
        });
      }

      // Seed equipment
      for (const eqItem of s.equipment) {
        await db.insert(equipmentTable).values({
          id: eqItem.id,
          shopId: s.id,
          name: eqItem.name,
          category: eqItem.category,
          drawWeight: eqItem.drawWeight,
          orientation: eqItem.orientation,
          price: eqItem.price,
          availableCount: eqItem.availableCount,
        });
      }

      // Seed coaches
      for (const coach of s.coaches) {
        await db.insert(coachesTable).values({
          id: coach.id,
          shopId: s.id,
          name: coach.name,
          nickname: coach.nickname,
          experienceYears: coach.experienceYears,
          specialty: coach.specialty,
          ratePerSession: coach.ratePerSession,
          avatarUrl: coach.avatarUrl,
        });
      }

      // Seed membership plans
      for (const plan of s.membershipPlans) {
        await db.insert(membershipPlansTable).values({
          id: plan.id,
          shopId: s.id,
          name: plan.name,
          type: plan.type,
          price: plan.price,
          validityDays: plan.validityDays,
          totalSessions: plan.totalSessions,
          perks: plan.perks,
        });
      }
    }

    // Seed bookings
    for (const b of INITIAL_BOOKINGS) {
      await db.insert(bookingsTable).values({
        id: b.id,
        bookingCode: b.bookingCode,
        shopId: b.shopId,
        customerLineId: b.customerLineId || null,
        customerName: b.customerName,
        customerPhone: b.customerPhone,
        customerAvatar: b.customerAvatar || null,
        date: b.date,
        timeSlot: b.timeSlot,
        laneId: b.laneId,
        laneNumber: b.laneNumber,
        laneDistance: b.laneDistance,
        addons: b.addons,
        hasSignedWaiver: b.hasSignedWaiver,
        waiverSignatureData: b.waiverSignatureData || null,
        paymentMethod: b.paymentMethod,
        paymentStatus: b.paymentStatus,
        totalAmount: b.totalAmount,
        isWalkIn: b.isWalkIn || false,
        createdAt: b.createdAt,
        checkedInAt: b.checkedInAt || null,
      });
    }
  }

  isInitialized = true;
}
