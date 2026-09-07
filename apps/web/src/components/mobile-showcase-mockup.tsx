'use client';

import React, { useState } from 'react';
import {
  Target,
  Smartphone,
  CheckCircle2,
  Calendar,
  Clock,
  Shield,
  ShieldAlert,
  Sparkles,
  QrCode,
  Check,
  Award,
  ChevronRight,
  Send,
  MessageCircle,
  Menu,
} from 'lucide-react';
import { useI18n } from '@archery/ui';

export function MobileShowcaseMockup() {
  const { t } = useI18n();
  const [activeScreen, setActiveScreen] = useState<'line_chat' | 'liff_booking' | 'waiver_ticket'>('liff_booking');

  return (
    <div className="w-full space-y-6">
      {/* Screen Switcher Chips */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => setActiveScreen('line_chat')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeScreen === 'line_chat'
              ? 'bg-[#06C755] text-white shadow-lg shadow-[#06C755]/30 ring-2 ring-[#f9c701]'
              : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>{t('1. LINE Official Account + Rich Menu', '1. LINE Official Account + Rich Menu')}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveScreen('liff_booking')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeScreen === 'liff_booking'
              ? 'bg-[#074c88] text-white shadow-lg shadow-[#074c88]/40 ring-2 ring-[#f9c701]'
              : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5 text-[#f9c701]" />
          <span>{t('2. LINE LIFF ผังเลือกเลนยิง Interactive', '2. LINE LIFF Interactive Lane Map')}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveScreen('waiver_ticket')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeScreen === 'waiver_ticket'
              ? 'bg-[#db1219] text-white shadow-lg shadow-[#db1219]/30 ring-2 ring-[#f9c701]'
              : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5 text-[#f9c701]" />
          <span>{t('3. Digital Safety Waiver & E-Ticket', '3. Digital Safety Waiver & E-Ticket')}</span>
        </button>
      </div>

      {/* Multi-Device Perspective Showcase */}
      <div className="relative flex items-center justify-center pt-2 pb-6">
        {/* Device Container with Realistic Phone Frame */}
        <div className="relative w-full max-w-[360px] sm:max-w-[390px] aspect-[9/19] rounded-[48px] bg-slate-900 p-3 shadow-2xl shadow-[#074c88]/20 border-4 border-slate-700/80 ring-1 ring-slate-800/80 overflow-hidden select-none">
          {/* Outer Phone Bezel & Reflection */}
          <div className="absolute inset-0 rounded-[44px] pointer-events-none border border-white/10" />

          {/* Dynamic Island Notch */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-40 flex items-center justify-between px-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#f9c701] animate-pulse" />
          </div>

          {/* Phone Inner Screen */}
          <div className="w-full h-full rounded-[40px] bg-slate-950 overflow-hidden flex flex-col text-left relative">
            {/* Status Bar */}
            <div className="h-10 bg-slate-950/90 text-white text-[11px] font-semibold px-6 pt-2 flex items-center justify-between z-30 shrink-0">
              <span>9:41</span>
              <div className="flex items-center gap-1 text-[10px]">
                <span>5G</span>
                <span className="w-4 h-2 rounded-sm border border-white/80 p-0.5 flex items-center">
                  <span className="w-full h-full bg-white rounded-2xs" />
                </span>
              </div>
            </div>

            {/* SCREEN 1: LINE CHAT + RICH MENU */}
            {activeScreen === 'line_chat' && (
              <div className="flex-1 flex flex-col bg-[#7A8B99] overflow-hidden animate-in fade-in duration-200">
                {/* LINE Chat Header */}
                <div className="bg-[#20272F] text-white px-3 py-2.5 flex items-center justify-between shadow z-20 shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-300">‹</span>
                    <div className="w-7 h-7 rounded-full bg-[#074c88] flex items-center justify-center text-white text-xs font-bold">
                      <Target className="w-4 h-4 text-[#f9c701]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold leading-tight">R-CHERY Arena</span>
                        {/* Verified OA Badge */}
                        <span className="w-3 h-3 rounded-full bg-[#06C755] text-white flex items-center justify-center text-[8px] font-black">
                          ✓
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400">@rchery</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="text-xs">🔍</span>
                    <span className="text-xs">☰</span>
                  </div>
                </div>

                {/* Chat Messages Area */}
                <div className="flex-1 p-3 overflow-y-auto space-y-3 text-xs">
                  {/* Timestamp */}
                  <div className="text-center">
                    <span className="text-[9px] bg-black/20 text-white/90 px-2 py-0.5 rounded-full">วันนี้ 14:02 น.</span>
                  </div>

                  {/* Range Welcome Bubble */}
                  <div className="flex items-start gap-1.5 max-w-[85%]">
                    <div className="w-6 h-6 rounded-full bg-[#074c88] flex items-center justify-center text-[#f9c701] shrink-0 text-[10px] font-bold">
                      🎯
                    </div>
                    <div className="bg-white text-slate-900 p-2.5 rounded-2xl rounded-tl-none shadow-sm space-y-1">
                      <p className="text-[11px] font-bold text-[#074c88]">R-CHERY Archery Arena</p>
                      <p className="text-[11px] leading-relaxed">
                        ยินดีต้อนรับครับ! คุณสามารถกดปุ่ม **"จองเลนยิงธนู"** ในเมนูด้านล่าง เพื่อเลือกระยะ (10m, 18m, 30m) และช่องยิงได้ด้วยตนเองเลยครับ
                      </p>
                    </div>
                  </div>

                  {/* LINE Flex Message: Booking Confirmed Ticket */}
                  <div className="flex items-start gap-1.5 max-w-[90%]">
                    <div className="w-6 h-6 rounded-full bg-[#074c88] flex items-center justify-center text-[#f9c701] shrink-0 text-[10px] font-bold">
                      🎯
                    </div>
                    <div className="bg-white rounded-2xl rounded-tl-none overflow-hidden shadow-md border border-[#074c88]/20">
                      <div className="bg-gradient-to-r from-[#074c88] to-[#10516e] text-white p-2.5">
                        <div className="flex justify-between items-center">
                          <span className="text-[11px] font-bold text-[#f9c701]">ใบยืนยันการจองเลน</span>
                          <span className="text-[9px] font-mono bg-white/20 text-white px-1.5 py-0.2 rounded font-bold">
                            ชำระแล้ว
                          </span>
                        </div>
                        <h4 className="text-xs font-bold mt-0.5">เลน #3 (ระยะ 18m สากล)</h4>
                      </div>

                      <div className="p-2.5 text-[11px] text-slate-700 space-y-1">
                        <div className="flex justify-between">
                          <span className="text-slate-500">รอบเวลา:</span>
                          <span className="font-bold">วันนี้ 14:00 - 15:00 น.</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">คันธนู:</span>
                          <span>Recurve 24 lbs (ขวา)</span>
                        </div>
                        <div className="flex justify-between pt-1 border-t border-slate-100 text-[#074c88] font-bold">
                          <span>ยอดชำระ:</span>
                          <span>฿450 (พร้อมเพย์)</span>
                        </div>
                      </div>

                      <div className="p-2 bg-slate-50 border-t border-slate-100 text-center">
                        <button
                          type="button"
                          onClick={() => setActiveScreen('liff_booking')}
                          className="w-full py-1 rounded-lg bg-gradient-to-r from-[#074c88] to-[#10516e] hover:from-[#09599e] text-white text-[10px] font-bold shadow-sm"
                        >
                          กดเปิดดูผังเลนยิงใน LIFF
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* LINE Rich Menu 6 Slots (Crucial Visual) */}
                <div className="bg-slate-900 border-t-2 border-[#06C755] shrink-0 p-1.5">
                  <div className="text-[9px] font-mono text-center text-slate-400 pb-1 flex items-center justify-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#06C755]"></span>
                    LINE Rich Menu • แตะเพื่อเปิดเมนู
                  </div>
                  <div className="grid grid-cols-3 gap-1 text-center">
                    <button
                      type="button"
                      onClick={() => setActiveScreen('liff_booking')}
                      className="p-2 rounded-xl bg-gradient-to-tr from-[#074c88] to-[#10516e] text-white flex flex-col items-center justify-center shadow-md active:scale-95 transition-transform"
                    >
                      <Target className="w-4 h-4 mb-0.5 text-[#f9c701]" />
                      <span className="text-[10px] font-black leading-tight">จองเลนยิง</span>
                      <span className="text-[8px] text-[#f9c701]">(เปิด LIFF)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveScreen('waiver_ticket')}
                      className="p-2 rounded-xl bg-slate-800 text-slate-200 flex flex-col items-center justify-center active:scale-95 transition-transform"
                    >
                      <Shield className="w-4 h-4 mb-0.5 text-[#f9c701]" />
                      <span className="text-[10px] font-bold leading-tight">กฎความปลอดภัย</span>
                      <span className="text-[8px] text-slate-400">(Waiver)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveScreen('waiver_ticket')}
                      className="p-2 rounded-xl bg-slate-800 text-slate-200 flex flex-col items-center justify-center active:scale-95 transition-transform"
                    >
                      <QrCode className="w-4 h-4 mb-0.5 text-amber-400" />
                      <span className="text-[10px] font-bold leading-tight">บัตรของฉัน</span>
                      <span className="text-[8px] text-slate-400">(E-Ticket)</span>
                    </button>

                    <div className="p-1.5 rounded-xl bg-slate-800/80 text-slate-300 flex flex-col items-center justify-center">
                      <Award className="w-3.5 h-3.5 text-[#f9c701]" />
                      <span className="text-[9px] font-semibold mt-0.5">บัตรสมาชิก Pass</span>
                    </div>

                    <div className="p-1.5 rounded-xl bg-slate-800/80 text-slate-300 flex flex-col items-center justify-center">
                      <Clock className="w-3.5 h-3.5 text-sky-400" />
                      <span className="text-[9px] font-semibold mt-0.5">รอบเวลาสนาม</span>
                    </div>

                    <div className="p-1.5 rounded-xl bg-slate-800/80 text-slate-300 flex flex-col items-center justify-center">
                      <Send className="w-3.5 h-3.5 text-[#f9c701]" />
                      <span className="text-[9px] font-semibold mt-0.5">ติดต่อโค้ช</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SCREEN 2: LINE LIFF INTERACTIVE LANE MAP */}
            {activeScreen === 'liff_booking' && (
              <div className="flex-1 flex flex-col bg-slate-100 overflow-hidden animate-in fade-in duration-200">
                {/* LIFF Header Bar */}
                <div className="bg-[#060e1a] text-white px-3 py-2 flex items-center justify-between text-xs shrink-0 border-b border-[#074c88]/30">
                  <div className="flex items-center gap-1.5">
                    <span
                      onClick={() => setActiveScreen('line_chat')}
                      className="text-slate-400 hover:text-white cursor-pointer px-1"
                    >
                      ✕
                    </span>
                    <span className="font-mono text-[10px] text-[#f9c701] font-bold bg-[#f9c701]/15 px-1.5 py-0.2 rounded border border-[#f9c701]/30">
                      LIFF v2.21
                    </span>
                    <span className="font-bold text-[11px] truncate max-w-[130px]">R-CHERY Arena</span>
                  </div>
                  <span className="text-slate-400 text-[10px]">•••</span>
                </div>

                {/* Shop Mini Banner */}
                <div className="bg-gradient-to-r from-[#060e1a] to-[#0d2140] text-white p-3 border-b border-slate-800 space-y-1 shrink-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-black text-xs">ผังเลือกเลนยิงธนู Interactive</h3>
                    <span className="text-[9px] bg-[#074c88] text-white font-bold px-1.5 py-0.2 rounded">
                      เปิดจอง 24 ชม.
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400">เลือกช่องยิงและระยะที่ต้องการได้ด้วยตนเอง</p>
                </div>

                {/* Interactive Lane Selector Preview */}
                <div className="flex-1 p-3 overflow-y-auto space-y-3 text-xs">
                  {/* Distance Pills */}
                  <div className="flex gap-1 overflow-x-auto pb-0.5">
                    <span className="px-2 py-1 rounded-lg bg-[#074c88] text-white text-[10px] font-bold">18m (สากล)</span>
                    <span className="px-2 py-1 rounded-lg bg-slate-200 text-slate-700 text-[10px]">10m (มือใหม่)</span>
                    <span className="px-2 py-1 rounded-lg bg-slate-200 text-slate-700 text-[10px]">30m+</span>
                  </div>

                  {/* 4 Lanes Grid Preview */}
                  <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center text-[10px] text-[#f9c701] font-mono pb-1 border-b border-dashed border-slate-700">
                      <span>🎯 Target Line</span>
                      <span>Safety Backstop</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {/* Lane 1 */}
                      <div className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-center">
                        <span className="text-[10px] text-[#f9c701] font-mono font-bold">18m</span>
                        <h5 className="font-bold text-white text-xs">เลน 1</h5>
                        <span className="text-[9px] text-[#f9c701]">● ว่าง</span>
                      </div>

                      {/* Lane 2 (Occupied) */}
                      <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800 text-center opacity-60">
                        <span className="text-[10px] text-slate-500 font-mono">18m</span>
                        <h5 className="font-bold text-slate-400 text-xs">เลน 2</h5>
                        <span className="text-[9px] text-[#db1219]">● ยิงอยู่</span>
                      </div>

                      {/* Lane 3 (Selected) */}
                      <div className="p-2 rounded-xl bg-[#074c88]/40 border-2 border-[#f9c701] text-center shadow-md">
                        <span className="text-[10px] text-[#f9c701] font-mono font-bold">18m</span>
                        <h5 className="font-bold text-white text-xs">เลน 3 ✓</h5>
                        <span className="text-[9px] text-[#f9c701] font-bold">เลือกแล้ว</span>
                      </div>

                      {/* Lane 4 */}
                      <div className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-center">
                        <span className="text-[10px] text-[#f9c701] font-mono font-bold">18m</span>
                        <h5 className="font-bold text-white text-xs">เลน 4</h5>
                        <span className="text-[9px] text-[#f9c701]">● ว่าง</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono pt-1 border-t border-dashed border-slate-700">
                      <span>Shooting Line</span>
                      <span>จุดยืนยิง</span>
                    </div>
                  </div>

                  {/* Add-ons Chip */}
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 space-y-1">
                    <span className="text-[10px] font-bold text-slate-800 block">อุปกรณ์ที่เลือก:</span>
                    <div className="text-[10px] text-slate-600 flex items-center justify-between">
                      <span>• Recurve Starter (24 lbs, ขวา)</span>
                      <span className="font-bold text-[#074c88]">+฿150</span>
                    </div>
                  </div>

                  {/* Summary & PromptPay Action Button */}
                  <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs font-semibold text-slate-600">ยอดชำระสุทธิ:</span>
                      <span className="text-lg font-black text-[#074c88]">฿450.00</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveScreen('waiver_ticket')}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#074c88] to-[#10516e] hover:from-[#09599e] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-[#074c88]/30"
                    >
                      <QrCode className="w-3.5 h-3.5 text-[#f9c701]" />
                      <span>สแกนจ่ายพร้อมเพย์ & ยืนยัน</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* SCREEN 3: DIGITAL SAFETY WAIVER & E-TICKET */}
            {activeScreen === 'waiver_ticket' && (
              <div className="flex-1 flex flex-col bg-slate-900 text-white overflow-hidden animate-in fade-in duration-200">
                {/* Header */}
                <div className="bg-[#060e1a] p-3 border-b border-[#074c88]/30 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-1.5">
                    <span onClick={() => setActiveScreen('liff_booking')} className="cursor-pointer text-slate-400">
                      ‹
                    </span>
                    <h4 className="font-bold text-xs">Digital Safety Waiver</h4>
                  </div>
                  <span className="text-[10px] bg-[#f9c701]/15 text-[#f9c701] border border-[#f9c701]/30 font-bold px-2 py-0.5 rounded-full">
                    เซ็นยินยอมแล้ว
                  </span>
                </div>

                <div className="flex-1 p-3 overflow-y-auto space-y-3 text-xs">
                  {/* Rules Card */}
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5 text-[10px] text-slate-300">
                    <p className="font-bold text-[#f9c701] flex items-center gap-1">
                      <ShieldAlert className="w-3 h-3 text-[#f9c701]" />
                      กฎความปลอดภัย 4 ข้อหลักของสนาม:
                    </p>
                    <p>1. ห้ามง้างปล่อยสายเปล่า (Dry Fire)</p>
                    <p>2. ห้ามก้าวข้ามเส้นยิงเด็ดขาด</p>
                    <p>3. ชี้ปลายลูกธนูไปทางเป้าเสมอ</p>
                  </div>

                  {/* Signature Pad Preview */}
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>ลายเซ็นดิจิทัล: คุณ ธนพล</span>
                      <span className="text-[#f9c701] font-mono font-bold">IP Verified ✓</span>
                    </div>

                    {/* Canvas simulation */}
                    <div className="h-16 rounded-lg bg-slate-900 border border-dashed border-slate-700 flex items-center justify-center p-2">
                      <svg className="w-36 h-10 text-[#f9c701] stroke-current" viewBox="0 0 120 40" fill="none">
                        <path
                          d="M10 25 C20 10, 30 35, 45 15 C60 0, 70 30, 85 20 C100 10, 110 25, 115 20"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Ticket Card Preview */}
                  <div className="p-3 rounded-xl bg-white text-slate-900 space-y-2 text-center shadow-lg border border-[#074c88]/20">
                    <span className="text-[10px] font-mono text-[#074c88] font-bold">E-TICKET CHECK-IN QR</span>
                    <div className="w-24 h-24 mx-auto rounded-lg border border-slate-200 p-1.5 flex items-center justify-center bg-slate-50">
                      {/* Stylized QR icon */}
                      <QrCode className="w-20 h-20 text-slate-900" />
                    </div>
                    <p className="text-[10px] font-mono font-bold text-slate-700">Ref: ARC-88219 (เลน 3)</p>
                    <p className="text-[9px] text-slate-400">ยื่นให้เจ้าหน้าที่เคาน์เตอร์สแกนเข้าสนาม</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveScreen('line_chat')}
                    className="w-full py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
                  >
                    กลับสู่หน้าแชท LINE OA
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
