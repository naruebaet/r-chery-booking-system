'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getStoredShops } from '@archery/store';
import { Shop } from '@archery/types';
import { useI18n, LanguageSwitcher } from '@archery/ui';
import { Target, Smartphone, ChevronRight, Clock, MapPin } from 'lucide-react';

export default function LiffHomePage() {
  const { t } = useI18n();
  const [shops, setShops] = useState<Shop[]>([]);

  useEffect(() => {
    setShops(getStoredShops());
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-start pb-12 sm:py-8 sm:px-4">
      <div className="w-full max-w-lg bg-slate-100 min-h-screen sm:min-h-0 sm:rounded-3xl sm:shadow-2xl sm:border sm:border-slate-800 overflow-hidden flex flex-col">
        {/* LINE LIFF Header */}
        <div className="bg-slate-900 text-white p-4 text-center relative">
          <div className="flex items-center justify-between mb-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              LINE LIFF Portal
            </div>
            <LanguageSwitcher variant="pill" />
          </div>
          <h1 className="text-xl font-black mt-2">{t('เลือกสนามยิงธนูที่คุณต้องการจอง', 'Select Archery Range to Book')}</h1>
          <p className="text-xs text-slate-400 mt-1">{t('กดเลือกสนามเพื่อเข้าสู่หน้าผังเลนยิงธนู', 'Choose a facility to explore interactive shooting lanes')}</p>
        </div>

        {/* Shops List */}
        <div className="p-4 space-y-3 flex-1 overflow-y-auto">
          {shops.map((shop) => (
            <Link
              key={shop.id}
              href={`/book/${shop.slug}`}
              className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-emerald-500 transition-all flex items-center justify-between group block"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0 shadow-md group-hover:scale-105 transition-transform"
                  style={{ backgroundColor: shop.branding.primaryColor }}
                >
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">{shop.name}</h3>
                  <p className="text-xs text-slate-500 line-clamp-1">{shop.tagline}</p>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
                    <span>{shop.lanes.length} {t('เลน', 'Lanes')}</span>
                    <span>• {shop.openTime} - {shop.closeTime} {t('น.', '')}</span>
                  </div>
                </div>
              </div>

              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-emerald-50 text-slate-400 group-hover:text-emerald-600 transition-colors">
                <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
