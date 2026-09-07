'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { RoiCalculator } from '@/components/roi-calculator';
import { FaqAccordion } from '@/components/faq-accordion';
import { MobileShowcaseMockup } from '@/components/mobile-showcase-mockup';
import { MobileShowcase3D } from '@/components/mobile-showcase-3d';
import { getStoredShops } from '@archery/store';
import { Shop } from '@archery/types';
import { useI18n } from '@archery/ui';
import {
  Target,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  Store,
  ArrowRight,
  Sparkles,
  MapPin,
  Clock,
  ExternalLink,
  ChevronRight,
  Award,
  Flame,
  Zap,
  Check,
  XCircle,
  Users,
  Banknote,
  PenTool,
  Trophy,
  ShieldAlert,
  Play,
  Layers,
} from 'lucide-react';

export default function PromotionalLandingPage() {
  const { t, lang } = useI18n();
  const [shops, setShops] = useState<Shop[]>([]);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('annually');

  useEffect(() => {
    setShops(getStoredShops());
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white">
      <Navbar />

      {/* 1. HERO PROMOTIONAL SECTION: 2-COLUMN SPLIT WITH 3D MOBILE MOCKUP */}
      <section className="relative overflow-hidden pt-10 pb-16 sm:pt-16 sm:pb-24 border-b border-slate-800">
        {/* Background Radial Glow & Target Circles */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/15 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-amber-500/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Headlines, Highlights, and CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Top Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold shadow-lg shadow-emerald-500/10">
                <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
                <span>{t('แพลตฟอร์มระบบจองสนามยิงธนู • LINE LIFF & POS SaaS', 'Archery Range Management Platform • LINE LIFF & POS SaaS')}</span>
              </div>

              {/* Main Title */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]">
                {t('เปลี่ยนสนามยิงธนูของคุณสู่', 'Transform Your Archery Range With')} <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
                  {t('ระบบจองผ่าน LINE OA & Walk-in POS', 'LINE OA Booking & Walk-in POS')}
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-2xl">
                {t(
                  'ให้ลูกค้าเปิดเช็กเลนยิง 10m - 70m ได้ด้วยตนเองผ่าน LINE OA เซ็น Digital Safety Waiver สแกนจ่ายพร้อมเพย์ QR และรับบัตร E-Ticket ทันที พร้อมระบบ Live Monitor และเคาน์เตอร์ Walk-in ครบวงจร',
                  'Enable shooters to reserve 10m-70m lanes directly on LINE, sign digital safety waivers, scan PromptPay QR, and get instant E-Tickets with live range timeline and walk-in counter POS.'
                )}
              </p>

              {/* 3 Key Value Props Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">LINE LIFF</p>
                    <p className="text-[11px] text-slate-400">{t('ไม่ต้องโหลดแอปเพิ่ม', 'No app install needed')}</p>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <PenTool className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Digital Waiver</p>
                    <p className="text-[11px] text-slate-400">{t('เซ็นยินยอมบนมือถือ', 'Sign on mobile canvas')}</p>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                    <Banknote className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Walk-in POS</p>
                    <p className="text-[11px] text-slate-400">{t('จัดการคิวหน้าร้าน', 'Quick front-desk counter')}</p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link
                  href="/register-shop"
                  className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-emerald-600/40 hover:shadow-emerald-600/60 transition-all flex items-center gap-2 active:scale-95"
                >
                  <Store className="w-5 h-5" />
                  <span>{t('เปิดสนามยิงธนูของคุณฟรี 14 วัน', 'Start 14-Day Free Range Trial')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="http://localhost:3001/book/robin-archery-bkk"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-700 font-semibold text-sm transition-all flex items-center gap-2 shadow-sm"
                >
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <span>{t('ทดลองจองใน LINE (LIFF :3001)', 'Try Booking on LINE (:3001)')}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </div>

              {/* Trust Badge / Archery Disciplines */}
              <div className="pt-2 flex items-center gap-3 text-xs text-slate-400 border-t border-slate-800/80">
                <div className="flex -space-x-2">
                  <div className="w-7 h-7 rounded-full bg-emerald-900 border-2 border-slate-950 flex items-center justify-center text-[10px] font-bold text-white">🏹</div>
                  <div className="w-7 h-7 rounded-full bg-amber-900 border-2 border-slate-950 flex items-center justify-center text-[10px] font-bold text-white">🎯</div>
                  <div className="w-7 h-7 rounded-full bg-blue-900 border-2 border-slate-950 flex items-center justify-center text-[10px] font-bold text-white">⚡</div>
                </div>
                <span>
                  {t('รองรับ Recurve, Compound, Barebow และยิงธนูสันทนาการ', 'Supports Recurve, Compound, Barebow, & Recreational')}
                </span>
              </div>
            </div>

            {/* Right Column: 3D Isometric Dual Phone Mockup */}
            <div className="lg:col-span-5 flex items-center justify-center pt-8 lg:pt-0">
              <MobileShowcase3D />
            </div>
          </div>
        </div>
      </section>

      {/* 2. PAIN POINTS VS ARCHERHUB (WHY CHOOSE US) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
            {t('จุดต่างที่คุ้มค่า Pain Points vs Solution', 'Pain Points vs Modern Solution')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            {t('ทำไมสนามยิงธนูทั่วไทยถึงเลือก ArcherHub?', 'Why Archery Ranges Choose ArcherHub')}
          </h2>
          <p className="text-sm text-slate-400">
            {t('บอกลาการจองผ่านสมุดจดเล่มเดิม และยกระดับประสบการณ์ให้ลูกค้ายิงธนูยุคใหม่', 'Say goodbye to paper logbooks and empower your archers with instant digital booking')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Traditional Range */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/50 border border-rose-900/40 space-y-5">
            <div className="flex items-center gap-2.5 text-rose-400 font-bold text-base border-b border-rose-900/40 pb-3">
              <XCircle className="w-5 h-5" />
              <span>{t('สนามยิงธนูแบบเดิม (Traditional Operations)', 'Traditional Archery Operations')}</span>
            </div>

            <ul className="space-y-3.5 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold">✗</span>
                <span>{t('ลูกค้าโทรจองหรือทักแชทสลับไปมา พนักงานตอบไม่ทัน หลุดออเดอร์ เสียโอกาสขาย', 'Customers call or text across multiple apps; staff miss chats and lose high-value bookings')}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold">✗</span>
                <span>{t('เกิดปัญหาจองเลนชนกัน (Double-booking) ลูกค้ามาถึงแล้วต้องยืนรอ เสียความรู้สึก', 'Frequent double-booking and lane conflicts force arriving archers to wait frustration')}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold">✗</span>
                <span>{t('ใช้กระดาษเซ็นยินยอมความปลอดภัย กระดาษเปียก ขาดหาย และค้นหาย้อนหลังยาก', 'Paper safety waivers get soaked, torn, lost, and impossible to search during audits')}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold">✗</span>
                <span>{t('คันธนูเช่าไม่พอดีกับลูกค้า มารู้หน้างานว่าคัน 18 lbs หรือคันมือซ้ายหมดสต็อก', 'Rental bow mismatch: discovering at the counter that 18 lbs or left-handed bows are out of stock')}</span>
              </li>
            </ul>
          </div>

          {/* With ArcherHub */}
          <div className="p-6 sm:p-8 rounded-3xl bg-emerald-950/20 border border-emerald-500/40 space-y-5 shadow-xl shadow-emerald-500/5">
            <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-base border-b border-emerald-500/30 pb-3">
              <CheckCircle2 className="w-5 h-5" />
              <span>{t('เมื่อใช้ระบบ ArcherHub Multi-Vendor SaaS', 'With ArcherHub Multi-Vendor SaaS')}</span>
            </div>

            <ul className="space-y-3.5 text-xs sm:text-sm text-slate-200">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{t('ลูกค้าเปิดจองผ่าน LINE OA + LIFF ได้ตลอด 24 ชม. ไม่ต้องโหลดแอปใหม่', 'Archers book 24/7 via LINE OA + LIFF with zero app installs required')}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{t('Interactive Lane Map: เห็นเลนว่าง/ติดจองชัดเจน พร้อมระบบล็อกเลน 10 นาที', 'Interactive Lane Map: live lane availability with 10-minute automated hold')}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{t('Digital Safety Waiver: เซ็นชื่อยินยอมบนจอมือถือก่อนยิงครั้งแรก บันทึกในระบบตลอดชีพ', 'Digital Safety Waiver: touch signature captured on smartphone with permanent audit trail')}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{t('Walk-in Counter POS: เปิดเลนหน้าร้าน คิดเงินสดทอนเงิน และต่อเวลาได้ทันที', 'Walk-in Counter POS: open lanes in 15 seconds, calculate change, and extend sessions smoothly')}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. 6 CORE PILLARS OF ARCHERHUB */}
      <section id="features" className="py-20 bg-slate-900/40 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
              {t('ฟังก์ชันครบวงจร Comprehensive Feature Set', 'Comprehensive Archery Features')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              {t('6 เสาหลักระบบจองสนามยิงธนูที่สมบูรณ์ที่สุด', '6 Core Pillars of the Ultimate Archery Platform')}
            </h2>
            <p className="text-sm text-slate-400">
              {t('ออกแบบมาเพื่อธุรกิจสนามยิงธนูโดยเฉพาะ ทั้งในมุมผู้เล่นและผู้ประกอบการ', 'Engineered specifically for archery ranges, coaches, and passionate archers')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 hover:border-emerald-500/50 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-white">{t('1. จองผ่าน LINE OA & LIFF', '1. LINE OA & LIFF Booking')}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t(
                  'ลูกค้าไม่ต้องจำรหัสผ่านหรือดาวน์โหลดแอปใหม่ เปิดจองผ่าน Rich Menu ของ LINE OA ร้านคุณได้ทันที ยืนยันตั๋วเข้าสนามแบบเรียลไทม์',
                  'Archers book right inside your LINE OA Rich Menu without downloading anything new. Instant E-Ticket delivery via LINE message.'
                )}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 hover:border-emerald-500/50 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-white">{t('2. Interactive Lane Map (10m - 70m)', '2. Interactive Lane Map (10m - 70m)')}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t(
                  'ผังเลือกเลนยิงธนูแบบ Interactive ให้ผู้เล่นเลือกระยะเป้า 10m (มือใหม่), 18m (มาตรฐานสากล Indoor), 30m, 50m, 70m ได้ด้วยตนเอง',
                  'Live interactive target range layout letting customers choose lanes for 10m (starter), 18m (WA Indoor), 30m, 50m, and 70m distance targets.'
                )}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 hover:border-emerald-500/50 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
                <PenTool className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-white">{t('3. Digital Safety Waiver Pad', '3. Digital Safety Waiver Pad')}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t(
                  'ฟอร์มเซ็นยินยอมข้อตกลงความปลอดภัยสากลบนหน้าจอ (Digital Signature Canvas) ลดความเสี่ยงทางกฎหมายและยกเลิกการใช้กระดาษ 100%',
                  'Mobile digital signature canvas capturing shooter agreement with safety rules, timestamps, and legal audit protection 100% paperless.'
                )}
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 hover:border-emerald-500/50 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <Banknote className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-base text-white">{t('4. Counter Walk-in POS & Live Timer', '4. Counter Walk-in POS & Live Timer')}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t(
                  'หน้าจอเคาน์เตอร์สำหรับลูกค้า Walk-in เปิดเลนใน 15 วินาที คิดเงินสดพร้อมคำนวณเงินทอน รูดบัตร และนับเวลาถอยหลังแจ้งเตือนหมดรอบ',
                  'Staff POS interface opening walk-in lanes in 15 seconds, cash change calculation, PromptPay QR, and real-time session countdown timers.'
                )}
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 hover:border-emerald-500/50 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-white">{t('5. อุปกรณ์เช่าตามปอนด์ & จองโค้ช', '5. Bow Poundage Gear & Coach Booking')}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t(
                  'ระบบจัดการสต็อกคันธนูเช่าตามน้ำหนักแรงดึงปอนด์ (18-26 lbs, ซ้าย/ขวา) พร้อมล็อกคิวครูฝึกสอนเบื้องต้น เพิ่มยอดใช้จ่ายต่อบิล',
                  'Track rental bow inventory by draw weight (18-26 lbs, RH/LH) and coach booking scheduling to boost ticket value.'
                )}
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 hover:border-emerald-500/50 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-white">{t('6. สมาชิก Member Pass & Score Companion', '6. Member Passes & Score Companion')}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t(
                  'ระบบบัตรสมาชิกรายเดือนและ Punch Card ตั๋วชุด พร้อมเครื่องมือนับคะแนนยิงธนู World Archery Rings ใน LIFF สร้างความผูกพันกับสนาม',
                  'Monthly member passes, multi-session punch cards, and built-in World Archery target face scoring companion in LIFF.'
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3.5 DETAILED INTERACTIVE LINE FLOW TABBED SHOWCASE */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
            Interactive Walkthrough
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            {t('ลองคลิกสัมผัสประสบการณ์จริงทั้ง 3 หน้าจอ', 'Experience All 3 Interfaces in Action')}
          </h2>
          <p className="text-sm text-slate-400">
            {t(
              'สลับดูหน้าจอ LINE Official Account, ระบบจองผังเลน LIFF และใบเซ็นยินยอมความปลอดภัย Digital Waiver',
              'Switch between LINE OA chat, interactive LIFF lane booking, and digital safety waiver canvas'
            )}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <MobileShowcaseMockup />
        </div>
      </section>

      {/* 4. INTERACTIVE ROI CALCULATOR SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <RoiCalculator />
      </section>

      {/* 5. LIVE INTERACTIVE SHOWCASE DIRECTORY */}
      <section id="demo-shops" className="py-20 bg-slate-900/40 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
                Live Interactive Showcase
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                {t('สนามยิงธนูตัวอย่างในระบบที่คุณสามารถทดลองได้ทันที', 'Featured Archery Ranges You Can Try Right Now')}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {t(
                  'คลิกเพื่อทดลองจองในมุมลูกค้าผ่าน LINE LIFF (:3001) หรือเปิดดูระบบหลังบ้านเจ้าของสนาม (:3000)',
                  'Click to simulate customer booking in LINE LIFF (:3001) or open staff management dashboard (:3000)'
                )}
              </p>
            </div>

            <Link
              href="/register-shop"
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 self-start"
            >
              <span>{t('เพิ่มสนามของคุณในระบบ', 'Register Your Range')}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shops.map((shop) => (
              <div
                key={shop.id}
                className="rounded-3xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition-all hover:shadow-2xl space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md"
                      style={{ backgroundColor: shop.branding.primaryColor }}
                    >
                      <Target className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-slate-800 text-emerald-400 font-bold border border-slate-700">
                      {shop.lanes.length} {t('เลน', 'Lanes')} ({shop.subscriptionPlan})
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg text-white">{shop.name}</h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">{shop.tagline}</p>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{shop.branding.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{shop.openTime} - {shop.closeTime} {t('น. (ทุกวัน)', 'Daily')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>LINE OA: <strong className="text-slate-200">{shop.branding.lineOaId}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex gap-2">
                  <a
                    href={`http://localhost:3001/book/${shop.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all active:scale-95"
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>{t('เปิด LINE LIFF (:3001)', 'Open LINE LIFF (:3001)')}</span>
                  </a>

                  <Link
                    href={`/admin/${shop.slug}`}
                    className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-1 transition-colors"
                  >
                    <span>{t('แดชบอร์ด', 'Dashboard')}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. SAAS PRICING & TIER COMPARISON */}
      <section id="pricing" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
            Simple & Transparent Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            {t('แพ็กเกจสำหรับเจ้าของสนามยิงธนู', 'Subscription Plans for Range Owners')}
          </h2>
          <p className="text-sm text-slate-400">
            {t('เลือกแพ็กเกจที่เหมาะกับขนาดสนามของคุณ ทดลองใช้งานฟรี 14 วันเต็ม', 'Choose the plan that fits your facility. Free 14-day trial on all tiers.')}
          </p>

          {/* Billing Switcher */}
          <div className="flex items-center justify-center gap-2 pt-2">
            <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-2xl border border-slate-800">
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  billingCycle === 'monthly' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                {t('ชำระรายเดือน', 'Monthly Billing')}
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('annually')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  billingCycle === 'annually' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>{t('ชำระรายปี', 'Annual Billing')}</span>
                <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.2 rounded-full">
                  {t('ลด 20%', 'Save 20%')}
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Starter */}
          <div className="rounded-3xl bg-slate-950 border border-slate-800 p-6 space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <h4 className="font-bold text-lg text-white">Starter Plan</h4>
              <p className="text-xs text-slate-400">{t('สำหรับสนามขนาดเล็ก 1-4 เลน', 'For small ranges (1-4 lanes)')}</p>
              <div className="pt-2">
                <span className="text-3xl font-black text-white">
                  ฿{billingCycle === 'annually' ? '790' : '990'}
                </span>
                <span className="text-xs text-slate-400"> {t('/เดือน', '/mo')}</span>
              </div>
              <ul className="space-y-2.5 pt-4 border-t border-slate-800 text-xs text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> {t('สูงสุด 4 เลนยิง', 'Up to 4 shooting lanes')}</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> {t('เชื่อมต่อ LINE OA + LIFF', 'LINE OA + LIFF integration')}</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> {t('สแกน PromptPay QR Payment', 'PromptPay Dynamic QR payments')}</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> {t('เคาน์เตอร์ Walk-in พื้นฐาน', 'Basic Walk-in POS counter')}</li>
              </ul>
            </div>
            <Link
              href="/register-shop"
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs text-center transition-colors block"
            >
              {t('เริ่มต้นใช้งาน Starter', 'Get Started with Starter')}
            </Link>
          </div>

          {/* Pro */}
          <div className="rounded-3xl bg-slate-950 border-2 border-emerald-500 p-6 space-y-5 flex flex-col justify-between shadow-2xl relative">
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-emerald-500 text-white text-[11px] font-bold shadow-md">
              {t('ยอดนิยมสำหรับสนามยิงธนู 🎯', 'Most Popular for Ranges 🎯')}
            </span>
            <div className="space-y-3">
              <h4 className="font-bold text-lg text-white">Pro Standard</h4>
              <p className="text-xs text-slate-400">{t('สำหรับสนามมาตรฐาน ไม่จำกัดเลน พร้อมระบบครบวงจร', 'For standard ranges with unlimited lanes & full suite')}</p>
              <div className="pt-2">
                <span className="text-3xl font-black text-white">
                  ฿{billingCycle === 'annually' ? '1,990' : '2,490'}
                </span>
                <span className="text-xs text-slate-400"> {t('/เดือน', '/mo')}</span>
              </div>
              <ul className="space-y-2.5 pt-4 border-t border-slate-800 text-xs text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> <strong>{t('ไม่จำกัดจำนวนเลนยิง', 'Unlimited shooting lanes')}</strong></li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Interactive Lane Map (10m - 70m)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Digital Safety Waiver Pad</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> {t('Walk-in Counter POS พร้อมคำนวณเงินทอน', 'Walk-in Counter POS with change calculation')}</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> {t('จัดการคันเช่าตามปอนด์ & โค้ช', 'Bow poundage gear & coach booking')}</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> {t('บัตรสมาชิกรายเดือน & Punch Card', 'Monthly member passes & punch cards')}</li>
              </ul>
            </div>
            <Link
              href="/register-shop"
              className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs text-center shadow-lg shadow-emerald-600/30 transition-all block"
            >
              {t('ทดลองใช้งานฟรี 14 วัน', 'Start 14-Day Free Trial')}
            </Link>
          </div>

          {/* Enterprise */}
          <div className="rounded-3xl bg-slate-950 border border-slate-800 p-6 space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <h4 className="font-bold text-lg text-white">Enterprise</h4>
              <p className="text-xs text-slate-400">{t('สำหรับสโมสรใหญ่ หรือธุรกิจหลายสาขา', 'For multi-branch chains or national clubs')}</p>
              <div className="pt-2">
                <span className="text-3xl font-black text-white">
                  ฿{billingCycle === 'annually' ? '3,900' : '4,900'}
                </span>
                <span className="text-xs text-slate-400"> {t('/เดือน', '/mo')}</span>
              </div>
              <ul className="space-y-2.5 pt-4 border-t border-slate-800 text-xs text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> {t('ทุกฟีเจอร์ในแพ็กเกจ Pro', 'Everything in Pro Plan')}</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> {t('รองรับหลายสาขา (Multi-Branch)', 'Multi-Branch centralized dashboard')}</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Custom Domain & Custom Branding</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> {t('ซัพพอร์ตดูแลเฉพาะทาง 24/7', '24/7 Priority Support & SLA')}</li>
              </ul>
            </div>
            <Link
              href="/register-shop"
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs text-center transition-colors block"
            >
              {t('ติดต่อทีมงาน', 'Contact Enterprise')}
            </Link>
          </div>
        </div>
      </section>

      {/* 7. FAQ SECTION */}
      <section className="py-20 bg-slate-900/40 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              {t('คำถามที่พบบ่อย (FAQ)', 'Frequently Asked Questions')}
            </h2>
            <p className="text-sm text-slate-400">
              {t('ทุกข้อสงสัยเกี่ยวกับการนำระบบ ArcherHub ไปใช้งานที่สนามของคุณ', 'Everything you need to know about setting up ArcherHub at your range')}
            </p>
          </div>

          <FaqAccordion />
        </div>
      </section>

      {/* 8. FINAL CONVERSION CTA BANNER */}
      <section className="py-20 bg-gradient-to-b from-slate-950 to-emerald-950/40 border-t border-slate-800 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
            Get Started in 2 Minutes
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white">
            {t('พร้อมยกระดับสนามยิงธนูของคุณแล้วหรือยัง?', 'Ready to Elevate Your Archery Range?')}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            {t(
              'เปิดสนามยิงธนูของคุณบนระบบ ArcherHub วันนี้ ทดลองใช้งานฟรี 14 วัน ไม่ต้องใช้บัตรเครดิต เชื่อมต่อ LINE OA ของร้านได้ทันที',
              'Launch your archery range on ArcherHub today. Free 14-day trial, no credit card required. Connect your LINE OA instantly.'
            )}
          </p>

          <div className="pt-2">
            <Link
              href="/register-shop"
              className="px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base shadow-2xl shadow-emerald-600/40 hover:shadow-emerald-600/60 transition-all inline-flex items-center gap-2 active:scale-95"
            >
              <Store className="w-5 h-5" />
              <span>{t('เปิดสนามของคุณทันที (ฟรี 14 วัน)', 'Launch Your Range (14-Day Free Trial)')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 bg-slate-950 text-xs text-slate-500 text-center">
        <p>© 2026 ArcherHub Thailand (Turborepo Monorepo Edition). {t('ระบบแพลตฟอร์มบริหารและจองสนามยิงธนู Multi-Vendor ครบวงจร', 'All-in-One Multi-Vendor Archery Range Booking & Management Platform')}</p>
      </footer>
    </div>
  );
}
