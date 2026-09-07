'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getShopBySlug, createBooking } from '@archery/store';
import { Shop, Lane, Booking, EquipmentItem } from '@archery/types';
import { ThemeProvider, useI18n } from '@archery/ui';
import { LiffSimulatorHeader } from '@/components/liff/liff-simulator-header';
import { LaneMap } from '@/components/liff/lane-map';
import { AddonsSelector } from '@/components/liff/addons-selector';
import { DigitalWaiverModal } from '@/components/liff/digital-waiver-modal';
import { PromptPayModal } from '@/components/liff/promptpay-modal';
import { TicketCard } from '@/components/liff/ticket-card';
import { ScoreCompanion } from '@/components/liff/score-companion';
import {
  Calendar,
  Clock,
  Phone,
  ShieldAlert,
  CheckCircle2,
  Sparkles,
  Target,
  FileCheck,
  QrCode,
} from 'lucide-react';

export default function LiffBookingPage() {
  const { t, language } = useI18n();
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [shop, setShop] = useState<Shop | null>(null);
  const [activeTab, setActiveTab] = useState<'book' | 'ticket' | 'score'>('book');

  const [currentUser, setCurrentUser] = useState({
    lineUserId: 'U9876543210',
    displayName: 'คุณ ปริชญ์ (Archer Newbie)',
    pictureUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop',
    isMember: false,
    membershipSessionsLeft: 0,
  });

  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('14:00 - 15:00');
  const [selectedLane, setSelectedLane] = useState<Lane | null>(null);
  const [selectedEquipment, setSelectedEquipment] = useState<{ id: string; name: string; price: number; details: string }[]>([]);
  const [selectedCoach, setSelectedCoach] = useState<{ id: string; name: string; price: number } | null>(null);

  const [showWaiverModal, setShowWaiverModal] = useState<boolean>(false);
  const [waiverSignature, setWaiverSignature] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [completedBooking, setCompletedBooking] = useState<Booking | null>(null);

  const timeSlots = [
    '10:00 - 11:00',
    '11:00 - 12:00',
    '13:00 - 14:00',
    '14:00 - 15:00',
    '15:00 - 16:00',
    '16:00 - 17:00',
    '17:00 - 18:00',
    '18:00 - 19:00',
    '19:00 - 20:00',
  ];

  useEffect(() => {
    const loadedShop = getShopBySlug(slug);
    if (loadedShop) {
      setShop(loadedShop);
    }
  }, [slug]);

  if (!shop) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-slate-900 text-white">
        <div className="text-center space-y-3">
          <Target className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
          <h2 className="text-xl font-bold">{t('ไม่พบสนามยิงธนูที่คุณระบุ', 'Archery shop not found')}</h2>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-xl text-sm font-semibold"
          >
            {t('กลับหน้ารายการสนาม', 'Back to Shop List')}
          </button>
        </div>
      </div>
    );
  }

  const handleSwitchUser = (type: 'beginner' | 'member') => {
    if (type === 'beginner') {
      setCurrentUser({
        lineUserId: 'U9876543210',
        displayName: t('คุณ ปริชญ์ (Archer Newbie)', 'Parit (Archer Newbie)'),
        pictureUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop',
        isMember: false,
        membershipSessionsLeft: 0,
      });
      setWaiverSignature(null);
    } else {
      setCurrentUser({
        lineUserId: 'U1122334455',
        displayName: t('คุณ สโรชา (Pro Member)', 'Sarocha (Pro Member)'),
        pictureUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop',
        isMember: true,
        membershipSessionsLeft: 8,
      });
      setWaiverSignature('ALREADY_SIGNED_ON_FILE');
    }
  };

  const handleToggleEquipment = (item: EquipmentItem, details: string) => {
    const exists = selectedEquipment.some((eq) => eq.id === item.id);
    if (exists) {
      setSelectedEquipment(selectedEquipment.filter((eq) => eq.id !== item.id));
    } else {
      setSelectedEquipment([...selectedEquipment, { id: item.id, name: item.name, price: item.price, details }]);
    }
  };

  const lanePrice = selectedLane ? selectedLane.hourlyRate : 0;
  const equipmentTotal = selectedEquipment.reduce((sum, item) => sum + item.price, 0);
  const coachTotal = selectedCoach ? selectedCoach.price : 0;
  const rawTotal = lanePrice + equipmentTotal + coachTotal;
  const finalTotal = currentUser.isMember ? equipmentTotal : rawTotal;

  const handleProceedToCheckout = () => {
    if (!selectedLane) return;

    if (!waiverSignature) {
      setShowWaiverModal(true);
      return;
    }

    if (currentUser.isMember && currentUser.membershipSessionsLeft > 0) {
      finalizeBooking('membership_quota');
    } else {
      setShowPaymentModal(true);
    }
  };

  const finalizeBooking = (paymentMethod: 'promptpay' | 'membership_quota') => {
    if (!selectedLane || !shop) return;

    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const bookingCode = `ARC-${randomNum}`;

    const newBooking: Booking = {
      id: 'bkg-' + Date.now(),
      bookingCode,
      shopId: shop.id,
      customerLineId: currentUser.lineUserId,
      customerName: currentUser.displayName,
      customerPhone: '089-999-8888',
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      laneId: selectedLane.id,
      laneNumber: selectedLane.number,
      laneDistance: selectedLane.distance,
      addons: {
        equipment: selectedEquipment,
        coach: selectedCoach || undefined,
      },
      hasSignedWaiver: true,
      waiverSignatureData: waiverSignature || undefined,
      paymentMethod,
      paymentStatus: 'paid',
      totalAmount: finalTotal,
      createdAt: new Date().toISOString(),
    };

    createBooking(newBooking);
    setCompletedBooking(newBooking);
    setShowPaymentModal(false);
    setActiveTab('ticket');

    if (currentUser.isMember) {
      setCurrentUser((prev) => ({
        ...prev,
        membershipSessionsLeft: Math.max(0, prev.membershipSessionsLeft - 1),
      }));
    }
  };

  return (
    <ThemeProvider branding={shop.branding}>
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-start pb-12 sm:py-8 sm:px-4">
        <div className="w-full max-w-lg bg-slate-100 min-h-screen sm:min-h-0 sm:rounded-3xl sm:shadow-2xl sm:border sm:border-slate-800 overflow-hidden flex flex-col">
          <LiffSimulatorHeader shop={shop} currentUser={currentUser} onSwitchUser={handleSwitchUser} />

          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-4 relative overflow-hidden">
            <div
              className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full opacity-20 pointer-events-none"
              style={{ background: shop.branding.primaryColor }}
            />
            <div className="flex items-start justify-between relative z-10">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700">
                  {t('จองสนามผ่าน LINE OA', 'LINE Official Booking')}
                </span>
                <h1 className="text-lg font-black tracking-tight">{shop.name}</h1>
                <p className="text-xs text-slate-300 line-clamp-1">{shop.tagline}</p>
                <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-emerald-400" />
                    {shop.openTime} - {shop.closeTime} {t('น.', '')}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3 text-emerald-400" />
                    {shop.branding.phone}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex border-b border-slate-200 bg-white text-xs font-semibold text-slate-600">
            <button
              type="button"
              onClick={() => setActiveTab('book')}
              className={`flex-1 py-3 text-center border-b-2 transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'book'
                  ? 'border-emerald-600 text-emerald-700 font-bold'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              {t('จองเลนยิง', 'Book Lane')}
            </button>

            {completedBooking && (
              <button
                type="button"
                onClick={() => setActiveTab('ticket')}
                className={`flex-1 py-3 text-center border-b-2 transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'ticket'
                    ? 'border-emerald-600 text-emerald-700 font-bold'
                    : 'border-transparent hover:text-slate-900'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                {t('บัตรจอง (Ticket)', 'E-Ticket')}
              </button>
            )}

            <button
              type="button"
              onClick={() => setActiveTab('score')}
              className={`flex-1 py-3 text-center border-b-2 transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'score'
                  ? 'border-emerald-600 text-emerald-700 font-bold'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              {t('สมุดนับคะแนน', 'Score Keeper')}
            </button>
          </div>

          <div className="p-4 flex-1 overflow-y-auto space-y-6">
            {activeTab === 'book' && (
              <>
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-black">
                      1
                    </span>
                    {t('เลือกวันและเวลาที่ต้องการยิง', 'Select Date & Time Slot')}
                  </h3>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedDate(new Date().toISOString().split('T')[0])}
                      className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                        selectedDate === new Date().toISOString().split('T')[0]
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold ring-1 ring-emerald-600'
                          : 'border-slate-200 bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{t('วันนี้', 'Today')}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">{new Date().toLocaleDateString(language === 'en' ? 'en-US' : 'th-TH')}</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const tomorrow = new Date();
                        tomorrow.setDate(tomorrow.getDate() + 1);
                        setSelectedDate(tomorrow.toISOString().split('T')[0]);
                      }}
                      className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                        selectedDate !== new Date().toISOString().split('T')[0]
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold ring-1 ring-emerald-600'
                          : 'border-slate-200 bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{t('วันพรุ่งนี้', 'Tomorrow')}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {new Date(Date.now() + 86400000).toLocaleDateString(language === 'en' ? 'en-US' : 'th-TH')}
                      </p>
                    </button>
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold text-slate-500 mb-1.5 block">
                      {t('รอบเวลา (Slot ละ 60 นาที + Safety buffer 10 นาที)', 'Time Slots (60 mins + 10 mins safety buffer)')}
                    </span>
                    <div className="grid grid-cols-3 gap-1.5">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTimeSlot(slot)}
                          className={`py-2 px-1 text-center rounded-xl text-xs font-semibold transition-all ${
                            selectedTimeSlot === slot
                              ? 'bg-slate-900 text-white shadow-sm'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {slot.split(' - ')[0]} {t('น.', '')}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-black">
                      2
                    </span>
                    {t('เลือกเลนยิงที่คุณต้องการ (Lane Selection)', 'Select Your Lane')}
                  </h3>

                  <LaneMap
                    lanes={shop.lanes}
                    selectedLaneId={selectedLane?.id || null}
                    onSelectLane={(lane) => setSelectedLane(lane)}
                  />

                  {selectedLane && (
                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs flex items-center justify-between">
                      <div>
                        <span className="font-bold text-emerald-950">
                          {t('เลือกแล้ว: เลน', 'Selected: Lane')} {selectedLane.number} ({selectedLane.distance})
                        </span>
                        <p className="text-[11px] text-emerald-800">
                          {selectedLane.name} • ฿{selectedLane.hourlyRate}/{t('ชม.', 'hr')}
                        </p>
                      </div>
                      <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                        {t('พร้อมจอง', 'Available')}
                      </span>
                    </div>
                  )}
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-black">
                      3
                    </span>
                    {t('อุปกรณ์เช่า & โค้ชผู้ฝึกสอน (Add-ons)', 'Rental Gear & Coach Add-ons')}
                  </h3>

                  <AddonsSelector
                    equipmentList={shop.equipment}
                    coaches={shop.coaches}
                    selectedEquipment={selectedEquipment}
                    selectedCoach={selectedCoach}
                    onToggleEquipment={handleToggleEquipment}
                    onSelectCoach={setSelectedCoach}
                  />
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        waiverSignature ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                      }`}
                    >
                      {waiverSignature ? <FileCheck className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5" />}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">
                        {waiverSignature ? t('เซ็นยินยอมความปลอดภัยแล้ว', 'Safety Waiver Signed') : t('ยังไม่ได้เซ็นข้อตกลงความปลอดภัย', 'Safety Waiver Required')}
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        {waiverSignature
                          ? t('บันทึกลายเซ็นดิจิทัลในระบบเรียบร้อย', 'Digital signature verified and stored')
                          : t('ต้องเซ็นยินยอมครั้งแรกก่อนลงสนาม', 'First-time archers must sign waiver')}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowWaiverModal(true)}
                    className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 underline"
                  >
                    {waiverSignature ? t('ดูข้อตกลง', 'View Waiver') : t('กดเซ็นชื่อ', 'Sign Waiver')}
                  </button>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-lg space-y-3">
                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span>{t('ค่าเลนยิงธนู:', 'Lane Fee:')}</span>
                      <span className="font-semibold text-slate-900">
                        {currentUser.isMember ? (
                          <span className="text-emerald-600">{t('ฟรี (สิทธิ์สมาชิก)', 'Free (Member Quota)')}</span>
                        ) : (
                          `฿${lanePrice}`
                        )}
                      </span>
                    </div>

                    <div className="border-t border-slate-200 pt-2 flex justify-between items-baseline">
                      <span className="font-bold text-sm text-slate-900">{t('ยอดชำระสุทธิ:', 'Total Due:')}</span>
                      <span className="text-xl font-black text-emerald-600">
                        ฿{finalTotal.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>

                  {currentUser.isMember ? (
                    <button
                      type="button"
                      disabled={!selectedLane}
                      onClick={handleProceedToCheckout}
                      className="w-full py-3 px-4 rounded-xl text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 shadow-md flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      {t('ยืนยันการจองด้วยสิทธิ์สมาชิก (คงเหลือ', 'Confirm with Member Quota (Remaining')} {currentUser.membershipSessionsLeft} {t('ครั้ง)', 'sessions)')}
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={!selectedLane}
                      onClick={handleProceedToCheckout}
                      className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 shadow-md flex items-center justify-center gap-2"
                    >
                      <QrCode className="w-4 h-4" />
                      {t('ดำเนินการชำระเงินผ่าน พร้อมเพย์ (PromptPay QR)', 'Pay with PromptPay QR')}
                    </button>
                  )}
                </div>
              </>
            )}

            {activeTab === 'ticket' && completedBooking && (
              <TicketCard
                booking={completedBooking}
                shop={shop}
                onOpenScorebook={() => setActiveTab('score')}
                onBookAnother={() => {
                  setSelectedLane(null);
                  setSelectedEquipment([]);
                  setSelectedCoach(null);
                  setActiveTab('book');
                }}
              />
            )}

            {activeTab === 'score' && (
              <ScoreCompanion
                shopName={shop.name}
                distance={selectedLane?.distance || '18m'}
                onBackToBooking={() => setActiveTab(completedBooking ? 'ticket' : 'book')}
              />
            )}
          </div>
        </div>

        <DigitalWaiverModal
          isOpen={showWaiverModal}
          shopName={shop.name}
          customerName={currentUser.displayName}
          onClose={() => setShowWaiverModal(false)}
          onSigned={(dataUrl) => {
            setWaiverSignature(dataUrl);
            setShowWaiverModal(false);
          }}
        />

        <PromptPayModal
          isOpen={showPaymentModal}
          amount={finalTotal}
          bookingCode={`ARC-${Math.floor(10000 + Math.random() * 90000)}`}
          shopName={shop.name}
          onSuccess={() => finalizeBooking('promptpay')}
          onCancel={() => setShowPaymentModal(false)}
        />
      </div>
    </ThemeProvider>
  );
}
