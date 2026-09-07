'use client';

import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { useI18n } from '@archery/ui';
import { Clock, CheckCircle2 } from 'lucide-react';

interface PromptPayModalProps {
  isOpen: boolean;
  amount: number;
  bookingCode: string;
  shopName: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export function PromptPayModal({
  isOpen,
  amount,
  bookingCode,
  shopName,
  onSuccess,
  onCancel,
}: PromptPayModalProps) {
  const { t } = useI18n();
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState<number>(600);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const promptPayPayload = `https://promptpay.io/0812345678/${amount}.png?ref=${bookingCode}`;
    QRCode.toDataURL(promptPayPayload, {
      width: 260,
      margin: 2,
      color: {
        dark: '#002D62',
        light: '#FFFFFF',
      },
    }).then((url) => setQrDataUrl(url));

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, amount, bookingCode]);

  if (!isOpen) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden border border-slate-200 text-center">
        <div className="bg-[#002D62] text-white p-4">
          <span className="font-bold tracking-wider text-sm">THAI QR PAYMENT</span>
          <p className="text-[11px] text-blue-200">{t('พร้อมเพย์ สแกนจ่ายได้ทุกแอปพลิเคชันธนาคาร', 'PromptPay — Scan with any Thai banking app')}</p>
        </div>

        <div className="p-4 bg-slate-50 border-b border-slate-200/80">
          <p className="text-xs text-slate-500">{shopName}</p>
          <div className="text-2xl font-black text-slate-900 mt-0.5">
            ฿{amount.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
          </div>
          <p className="text-[10px] text-slate-400 font-mono mt-0.5">Ref: {bookingCode}</p>
        </div>

        <div className="p-5 flex flex-col items-center justify-center">
          <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-md">
            {qrDataUrl ? (
              <img src={qrDataUrl} alt="PromptPay QR" className="w-48 h-48 block mx-auto" />
            ) : (
              <div className="w-48 h-48 flex items-center justify-center text-xs text-slate-400">
                {t('กำลังสร้าง QR Code...', 'Generating QR Code...')}
              </div>
            )}
          </div>

          <div className="mt-3 flex items-center gap-1.5 text-xs text-amber-600 bg-amber-50 px-3 py-1 rounded-full font-mono font-medium">
            <Clock className="w-3.5 h-3.5" />
            <span>{t('เลนถูกล็อกไว้ให้คุณ:', 'Lane reserved for:')} {minutes}:{seconds.toString().padStart(2, '0')} {t('นาที', 'min')}</span>
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-2">
          <button
            type="button"
            disabled={isProcessing}
            onClick={handleSimulatePayment}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <span>{t('กำลังตรวจสอบยอดชำระ...', 'Verifying payment...')}</span>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>{t('จำลองการสแกนจ่ายสำเร็จ (Simulate Paid)', 'Simulate Successful Payment')}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="w-full py-2 text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors"
          >
            {t('ยกเลิกการทำรายการ', 'Cancel Payment')}
          </button>
        </div>
      </div>
    </div>
  );
}
