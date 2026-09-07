'use client';

import React, { useState, useEffect } from 'react';
import {
  Target,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Users,
  Smartphone,
  Flame,
  Radio,
  Sparkles,
  QrCode,
  ArrowRight,
} from 'lucide-react';
import { useI18n } from '@archery/ui';

interface LaneStatus {
  lane: number;
  name: string;
  distance: string;
  status: 'available' | 'occupied' | 'warning' | 'member';
  timeRemaining?: string;
  shooter?: string;
}

export function RangeTacticalStage() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<'control_room' | 'mobile_ticket'>('control_room');
  const [tickerSecond, setTickerSecond] = useState<number>(42);

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerSecond((prev) => (prev > 0 ? prev - 1 : 59));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const lanes: LaneStatus[] = [
    { lane: 1, name: 'Beginner Pad', distance: '10m', status: 'available' },
    { lane: 2, name: 'Olympic Target', distance: '18m', status: 'occupied', timeRemaining: `24:${tickerSecond.toString().padStart(2, '0')}`, shooter: 'คุณ กิตติพงษ์' },
    { lane: 3, name: 'WA Standard', distance: '18m', status: 'warning', timeRemaining: '04:12', shooter: 'คุณ รินลดา' },
    { lane: 4, name: 'Member Lane', distance: '18m', status: 'member', timeRemaining: '45:00', shooter: 'คุณ ปริชญ์ (Member)' },
    { lane: 5, name: 'Outdoor Long', distance: '30m', status: 'occupied', timeRemaining: '18:50', shooter: 'คุณ วรพล' },
    { lane: 6, name: 'Compound Field', distance: '50m', status: 'available' },
  ];

  return (
    <div className="w-full select-none">
      {/* Outer Tactical Frame with Athletic Precision Styling */}
      <div className="rounded-3xl bg-[#09172c]/90 border border-white/15 shadow-[0_16px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl p-4 sm:p-5 relative overflow-hidden">
        {/* Subtle architectural grid lines */}
        <div className="absolute inset-0 range-grid-bg opacity-30 pointer-events-none" />

        {/* Tactical Header Bar */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-black tracking-widest text-white uppercase">
                  RANGE RADAR OS
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#f9c701]/20 text-[#f9c701] font-bold border border-[#f9c701]/30">
                  LIVE 10-70M
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                Robin Archery Arena (Bangkok) • 8 Lanes Monitored
              </p>
            </div>
          </div>

          {/* Toggle between Range Control & Archer's Pass */}
          <div className="flex bg-slate-950/80 p-1 rounded-xl border border-white/10 text-[11px] font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab('control_room')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'control_room'
                  ? 'bg-gradient-to-r from-[#074c88] to-[#10516e] text-white shadow-sm font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Radio className="w-3.5 h-3.5 text-[#f9c701]" />
              <span>{t('จอควบคุมสนาม (POS)', 'Range Control')}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('mobile_ticket')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'mobile_ticket'
                  ? 'bg-gradient-to-r from-[#074c88] to-[#10516e] text-white shadow-sm font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-sky-400" />
              <span>{t('ตั๋วลูกค้า (LINE LIFF)', 'Archer Ticket')}</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Range Control Room / Live Lane Monitor */}
        {activeTab === 'control_room' && (
          <div className="relative z-10 pt-4 space-y-3.5">
            {/* Quick Stats Bar */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 rounded-xl bg-slate-950/60 border border-white/5">
                <span className="text-[10px] text-slate-400 uppercase font-mono">{t('เลนเปิดใช้งาน', 'Active Lanes')}</span>
                <p className="text-lg font-black font-mono text-white mt-0.5">6 / 8</p>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/60 border border-white/5">
                <span className="text-[10px] text-slate-400 uppercase font-mono">{t('พร้อมจองทันที', 'Available')}</span>
                <p className="text-lg font-black font-mono text-[#f9c701] mt-0.5">2 {t('เลน', 'Lanes')}</p>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/60 border border-white/5">
                <span className="text-[10px] text-slate-400 uppercase font-mono">{t('คิวรอเช็คอิน', 'Check-in Queue')}</span>
                <p className="text-lg font-black font-mono text-sky-400 mt-0.5">3 {t('คน', 'Pax')}</p>
              </div>
            </div>

            {/* Tactical Lane Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {lanes.map((item) => {
                const isAvailable = item.status === 'available';
                const isWarning = item.status === 'warning';
                const isMember = item.status === 'member';

                return (
                  <div
                    key={item.lane}
                    className={`p-3 rounded-2xl border transition-all relative overflow-hidden flex flex-col justify-between ${
                      isAvailable
                        ? 'bg-slate-950/40 border-slate-700/60 hover:border-[#074c88]'
                        : isWarning
                        ? 'bg-amber-950/20 border-amber-500/50'
                        : isMember
                        ? 'bg-[#074c88]/20 border-[#074c88]/70'
                        : 'bg-slate-900/80 border-slate-700/80'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">
                          LANE {item.lane.toString().padStart(2, '0')}
                        </span>
                        <h4 className="text-xs font-black text-white">{item.distance}</h4>
                      </div>

                      <span
                        className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full ${
                          isAvailable
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : isWarning
                            ? 'bg-amber-500/20 text-amber-300 animate-pulse'
                            : 'bg-[#074c88]/40 text-[#f9c701]'
                        }`}
                      >
                        {isAvailable
                          ? t('ว่าง', 'FREE')
                          : isWarning
                          ? t('ใกล้หมด', 'ALERT')
                          : isMember
                          ? t('สมาชิก', 'MEMBER')
                          : t('กำลังยิง', 'LIVE')}
                      </span>
                    </div>

                    <div className="mt-2 pt-2 border-t border-white/5">
                      {isAvailable ? (
                        <p className="text-[10px] text-slate-400 font-medium">
                          {t('คลิกเปิด Walk-in', 'Open Walk-in')}
                        </p>
                      ) : (
                        <div>
                          <p className="text-[10px] text-slate-300 truncate font-medium">{item.shooter}</p>
                          <div className="flex items-center gap-1 font-mono text-xs font-black text-[#f9c701] mt-0.5">
                            <Clock className="w-3 h-3 text-[#f9c701]" />
                            <span>{item.timeRemaining}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Action Footer */}
            <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono text-[11px] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#f9c701]"></span>
                {t('อัปเดตสถานะอัตโนมัติทุก 1 วินาที', 'Real-time WebSocket Sync')}
              </span>
              <a
                href="/admin/robin-archery-bkk"
                className="text-xs font-bold text-sky-400 hover:text-white flex items-center gap-1 transition-colors"
              >
                <span>{t('เปิดหน้าจอ POS เคาน์เตอร์', 'Open Full POS')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

        {/* Tab 2: Archer's Mobile Pass & Ticket */}
        {activeTab === 'mobile_ticket' && (
          <div className="relative z-10 pt-4 space-y-3">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#060e1a] to-[#0d2140] border border-[#074c88]/40 space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#074c88] text-white flex items-center justify-center font-black">
                    🎯
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">E-Ticket บัตรเข้าสนามยิงธนู</h4>
                    <p className="text-[10px] text-slate-400 font-mono">CODE: ARC-98214</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
                  PAID ✓
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/5">
                  <span className="text-[10px] text-slate-400 font-mono">ช่องยิง (LANE)</span>
                  <p className="text-base font-black text-white">เลน 03 (18m WA)</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/5">
                  <span className="text-[10px] text-slate-400 font-mono">เวลา (SLOT)</span>
                  <p className="text-base font-black text-[#f9c701]">14:00 - 15:00 น.</p>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-slate-300 text-[11px]">Digital Safety Waiver เซ็นยินยอมแล้ว</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">VERIFIED</span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <QrCode className="w-7 h-7 text-[#f9c701]" />
                  <div>
                    <p className="text-[11px] font-bold text-white">สแกนเช็คอินหน้าร้าน</p>
                    <p className="text-[9px] text-slate-400">ไม่ต้องรอคิว เปิดช่องยิงทันที</p>
                  </div>
                </div>
                <a
                  href="http://localhost:3001/book/robin-archery-bkk"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#074c88] to-[#10516e] text-white text-xs font-bold shadow-sm active:scale-95 transition-all"
                >
                  ทดลองใน LIFF →
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
