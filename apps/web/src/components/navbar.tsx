'use client';

import React from 'react';
import Link from 'next/link';
import { Store, ShieldCheck, ArrowRight, Smartphone, Radio } from 'lucide-react';
import { LanguageSwitcher, ThemeToggle, useI18n } from '@archery/ui';

export function Navbar() {
  const { t } = useI18n();

  return (
    <header className="sticky top-0 z-50 w-full px-3 sm:px-6 pt-3 pointer-events-none">
      <div className="max-w-7xl mx-auto h-16 rounded-2xl bg-[#09172c]/90 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(7,76,136,0.2)] px-4 sm:px-6 flex items-center justify-between pointer-events-auto transition-all">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#10516e] to-[#074c88] p-1.5 flex items-center justify-center text-white shadow-md shadow-[#074c88]/40 group-hover:scale-105 transition-transform border border-[#f9c701]/30 shrink-0">
            <img
              src="/branding/svg/r-chery-favicon.svg"
              alt="R-CHERY"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-black text-lg tracking-tight text-white flex items-center gap-1.5">
                R-CHERY
              </span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-[#f9c701]/20 text-[#f9c701] font-bold border border-[#f9c701]/30">
                Range OS
              </span>
            </div>
            <p className="text-[10px] text-slate-400 -mt-0.5 font-mono hidden sm:block">
              {t('ระบบบริหารสนามยิงธนู & LINE LIFF', 'Archery Range OS & LINE LIFF')}
            </p>
          </div>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-300">
          <Link href="/#features" className="hover:text-white transition-colors">
            {t('สเปกระบบสนาม', 'Range Specs')}
          </Link>
          <Link href="/#lane-matrix" className="hover:text-white transition-colors">
            {t('ผังช่องยิง 10m-70m', 'Lane Layout')}
          </Link>
          <Link href="/#pricing" className="hover:text-white transition-colors">
            {t('แพ็กเกจ SaaS', 'Pricing')}
          </Link>
          <Link href="/#demo-shops" className="hover:text-white transition-colors flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            {t('สนามสดในระบบ', 'Live Ranges')}
          </Link>
          <a
            href="http://localhost:3001"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-all flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-800/80 text-sky-400 border border-slate-700/70 hover:border-sky-500/50"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>LIFF Simulator (:3001)</span>
          </a>
        </nav>

        {/* Actions & Controls */}
        <div className="flex items-center gap-2">
          <LanguageSwitcher variant="compact" />

          <Link
            href="/superadmin"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/70 rounded-xl transition-all active:scale-95"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#f9c701]" />
            <span>SuperAdmin</span>
          </Link>

          <Link
            href="/register-shop"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#074c88] to-[#10516e] hover:from-[#09599e] hover:to-[#135d7f] border border-[#f9c701]/30 rounded-xl shadow-md shadow-[#074c88]/30 transition-all active:scale-95 cursor-pointer"
          >
            <Store className="w-3.5 h-3.5 text-[#f9c701]" />
            <span>{t('เปิดสนามยิงธนู', 'Register Range')}</span>
            <ArrowRight className="w-3.5 h-3.5 hidden sm:inline" />
          </Link>
        </div>
      </div>
    </header>
  );
}
