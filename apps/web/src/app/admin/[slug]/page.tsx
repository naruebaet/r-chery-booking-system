'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  getShopBySlug,
  updateShop,
  getStoredBookings,
  checkInBooking,
  createWalkInBooking,
  extendLaneSession,
  finishLaneSession,
  WalkInParams,
} from '@archery/store';
import { Shop, Lane, Booking, DistanceType, EquipmentItem, Coach } from '@archery/types';
import { ThemeProvider, useI18n, LanguageSwitcher, ThemeToggle } from '@archery/ui';
import {
  Target,
  Users,
  Clock,
  Calendar,
  Settings,
  Edit2,
  CheckCircle,
  Smartphone,
  ExternalLink,
  Palette,
  Sparkles,
  Plus,
  Play,
  StopCircle,
  DollarSign,
  CreditCard,
  QrCode,
  Banknote,
  UserCheck,
  Shield,
  FileCheck,
  Check,
  X,
  RotateCcw,
} from 'lucide-react';

export default function ShopAdminDashboard() {
  const { t } = useI18n();
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [shop, setShop] = useState<Shop | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState<'monitor' | 'pos' | 'bookings' | 'lanes' | 'branding' | 'saas'>('monitor');

  // Walk-in Modal State
  const [walkInTargetLane, setWalkInTargetLane] = useState<Lane | null>(null);
  const [walkInDuration, setWalkInDuration] = useState<number>(60);
  const [walkInName, setWalkInName] = useState<string>('ลูกค้า Walk-in');
  const [walkInPhone, setWalkInPhone] = useState<string>('081-xxx-xxxx');
  const [walkInSelectedEquipment, setWalkInSelectedEquipment] = useState<{ id: string; name: string; price: number; details: string }[]>([]);
  const [walkInSelectedCoach, setWalkInSelectedCoach] = useState<{ id: string; name: string; price: number } | null>(null);
  const [walkInPaymentMethod, setWalkInPaymentMethod] = useState<'cash' | 'promptpay' | 'credit_card' | 'membership_quota'>('cash');
  const [cashReceived, setCashReceived] = useState<string>('');
  const [waiverAgreed, setWaiverAgreed] = useState<boolean>(true);
  const [walkInSuccessNotice, setWalkInSuccessNotice] = useState<string | null>(null);

  // Edit Lane Modal
  const [editingLane, setEditingLane] = useState<Lane | null>(null);

  // Branding State
  const [brandPrimary, setBrandPrimary] = useState('#059669');
  const [brandAccent, setBrandAccent] = useState('#F59E0B');
  const [savedBrandingAlert, setSavedBrandingAlert] = useState(false);

  const refreshData = () => {
    const loadedShop = getShopBySlug(slug);
    if (loadedShop) {
      setShop(loadedShop);
      setBrandPrimary(loadedShop.branding.primaryColor);
      setBrandAccent(loadedShop.branding.accentColor);
      const b = getStoredBookings(loadedShop.id);
      setBookings(b);
    }
  };

  useEffect(() => {
    refreshData();
    window.addEventListener('archery-bookings-updated', refreshData);
    window.addEventListener('archery-shops-updated', refreshData);
    return () => {
      window.removeEventListener('archery-bookings-updated', refreshData);
      window.removeEventListener('archery-shops-updated', refreshData);
    };
  }, [slug]);

  if (!shop) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-slate-900 text-white">
        <div className="text-center space-y-3">
          <Target className="w-10 h-10 text-[#f9c701] mx-auto animate-bounce" />
          <h2 className="text-xl font-bold">กำลังโหลดข้อมูลแดชบอร์ด...</h2>
        </div>
      </div>
    );
  }

  // Quick Action: Extend Session
  const handleExtend = (laneId: string, minutes: number) => {
    extendLaneSession(shop.id, laneId, minutes);
    refreshData();
  };

  // Quick Action: Finish Session
  const handleFinish = (laneId: string) => {
    if (confirm('ยืนยันการเคลียร์เลนนี้ใช่หรือไม่? อุปกรณ์จะถูกส่งคืนและเลนจะกลับเป็นสถานะว่าง')) {
      finishLaneSession(shop.id, laneId);
      refreshData();
    }
  };

  // Submit Walk-in Form
  const handleSubmitWalkIn = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!walkInTargetLane) return;

    const laneRatePerHour = walkInTargetLane.hourlyRate;
    const laneTotal = (laneRatePerHour / 60) * walkInDuration;
    const eqTotal = walkInSelectedEquipment.reduce((sum, item) => sum + item.price, 0);
    const coachTotal = walkInSelectedCoach ? walkInSelectedCoach.price : 0;
    const finalAmount = Math.round(laneTotal + eqTotal + coachTotal);

    const params: WalkInParams = {
      shopId: shop.id,
      laneId: walkInTargetLane.id,
      customerName: walkInName,
      customerPhone: walkInPhone,
      durationMinutes: walkInDuration,
      equipmentAddons: walkInSelectedEquipment,
      coachAddon: walkInSelectedCoach || undefined,
      paymentMethod: walkInPaymentMethod,
      totalAmount: finalAmount,
    };

    const newBooking = createWalkInBooking(params);
    if (newBooking) {
      setWalkInSuccessNotice(`เปิดเลน ${walkInTargetLane.number} ให้กับ "${walkInName}" เรียบร้อยแล้ว!`);
      setWalkInTargetLane(null);
      setWalkInSelectedEquipment([]);
      setWalkInSelectedCoach(null);
      setCashReceived('');
      refreshData();
      setTimeout(() => setWalkInSuccessNotice(null), 4000);
    }
  };

  // Toggle Equipment for Walk-in
  const handleToggleWalkInEquipment = (item: EquipmentItem) => {
    const exists = walkInSelectedEquipment.some((eq) => eq.id === item.id);
    if (exists) {
      setWalkInSelectedEquipment(walkInSelectedEquipment.filter((eq) => eq.id !== item.id));
    } else {
      setWalkInSelectedEquipment([
        ...walkInSelectedEquipment,
        { id: item.id, name: item.name, price: item.price, details: item.drawWeight || 'Standard' },
      ]);
    }
  };

  // Walk-in Price Calculation
  const currentLaneRate = walkInTargetLane ? (walkInTargetLane.hourlyRate / 60) * walkInDuration : 0;
  const currentEqRate = walkInSelectedEquipment.reduce((s, i) => s + i.price, 0);
  const currentCoachRate = walkInSelectedCoach ? walkInSelectedCoach.price : 0;
  const calculatedWalkInTotal = Math.round(currentLaneRate + currentEqRate + currentCoachRate);
  const cashChange = Number(cashReceived) > calculatedWalkInTotal ? Number(cashReceived) - calculatedWalkInTotal : 0;

  const occupiedCount = shop.lanes.filter((l) => l.status === 'occupied').length;
  const availableCount = shop.lanes.filter((l) => l.status === 'available').length;
  const todayRevenue = bookings.reduce((sum, b) => sum + b.totalAmount, 0);

  return (
    <ThemeProvider branding={shop.branding}>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
        {/* Top Shop Admin Bar */}
        <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md"
              style={{ backgroundColor: shop.branding.primaryColor }}
            >
              <Target className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-base text-white tracking-tight">{shop.name}</h1>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-[#074c88]/25 text-[#f9c701] font-bold border border-[#074c88]/40">
                  {shop.subscriptionPlan} Tier
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {t('ระบบจัดการหลังบ้าน & เคาน์เตอร์ Walk-in POS', 'Range Admin & Walk-in POS Dashboard')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <LanguageSwitcher variant="pill" />

            <button
              type="button"
              onClick={() => {
                const firstAvail = shop.lanes.find((l) => l.status === 'available');
                if (firstAvail) {
                  setWalkInTargetLane(firstAvail);
                } else {
                  alert(t('ขณะนี้เลนเต็มทุกช่อง กรุณารอเลนว่าง หรือต่อคิว', 'All lanes currently occupied. Please wait for an available slot.'));
                }
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#074c88] to-[#10516e] hover:from-[#09599e] shadow-md shadow-[#074c88]/30 transition-all active:scale-95"
            >
              <Plus className="w-4 h-4 text-[#f9c701]" />
              <span>{t('+ เปิดเลน Walk-in', '+ Open Walk-in Lane')}</span>
            </button>

            <a
              href={`http://localhost:3001/book/${shop.slug}`}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-[#f9c701] bg-[#074c88]/20 border border-[#074c88]/40 hover:bg-[#074c88]/30 transition-colors"
            >
              <Smartphone className="w-3.5 h-3.5 text-[#f9c701]" />
              <span>LINE LIFF (:3001)</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <Link
              href="/"
              className="px-3 py-1.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              {t('กลับหน้าหลัก', 'Back to Home')}
            </Link>
          </div>
        </header>

        {/* Dashboard Subnav */}
        <div className="border-b border-slate-800 bg-slate-900/40 px-4 sm:px-8 flex overflow-x-auto gap-4 text-xs font-semibold scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab('monitor')}
            className={`py-3 border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'monitor'
                ? 'border-[#f9c701] text-[#f9c701] font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Target className="w-4 h-4" />
            {t('Live Range Monitor (ผังสด & คุมเวลา)', 'Live Range Monitor (Timeline)')}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('pos')}
            className={`py-3 border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'pos'
                ? 'border-[#f9c701] text-[#f9c701] font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Banknote className="w-4 h-4 text-amber-400" />
            {t('เคาน์เตอร์ POS (สำหรับลูกค้า Walk-in)', 'Walk-in Counter POS')}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('bookings')}
            className={`py-3 border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'bookings'
                ? 'border-[#f9c701] text-[#f9c701] font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Calendar className="w-4 h-4" />
            {t('รายการจองวันนี้', "Today's Bookings")} ({bookings.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('lanes')}
            className={`py-3 border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'lanes'
                ? 'border-[#f9c701] text-[#f9c701] font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Settings className="w-4 h-4" />
            {t('ตั้งค่าเลนยิง', 'Lane Configuration')} ({shop.lanes.length} {t('ช่อง', 'lanes')})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('branding')}
            className={`py-3 border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'branding'
                ? 'border-[#f9c701] text-[#f9c701] font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Palette className="w-4 h-4" />
            {t('ปรับสี Branding', 'Brand Theme & Colors')}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('saas')}
            className={`py-3 border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'saas'
                ? 'border-[#f9c701] text-[#f9c701] font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            {t('SaaS Plan', 'SaaS Subscription')}
          </button>
        </div>

        {/* Global Notice Alert */}
        {walkInSuccessNotice && (
          <div className="bg-[#074c88] text-white text-xs font-bold px-4 py-2.5 flex items-center justify-center gap-2 animate-in fade-in">
            <CheckCircle className="w-4 h-4 text-[#f9c701]" />
            <span>{walkInSuccessNotice}</span>
          </div>
        )}

        {/* Dashboard Main Container */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full space-y-6">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
              <span className="text-xs text-slate-400 font-medium">{t('กำลังยิงอยู่ (Occupied)', 'Occupied Lanes')}</span>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-2xl font-black text-rose-400">{occupiedCount} {t('เลน', 'Lanes')}</span>
                <span className="text-xs text-slate-500">{t('จาก', 'of')} {shop.lanes.length}</span>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
              <span className="text-xs text-slate-400 font-medium">{t('เลนว่างพร้อมเปิด', 'Available Lanes')}</span>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-2xl font-black text-[#f9c701]">{availableCount} {t('เลน', 'Lanes')}</span>
                <span className="text-xs text-[#f9c701] font-medium">{t('พร้อมรับ Walk-in', 'Walk-in Ready')}</span>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
              <span className="text-xs text-slate-400 font-medium">{t('ยอดจองรวมวันนี้', "Today's Bookings")}</span>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-2xl font-black text-[#f9c701]">{bookings.length} {t('รอบ', 'sessions')}</span>
                <span className="text-xs text-slate-500">LINE + Walk-in</span>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
              <span className="text-xs text-slate-400 font-medium">{t('รายได้สะสมวันนี้', "Today's Revenue")}</span>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-2xl font-black text-white">฿{todayRevenue.toLocaleString()}</span>
                <span className="text-xs text-[#f9c701] font-medium">{t('เงินสด + พร้อมเพย์', 'Cash + PromptPay')}</span>
              </div>
            </div>
          </div>

          {/* TAB 1: LIVE RANGE MONITOR (WITH WALK-IN QUICK BUTTONS & TIMERS) */}
          {activeTab === 'monitor' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-white">{t('Live Range Field (ผังสนามเรียลไทม์ & คุมเวลา)', 'Live Range Field (Timeline & Monitor)')}</h3>
                  <p className="text-xs text-slate-400">{t('คลิกเลนว่างเพื่อเปิด Walk-in หรือกดต่อเวลา / เคลียร์เลนได้ทันที', 'Click available lane to open Walk-in or extend/finish sessions in real-time')}</p>
                </div>
              </div>

              {/* Lanes Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {shop.lanes.map((lane) => {
                  const isAvailable = lane.status === 'available';
                  const isOccupied = lane.status === 'occupied';

                  return (
                    <div
                      key={lane.id}
                      className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                        isOccupied
                          ? 'bg-rose-950/20 border-rose-900/60 ring-1 ring-rose-500/30'
                          : isAvailable
                          ? 'bg-slate-900/80 border-slate-800 hover:border-[#074c88]/80'
                          : 'bg-slate-900/40 border-slate-800 opacity-60'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-950 text-[#f9c701] border border-[#f9c701]/30">
                              {lane.distance}
                            </span>
                            <span className="font-bold text-sm text-white">{t('เลน', 'Lane')} #{lane.number}</span>
                          </div>

                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                              isOccupied
                                ? 'bg-rose-500/20 text-rose-400'
                                : isAvailable
                                ? 'bg-[#074c88]/30 text-[#f9c701] border border-[#074c88]/40'
                                : 'bg-amber-500/20 text-amber-400'
                            }`}
                          >
                            {isOccupied ? t('กำลังยิง', 'Occupied') : isAvailable ? t('ว่าง', 'Available') : t('ซ่อมบำรุง', 'Maintenance')}
                          </span>
                        </div>

                        <p className="text-xs text-slate-400">{lane.name}</p>

                        {/* Occupied Lane Session Box with Timer */}
                        {isOccupied && lane.currentBooking ? (
                          <div className="mt-3 p-3 rounded-xl bg-slate-950/80 border border-rose-900/40 text-xs space-y-2">
                            <div className="flex items-center justify-between text-slate-300">
                              <span className="text-[11px] text-slate-400">{t('ผู้ยิง:', 'Shooter:')}</span>
                              <span className="font-bold text-white truncate max-w-[120px]">
                                {lane.currentBooking.customerName}
                              </span>
                            </div>

                            <div className="flex items-center justify-between text-rose-300 text-[11px] font-mono">
                              <span>{t('ช่วงเวลา:', 'Time:')}</span>
                              <span className="font-bold">
                                {lane.currentBooking.startTime} - {lane.currentBooking.endTime} {t('น.', '')}
                              </span>
                            </div>

                            {lane.currentBooking.isWalkIn && (
                              <div className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded font-medium inline-block">
                                {t('• ลูกค้า Walk-in หน้าเคาน์เตอร์', '• Front Desk Walk-in')}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="mt-3 p-3 rounded-xl bg-slate-950/40 text-xs text-slate-500 text-center">
                            ฿{lane.hourlyRate}{t('/ชม. • พร้อมให้บริการ', '/hr • Available')}
                          </div>
                        )}
                      </div>

                      {/* Lane Actions */}
                      <div className="mt-4 pt-3 border-t border-slate-800/80">
                        {isAvailable ? (
                          <button
                            type="button"
                            onClick={() => setWalkInTargetLane(lane)}
                            className="w-full py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#074c88] to-[#10516e] hover:from-[#09599e] flex items-center justify-center gap-1.5 shadow-md shadow-[#074c88]/25 transition-all active:scale-95"
                          >
                            <Plus className="w-3.5 h-3.5 text-[#f9c701]" />
                            <span>{t('เปิดเลน Walk-in ด่วน', 'Quick Open Walk-in')}</span>
                          </button>
                        ) : (
                          <div className="space-y-1.5">
                            <div className="flex gap-1">
                              <button
                                type="button"
                                onClick={() => handleExtend(lane.id, 30)}
                                className="flex-1 py-1 rounded-lg text-[10px] font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                              >
                                +30 {t('นาที', 'mins')}
                              </button>
                              <button
                                type="button"
                                onClick={() => handleExtend(lane.id, 60)}
                                className="flex-1 py-1 rounded-lg text-[10px] font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                              >
                                +60 {t('นาที', 'mins')}
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleFinish(lane.id)}
                              className="w-full py-1.5 rounded-lg text-[11px] font-bold text-rose-300 bg-rose-950/60 hover:bg-rose-900 border border-rose-800/40 flex items-center justify-center gap-1 transition-colors"
                            >
                              <StopCircle className="w-3.5 h-3.5" />
                              <span>{t('จบรอบ / เคลียร์เลน', 'Finish / Clear Lane')}</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: FULL COUNTER POS DESK */}
          {activeTab === 'pos' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left 2 Cols: Cart & Session Builder */}
              <div className="lg:col-span-2 space-y-5">
                {/* 1. Select Lane */}
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Target className="w-4 h-4 text-[#f9c701]" />
                      {t('1. เลือกเลนยิงที่ต้องการเปิด', '1. Select Shooting Lane')}
                    </h4>
                    <span className="text-xs text-slate-400">{availableCount} {t('เลนว่าง', 'Lanes available')}</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {shop.lanes.map((l) => {
                      const isAvail = l.status === 'available';
                      const isSelected = walkInTargetLane?.id === l.id;

                      return (
                        <button
                          key={l.id}
                          type="button"
                          disabled={!isAvail}
                          onClick={() => setWalkInTargetLane(l)}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            isSelected
                              ? 'bg-[#074c88]/40 border-[#f9c701] ring-2 ring-[#f9c701]/50 shadow-md'
                              : isAvail
                              ? 'bg-slate-950 border-slate-800 hover:border-slate-700'
                              : 'bg-slate-950/40 border-slate-900 opacity-40 cursor-not-allowed'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-white">{t('เลน', 'Lane')} {l.number}</span>
                            <span className="font-mono text-[10px] text-[#f9c701]">{l.distance}</span>
                          </div>
                          <p className="text-[10px] text-slate-400 mt-1">฿{l.hourlyRate}{t('/ชม.', '/hr')}</p>
                          <span
                            className={`text-[9px] px-1.5 py-0.2 rounded mt-1 inline-block font-bold ${
                              isAvail ? 'bg-[#074c88]/30 text-[#f9c701]' : 'bg-rose-500/20 text-rose-400'
                            }`}
                          >
                            {isAvail ? t('ว่าง', 'Available') : t('ยิงอยู่', 'Occupied')}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Duration & Guest Info */}
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#f9c701]" />
                    {t('2. เลือกระยะเวลาและข้อมูลลูกค้า', '2. Duration & Shooter Details')}
                  </h4>

                  {/* Duration Buttons */}
                  <div>
                    <span className="text-xs text-slate-400 mb-1.5 block">{t('ระยะเวลาการยิง:', 'Shooting Duration:')}</span>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { label: t('30 นาที', '30 mins'), mins: 30 },
                        { label: t('1 ชั่วโมง', '1 hr'), mins: 60 },
                        { label: t('1.5 ชั่วโมง', '1.5 hrs'), mins: 90 },
                        { label: t('2 ชั่วโมง', '2 hrs'), mins: 120 },
                      ].map((dur) => (
                        <button
                          key={dur.mins}
                          type="button"
                          onClick={() => setWalkInDuration(dur.mins)}
                          className={`py-2 rounded-xl text-xs font-semibold transition-all ${
                            walkInDuration === dur.mins
                              ? 'bg-[#074c88] text-white shadow'
                              : 'bg-slate-950 text-slate-300 border border-slate-800 hover:bg-slate-800'
                          }`}
                        >
                          {dur.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-slate-400 mb-1">{t('ชื่อผู้เล่น / ลูกค้า', 'Shooter Name / Customer')}</label>
                      <input
                        type="text"
                        value={walkInName}
                        onChange={(e) => setWalkInName(e.target.value)}
                        className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-[#074c88] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">{t('เบอร์โทรศัพท์ (ถ้ามี)', 'Contact Phone (Optional)')}</label>
                      <input
                        type="text"
                        value={walkInPhone}
                        onChange={(e) => setWalkInPhone(e.target.value)}
                        className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-[#074c88] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Add-on Gear & Coach */}
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#f9c701]" />
                    {t('3. อุปกรณ์เช่า & ครูฝึกหน้าสนาม', '3. Rental Equipment & Range Coach')}
                  </h4>

                  <div className="space-y-2">
                    {shop.equipment.map((eq) => {
                      const isSelected = walkInSelectedEquipment.some((i) => i.id === eq.id);
                      return (
                        <div
                          key={eq.id}
                          className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs"
                        >
                          <div>
                            <span className="font-bold text-white">{eq.name}</span>
                            <span className="text-slate-500 block text-[11px]">
                              {eq.drawWeight || 'Standard'} • {t('คงเหลือ', 'available')} {eq.availableCount} {t('ชุด', 'sets')}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-[#074c88] font-bold">+฿{eq.price}</span>
                            <button
                              type="button"
                              onClick={() => handleToggleWalkInEquipment(eq)}
                              className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                                isSelected ? 'bg-[#074c88] text-white' : 'bg-slate-800 text-slate-300'
                              }`}
                            >
                              {isSelected ? t('เลือกแล้ว', 'Selected') : t('+ เพิ่ม', '+ Add')}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Col: POS Checkout Receipt & Payment */}
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 sticky top-20">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h4 className="font-bold text-sm text-white">{t('สรุปรายการคิดเงิน (POS Receipt)', 'Order Summary (POS Receipt)')}</h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#074c88]/25 text-[#f9c701] border border-[#074c88]/40 font-bold">
                      Walk-in Desk
                    </span>
                  </div>

                  {/* Summary Breakdown */}
                  <div className="space-y-2 text-xs text-slate-300">
                    <div className="flex justify-between">
                      <span>
                        {t('ค่าเลน', 'Lane Fee')} ({walkInTargetLane ? `${t('เลน', 'Lane')} ${walkInTargetLane.number}` : t('ยังไม่เลือก', 'None')} - {walkInDuration} {t('นาที', 'mins')}):
                      </span>
                      <span className="font-bold text-white">฿{Math.round(currentLaneRate)}</span>
                    </div>

                    {walkInSelectedEquipment.map((eq, i) => (
                      <div key={i} className="flex justify-between text-slate-400 text-[11px]">
                        <span>• {eq.name}:</span>
                        <span>฿{eq.price}</span>
                      </div>
                    ))}

                    <div className="border-t border-slate-800 pt-3 flex justify-between items-baseline">
                      <span className="text-sm font-bold text-white">{t('ยอดที่ต้องชำระ:', 'Total Due:')}</span>
                      <span className="text-2xl font-black text-[#074c88]">
                        ฿{calculatedWalkInTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Payment Method Selector */}
                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    <span className="text-xs text-slate-400 block font-medium">{t('ช่องทางรับชำระ:', 'Payment Method:')}</span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setWalkInPaymentMethod('cash')}
                        className={`p-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                          walkInPaymentMethod === 'cash'
                            ? 'bg-[#074c88] text-white shadow'
                            : 'bg-slate-950 border border-slate-800 text-slate-300'
                        }`}
                      >
                        <Banknote className="w-3.5 h-3.5 text-[#f9c701]" />
                        <span>{t('เงินสด (Cash)', 'Cash')}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setWalkInPaymentMethod('promptpay')}
                        className={`p-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                          walkInPaymentMethod === 'promptpay'
                            ? 'bg-[#074c88] text-white shadow'
                            : 'bg-slate-950 border border-slate-800 text-slate-300'
                        }`}
                      >
                        <QrCode className="w-3.5 h-3.5 text-[#f9c701]" />
                        <span>{t('สแกน QR โอน', 'PromptPay QR')}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setWalkInPaymentMethod('credit_card')}
                        className={`p-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                          walkInPaymentMethod === 'credit_card'
                            ? 'bg-[#074c88] text-white shadow'
                            : 'bg-slate-950 border border-slate-800 text-slate-300'
                        }`}
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>{t('บัตรเครดิต EDC', 'Credit Card')}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setWalkInPaymentMethod('membership_quota')}
                        className={`p-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                          walkInPaymentMethod === 'membership_quota'
                            ? 'bg-amber-500 text-slate-950 font-bold shadow'
                            : 'bg-slate-950 border border-slate-800 text-slate-300'
                        }`}
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#db1219]" />
                        <span>{t('ตัดสิทธิ์สมาชิก', 'Member Pass')}</span>
                      </button>
                    </div>

                    {/* Cash Change Calculator */}
                    {walkInPaymentMethod === 'cash' && (
                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">{t('รับเงินสดมา:', 'Cash Received:')}</span>
                          <input
                            type="number"
                            placeholder="0"
                            value={cashReceived}
                            onChange={(e) => setCashReceived(e.target.value)}
                            className="w-24 p-1.5 text-right bg-slate-900 border border-slate-700 rounded-lg text-white font-bold"
                          />
                        </div>
                        {Number(cashReceived) > 0 && (
                          <div className="flex items-center justify-between pt-1 border-t border-slate-800/80">
                            <span className="text-slate-400">{t('เงินทอน:', 'Change Due:')}</span>
                            <span className="text-amber-400 font-bold font-mono">฿{cashChange.toLocaleString()}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Safety Waiver Agreement Toggle */}
                  <label className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={waiverAgreed}
                      onChange={(e) => setWaiverAgreed(e.target.checked)}
                      className="mt-0.5 rounded text-[#074c88] focus:ring-[#074c88] w-4 h-4 cursor-pointer"
                    />
                    <span className="text-[11px] text-slate-300">
                      {t('ลูกค้ารับทราบกฎความปลอดภัย & เซ็น Waiver หน้าเคาน์เตอร์เรียบร้อยแล้ว', 'Customer acknowledged safety rules & signed waiver at counter')}
                    </span>
                  </label>

                  {/* Submit Button */}
                  <button
                    type="button"
                    disabled={!walkInTargetLane || !waiverAgreed}
                    onClick={() => handleSubmitWalkIn()}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#074c88] to-[#10516e] hover:from-[#09599e] disabled:opacity-50 text-white font-bold text-sm shadow-lg shadow-[#074c88]/30 flex items-center justify-center gap-2 transition-all active:scale-95"
                  >
                    <Play className="w-4 h-4 text-[#f9c701]" />
                    <span>{t('เปิดเลน & บันทึกการรับเงินทันที', 'Open Lane & Confirm Payment')}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TODAY'S BOOKINGS & CHECK-IN */}
          {activeTab === 'bookings' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-white">{t('รายการจองวันนี้ (LINE OA + Walk-in)', "Today's Bookings (LINE OA + Walk-in)")}</h3>
                  <p className="text-xs text-slate-400">{t('ตรวจสอบและกดเช็คอินเมื่อลูกค้ามาถึงหน้าสนาม', 'Verify and check-in archers upon arrival')}</p>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
                      <tr>
                        <th className="p-3">{t('รหัสจอง', 'Ref Code')}</th>
                        <th className="p-3">{t('ลูกค้า', 'Customer')}</th>
                        <th className="p-3">{t('ประเภท', 'Type')}</th>
                        <th className="p-3">{t('เลน / ระยะ', 'Lane / Dist')}</th>
                        <th className="p-3">{t('รอบเวลา', 'Time Slot')}</th>
                        <th className="p-3">{t('วิธีชำระ', 'Payment')}</th>
                        <th className="p-3">{t('ยอดชำระ', 'Total')}</th>
                        <th className="p-3">{t('สถานะเช็คอิน', 'Status')}</th>
                        <th className="p-3 text-right">{t('ดำเนินการ', 'Action')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {bookings.map((b) => (
                        <tr key={b.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="p-3 font-mono font-bold text-[#f9c701]">{b.bookingCode}</td>
                          <td className="p-3">
                            <span className="font-bold text-white block">{b.customerName}</span>
                            <span className="text-[10px] text-slate-400">{b.customerPhone}</span>
                          </td>
                          <td className="p-3">
                            {b.isWalkIn ? (
                              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px]">
                                Walk-in
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold text-[10px]">
                                LINE OA
                              </span>
                            )}
                          </td>
                          <td className="p-3">
                            <span className="font-semibold text-slate-200">{t('เลน', 'Lane')} {b.laneNumber}</span>
                            <span className="text-[10px] text-[#f9c701] block font-mono">{t('ระยะ', 'Dist')} {b.laneDistance}</span>
                          </td>
                          <td className="p-3 font-medium text-slate-300">{b.timeSlot}</td>
                          <td className="p-3 uppercase font-mono text-[10px] text-slate-400">{b.paymentMethod}</td>
                          <td className="p-3 font-bold text-white">฿{b.totalAmount}</td>
                          <td className="p-3">
                            {b.checkedInAt ? (
                              <span className="px-2 py-0.5 rounded-full bg-[#074c88]/25 text-[#f9c701] font-semibold text-[10px] flex items-center gap-1 w-fit border border-[#074c88]/40">
                                <CheckCircle className="w-3 h-3 text-[#f9c701]" />
                                {t('เช็คอินแล้ว', 'Checked-in')}
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-semibold text-[10px]">
                                {t('รอมาถึง', 'Pending')}
                              </span>
                            )}
                          </td>
                          <td className="p-3 text-right">
                            {!b.checkedInAt ? (
                              <button
                                type="button"
                                onClick={() => {
                                  checkInBooking(b.id);
                                  refreshData();
                                }}
                                className="px-3 py-1 bg-[#074c88] hover:bg-[#09599e] text-white rounded-lg text-xs font-bold transition-all shadow-sm"
                              >
                                {t('สแกนเช็คอิน', 'Check-in')}
                              </button>
                            ) : (
                              <span className="text-[11px] text-slate-500">{t('เสร็จสิ้น', 'Completed')}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: LANE CONFIGURATION */}
          {activeTab === 'lanes' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-white">{t('จัดการข้อมูลเลนยิง (Lane Configuration)', 'Lane Configuration & Settings')}</h3>
                  <p className="text-xs text-slate-400">{t('ปรับเปลี่ยนระยะยิง (10m, 18m, 30m, 50m) และราคาต่อชั่วโมง', 'Adjust shooting distances (10m, 18m, 30m, 50m) and hourly rates')}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {shop.lanes.map((lane) => (
                  <div key={lane.id} className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-white">{t('เลน', 'Lane')} #{lane.number}</h4>
                      <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-800 text-[#f9c701]">
                        {lane.distance}
                      </span>
                    </div>

                    <div className="space-y-1 text-xs text-slate-400">
                      <p>{t('ชื่อเรียก:', 'Name:')} <span className="text-slate-200 font-medium">{lane.name}</span></p>
                      <p>{t('ประเภทคัน:', 'Bow Type:')} <span className="text-slate-200 font-medium capitalize">{lane.type}</span></p>
                      <p>{t('ราคาต่อชั่วโมง:', 'Hourly Rate:')} <span className="text-[#074c88] font-bold">฿{lane.hourlyRate}</span></p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setEditingLane(lane)}
                      className="w-full py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      {t('แก้ไขเลนนี้', 'Edit This Lane')}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: BRANDING & THEMING */}
          {activeTab === 'branding' && (
            <div className="max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div>
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <Palette className="w-5 h-5 text-[#f9c701]" />
                  {t('การปรับแต่งสี Branding & Theming (White-Label)', 'Branding & Theming (White-Label)')}
                </h3>
              </div>

              {savedBrandingAlert && (
                <div className="p-3 rounded-xl bg-[#074c88]/30 border border-[#f9c701] text-[#f9c701] text-xs font-semibold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#f9c701]" />
                  {t('บันทึกการตั้งค่าสีสำเร็จ! หน้า LIFF ได้รับการอัปเดตแล้ว', 'Theme saved successfully! Customer LIFF app is updated.')}
                </div>
              )}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!shop) return;
                  const updated = {
                    ...shop,
                    branding: { ...shop.branding, primaryColor: brandPrimary, accentColor: brandAccent },
                  };
                  updateShop(updated);
                  setSavedBrandingAlert(true);
                  setTimeout(() => setSavedBrandingAlert(false), 3000);
                }}
                className="space-y-4 text-xs"
              >
                <div>
                  <label className="block font-semibold text-slate-300 mb-1.5">
                    {t('สีหลักของแบรนด์ (Primary Brand Color)', 'Primary Brand Color')}
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={brandPrimary}
                      onChange={(e) => setBrandPrimary(e.target.value)}
                      className="w-12 h-10 rounded-xl bg-slate-800 border border-slate-700 cursor-pointer p-1"
                    />
                    <input
                      type="text"
                      value={brandPrimary}
                      onChange={(e) => setBrandPrimary(e.target.value)}
                      className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 font-mono text-xs uppercase"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1.5">
                    {t('สีรอง / สี Bullseye (Accent Color)', 'Secondary / Accent Color')}
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={brandAccent}
                      onChange={(e) => setBrandAccent(e.target.value)}
                      className="w-12 h-10 rounded-xl bg-slate-800 border border-slate-700 cursor-pointer p-1"
                    />
                    <input
                      type="text"
                      value={brandAccent}
                      onChange={(e) => setBrandAccent(e.target.value)}
                      className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 font-mono text-xs uppercase"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#074c88] to-[#10516e] hover:from-[#09599e] text-white font-bold shadow-md shadow-[#074c88]/20 transition-all"
                  >
                    {t('บันทึกการตั้งค่าสี Branding', 'Save Theme Branding')}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 6: SAAS SUBSCRIPTION */}
          {activeTab === 'saas' && (
            <div className="max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                {t('การสมัครสมาชิกซอฟต์แวร์ SaaS', 'SaaS Subscription Plan')}
              </h3>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <h4 className="text-lg font-black text-white capitalize">{shop.subscriptionPlan} Plan</h4>
                <p className="text-xs text-[#f9c701] mt-1">{t('เปิดใช้งานอยู่ (Active)', 'Active')}</p>
              </div>
            </div>
          )}
        </main>

        {/* Quick Walk-in Modal (Popped up when clicking on available lane) */}
        {walkInTargetLane && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
            <div className="bg-slate-900 border border-slate-800 text-white w-full max-w-lg rounded-3xl p-6 space-y-4 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#074c88]/25 text-[#f9c701] border border-[#074c88]/40 flex items-center justify-center">
                    <Plus className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base">{t('เปิดเลน Walk-in ด่วน (เลน', 'Quick Walk-in Lane (Lane')} #{walkInTargetLane.number})</h3>
                    <p className="text-xs text-slate-400">{t('ระยะ', 'Distance')} {walkInTargetLane.distance} • ฿{walkInTargetLane.hourlyRate}/{t('ชม.', 'hr')}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setWalkInTargetLane(null)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 overflow-y-auto pr-1 text-xs">
                {/* Duration */}
                <div>
                  <span className="text-slate-400 block mb-1">{t('ระยะเวลา:', 'Duration:')}</span>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { label: t('30 นาที', '30 Mins'), mins: 30 },
                      { label: t('1 ชม.', '1 Hr'), mins: 60 },
                      { label: t('1.5 ชม.', '1.5 Hrs'), mins: 90 },
                      { label: t('2 ชม.', '2 Hrs'), mins: 120 },
                    ].map((d) => (
                      <button
                        key={d.mins}
                        type="button"
                        onClick={() => setWalkInDuration(d.mins)}
                        className={`py-2 rounded-xl font-bold ${
                          walkInDuration === d.mins ? 'bg-[#074c88] text-white' : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Customer name */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-slate-400 block mb-1">{t('ชื่อลูกค้า:', 'Customer Name:')}</label>
                    <input
                      type="text"
                      value={walkInName}
                      onChange={(e) => setWalkInName(e.target.value)}
                      className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">{t('เบอร์โทรศัพท์:', 'Phone Number:')}</label>
                    <input
                      type="text"
                      value={walkInPhone}
                      onChange={(e) => setWalkInPhone(e.target.value)}
                      className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                    />
                  </div>
                </div>

                {/* Equipment Picker */}
                <div>
                  <span className="text-slate-400 block mb-1">{t('คันธนู & อุปกรณ์เช่า:', 'Bow & Rental Equipment:')}</span>
                  <div className="space-y-1.5">
                    {shop.equipment.map((eq) => {
                      const isSel = walkInSelectedEquipment.some((i) => i.id === eq.id);
                      return (
                        <button
                          key={eq.id}
                          type="button"
                          onClick={() => handleToggleWalkInEquipment(eq)}
                          className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-colors ${
                            isSel
                              ? 'bg-[#074c88]/30 border-[#f9c701] text-white'
                              : 'bg-slate-950 border-slate-800 text-slate-300'
                          }`}
                        >
                          <span>{eq.name}</span>
                          <span className="font-bold text-[#074c88]">+฿{eq.price}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Payment method */}
                <div>
                  <span className="text-slate-400 block mb-1">{t('วิธีชำระเงิน:', 'Payment Method:')}</span>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'cash', label: t('เงินสด', 'Cash') },
                      { id: 'promptpay', label: t('สแกนพร้อมเพย์', 'PromptPay QR') },
                      { id: 'credit_card', label: t('บัตรเครดิต EDC', 'Credit Card EDC') },
                      { id: 'membership_quota', label: t('ตัดสิทธิ์สมาชิก', 'Membership Quota') },
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setWalkInPaymentMethod(m.id as any)}
                        className={`py-2 px-3 rounded-xl font-semibold text-center ${
                          walkInPaymentMethod === m.id ? 'bg-[#074c88] text-white' : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Summary total */}
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400">{t('ยอดชำระสุทธิ:', 'Total Net Due:')}</span>
                  <span className="text-xl font-black text-[#074c88]">฿{calculatedWalkInTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex gap-2">
                <button
                  type="button"
                  onClick={() => setWalkInTargetLane(null)}
                  className="w-1/3 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs"
                >
                  {t('ยกเลิก', 'Cancel')}
                </button>
                <button
                  type="button"
                  onClick={() => handleSubmitWalkIn()}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#074c88] to-[#10516e] hover:from-[#09599e] text-white font-bold text-xs shadow-lg flex items-center justify-center gap-1.5 transition-all"
                >
                  <Play className="w-3.5 h-3.5 text-[#f9c701]" />
                  <span>{t('เปิดเลนทันที', 'Start Session Now')}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Lane Modal */}
        {editingLane && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
            <div className="bg-slate-900 border border-slate-800 text-white w-full max-w-md rounded-2xl p-5 space-y-4 shadow-2xl">
              <h3 className="font-bold text-base">{t('แก้ไขเลน', 'Edit Lane')} #{editingLane.number}</h3>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!shop || !editingLane) return;
                  const updatedLanes = shop.lanes.map((l) => (l.id === editingLane.id ? editingLane : l));
                  const updated = { ...shop, lanes: updatedLanes };
                  updateShop(updated);
                  setEditingLane(null);
                  refreshData();
                }}
                className="space-y-3 text-xs"
              >
                <div>
                  <label className="block text-slate-400 mb-1">{t('ชื่อเลน', 'Lane Name')}</label>
                  <input
                    type="text"
                    value={editingLane.name}
                    onChange={(e) => setEditingLane({ ...editingLane, name: e.target.value })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-400 mb-1">{t('ระยะยิง', 'Distance')}</label>
                    <select
                      value={editingLane.distance}
                      onChange={(e) => setEditingLane({ ...editingLane, distance: e.target.value as DistanceType })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                    >
                      <option value="10m">10m</option>
                      <option value="18m">18m</option>
                      <option value="30m">30m</option>
                      <option value="50m">50m</option>
                      <option value="70m">70m</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">{t('ราคาต่อชั่วโมง (บาท)', 'Hourly Rate (THB)')}</label>
                    <input
                      type="number"
                      value={editingLane.hourlyRate}
                      onChange={(e) => setEditingLane({ ...editingLane, hourlyRate: Number(e.target.value) })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingLane(null)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                  >
                    {t('ยกเลิก', 'Cancel')}
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#074c88] hover:bg-[#09599e] text-white font-bold"
                  >
                    {t('บันทึก', 'Save')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}
