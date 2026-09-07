'use client';

import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import confetti from 'canvas-confetti';
import { Booking, Shop } from '@archery/types';
import { useI18n } from '@archery/ui';
import { Target, CheckCircle2, Calendar, Clock, ShieldCheck } from 'lucide-react';

interface TicketCardProps {
  booking: Booking;
  shop: Shop;
  onOpenScorebook: () => void;
  onBookAnother: () => void;
}

export function TicketCard({ booking, shop, onOpenScorebook, onBookAnother }: TicketCardProps) {
  const { t } = useI18n();
  const [ticketQrUrl, setTicketQrUrl] = useState<string>('');

  useEffect(() => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
    });

    QRCode.toDataURL(`ARCHERY_CHECKIN:${booking.id}:${booking.bookingCode}`, {
      width: 200,
      margin: 1,
      color: { dark: '#0F172A', light: '#FFFFFF' },
    }).then((url) => setTicketQrUrl(url));
  }, [booking]);

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <div className="bg-gradient-to-r from-[#074c88] to-[#10516e] text-white p-4 rounded-2xl shadow-lg flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-6 h-6 text-[#f9c701]" />
        </div>
        <div>
          <h3 className="font-bold text-sm">{t('การจองเลนสำเร็จแล้ว!', 'Booking Confirmed!')}</h3>
          <p className="text-xs text-blue-100">{t('ระบบส่งใบยืนยันเข้าห้องแชท LINE OA ของคุณเรียบร้อย', 'Confirmation ticket sent to your LINE chat')}</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden relative">
        <div className="bg-gradient-to-r from-[#060e1a] to-[#0d2140] text-white p-4 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#074c88]/40 text-[#f9c701] flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight">{shop.name}</h4>
                <p className="text-[11px] text-slate-400">{t('E-Ticket บัตรเข้าสนามยิงธนู', 'Archery Range E-Ticket')}</p>
              </div>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#f9c701]/20 text-[#f9c701] font-bold">
              {booking.paymentStatus === 'paid' ? t('ชำระแล้ว', 'Paid') : t('รอชำระ', 'Pending')}
            </span>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-[11px] text-slate-500 font-medium">{t('ช่องยิงของคุณ', 'Your Shooting Lane')}</p>
              <h3 className="text-2xl font-black text-slate-900 mt-0.5">
                {t('เลน', 'Lane')} {booking.laneNumber}
              </h3>
              <p className="text-xs font-semibold text-[#074c88] mt-0.5">{t('ระยะ', 'Distance')} {booking.laneDistance}</p>
            </div>

            <div className="text-right">
              <p className="text-[11px] text-slate-500 font-medium">{t('รหัสการจอง', 'Booking Code')}</p>
              <p className="font-mono text-base font-bold text-slate-900 mt-0.5">{booking.bookingCode}</p>
              <span className="text-[10px] text-slate-400">{t('ยื่นให้เจ้าหน้าที่เคาน์เตอร์', 'Present at front counter')}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
              <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                <Calendar className="w-3.5 h-3.5 text-[#074c88]" />
                <span>{t('วันที่ยิง', 'Date')}</span>
              </div>
              <p className="font-bold text-slate-900">{booking.date}</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
              <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                <Clock className="w-3.5 h-3.5 text-[#074c88]" />
                <span>{t('รอบเวลา', 'Time Slot')}</span>
              </div>
              <p className="font-bold text-slate-900">{booking.timeSlot}</p>
            </div>
          </div>

          {(booking.addons.equipment?.length || booking.addons.coach) && (
            <div className="p-3 bg-[#074c88]/5 border border-[#074c88]/20 rounded-xl text-xs space-y-1.5">
              <span className="font-bold text-[#074c88] flex items-center gap-1 text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#074c88]" />
                {t('อุปกรณ์และบริการเสริม:', 'Add-on Gear & Coach:')}
              </span>
              {booking.addons.coach && (
                <p className="text-slate-800">
                  • <strong>{t('โค้ช:', 'Coach:')}</strong> {booking.addons.coach.name} (+฿{booking.addons.coach.price})
                </p>
              )}
              {booking.addons.equipment?.map((eq, i) => (
                <p key={i} className="text-slate-800">
                  • <strong>{t('อุปกรณ์:', 'Gear:')}</strong> {eq.name} ({eq.details})
                </p>
              ))}
            </div>
          )}

          <div className="border-t border-dashed border-slate-200 pt-4 text-center">
            <p className="text-xs font-semibold text-slate-700 mb-2">{t('QR Code สำหรับเช็คอินหน้าสนาม', 'Scan QR Code for check-in')}</p>
            {ticketQrUrl && (
              <img src={ticketQrUrl} alt="Check-in QR" className="w-36 h-36 mx-auto rounded-xl border border-slate-200 p-2" />
            )}
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col gap-2">
          <button
            type="button"
            onClick={onOpenScorebook}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <Target className="w-4 h-4 text-amber-400" />
            {t('เปิดสมุดนับคะแนนยิงธนูรอบนี้ (Scorebook)', 'Open Score Keeper')}
          </button>

          <button
            type="button"
            onClick={onBookAnother}
            className="w-full py-2 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            {t('จองเพิ่มอีกรอบ หรือกลับหน้ารายการ', 'Book Another Session / Back')}
          </button>
        </div>
      </div>
    </div>
  );
}
