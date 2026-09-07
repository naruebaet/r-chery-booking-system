'use client';

import React, { useState } from 'react';
import { Calculator, TrendingUp, Clock, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useI18n } from '@archery/ui';

export function RoiCalculator() {
  const { t, lang } = useI18n();
  const [lanes, setLanes] = useState<number>(6);
  const [avgHourlyRate, setAvgHourlyRate] = useState<number>(300);
  const [dailyHoursOpen, setDailyHoursOpen] = useState<number>(10);

  // Calculations
  // Average occupancy increases by 25% with 24/7 online booking + walk-in smooth turnover
  const estExtraBookingsPerMonth = lanes * 18; // approx extra 18 hours per lane per month
  const extraRevenueLane = estExtraBookingsPerMonth * avgHourlyRate;
  const extraAddonsRevenue = estExtraBookingsPerMonth * 85; // Bow rental + coach upsell avg 85 THB/session
  const totalExtraMonthlyRevenue = extraRevenueLane + extraAddonsRevenue;

  // Time saved answering phone & paper log
  const hoursSavedPerMonth = Math.round(lanes * 6.5);

  // Days to recoup Pro SaaS (2,490 THB/month)
  const daysToPayback = Math.max(1, Math.round((2490 / (totalExtraMonthlyRevenue / 30)) * 10) / 10);

  return (
    <div className="rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold font-mono">
            <Calculator className="w-3.5 h-3.5" />
            <span>{t('คำนวณผลตอบแทน Interactive ROI Calculator', 'Interactive ROI Calculator')}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white mt-2">
            {t('คำนวณความคุ้มค่าและรายได้ที่จะเพิ่มขึ้นของสนามคุณ', 'Calculate Your Range ROI & Projected Revenue Boost')}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {t('ปรับตัวเลื่อนตามขนาดสนามจริงของคุณ เพื่อดูผลตอบแทนที่ได้รับจากการใช้ระบบ', 'Adjust sliders to your range size to see expected extra income and hours saved')}
          </p>
        </div>

        <div className="text-right self-start sm:self-auto">
          <span className="text-[11px] text-slate-500 block">{t('แพ็กเกจแนะนำ', 'Recommended Tier')}</span>
          <span className="text-sm font-bold text-amber-400">{t('Pro Tier ฿2,490/เดือน', 'Pro Tier ฿2,490/mo')}</span>
        </div>
      </div>

      {/* Sliders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2.5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-300">{t('จำนวนเลนยิงของสนาม:', 'Number of Lanes:')}</span>
            <span className="font-bold text-emerald-400 font-mono text-base">{lanes} {t('เลน', 'Lanes')}</span>
          </div>
          <input
            type="range"
            min={2}
            max={24}
            step={1}
            value={lanes}
            onChange={(e) => setLanes(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
          />
          <span className="text-[11px] text-slate-500 block">{t('ตั้งแต่ 2 ถึง 24 ช่องยิง', 'From 2 to 24 lanes')}</span>
        </div>

        <div className="space-y-2.5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-300">{t('ค่าบริการเฉลี่ยต่อชั่วโมง:', 'Average Rate/Hour:')}</span>
            <span className="font-bold text-emerald-400 font-mono text-base">฿{avgHourlyRate}</span>
          </div>
          <input
            type="range"
            min={150}
            max={600}
            step={25}
            value={avgHourlyRate}
            onChange={(e) => setAvgHourlyRate(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
          />
          <span className="text-[11px] text-slate-500 block">{t('150 - 600 บาท/ชม.', '150 - 600 THB/hour')}</span>
        </div>

        <div className="space-y-2.5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-300">{t('เปิดให้บริการต่อวัน:', 'Operating Hours/Day:')}</span>
            <span className="font-bold text-emerald-400 font-mono text-base">{dailyHoursOpen} {t('ชม.', 'hrs')}</span>
          </div>
          <input
            type="range"
            min={6}
            max={14}
            step={1}
            value={dailyHoursOpen}
            onChange={(e) => setDailyHoursOpen(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
          />
          <span className="text-[11px] text-slate-500 block">{t('เฉลี่ย 10:00 - 20:00 น.', 'e.g. 10:00 AM - 8:00 PM')}</span>
        </div>
      </div>

      {/* Calculated Results Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 space-y-1">
          <span className="text-xs font-semibold text-emerald-300 flex items-center justify-between">
            {t('รายได้คาดการณ์ที่เพิ่มขึ้น / เดือน', 'Est. Extra Monthly Revenue')}
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </span>
          <div className="text-2xl sm:text-3xl font-black text-white">
            +฿{totalExtraMonthlyRevenue.toLocaleString()}
          </div>
          <p className="text-[11px] text-emerald-400/80">
            {t('จากการเปิดจอง 24 ชม. ผ่าน LINE และ Upsell อุปกรณ์เช่า', 'From 24/7 LINE bookings & rental equipment upsells')}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
          <span className="text-xs font-semibold text-slate-300 flex items-center justify-between">
            {t('เวลาพนักงานที่ประหยัดได้ / เดือน', 'Staff Hours Saved / Month')}
            <Clock className="w-4 h-4 text-blue-400" />
          </span>
          <div className="text-2xl sm:text-3xl font-black text-white">
            ~{hoursSavedPerMonth} {t('ชั่วโมง', 'hours')}
          </div>
          <p className="text-[11px] text-slate-400">
            {t('ลดการรับโทรศัพท์ตอบแชท และลดเอกสารกระดาษ', 'Reduced phone answering & 100% paperless waivers')}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
          <span className="text-xs font-semibold text-slate-300 flex items-center justify-between">
            {t('ระยะเวลาคืนทุนค่าระบบ SaaS', 'Payback Period')}
            <Sparkles className="w-4 h-4 text-amber-400" />
          </span>
          <div className="text-2xl sm:text-3xl font-black text-amber-400">
            {t(`เพียง ${daysToPayback} วัน`, `Only ${daysToPayback} days`)}
          </div>
          <p className="text-[11px] text-slate-400">
            {t('เทียบกับค่าบริการ Pro Plan (฿2,490/ด.)', 'Compared to Pro Plan fee (฿2,490/mo)')}
          </p>
        </div>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{t('ทดลองใช้งานจริงฟรี 14 วันเต็ม ไม่ต้องกรอกบัตรเครดิตล่วงหน้า', '14-day free trial, no credit card required upfront')}</span>
        </div>

        <Link
          href="/register-shop"
          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/30 transition-all self-stretch sm:self-auto justify-center"
        >
          <span>{t('เปิดสนามและเริ่มใช้งานทันที', 'Start Your Free Trial')}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
