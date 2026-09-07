'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { RoiCalculator } from '@/components/roi-calculator';
import { FaqAccordion } from '@/components/faq-accordion';
import { MobileShowcaseMockup } from '@/components/mobile-showcase-mockup';
import { RangeTacticalStage } from '@/components/range-tactical-stage';
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
  Radio,
} from 'lucide-react';

export default function PromotionalLandingPage() {
  const { t, lang } = useI18n();
  const [shops, setShops] = useState<Shop[]>([]);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('annually');

  useEffect(() => {
    setShops(getStoredShops());
  }, []);

  return (
    <div className="min-h-screen bg-[#060e1a] text-slate-100 flex flex-col selection:bg-[#074c88] selection:text-white">
      <Navbar />

      {/* 1. HERO PROMOTIONAL SECTION: ATHLETIC RANGE PRECISION STAGE */}
      <section className="relative overflow-hidden pt-8 pb-16 sm:pt-14 sm:pb-24 border-b border-white/10">
        {/* Architectural Range Grid & Concentric Target Outlines */}
        <div className="absolute inset-0 range-grid-bg opacity-35 pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[640px] h-[640px] rounded-full border border-white/[0.04] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[440px] h-[440px] rounded-full border border-white/[0.06] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[240px] h-[240px] rounded-full border border-white/[0.08] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Headlines, Highlights, and CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Top Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-white/10 text-slate-200 text-xs font-mono shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[#f9c701] font-bold">R-CHERY ARCHERY OS</span>
                <span className="text-slate-500">•</span>
                <span>{t('ระบบบริหารสนามยิงธนูสากล & LINE LIFF', 'World Archery Standard Range OS')}</span>
              </div>

              {/* Main Title */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]">
                {t('ระบบจัดการสนามยิงธนู', 'Archery Range OS &')} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-white to-[#f9c701]">
                  {t('LINE OA Booking & Live POS', 'LINE OA Booking & Live POS')}
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
                {t(
                  'เปลี่ยนการจองผ่านสมุดกระดาษสู่ระบบดิจิทัลเต็มรูปแบบ ให้ผู้ยิงเช็กผังเลน 10m-70m แบบ Interactive เซ็น Digital Safety Waiver สแกนจ่าย PromptPay QR และแสดง E-Ticket เข้าสนามทันที พร้อมหน้าจอ POS เคาน์เตอร์และ Live Monitor นับเวลาถอยหลัง',
                  'Replace manual paper logs with an athletic precision digital platform. Enable archers to book 10m-70m lanes, sign digital safety waivers, scan PromptPay QR, and enter with live E-Tickets backed by staff POS counters.'
                )}
              </p>

              {/* 3 Key Value Props Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3 rounded-2xl bg-slate-900/80 border border-white/10 flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#074c88]/30 text-[#f9c701] flex items-center justify-center shrink-0 border border-[#074c88]/50">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">LINE LIFF</p>
                    <p className="text-[11px] text-slate-400">{t('ไม่ต้องโหลดแอปเพิ่ม', 'No app install needed')}</p>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-900/80 border border-white/10 flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#074c88]/30 text-[#f9c701] flex items-center justify-center shrink-0 border border-[#074c88]/50">
                    <PenTool className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Digital Waiver</p>
                    <p className="text-[11px] text-slate-400">{t('เซ็นยินยอมบนมือถือ', 'Sign on mobile canvas')}</p>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-900/80 border border-white/10 flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#074c88]/30 text-[#f9c701] flex items-center justify-center shrink-0 border border-[#074c88]/50">
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
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#074c88] to-[#10516e] hover:from-[#09599e] hover:to-[#135d7f] text-white font-bold text-sm sm:text-base shadow-[0_4px_20px_rgba(7,76,136,0.35)] border border-[#f9c701]/30 transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
                >
                  <Store className="w-5 h-5 text-[#f9c701]" />
                  <span>{t('เปิดสนามยิงธนูของคุณฟรี 14 วัน', 'Start 14-Day Free Range Trial')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="http://localhost:3001/book/robin-archery-bkk"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-white/10 font-semibold text-sm transition-all flex items-center gap-2 shadow-sm active:scale-95 cursor-pointer"
                >
                  <Smartphone className="w-4 h-4 text-sky-400" />
                  <span>{t('ทดลองจองใน LINE (LIFF :3001)', 'Try Booking on LINE (:3001)')}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </div>

              {/* Trust Badge / Archery Disciplines */}
              <div className="pt-2 flex items-center gap-3 text-xs text-slate-400 border-t border-white/10">
                <div className="flex -space-x-1.5">
                  <div className="w-6 h-6 rounded-full bg-[#074c88] border border-slate-900 flex items-center justify-center text-[10px] font-bold text-white">🏹</div>
                  <div className="w-6 h-6 rounded-full bg-[#db1219] border border-slate-900 flex items-center justify-center text-[10px] font-bold text-white">🎯</div>
                  <div className="w-6 h-6 rounded-full bg-[#f9c701] border border-slate-900 flex items-center justify-center text-[10px] font-bold text-slate-950">⚡</div>
                </div>
                <span className="font-mono text-[11px]">
                  {t('มาตรฐานสากล: Recurve, Compound, Barebow, WA 10-Ring Target Faces', 'World Archery: Recurve, Compound, Barebow & WA Target Faces')}
                </span>
              </div>
            </div>

            {/* Right Column: Tactical Range Radar Stage */}
            <div className="lg:col-span-5 flex items-center justify-center pt-4 lg:pt-0">
              <RangeTacticalStage />
            </div>
          </div>
        </div>
      </section>

      {/* 2. PAIN POINTS VS R-CHERY (WHY CHOOSE US) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-[#f9c701] font-mono">
            {t('จุดต่างที่คุ้มค่า Pain Points vs Solution', 'Pain Points vs Modern Solution')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            {t('ทำไมสนามยิงธนูชั้นนำถึงเลือก R-CHERY?', 'Why Archery Ranges Choose R-CHERY')}
          </h2>
          <p className="text-sm text-slate-400">
            {t('บอกลาการจองผ่านสมุดจดเล่มเดิม และยกระดับประสบการณ์ให้ลูกค้ายิงธนูยุคใหม่', 'Say goodbye to paper logbooks and empower your archers with instant digital booking')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Traditional Range */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#09172c]/40 border border-rose-900/40 space-y-5">
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

          {/* With R-CHERY */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#074c88]/15 border border-[#074c88]/50 space-y-5 shadow-xl shadow-[#074c88]/10">
            <div className="flex items-center gap-2.5 text-[#38bdf8] font-bold text-base border-b border-[#074c88]/40 pb-3">
              <CheckCircle2 className="w-5 h-5 text-[#f9c701]" />
              <span>{t('เมื่อใช้ระบบ R-CHERY Multi-Vendor SaaS', 'With R-CHERY Multi-Vendor SaaS')}</span>
            </div>

            <ul className="space-y-3.5 text-xs sm:text-sm text-slate-200">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#f9c701] shrink-0 mt-0.5" />
                <span>{t('ลูกค้าเปิดจองผ่าน LINE OA + LIFF ได้ตลอด 24 ชม. ไม่ต้องโหลดแอปใหม่', 'Archers book 24/7 via LINE OA + LIFF with zero app installs required')}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#f9c701] shrink-0 mt-0.5" />
                <span>{t('Interactive Lane Map: เห็นเลนว่าง/ติดจองชัดเจน พร้อมระบบล็อกเลน 10 นาที', 'Interactive Lane Map: live lane availability with 10-minute automated hold')}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#f9c701] shrink-0 mt-0.5" />
                <span>{t('Digital Safety Waiver: เซ็นชื่อยินยอมบนจอมือถือก่อนยิงครั้งแรก บันทึกในระบบตลอดชีพ', 'Digital Safety Waiver: touch signature captured on smartphone with permanent audit trail')}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#f9c701] shrink-0 mt-0.5" />
                <span>{t('Walk-in Counter POS: เปิดเลนหน้าร้าน คิดเงินสดทอนเงิน และต่อเวลาได้ทันที', 'Walk-in Counter POS: open lanes in 15 seconds, calculate change, and extend sessions smoothly')}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. 6 CORE PILLARS OF R-CHERY */}
      <section id="features" className="py-20 bg-[#061020]/60 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#f9c701] font-mono">
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
            <div className="p-6 rounded-3xl bg-[#09172c] border border-[#132c4e] space-y-3 hover:border-[#074c88] hover:shadow-lg hover:shadow-[#074c88]/20 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#074c88]/25 text-[#38bdf8] flex items-center justify-center border border-[#074c88]/40">
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
            <div className="p-6 rounded-3xl bg-[#09172c] border border-[#132c4e] space-y-3 hover:border-[#f9c701] hover:shadow-lg hover:shadow-[#f9c701]/20 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#f9c701]/20 text-[#f9c701] flex items-center justify-center border border-[#f9c701]/30">
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
            <div className="p-6 rounded-3xl bg-[#09172c] border border-[#132c4e] space-y-3 hover:border-[#db1219] hover:shadow-lg hover:shadow-[#db1219]/20 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#db1219]/20 text-rose-400 flex items-center justify-center border border-[#db1219]/30">
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
            <div className="p-6 rounded-3xl bg-[#09172c] border border-[#132c4e] space-y-3 hover:border-[#074c88] hover:shadow-lg hover:shadow-[#074c88]/20 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#074c88]/25 text-[#38bdf8] flex items-center justify-center border border-[#074c88]/40">
                <Banknote className="w-6 h-6" />
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
            <div className="p-6 rounded-3xl bg-[#09172c] border border-[#132c4e] space-y-3 hover:border-[#f9c701] hover:shadow-lg hover:shadow-[#f9c701]/20 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#f9c701]/20 text-[#f9c701] flex items-center justify-center border border-[#f9c701]/30">
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
            <div className="p-6 rounded-3xl bg-[#09172c] border border-[#132c4e] space-y-3 hover:border-[#38bdf8] hover:shadow-lg hover:shadow-[#38bdf8]/20 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-500/30">
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
          <span className="text-xs font-bold uppercase tracking-wider text-[#f9c701] font-mono">
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
      <section id="demo-shops" className="py-20 bg-[#061020]/60 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#f9c701] font-mono">
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
              className="text-xs font-bold text-[#38bdf8] hover:text-[#7dd3fc] flex items-center gap-1 self-start"
            >
              <span>{t('เพิ่มสนามของคุณในระบบ', 'Register Your Range')}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shops.map((shop) => (
              <div
                key={shop.id}
                className="rounded-3xl bg-[#09172c] border border-[#132c4e] p-6 flex flex-col justify-between hover:border-[#074c88] transition-all hover:shadow-2xl hover:shadow-[#074c88]/20 space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md border border-[#f9c701]/30"
                      style={{ backgroundColor: shop.branding.primaryColor || '#074c88' }}
                    >
                      <Target className="w-6 h-6 text-[#f9c701]" />
                    </div>
                    <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-slate-800 text-[#f9c701] font-bold border border-[#1e3a66]">
                      {shop.lanes.length} {t('เลน', 'Lanes')} ({shop.subscriptionPlan})
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg text-white">{shop.name}</h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">{shop.tagline}</p>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#f9c701] shrink-0" />
                      <span className="truncate">{shop.branding.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#38bdf8] shrink-0" />
                      <span>{shop.openTime} - {shop.closeTime} {t('น. (ทุกวัน)', 'Daily')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-3.5 h-3.5 text-[#38bdf8] shrink-0" />
                      <span>LINE OA: <strong className="text-slate-200">{shop.branding.lineOaId}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex gap-2">
                  <a
                    href={`http://localhost:3001/book/${shop.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#074c88] to-[#10516e] hover:from-[#0a5ea5] hover:to-[#17668a] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-[#074c88]/30 border border-[#f9c701]/30 transition-all active:scale-95"
                  >
                    <Smartphone className="w-4 h-4 text-[#f9c701]" />
                    <span>{t('เปิด LINE LIFF (:3001)', 'Open LINE LIFF (:3001)')}</span>
                  </a>

                  <Link
                    href={`/admin/${shop.slug}`}
                    className="py-2.5 px-3 rounded-xl bg-[#0d2140] hover:bg-[#153461] text-slate-200 border border-[#1e3a66] font-semibold text-xs flex items-center justify-center gap-1 transition-colors"
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
          <span className="text-xs font-bold uppercase tracking-wider text-[#f9c701] font-mono">
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
            <div className="flex items-center gap-2 bg-[#09172c] p-1 rounded-2xl border border-[#132c4e]">
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  billingCycle === 'monthly' ? 'bg-[#0d2140] text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                {t('ชำระรายเดือน', 'Monthly Billing')}
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('annually')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  billingCycle === 'annually' ? 'bg-[#074c88] text-white shadow-md shadow-[#074c88]/40 border border-[#f9c701]/30' : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>{t('ชำระรายปี', 'Annual Billing')}</span>
                <span className="text-[10px] bg-[#f9c701] text-slate-950 font-black px-1.5 py-0.2 rounded-full">
                  {t('ลด 20%', 'Save 20%')}
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Starter */}
          <div className="rounded-3xl bg-[#09172c] border border-[#132c4e] p-6 space-y-5 flex flex-col justify-between">
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
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#38bdf8]" /> {t('สูงสุด 4 เลนยิง', 'Up to 4 shooting lanes')}</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#38bdf8]" /> {t('เชื่อมต่อ LINE OA + LIFF', 'LINE OA + LIFF integration')}</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#38bdf8]" /> {t('สแกน PromptPay QR Payment', 'PromptPay Dynamic QR payments')}</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#38bdf8]" /> {t('เคาน์เตอร์ Walk-in พื้นฐาน', 'Basic Walk-in POS counter')}</li>
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
          <div className="rounded-3xl bg-[#09172c] border-2 border-[#f9c701] p-6 space-y-5 flex flex-col justify-between shadow-2xl shadow-[#074c88]/20 relative">
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-[#f9c701] to-amber-500 text-slate-950 text-[11px] font-black shadow-md">
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
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#f9c701]" /> <strong>{t('ไม่จำกัดจำนวนเลนยิง', 'Unlimited shooting lanes')}</strong></li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#f9c701]" /> Interactive Lane Map (10m - 70m)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#f9c701]" /> Digital Safety Waiver Pad</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#f9c701]" /> {t('Walk-in Counter POS พร้อมคำนวณเงินทอน', 'Walk-in Counter POS with change calculation')}</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#f9c701]" /> {t('จัดการคันเช่าตามปอนด์ & โค้ช', 'Bow poundage gear & coach booking')}</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#f9c701]" /> {t('บัตรสมาชิกรายเดือน & Punch Card', 'Monthly member passes & punch cards')}</li>
              </ul>
            </div>
            <Link
              href="/register-shop"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#074c88] to-[#10516e] hover:from-[#0a5ea5] hover:to-[#17668a] text-white font-bold text-xs text-center shadow-lg shadow-[#074c88]/40 border border-[#f9c701]/40 transition-all block"
            >
              {t('ทดลองใช้งานฟรี 14 วัน', 'Start 14-Day Free Trial')}
            </Link>
          </div>

          {/* Enterprise */}
          <div className="rounded-3xl bg-[#09172c] border border-[#132c4e] p-6 space-y-5 flex flex-col justify-between">
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
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#38bdf8]" /> {t('ทุกฟีเจอร์ในแพ็กเกจ Pro', 'Everything in Pro Plan')}</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#38bdf8]" /> {t('รองรับหลายสาขา (Multi-Branch)', 'Multi-Branch centralized dashboard')}</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#38bdf8]" /> Custom Domain & Custom Branding</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#38bdf8]" /> {t('ซัพพอร์ตดูแลเฉพาะทาง 24/7', '24/7 Priority Support & SLA')}</li>
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
      <section className="py-20 bg-[#061020]/60 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#f9c701] font-mono">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              {t('คำถามที่พบบ่อย (FAQ)', 'Frequently Asked Questions')}
            </h2>
            <p className="text-sm text-slate-400">
              {t('ทุกข้อสงสัยเกี่ยวกับการนำระบบ R-CHERY ไปใช้งานที่สนามของคุณ', 'Everything you need to know about setting up R-CHERY at your range')}
            </p>
          </div>

          <FaqAccordion />
        </div>
      </section>

      {/* 8. FINAL CONVERSION CTA BANNER */}
      <section className="py-20 bg-[#060e1a] border-t border-white/10 text-center relative overflow-hidden">
        <div className="absolute inset-0 range-grid-bg opacity-30 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#f9c701] font-mono">
            Get Started in 2 Minutes
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white">
            {t('พร้อมยกระดับสนามยิงธนูของคุณแล้วหรือยัง?', 'Ready to Elevate Your Archery Range?')}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            {t(
              'เปิดสนามยิงธนูของคุณบนระบบ R-CHERY วันนี้ ทดลองใช้งานฟรี 14 วัน ไม่ต้องใช้บัตรเครดิต เชื่อมต่อ LINE OA ของร้านได้ทันที',
              'Launch your archery range on R-CHERY today. Free 14-day trial, no credit card required. Connect your LINE OA instantly.'
            )}
          </p>

          <div className="pt-2">
            <Link
              href="/register-shop"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#074c88] to-[#10516e] hover:from-[#09599e] hover:to-[#135d7f] text-white font-bold text-base shadow-[0_4px_25px_rgba(7,76,136,0.4)] border border-[#f9c701]/40 hover:border-[#f9c701] transition-all inline-flex items-center gap-2 active:scale-95 cursor-pointer"
            >
              <Store className="w-5 h-5 text-[#f9c701]" />
              <span>{t('เปิดสนามของคุณทันที (ฟรี 14 วัน)', 'Launch Your Range (14-Day Free Trial)')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 bg-[#040810] text-xs text-slate-500 text-center">
        <p>© 2026 R-CHERY Platform (Turborepo Monorepo Edition). {t('ระบบแพลตฟอร์มบริหารและจองสนามยิงธนูครบวงจร', 'All-in-One Archery Range Booking & Management Platform')}</p>
      </footer>
    </div>
  );
}
