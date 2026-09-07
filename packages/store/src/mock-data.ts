import { Shop, Booking } from '@archery/types';

export const INITIAL_SHOPS: Shop[] = [
  {
    id: 'shop-robin-bkk',
    slug: 'robin-archery-bkk',
    name: 'Robin Archery Arena (Bangkok)',
    tagline: 'สนามยิงธนู Indoor ติดแอร์มาตรฐานสากล ใจกลางกรุงเทพฯ',
    subscriptionPlan: 'pro',
    subscriptionBilling: 'annually',
    subscriptionStatus: 'active',
    subscriptionRenewalDate: '2027-02-15',
    openTime: '10:00',
    closeTime: '21:00',
    slotDurationMinutes: 60,
    bufferMinutes: 10,
    branding: {
      primaryColor: '#059669', // Emerald Green
      accentColor: '#F59E0B',  // Amber / Gold (Bullseye 10)
      lineOaId: '@robinarchery',
      welcomeMessage: 'ยินดีต้อนรับสู่ Robin Archery Arena! ยิงสนุก ปลอดภัย มีโค้ชคอยดูแล',
      address: '128/4 ถนนสุขุมวิท 71 พระโขนงเหนือ กรุงเทพมหานคร 10110',
      phone: '081-234-5678'
    },
    lanes: [
      { id: 'lane-101', number: 1, name: 'Lane 1 (Training)', distance: '10m', type: 'beginner_all', hourlyRate: 250, status: 'available', maxShooters: 2 },
      { id: 'lane-102', number: 2, name: 'Lane 2 (Training)', distance: '10m', type: 'beginner_all', hourlyRate: 250, status: 'available', maxShooters: 2 },
      { id: 'lane-103', number: 3, name: 'Lane 3 (Standard)', distance: '18m', type: 'recurve', hourlyRate: 300, status: 'occupied', maxShooters: 1, currentBooking: { customerName: 'คุณ ธนพล (Robin Pro)', endTime: '15:00' } },
      { id: 'lane-104', number: 4, name: 'Lane 4 (Standard)', distance: '18m', type: 'recurve', hourlyRate: 300, status: 'available', maxShooters: 1 },
      { id: 'lane-105', number: 5, name: 'Lane 5 (Compound)', distance: '18m', type: 'compound', hourlyRate: 350, status: 'available', maxShooters: 1 },
      { id: 'lane-106', number: 6, name: 'Lane 6 (Barebow)', distance: '18m', type: 'barebow', hourlyRate: 300, status: 'maintenance', maxShooters: 1 },
      { id: 'lane-107', number: 7, name: 'Lane 7 (Long Range)', distance: '30m', type: 'recurve', hourlyRate: 400, status: 'available', maxShooters: 1 },
      { id: 'lane-108', number: 8, name: 'Lane 8 (Long Range)', distance: '30m', type: 'compound', hourlyRate: 400, status: 'available', maxShooters: 1 },
    ],
    equipment: [
      { id: 'eq-1', name: 'ชุดคันธนู Recurve Starter (18 lbs - ถนัดขวา)', category: 'bow_recurve', drawWeight: '18 lbs', orientation: 'right', price: 100, availableCount: 8 },
      { id: 'eq-2', name: 'ชุดคันธนู Recurve Starter (18 lbs - ถนัดซ้าย)', category: 'bow_recurve', drawWeight: '18 lbs', orientation: 'left', price: 100, availableCount: 3 },
      { id: 'eq-3', name: 'ชุดคันธนู Recurve Intermediate (24 lbs - ถนัดขวา)', category: 'bow_recurve', drawWeight: '24 lbs', orientation: 'right', price: 150, availableCount: 5 },
      { id: 'eq-4', name: 'เซ็ตลูกธนูคาร์บอน 6 ดอก + ปลอกแขน + Finger Tab', category: 'protection', price: 50, availableCount: 15 },
    ],
    coaches: [
      { id: 'coach-1', name: 'โค้ชเอก (อดีตนักกีฬาทีมชาติ)', nickname: 'โค้ชเอก', experienceYears: 12, specialty: 'Recurve & Beginner Form', ratePerSession: 300, avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop' },
      { id: 'coach-2', name: 'โค้ชพลอย (แชมป์ระดับเยาวชน)', nickname: 'โค้ชพลอย', experienceYears: 6, specialty: 'Barebow & Youth Coaching', ratePerSession: 250, avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop' },
    ],
    membershipPlans: [
      {
        id: 'mem-monthly',
        name: 'Monthly Unlimited Pass',
        type: 'monthly_unlimited',
        price: 2990,
        validityDays: 30,
        perks: ['ยิงฟรีไม่จำกัดชั่วโมง (จองล่วงหน้า 1 วัน)', 'ส่วนลดอุปกรณ์เช่า 50%', 'ล็อกเกอร์เก็บคันธนูส่วนตัว', 'ส่วนลดเครื่องดื่มและเป้าธนู 15%']
      },
      {
        id: 'mem-punch-10',
        name: 'Punch Card 10 Hours (บัตรสะสม 10 ชม.)',
        type: 'punch_card',
        price: 2400,
        validityDays: 90,
        totalSessions: 10,
        perks: ['ประหยัดกว่าจ่ายรายครั้ง 600 บาท', 'ใช้ได้ทุกวัน ไม่จำกัดช่วงเวลา', 'โอนสิทธิ์ให้เพื่อนร่วมยิงได้']
      }
    ]
  },
  {
    id: 'shop-arrowzone-cm',
    slug: 'arrowzone-chiangmai',
    name: 'ArrowZone Outdoor Club (Chiang Mai)',
    tagline: 'สนามยิงธนูกลางแจ้ง วิวดอยสุเทพ ระยะไกลถึง 70 เมตร',
    subscriptionPlan: 'enterprise',
    subscriptionBilling: 'annually',
    subscriptionStatus: 'active',
    subscriptionRenewalDate: '2026-11-30',
    openTime: '08:30',
    closeTime: '18:30',
    slotDurationMinutes: 60,
    bufferMinutes: 15,
    branding: {
      primaryColor: '#D97706',
      accentColor: '#10B981',
      lineOaId: '@arrowzonecm',
      welcomeMessage: 'สัมผัสลมธรรมชาติและสายลมแห่งขุนเขาที่ ArrowZone Chiang Mai',
      address: '88 หมู่ 5 ตำบลสุเทพ อำเภอเมือง จังหวัดเชียงใหม่ 50200',
      phone: '053-888-999'
    },
    lanes: [
      { id: 'az-1', number: 1, name: 'Range A1', distance: '18m', type: 'recurve', hourlyRate: 200, status: 'available', maxShooters: 2 },
      { id: 'az-2', number: 2, name: 'Range A2', distance: '18m', type: 'recurve', hourlyRate: 200, status: 'available', maxShooters: 2 },
      { id: 'az-3', number: 3, name: 'Range B1', distance: '30m', type: 'barebow', hourlyRate: 250, status: 'available', maxShooters: 2 },
      { id: 'az-4', number: 4, name: 'Range C1 (WA Target)', distance: '50m', type: 'compound', hourlyRate: 350, status: 'available', maxShooters: 1 },
      { id: 'az-5', number: 5, name: 'Range D1 (Olympic Spec)', distance: '70m', type: 'recurve', hourlyRate: 400, status: 'available', maxShooters: 1 },
    ],
    equipment: [
      { id: 'az-eq-1', name: 'Outdoor Recurve Wooden Bow (20 lbs)', category: 'bow_recurve', drawWeight: '20 lbs', orientation: 'right', price: 80, availableCount: 10 },
      { id: 'az-eq-2', name: 'Outdoor Compound Hunter Bow', category: 'bow_compound', drawWeight: '40 lbs', orientation: 'right', price: 200, availableCount: 4 },
    ],
    coaches: [
      { id: 'az-c1', name: 'โค้ชอาร์ต (WA Certified)', nickname: 'โค้ชอาร์ต', experienceYears: 15, specialty: 'Olympic Target & 70m Tuning', ratePerSession: 400, avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop' },
    ],
    membershipPlans: [
      {
        id: 'az-mem-season',
        name: 'Club Season Pass 6 Months',
        type: 'monthly_unlimited',
        price: 7900,
        validityDays: 180,
        perks: ['เข้าใช้สนาม Outdoor ได้ไม่จำกัด', 'ฟรีสิทธิ์ใช้เป้าแข่งขัน FITA/WA', 'ส่วนลดเข้าร่วมทัวร์นาเมนต์ 20%']
      }
    ]
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bkg-1001',
    bookingCode: 'ARC-88219',
    shopId: 'shop-robin-bkk',
    customerLineId: 'U1234567890abcdef',
    customerName: 'คุณ ธนพล สมบูรณ์ผล',
    customerPhone: '089-111-2233',
    date: new Date().toISOString().split('T')[0],
    timeSlot: '14:00 - 15:00',
    laneId: 'lane-103',
    laneNumber: 3,
    laneDistance: '18m',
    addons: {
      equipment: [
        { id: 'eq-3', name: 'ชุดคันธนู Recurve Intermediate (24 lbs - ถนัดขวา)', price: 150, details: '24 lbs, Right-hand' }
      ]
    },
    hasSignedWaiver: true,
    paymentMethod: 'promptpay',
    paymentStatus: 'paid',
    totalAmount: 450,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    checkedInAt: new Date().toISOString(),
  }
];
