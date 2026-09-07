'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { saveShops, getStoredShops } from '@archery/store';
import { Shop } from '@archery/types';
import { useI18n } from '@archery/ui';
import { Store, Check, Sparkles, ArrowRight } from 'lucide-react';

export default function RegisterShopPage() {
  const router = useRouter();
  const { t } = useI18n();

  const [shopName, setShopName] = useState('');
  const [tagline, setTagline] = useState('');
  const [lineOaId, setLineOaId] = useState('@');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [laneCount, setLaneCount] = useState(6);

  const [plan, setPlan] = useState<'starter' | 'pro' | 'enterprise'>('pro');
  const [billing, setBilling] = useState<'monthly' | 'annually'>('annually');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const planDetails = {
    starter: {
      name: 'Starter Plan',
      desc: t('เหมาะสำหรับสนามขนาดเล็ก 1-4 เลน เริ่มต้นเปิดจองออนไลน์', 'For boutique ranges (1-4 lanes) starting online booking'),
      monthlyPrice: 990,
      annualPrice: 9900,
      features: [
        t('รองรับสูงสุด 4 เลน', 'Up to 4 shooting lanes'),
        t('จองผ่าน LINE LIFF', 'LINE LIFF Booking'),
        t('PromptPay QR Payment', 'PromptPay QR Payment'),
        t('สถิติรายได้พื้นฐาน', 'Basic Revenue Stats'),
      ],
    },
    pro: {
      name: t('Pro Plan (ยอดนิยม 🎯)', 'Pro Plan (Most Popular 🎯)'),
      desc: t('สำหรับสนามยิงธนูมาตรฐาน ไม่จำกัดเลน พร้อมระบบความปลอดภัยครบ', 'For standard archery ranges with unlimited lanes & safety suite'),
      monthlyPrice: 2490,
      annualPrice: 24900,
      features: [
        t('ไม่จำกัดจำนวนเลนยิง', 'Unlimited shooting lanes'),
        'Interactive Lane Map',
        t('ระบบ Digital Safety Waiver', 'Digital Safety Waiver System'),
        t('ระบบจัดการอุปกรณ์เช่า & โค้ช', 'Rental Gear & Coach Management'),
        t('ระบบสมาชิกรายเดือน & Punch Card', 'Memberships & Punch Cards'),
        t('เครื่องมือนับคะแนน Score Companion', 'Score Companion Tool'),
      ],
    },
    enterprise: {
      name: 'Enterprise / Multi-Branch',
      desc: t('สำหรับสนามขนาดใหญ่ หลายสาขา หรือสโมสรยิงธนูระดับชาติ', 'For multi-branch ranges or national archery clubs'),
      monthlyPrice: 4900,
      annualPrice: 49000,
      features: [
        t('ทุกฟีเจอร์ใน Pro Plan', 'Everything in Pro Plan'),
        t('รองรับหลายสาขา (Multi-Branch)', 'Multi-Branch centralized dashboard'),
        'Custom Domain & Full White-label',
        t('เจ้าหน้าที่ Support ดูแลเฉพาะแบบ 24/7', '24/7 Dedicated Priority Support'),
        t('API เชื่อมต่อระบบ ERP / บัญชีภายนอก', 'ERP / External Accounting API'),
      ],
    },
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shopName) return;

    setIsSubmitting(true);

    const slug = shopName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || 'archery-club-' + Date.now().toString().slice(-4);

    const lanes = Array.from({ length: Number(laneCount) }).map((_, i) => ({
      id: `lane-${i + 1}`,
      number: i + 1,
      name: `Lane ${i + 1} (${i < 2 ? '10m' : i < 4 ? '18m' : '30m'})`,
      distance: (i < 2 ? '10m' : i < 4 ? '18m' : '30m') as any,
      type: 'recurve' as any,
      hourlyRate: i < 2 ? 250 : 300,
      status: 'available' as any,
      maxShooters: 2,
    }));

    const newShop: Shop = {
      id: 'shop-' + Date.now(),
      slug,
      name: shopName,
      tagline: tagline || 'สนามยิงธนูมาตรฐานสากล',
      subscriptionPlan: plan,
      subscriptionBilling: billing,
      subscriptionStatus: 'active',
      subscriptionRenewalDate: new Date(Date.now() + (billing === 'annually' ? 365 : 30) * 86400000)
        .toISOString()
        .split('T')[0],
      openTime: '10:00',
      closeTime: '21:00',
      slotDurationMinutes: 60,
      bufferMinutes: 10,
      branding: {
        primaryColor: '#059669',
        accentColor: '#F59E0B',
        lineOaId: lineOaId.startsWith('@') ? lineOaId : `@${lineOaId}`,
        welcomeMessage: `ยินดีต้อนรับสู่ ${shopName}!`,
        address: address || 'กรุงเทพมหานคร',
        phone: phone || '081-000-0000',
      },
      lanes,
      equipment: [
        { id: 'eq-init-1', name: 'Recurve Starter Bow (18 lbs)', category: 'bow_recurve', drawWeight: '18 lbs', orientation: 'right', price: 100, availableCount: 5 },
      ],
      coaches: [
        { id: 'coach-init-1', name: 'โค้ชประจำสนาม', nickname: 'โค้ช', experienceYears: 5, specialty: 'Basic Form & Safety', ratePerSession: 250, avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop' },
      ],
      membershipPlans: [
        { id: 'mem-init-1', name: 'Monthly Unlimited', type: 'monthly_unlimited', price: 2900, validityDays: 30, perks: ['ยิงฟรีไม่จำกัดชั่วโมง', 'ส่วนลดอุปกรณ์ 50%'] },
      ],
    };

    const existingShops = getStoredShops();
    existingShops.push(newShop);
    saveShops(existingShops);

    setTimeout(() => {
      setIsSubmitting(false);
      router.push(`/admin/${slug}`);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            {t('เปิดร้านง่ายๆ ใน 2 นาที ทดลองใช้งานฟรี 14 วัน', 'Easy setup in 2 minutes. Free 14-day trial.')}
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            {t('สมัครเปิดสนามยิงธนูบนแพลตฟอร์ม', 'Register Your Archery Range on ArcherHub')}
          </h1>
          <p className="text-sm text-slate-400">
            {t(
              'เชื่อมต่อ LINE Official Account ของร้านคุณ ให้ลูกค้าเลือกเลนยิง เซ็นข้อตกลงความปลอดภัย และจ่ายเงินได้ทันที',
              'Connect your range LINE OA to let archers book lanes, sign safety waivers, and pay seamlessly'
            )}
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-8">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Store className="w-5 h-5 text-emerald-400" />
              {t('1. ข้อมูลสนามยิงธนูของคุณ', '1. Range Information')}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-300 mb-1.5">
                  {t('ชื่อสนามยิงธนู (Shop Name) *', 'Range Name *')}
                </label>
                <input
                  type="text"
                  required
                  placeholder={t('เช่น Golden Arrow Archery Club', 'e.g. Golden Arrow Archery Club')}
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1.5">
                  {t('LINE Official Account ID ของร้าน *', 'LINE Official Account ID *')}
                </label>
                <input
                  type="text"
                  required
                  placeholder="@yourarchery"
                  value={lineOaId}
                  onChange={(e) => setLineOaId(e.target.value)}
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1.5">
                  {t('เบอร์โทรศัพท์ติดต่อหน้าร้าน *', 'Range Contact Phone *')}
                </label>
                <input
                  type="tel"
                  required
                  placeholder="081-xxx-xxxx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              {t('2. เลือกแพ็กเกจ SaaS สำหรับร้านค้า', '2. Select Range SaaS Plan')}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(['starter', 'pro', 'enterprise'] as const).map((p) => {
                const item = planDetails[p];
                const isSelected = plan === p;

                return (
                  <div
                    key={p}
                    onClick={() => setPlan(p)}
                    className={`rounded-2xl p-5 border cursor-pointer transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-slate-900 border-emerald-500 ring-2 ring-emerald-500/50 shadow-xl'
                        : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="space-y-2">
                      <h4 className="font-bold text-sm text-white">{item.name}</h4>
                      <p className="text-[11px] text-slate-400">{item.desc}</p>
                      <div className="text-xl font-black text-white pt-2">฿{item.monthlyPrice} {t('/เดือน', '/mo')}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-center pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white font-bold text-base shadow-xl shadow-emerald-600/30 flex items-center gap-2 mx-auto"
            >
              <Store className="w-5 h-5" />
              <span>{isSubmitting ? t('กำลังเปิดสนาม...', 'Setting Up Range...') : t('ยืนยันและเปิดสนามยิงธนูทันที', 'Confirm & Launch Range Now')}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
