'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useI18n } from '@archery/ui';
import { ShieldAlert, Check, X, RotateCcw, PenTool } from 'lucide-react';

interface DigitalWaiverModalProps {
  isOpen: boolean;
  shopName: string;
  customerName: string;
  onClose: () => void;
  onSigned: (signatureDataUrl: string) => void;
}

export function DigitalWaiverModal({
  isOpen,
  shopName,
  customerName,
  onClose,
  onSigned,
}: DigitalWaiverModalProps) {
  const { t } = useI18n();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [agreedCheck, setAgreedCheck] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        const canvas = canvasRef.current;
        if (canvas) {
          canvas.width = canvas.parentElement?.clientWidth || 340;
          canvas.height = 140;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.strokeStyle = '#0f172a';
            ctx.lineWidth = 2.5;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
          }
        }
      }, 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    setHasSignature(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  const handleConfirm = () => {
    const canvas = canvasRef.current;
    if (!canvas || !hasSignature || !agreedCheck) return;
    const dataUrl = canvas.toDataURL();
    onSigned(dataUrl);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-4 bg-gradient-to-r from-[#060e1a] to-[#0d2140] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#db1219]/20 text-[#db1219] flex items-center justify-center">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm">{t('ข้อตกลงความปลอดภัยสนามยิงธนู', 'Archery Range Safety Agreement')}</h3>
              <p className="text-[11px] text-slate-400">{shopName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto space-y-4 text-xs text-slate-600">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-amber-900 space-y-1">
            <p className="font-bold flex items-center gap-1 text-[11px]">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              {t('โปรดอ่านและเซ็นยินยอมก่อนลงสนามยิงธนู', 'Please read and sign before entering the range')}
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">{t('กฎความปลอดภัย 4 ข้อหลัก:', '4 Core Safety Rules:')}</h4>
            <ul className="space-y-1.5 list-disc pl-4 text-[11px] text-slate-700">
              <li><strong>{t('ห้ามง้างปล่อยสายเปล่า (Dry Fire):', 'No Dry Fire:')}</strong> {t('ห้ามปล่อยสายธนูโดยไม่มีลูกเด็ดขาด', 'Never release bowstring without an arrow loaded')}</li>
              <li><strong>{t('ห้ามก้าวข้ามเส้นยิง:', 'Stay Behind Shooting Line:')}</strong> {t('ห้ามเดินไปเก็บลูกจนกว่าจะมีสัญญาณ CLEAR', 'Do not retrieve arrows until the CLEAR call is given')}</li>
              <li><strong>{t('ชี้ปลายลูกธนูไปทางเป้าเสมอ:', 'Always Point Downrange:')}</strong> {t('ห้ามหันคันธนูไปด้านข้างหรือด้านหลัง', 'Keep arrows pointed at target butts only')}</li>
              <li><strong>{t('ปฏิบัติตามคำแนะนำของเจ้าหน้าที่สนามอย่างเคร่งครัด', 'Follow range officer and staff instructions at all times')}</strong></li>
            </ul>
          </div>

          <label className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={agreedCheck}
              onChange={(e) => setAgreedCheck(e.target.checked)}
              className="mt-0.5 rounded text-[#074c88] focus:ring-[#074c88] w-4 h-4 cursor-pointer"
            />
            <span className="text-[11px] text-slate-700 font-medium">
              {t('ข้าพเจ้า (', 'I, (')}
              <span className="text-slate-900 font-bold">{customerName}</span>
              {t(') ยินยอมปฏิบัติตามระเบียบความปลอดภัยทุกประการ', '), agree to strictly follow all safety regulations.')}
            </span>
          </label>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold text-slate-800 flex items-center gap-1">
                <PenTool className="w-3.5 h-3.5 text-[#074c88]" />
                {t('เซ็นลายมือชื่อดิจิทัล', 'Digital Signature')}
              </span>
              <button
                type="button"
                onClick={clearCanvas}
                className="text-[11px] text-slate-500 hover:text-slate-900 flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                {t('ล้างลายเซ็น', 'Clear')}
              </button>
            </div>

            <div className="border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 relative overflow-hidden touch-none">
              <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="w-full h-[140px] cursor-crosshair block"
              />
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
          >
            {t('ยกเลิก', 'Cancel')}
          </button>
          <button
            type="button"
            disabled={!hasSignature || !agreedCheck}
            onClick={handleConfirm}
            className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#074c88] to-[#10516e] hover:from-[#09579c] hover:to-[#146487] disabled:opacity-50 disabled:cursor-not-allowed shadow-md flex items-center gap-1.5 transition-all"
          >
            <Check className="w-4 h-4" />
            {t('ยินยอมและบันทึก', 'Accept & Sign')}
          </button>
        </div>
      </div>
    </div>
  );
}
