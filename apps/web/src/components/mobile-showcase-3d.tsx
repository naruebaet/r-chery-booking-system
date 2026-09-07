'use client';

import React, { useState } from 'react';
import {
  Target,
  Smartphone,
  CheckCircle2,
  Calendar,
  Clock,
  Shield,
  Sparkles,
  QrCode,
  Award,
  Send,
  MessageCircle,
  Check,
} from 'lucide-react';
import { useI18n } from '@archery/ui';

export function MobileShowcase3D() {
  const { t } = useI18n();
  const [interactiveLane, setInteractiveLane] = useState<number>(3);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div
      className="relative w-full py-6 flex items-center justify-center select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Ambient Aura Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-96 bg-gradient-to-tr from-emerald-500/25 via-teal-500/20 to-amber-500/15 blur-3xl rounded-full pointer-events-none" />

      {/* 3D Perspective Stage */}
      <div
        className="relative w-full max-w-[480px] h-[580px] sm:h-[620px] transition-transform duration-500 ease-out"
        style={{
          perspective: '1400px',
          perspectiveOrigin: '50% 50%',
        }}
      >
        {/* ==================================================== */}
        {/* 1. BACK PHONE: LINE OFFICIAL ACCOUNT & RICH MENU    */}
        {/* ==================================================== */}
        <div
          className="absolute top-0 left-0 sm:left-4 w-[260px] sm:w-[280px] h-[500px] sm:h-[530px] rounded-[42px] bg-slate-900 border-4 border-slate-700/80 shadow-[25px_30px_50px_-15px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-500"
          style={{
            transform: isHovered
              ? 'rotateY(-24deg) rotateX(12deg) rotateZ(-4deg) translateX(-15px) translateY(-10px) scale(0.95)'
              : 'rotateY(-18deg) rotateX(8deg) rotateZ(-3deg) translateX(0px) scale(0.92)',
            transformStyle: 'preserve-3d',
            zIndex: 10,
          }}
        >
          {/* Dynamic Island */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-40" />

          {/* Screen Content: LINE OA Chat & Rich Menu */}
          <div className="w-full h-full bg-[#7A8B99] flex flex-col pt-7 text-xs font-sans">
            {/* LINE OA Header */}
            <div className="bg-[#20272F] text-white px-3 py-2 flex items-center justify-between border-b border-white/10 shrink-0">
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px]">
                  🎯
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] font-bold">Robin Archery</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#06C755] text-white flex items-center justify-center text-[7px]">
                      ✓
                    </span>
                  </div>
                  <p className="text-[9px] text-slate-400">@robinarchery</p>
                </div>
              </div>
              <span className="text-[10px] text-slate-400">LINE OA</span>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-2.5 space-y-2 overflow-hidden text-[10px]">
              <div className="bg-white/90 text-slate-900 p-2 rounded-xl rounded-tl-none shadow-sm space-y-1">
                <p className="font-bold text-emerald-800 text-[10px]">Robin Archery Arena</p>
                <p className="text-[9px] leading-tight text-slate-600">
                  ยินดีต้อนรับครับ! กดปุ่ม 🎯 จองเลนยิง ในเมนูด้านล่างเพื่อเปิดผังสนามได้เลยครับ
                </p>
              </div>

              {/* Flex Message Card */}
              <div className="bg-white rounded-xl rounded-tl-none overflow-hidden shadow-md border border-emerald-200">
                <div className="bg-slate-900 text-white p-2 flex justify-between items-center">
                  <span className="font-bold text-[10px] text-emerald-400">ยืนยันการจองเลน #3</span>
                  <span className="text-[8px] bg-emerald-500/30 text-emerald-300 px-1 py-0.2 rounded">18m สากล</span>
                </div>
                <div className="p-2 text-[9px] text-slate-600 space-y-0.5">
                  <div className="flex justify-between">
                    <span>เวลา:</span>
                    <span className="font-bold text-slate-900">14:00 - 15:00 น.</span>
                  </div>
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>ยอดชำระ:</span>
                    <span>฿450 (พร้อมเพย์)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* LINE Rich Menu 6 Slots */}
            <div className="bg-slate-950 border-t-2 border-[#06C755] p-1.5 shrink-0">
              <div className="text-[8px] font-mono text-center text-slate-400 pb-1 flex items-center justify-center gap-1">
                <span className="w-1 h-1 rounded-full bg-[#06C755]" />
                LINE Rich Menu (กดเพื่อจอง)
              </div>
              <div className="grid grid-cols-3 gap-1 text-center">
                <div className="p-1.5 rounded-lg bg-emerald-600 text-white flex flex-col items-center justify-center">
                  <Target className="w-3.5 h-3.5 text-amber-300" />
                  <span className="text-[8px] font-black mt-0.5">จองเลน (LIFF)</span>
                </div>
                <div className="p-1.5 rounded-lg bg-slate-800 text-slate-300 flex flex-col items-center justify-center">
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-[8px] font-bold mt-0.5">Waiver</span>
                </div>
                <div className="p-1.5 rounded-lg bg-slate-800 text-slate-300 flex flex-col items-center justify-center">
                  <QrCode className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[8px] font-bold mt-0.5">E-Ticket</span>
                </div>
                <div className="p-1 rounded-lg bg-slate-850 text-slate-400 flex flex-col items-center justify-center">
                  <Award className="w-3 h-3 text-amber-400" />
                  <span className="text-[7px]">สมาชิก Pass</span>
                </div>
                <div className="p-1 rounded-lg bg-slate-850 text-slate-400 flex flex-col items-center justify-center">
                  <Clock className="w-3 h-3 text-blue-400" />
                  <span className="text-[7px]">เวลาเปิด</span>
                </div>
                <div className="p-1 rounded-lg bg-slate-850 text-slate-400 flex flex-col items-center justify-center">
                  <Send className="w-3 h-3 text-emerald-400" />
                  <span className="text-[7px]">ติดต่อโค้ช</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==================================================== */}
        {/* 2. FRONT PHONE: LINE LIFF INTERACTIVE LANE MAP      */}
        {/* ==================================================== */}
        <div
          className="absolute top-8 sm:top-10 right-0 sm:right-2 w-[280px] sm:w-[310px] h-[520px] sm:h-[550px] rounded-[44px] bg-slate-900 border-4 border-slate-600/90 shadow-[35px_40px_65px_-15px_rgba(0,0,0,0.85)] overflow-hidden transition-all duration-500 ring-2 ring-emerald-500/30"
          style={{
            transform: isHovered
              ? 'rotateY(-10deg) rotateX(6deg) rotateZ(-1deg) translateX(10px) translateY(5px) scale(1.03)'
              : 'rotateY(-14deg) rotateX(8deg) rotateZ(-2deg) scale(1.0)',
            transformStyle: 'preserve-3d',
            zIndex: 20,
          }}
        >
          {/* Dynamic Island Notch */}
          <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-24 h-4.5 bg-black rounded-full z-40 flex items-center justify-between px-2">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          {/* Screen Content: LINE LIFF App */}
          <div className="w-full h-full bg-slate-100 flex flex-col pt-7 text-xs font-sans">
            {/* LIFF Header Bar */}
            <div className="bg-slate-900 text-white px-3 py-2 flex items-center justify-between border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400 text-xs">✕</span>
                <span className="font-mono text-[9px] text-emerald-400 font-bold bg-emerald-500/20 px-1.5 py-0.2 rounded">
                  LIFF v2.21
                </span>
                <span className="font-bold text-[10px] text-slate-200 truncate">Robin Archery Arena</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">•••</span>
            </div>

            {/* Range Banner */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-2.5 border-b border-slate-800 space-y-0.5 shrink-0">
              <div className="flex justify-between items-center">
                <h4 className="font-black text-xs">ผังเลือกเลนยิง Interactive</h4>
                <span className="text-[8px] bg-emerald-500 text-white font-bold px-1.5 py-0.2 rounded">
                  ว่าง 3 เลน
                </span>
              </div>
              <p className="text-[9px] text-slate-300">เลือกระยะเป้า และช่องยิงที่คุณต้องการ</p>
            </div>

            {/* Interactive Lanes Body */}
            <div className="flex-1 p-2.5 space-y-2.5 overflow-hidden text-xs">
              {/* Distance Filters */}
              <div className="flex gap-1">
                <span className="px-2 py-0.5 rounded-md bg-slate-900 text-white text-[9px] font-bold">18m สากล</span>
                <span className="px-2 py-0.5 rounded-md bg-slate-200 text-slate-700 text-[9px]">10m ซ้อม</span>
                <span className="px-2 py-0.5 rounded-md bg-slate-200 text-slate-700 text-[9px]">30m</span>
              </div>

              {/* Range Field Visual Box */}
              <div className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5 shadow-inner">
                <div className="flex justify-between text-[9px] text-emerald-400 font-mono pb-1 border-b border-dashed border-slate-700">
                  <span>🎯 Target Line</span>
                  <span>Safety Wall</span>
                </div>

                {/* 4 Interactive Lane Cards */}
                <div className="grid grid-cols-2 gap-1.5">
                  {/* Lane 1 */}
                  <div
                    onClick={() => setInteractiveLane(1)}
                    className={`p-1.5 rounded-xl border text-center transition-all cursor-pointer ${
                      interactiveLane === 1
                        ? 'bg-emerald-950 border-emerald-400 ring-1 ring-emerald-400'
                        : 'bg-slate-800/90 border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    <span className="text-[9px] text-emerald-400 font-mono font-bold">18m</span>
                    <p className="font-bold text-white text-[10px]">เลน 1</p>
                    <span className="text-[8px] text-emerald-400">● พร้อมจอง</span>
                  </div>

                  {/* Lane 2 (Occupied) */}
                  <div className="p-1.5 rounded-xl bg-slate-950/60 border border-slate-800 text-center opacity-50">
                    <span className="text-[9px] text-slate-500 font-mono">18m</span>
                    <p className="font-bold text-slate-400 text-[10px]">เลน 2</p>
                    <span className="text-[8px] text-rose-400">● ยิงอยู่</span>
                  </div>

                  {/* Lane 3 (Active Highlight) */}
                  <div
                    onClick={() => setInteractiveLane(3)}
                    className={`p-1.5 rounded-xl border text-center transition-all cursor-pointer ${
                      interactiveLane === 3
                        ? 'bg-emerald-950 border-emerald-400 ring-2 ring-emerald-400 shadow-md shadow-emerald-500/30'
                        : 'bg-slate-800/90 border-slate-700'
                    }`}
                  >
                    <span className="text-[9px] text-emerald-300 font-mono font-bold">18m</span>
                    <p className="font-bold text-white text-[10px]">เลน 3 ✓</p>
                    <span className="text-[8px] text-emerald-300 font-bold">เลือกแล้ว</span>
                  </div>

                  {/* Lane 4 */}
                  <div
                    onClick={() => setInteractiveLane(4)}
                    className={`p-1.5 rounded-xl border text-center transition-all cursor-pointer ${
                      interactiveLane === 4
                        ? 'bg-emerald-950 border-emerald-400 ring-1 ring-emerald-400'
                        : 'bg-slate-800/90 border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    <span className="text-[9px] text-emerald-400 font-mono font-bold">18m</span>
                    <p className="font-bold text-white text-[10px]">เลน 4</p>
                    <span className="text-[8px] text-emerald-400">● พร้อมจอง</span>
                  </div>
                </div>

                <div className="flex justify-between text-[8px] text-slate-400 font-mono pt-1 border-t border-dashed border-slate-700">
                  <span>Shooting Line</span>
                  <span>จุดยืนยิง</span>
                </div>
              </div>

              {/* Add-ons & Equipment Preview */}
              <div className="p-2 rounded-xl bg-white border border-slate-200 text-[10px] space-y-1">
                <span className="font-bold text-slate-800 block">อุปกรณ์และบริการเสริม:</span>
                <div className="flex justify-between text-slate-600">
                  <span>• คันธนู Recurve Starter (24 lbs)</span>
                  <span className="font-bold text-emerald-600">+฿100</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>• โค้ชผู้ฝึกสอนเบื้องต้น (20 นาที)</span>
                  <span className="font-bold text-emerald-600">+฿250</span>
                </div>
              </div>

              {/* Summary & PromptPay CTA Button */}
              <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow space-y-1.5">
                <div className="flex justify-between items-baseline">
                  <span className="text-[10px] text-slate-500">{t('ยอดชำระสุทธิ', 'Total Amount')} ({t('เลน', 'Lane')} {interactiveLane}):</span>
                  <span className="text-base font-black text-emerald-600">฿650.00</span>
                </div>

                <div className="w-full py-2 rounded-lg bg-emerald-600 text-white font-bold text-[10px] flex items-center justify-center gap-1 shadow-md shadow-emerald-600/30">
                  <QrCode className="w-3 h-3" />
                  <span>{t('สแกนจ่ายพร้อมเพย์ QR (ล็อกเลน 10 นาที)', 'Pay via PromptPay QR (Reserved 10m)')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==================================================== */}
        {/* 3. FLOATING 3D GLASS BADGES AROUND THE PHONES       */}
        {/* ==================================================== */}
        {/* Floating Badge 1: Top Right */}
        <div
          className="absolute -top-2 right-2 sm:-right-4 px-3 py-1.5 rounded-2xl bg-slate-900/90 border border-emerald-500/50 backdrop-blur-md text-white shadow-xl flex items-center gap-2 transition-transform duration-300"
          style={{
            transform: isHovered ? 'translateY(-6px) scale(1.05)' : 'translateY(0)',
            zIndex: 30,
          }}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-bold text-emerald-300">
            {t('เลน 3 ว่างพร้อมจอง (18m)', 'Lane 3 Available (18m)')}
          </span>
        </div>

        {/* Floating Badge 2: Bottom Left */}
        <div
          className="absolute -bottom-3 left-0 sm:-left-6 px-3 py-2 rounded-2xl bg-slate-900/95 border border-slate-700 backdrop-blur-md text-white shadow-2xl flex items-center gap-2.5 transition-transform duration-300"
          style={{
            transform: isHovered ? 'translateY(6px) scale(1.05)' : 'translateY(0)',
            zIndex: 30,
          }}
        >
          <div className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="text-left">
            <p className="text-[11px] font-bold text-white">Digital Safety Waiver</p>
            <p className="text-[9px] text-emerald-400">{t('เซ็นยินยอมบนมือถือเรียบร้อย ✓', 'Signed & Verified on Mobile ✓')}</p>
          </div>
        </div>

        {/* Floating Badge 3: Center Bottom PromptPay Tag */}
        <div
          className="hidden sm:flex absolute bottom-8 right-0 px-2.5 py-1 rounded-xl bg-slate-950/90 border border-amber-500/40 text-amber-300 shadow-lg items-center gap-1.5 text-[10px] font-mono font-bold"
          style={{ zIndex: 30 }}
        >
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>PromptPay Dynamic QR Code</span>
        </div>
      </div>
    </div>
  );
}
