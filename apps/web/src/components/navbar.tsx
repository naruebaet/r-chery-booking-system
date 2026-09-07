'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Store, ShieldCheck, ArrowRight, Smartphone } from 'lucide-react';
import { LanguageSwitcher, ThemeToggle, useI18n } from '@archery/ui';

export function Navbar() {
  const { t } = useI18n();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-[#0a2540] bg-white/90 dark:bg-[#071326]/90 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#10516e] to-[#074c88] p-1.5 flex items-center justify-center text-white shadow-md shadow-[#074c88]/30 group-hover:scale-105 transition-transform border border-[#f9c701]/40">
            <img
              src="/branding/svg/r-chery-favicon.svg"
              alt="R-CHERY"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <span className="font-black text-xl tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
              R-CHERY <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#f9c701]/20 text-[#f9c701] font-bold border border-[#f9c701]/40">PRO</span>
            </span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 -mt-0.5 font-medium">
              {t('ระบบบริหารและจองสนามยิงธนูครบวงจร', 'All-in-One Archery Range Management')}
            </p>
          </div>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <Link href="/#features" className="hover:text-[#074c88] dark:hover:text-[#38bdf8] transition-colors">
            {t('ฟีเจอร์เด่น', 'Features')}
          </Link>
          <Link href="/#pricing" className="hover:text-[#074c88] dark:hover:text-[#38bdf8] transition-colors">
            {t('แพ็กเกจสนาม', 'Pricing')}
          </Link>
          <Link href="/#demo-shops" className="hover:text-[#074c88] dark:hover:text-[#38bdf8] transition-colors">
            {t('สนามตัวอย่าง', 'Demo Ranges')}
          </Link>
          <a
            href="http://localhost:3001"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#074c88] dark:hover:text-[#38bdf8] transition-colors flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-[#0d2140] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-[#1e3a66]"
          >
            <Smartphone className="w-3.5 h-3.5 text-[#074c88] dark:text-[#38bdf8]" />
            LINE LIFF App (:3001)
          </a>
        </nav>

        {/* Actions, Theme & Language Switchers */}
        <div className="flex items-center gap-2">
          <ThemeToggle variant="compact" />
          <LanguageSwitcher variant="pill" />

          <Link
            href="/superadmin"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-[#0d2140] hover:bg-slate-200 dark:hover:bg-[#153461] border border-slate-200 dark:border-[#1e3a66] rounded-lg transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#f9c701]" />
            Super Admin
          </Link>

          <Link
            href="/register-shop"
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#074c88] to-[#10516e] hover:from-[#0a5ea5] hover:to-[#17668a] border border-[#f9c701]/30 rounded-xl shadow-md shadow-[#074c88]/30 hover:shadow-lg transition-all active:scale-95"
          >
            <Store className="w-4 h-4 text-[#f9c701]" />
            <span>{t('เปิดสนามยิงธนู', 'Open Range')}</span>
            <ArrowRight className="w-3.5 h-3.5 hidden sm:inline" />
          </Link>
        </div>
      </div>
    </header>
  );
}
