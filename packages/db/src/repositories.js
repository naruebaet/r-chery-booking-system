import { eq, desc } from 'drizzle-orm';
import { db } from './client';
import { shopsTable, lanesTable, equipmentTable, coachesTable, membershipPlansTable, bookingsTable, scoresTable, } from './schema';
import { ensureDatabaseInitialized } from './init';
// Helper to assemble full Shop object from relational tables
async function buildFullShop(shopRow) {
    const lanesRows = await db
        .select()
        .from(lanesTable)
        .where(eq(lanesTable.shopId, shopRow.id));
    const eqRows = await db
        .select()
        .from(equipmentTable)
        .where(eq(equipmentTable.shopId, shopRow.id));
    const coachRows = await db
        .select()
        .from(coachesTable)
        .where(eq(coachesTable.shopId, shopRow.id));
    const memRows = await db
        .select()
        .from(membershipPlansTable)
        .where(eq(membershipPlansTable.shopId, shopRow.id));
    const lanes = lanesRows
        .map((l) => ({
        id: l.id,
        number: l.number,
        name: l.name,
        distance: l.distance,
        type: l.type,
        hourlyRate: l.hourlyRate,
        status: l.status,
        maxShooters: l.maxShooters,
        currentBooking: l.currentBooking || undefined,
    }))
        .sort((a, b) => a.number - b.number);
    const equipment = eqRows.map((e) => ({
        id: e.id,
        name: e.name,
        category: e.category,
        drawWeight: e.drawWeight || undefined,
        orientation: e.orientation || undefined,
        price: e.price,
        availableCount: e.availableCount,
    }));
    const coaches = coachRows.map((c) => ({
        id: c.id,
        name: c.name,
        nickname: c.nickname,
        experienceYears: c.experienceYears,
        specialty: c.specialty,
        ratePerSession: c.ratePerSession,
        avatarUrl: c.avatarUrl,
    }));
    const membershipPlans = memRows.map((m) => ({
        id: m.id,
        name: m.name,
        type: m.type,
        price: m.price,
        validityDays: m.validityDays,
        totalSessions: m.totalSessions || undefined,
        perks: m.perks,
    }));
    return {
        id: shopRow.id,
        slug: shopRow.slug,
        name: shopRow.name,
        tagline: shopRow.tagline,
        subscriptionPlan: shopRow.subscriptionPlan,
        subscriptionBilling: shopRow.subscriptionBilling,
        subscriptionStatus: shopRow.subscriptionStatus,
        subscriptionRenewalDate: shopRow.subscriptionRenewalDate,
        branding: shopRow.branding,
        lanes,
        equipment,
        coaches,
        membershipPlans,
        openTime: shopRow.openTime,
        closeTime: shopRow.closeTime,
        slotDurationMinutes: shopRow.slotDurationMinutes,
        bufferMinutes: shopRow.bufferMinutes,
    };
}
export async function getShops() {
    await ensureDatabaseInitialized();
    const shopRows = await db.select().from(shopsTable);
    const result = [];
    for (const row of shopRows) {
        result.push(await buildFullShop(row));
    }
    return result;
}
export async function getShopBySlug(slugOrId) {
    await ensureDatabaseInitialized();
    const rows = await db
        .select()
        .from(shopsTable)
        .where(eq(shopsTable.slug, slugOrId))
        .limit(1);
    if (rows.length === 0) {
        // Try by ID
        const byId = await db
            .select()
            .from(shopsTable)
            .where(eq(shopsTable.id, slugOrId))
            .limit(1);
        if (byId.length === 0)
            return null;
        return buildFullShop(byId[0]);
    }
    return buildFullShop(rows[0]);
}
export async function createShop(shop) {
    await ensureDatabaseInitialized();
    const now = new Date().toISOString();
    await db.insert(shopsTable).values({
        id: shop.id,
        slug: shop.slug,
        name: shop.name,
        tagline: shop.tagline,
        subscriptionPlan: shop.subscriptionPlan,
        subscriptionBilling: shop.subscriptionBilling,
        subscriptionStatus: shop.subscriptionStatus,
        subscriptionRenewalDate: shop.subscriptionRenewalDate,
        branding: shop.branding,
        openTime: shop.openTime,
        closeTime: shop.closeTime,
        slotDurationMinutes: shop.slotDurationMinutes,
        bufferMinutes: shop.bufferMinutes,
        createdAt: now,
        updatedAt: now,
    });
    for (const lane of shop.lanes) {
        await db.insert(lanesTable).values({
            id: lane.id,
            shopId: shop.id,
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
    for (const eqItem of shop.equipment) {
        await db.insert(equipmentTable).values({
            id: eqItem.id,
            shopId: shop.id,
            name: eqItem.name,
            category: eqItem.category,
            drawWeight: eqItem.drawWeight,
            orientation: eqItem.orientation,
            price: eqItem.price,
            availableCount: eqItem.availableCount,
        });
    }
    for (const coach of shop.coaches) {
        await db.insert(coachesTable).values({
            id: coach.id,
            shopId: shop.id,
            name: coach.name,
            nickname: coach.nickname,
            experienceYears: coach.experienceYears,
            specialty: coach.specialty,
            ratePerSession: coach.ratePerSession,
            avatarUrl: coach.avatarUrl,
        });
    }
    for (const plan of shop.membershipPlans) {
        await db.insert(membershipPlansTable).values({
            id: plan.id,
            shopId: shop.id,
            name: plan.name,
            type: plan.type,
            price: plan.price,
            validityDays: plan.validityDays,
            totalSessions: plan.totalSessions,
            perks: plan.perks,
        });
    }
    return shop;
}
export async function updateShop(shop) {
    await ensureDatabaseInitialized();
    const now = new Date().toISOString();
    await db
        .update(shopsTable)
        .set({
        name: shop.name,
        tagline: shop.tagline,
        subscriptionPlan: shop.subscriptionPlan,
        subscriptionBilling: shop.subscriptionBilling,
        subscriptionStatus: shop.subscriptionStatus,
        subscriptionRenewalDate: shop.subscriptionRenewalDate,
        branding: shop.branding,
        openTime: shop.openTime,
        closeTime: shop.closeTime,
        slotDurationMinutes: shop.slotDurationMinutes,
        bufferMinutes: shop.bufferMinutes,
        updatedAt: now,
    })
        .where(eq(shopsTable.id, shop.id));
    // Update lanes
    for (const lane of shop.lanes) {
        await db
            .insert(lanesTable)
            .values({
            id: lane.id,
            shopId: shop.id,
            number: lane.number,
            name: lane.name,
            distance: lane.distance,
            type: lane.type,
            hourlyRate: lane.hourlyRate,
            status: lane.status,
            maxShooters: lane.maxShooters,
            currentBooking: lane.currentBooking || null,
            updatedAt: now,
        })
            .onConflictDoUpdate({
            target: lanesTable.id,
            set: {
                number: lane.number,
                name: lane.name,
                distance: lane.distance,
                type: lane.type,
                hourlyRate: lane.hourlyRate,
                status: lane.status,
                maxShooters: lane.maxShooters,
                currentBooking: lane.currentBooking || null,
                updatedAt: now,
            },
        });
    }
}
export async function getBookings(shopId) {
    await ensureDatabaseInitialized();
    let query = db.select().from(bookingsTable).orderBy(desc(bookingsTable.createdAt));
    const rows = shopId
        ? await db.select().from(bookingsTable).where(eq(bookingsTable.shopId, shopId)).orderBy(desc(bookingsTable.createdAt))
        : await query;
    return rows.map((b) => ({
        id: b.id,
        bookingCode: b.bookingCode,
        shopId: b.shopId,
        customerLineId: b.customerLineId || undefined,
        customerName: b.customerName,
        customerPhone: b.customerPhone,
        customerAvatar: b.customerAvatar || undefined,
        date: b.date,
        timeSlot: b.timeSlot,
        laneId: b.laneId,
        laneNumber: b.laneNumber,
        laneDistance: b.laneDistance,
        addons: b.addons,
        hasSignedWaiver: b.hasSignedWaiver,
        waiverSignatureData: b.waiverSignatureData || undefined,
        paymentMethod: b.paymentMethod,
        paymentStatus: b.paymentStatus,
        totalAmount: b.totalAmount,
        isWalkIn: b.isWalkIn || false,
        createdAt: b.createdAt,
        checkedInAt: b.checkedInAt || undefined,
    }));
}
export async function createBooking(booking) {
    await ensureDatabaseInitialized();
    const now = new Date().toISOString();
    await db.insert(bookingsTable).values({
        id: booking.id,
        bookingCode: booking.bookingCode,
        shopId: booking.shopId,
        customerLineId: booking.customerLineId || null,
        customerName: booking.customerName,
        customerPhone: booking.customerPhone,
        customerAvatar: booking.customerAvatar || null,
        date: booking.date,
        timeSlot: booking.timeSlot,
        laneId: booking.laneId,
        laneNumber: booking.laneNumber,
        laneDistance: booking.laneDistance,
        addons: booking.addons,
        hasSignedWaiver: booking.hasSignedWaiver,
        waiverSignatureData: booking.waiverSignatureData || null,
        paymentMethod: booking.paymentMethod,
        paymentStatus: booking.paymentStatus,
        totalAmount: booking.totalAmount,
        isWalkIn: booking.isWalkIn || false,
        createdAt: booking.createdAt || now,
        checkedInAt: booking.checkedInAt || null,
    });
    // Update lane status to occupied
    const parts = booking.timeSlot.split(' - ');
    const currentBooking = {
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
    await db
        .update(lanesTable)
        .set({
        status: 'occupied',
        currentBooking,
        updatedAt: now,
    })
        .where(eq(lanesTable.id, booking.laneId));
    return booking;
}
export async function checkInBooking(bookingId) {
    await ensureDatabaseInitialized();
    const now = new Date().toISOString();
    await db
        .update(bookingsTable)
        .set({ checkedInAt: now })
        .where(eq(bookingsTable.id, bookingId));
    const rows = await db
        .select()
        .from(bookingsTable)
        .where(eq(bookingsTable.id, bookingId))
        .limit(1);
    if (rows.length === 0)
        return null;
    const b = rows[0];
    // Also ensure the lane is marked occupied
    await db
        .update(lanesTable)
        .set({
        status: 'occupied',
        updatedAt: now,
    })
        .where(eq(lanesTable.id, b.laneId));
    return {
        id: b.id,
        bookingCode: b.bookingCode,
        shopId: b.shopId,
        customerLineId: b.customerLineId || undefined,
        customerName: b.customerName,
        customerPhone: b.customerPhone,
        customerAvatar: b.customerAvatar || undefined,
        date: b.date,
        timeSlot: b.timeSlot,
        laneId: b.laneId,
        laneNumber: b.laneNumber,
        laneDistance: b.laneDistance,
        addons: b.addons,
        hasSignedWaiver: b.hasSignedWaiver,
        waiverSignatureData: b.waiverSignatureData || undefined,
        paymentMethod: b.paymentMethod,
        paymentStatus: b.paymentStatus,
        totalAmount: b.totalAmount,
        isWalkIn: b.isWalkIn || false,
        createdAt: b.createdAt,
        checkedInAt: b.checkedInAt || undefined,
    };
}
export async function extendLaneSession(shopId, laneId, additionalMinutes) {
    await ensureDatabaseInitialized();
    const rows = await db
        .select()
        .from(lanesTable)
        .where(eq(lanesTable.id, laneId))
        .limit(1);
    if (rows.length === 0 || !rows[0].currentBooking)
        return null;
    const lane = rows[0];
    const cur = lane.currentBooking;
    const currentEnd = (cur.endTime || '15:00').split(':');
    const endHours = parseInt(currentEnd[0], 10);
    const endMins = parseInt(currentEnd[1], 10);
    const newEndDate = new Date();
    newEndDate.setHours(endHours);
    newEndDate.setMinutes(endMins + additionalMinutes);
    const updatedEndHours = newEndDate.getHours().toString().padStart(2, '0');
    const updatedEndMins = newEndDate.getMinutes().toString().padStart(2, '0');
    const updatedBooking = {
        ...cur,
        endTime: `${updatedEndHours}:${updatedEndMins}`,
        durationMinutes: (cur.durationMinutes || 60) + additionalMinutes,
    };
    const now = new Date().toISOString();
    await db
        .update(lanesTable)
        .set({
        currentBooking: updatedBooking,
        updatedAt: now,
    })
        .where(eq(lanesTable.id, laneId));
    return {
        id: lane.id,
        number: lane.number,
        name: lane.name,
        distance: lane.distance,
        type: lane.type,
        hourlyRate: lane.hourlyRate,
        status: lane.status,
        maxShooters: lane.maxShooters,
        currentBooking: updatedBooking,
    };
}
export async function finishLaneSession(shopId, laneId) {
    await ensureDatabaseInitialized();
    const now = new Date().toISOString();
    await db
        .update(lanesTable)
        .set({
        status: 'available',
        currentBooking: null,
        updatedAt: now,
    })
        .where(eq(lanesTable.id, laneId));
}
export async function updateLane(laneId, updates) {
    await ensureDatabaseInitialized();
    const now = new Date().toISOString();
    const setValues = { updatedAt: now };
    if (updates.status !== undefined)
        setValues.status = updates.status;
    if (updates.hourlyRate !== undefined)
        setValues.hourlyRate = updates.hourlyRate;
    if (updates.distance !== undefined)
        setValues.distance = updates.distance;
    if (updates.type !== undefined)
        setValues.type = updates.type;
    if (updates.name !== undefined)
        setValues.name = updates.name;
    if (updates.currentBooking !== undefined)
        setValues.currentBooking = updates.currentBooking;
    await db.update(lanesTable).set(setValues).where(eq(lanesTable.id, laneId));
}
export async function getScores(customerLineId) {
    await ensureDatabaseInitialized();
    const rows = customerLineId
        ? await db
            .select()
            .from(scoresTable)
            .where(eq(scoresTable.customerLineId, customerLineId))
            .orderBy(desc(scoresTable.createdAt))
        : await db.select().from(scoresTable).orderBy(desc(scoresTable.createdAt));
    return rows.map((s) => ({
        id: s.id,
        date: s.date,
        shopName: s.shopName,
        distance: s.distance,
        arrowsPerEnd: s.arrowsPerEnd,
        ends: s.ends,
        totalScore: s.totalScore,
        maxScore: s.maxScore,
    }));
}
export async function saveScore(score) {
    await ensureDatabaseInitialized();
    const now = new Date().toISOString();
    await db.insert(scoresTable).values({
        id: score.id,
        customerLineId: null,
        date: score.date,
        shopName: score.shopName,
        distance: score.distance,
        arrowsPerEnd: score.arrowsPerEnd,
        ends: score.ends,
        totalScore: score.totalScore,
        maxScore: score.maxScore,
        createdAt: now,
    });
    return score;
}
//# sourceMappingURL=repositories.js.map