import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
export const shopsTable = sqliteTable('shops', {
    id: text('id').primaryKey(),
    slug: text('slug').notNull().unique(),
    name: text('name').notNull(),
    tagline: text('tagline').notNull(),
    subscriptionPlan: text('subscription_plan').notNull().default('pro'), // 'starter' | 'pro' | 'enterprise'
    subscriptionBilling: text('subscription_billing').notNull().default('annually'), // 'monthly' | 'annually'
    subscriptionStatus: text('subscription_status').notNull().default('active'), // 'active' | 'trial' | 'past_due'
    subscriptionRenewalDate: text('subscription_renewal_date').notNull(),
    branding: text('branding', { mode: 'json' }).notNull(), // JSON string of ShopBranding
    openTime: text('open_time').notNull().default('10:00'),
    closeTime: text('close_time').notNull().default('21:00'),
    slotDurationMinutes: integer('slot_duration_minutes').notNull().default(60),
    bufferMinutes: integer('buffer_minutes').notNull().default(10),
    createdAt: text('created_at').notNull(),
    updatedAt: text('updated_at').notNull(),
});
export const lanesTable = sqliteTable('lanes', {
    id: text('id').primaryKey(),
    shopId: text('shop_id').notNull().references(() => shopsTable.id),
    number: integer('number').notNull(),
    name: text('name').notNull(),
    distance: text('distance').notNull(), // '10m' | '18m' | '30m' | '50m' | '70m'
    type: text('type').notNull(), // 'recurve' | 'compound' | 'barebow' | 'beginner_all'
    hourlyRate: integer('hourly_rate').notNull().default(250),
    status: text('status').notNull().default('available'), // 'available' | 'reserved' | 'occupied' | 'maintenance'
    maxShooters: integer('max_shooters').notNull().default(2),
    currentBooking: text('current_booking', { mode: 'json' }), // JSON string of current booking summary
    updatedAt: text('updated_at').notNull(),
});
export const equipmentTable = sqliteTable('equipment', {
    id: text('id').primaryKey(),
    shopId: text('shop_id').notNull().references(() => shopsTable.id),
    name: text('name').notNull(),
    category: text('category').notNull(), // 'bow_recurve' | 'bow_compound' | 'bow_barebow' | 'arrows' | 'protection'
    drawWeight: text('draw_weight'),
    orientation: text('orientation'), // 'right' | 'left'
    price: integer('price').notNull().default(0),
    availableCount: integer('available_count').notNull().default(1),
});
export const coachesTable = sqliteTable('coaches', {
    id: text('id').primaryKey(),
    shopId: text('shop_id').notNull().references(() => shopsTable.id),
    name: text('name').notNull(),
    nickname: text('nickname').notNull(),
    experienceYears: integer('experience_years').notNull().default(1),
    specialty: text('specialty').notNull(),
    ratePerSession: integer('rate_per_session').notNull().default(400),
    avatarUrl: text('avatar_url').notNull(),
});
export const membershipPlansTable = sqliteTable('membership_plans', {
    id: text('id').primaryKey(),
    shopId: text('shop_id').notNull().references(() => shopsTable.id),
    name: text('name').notNull(),
    type: text('type').notNull(), // 'monthly_unlimited' | 'punch_card' | 'annual_vip'
    price: integer('price').notNull(),
    validityDays: integer('validity_days').notNull().default(30),
    totalSessions: integer('total_sessions'),
    perks: text('perks', { mode: 'json' }).notNull(), // string[]
});
export const bookingsTable = sqliteTable('bookings', {
    id: text('id').primaryKey(),
    bookingCode: text('booking_code').notNull().unique(),
    shopId: text('shop_id').notNull().references(() => shopsTable.id),
    customerLineId: text('customer_line_id'),
    customerName: text('customer_name').notNull(),
    customerPhone: text('customer_phone').notNull(),
    customerAvatar: text('customer_avatar'),
    date: text('date').notNull(), // YYYY-MM-DD
    timeSlot: text('time_slot').notNull(),
    laneId: text('lane_id').notNull().references(() => lanesTable.id),
    laneNumber: integer('lane_number').notNull(),
    laneDistance: text('lane_distance').notNull(),
    addons: text('addons', { mode: 'json' }).notNull(), // JSON
    hasSignedWaiver: integer('has_signed_waiver', { mode: 'boolean' }).notNull().default(false),
    waiverSignatureData: text('waiver_signature_data'),
    paymentMethod: text('payment_method').notNull(), // 'promptpay' | 'credit_card' | 'membership_quota' | 'cash' | 'counter'
    paymentStatus: text('payment_status').notNull().default('pending'), // 'pending' | 'paid' | 'refunded'
    totalAmount: integer('total_amount').notNull(),
    isWalkIn: integer('is_walk_in', { mode: 'boolean' }).default(false),
    createdAt: text('created_at').notNull(),
    checkedInAt: text('checked_in_at'),
});
export const scoresTable = sqliteTable('scores', {
    id: text('id').primaryKey(),
    customerLineId: text('customer_line_id'),
    date: text('date').notNull(),
    shopName: text('shop_name').notNull(),
    distance: text('distance').notNull(),
    arrowsPerEnd: integer('arrows_per_end').notNull().default(3),
    ends: text('ends', { mode: 'json' }).notNull(), // number[][]
    totalScore: integer('total_score').notNull(),
    maxScore: integer('max_score').notNull(),
    createdAt: text('created_at').notNull(),
});
//# sourceMappingURL=schema.js.map