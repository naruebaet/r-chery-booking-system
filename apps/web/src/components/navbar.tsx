'use client';

import React from 'react';
import Link from 'next/link';
import { Target, Store, ShieldCheck, ArrowRight, Smartphone } from 'lucide-react';
import { LanguageSwitcher, ThemeToggle, useI18n } from '@archery/ui';

export function Navbar() {
  const { t } = useI18n();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/85 dark:bg-slate-900/80 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
              ArcherHub <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/30">Turborepo</span>
            </span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 -mt-0.5">
              {t('ระบบจองและจัดการสนามยิงธนูครบวงจร', 'All-in-One Archery Management Platform')}
            </p>
          </div>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <Link href="/#features" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            {t('ฟีเจอร์เด่น', 'Features')}
          </Link>
          <Link href="/#pricing" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            {t('แพ็กเกจร้านค้า', 'Pricing')}
          </Link>
          <Link href="/#demo-shops" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            {t('สนามตัวอย่าง', 'Demo Ranges')}
          </Link>
          <a
            href="http://localhost:3001"
            target="_blank"
            rel="noreferrer"
            className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
          >
            <Smartphone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            LINE LIFF App (:3001)
          </a>
        </nav>

        {/* Actions, Theme & Language Switchers */}
        <div className="flex items-center gap-2">
          <ThemeToggle variant="compact" />
          <LanguageSwitcher variant="pill" />

          <Link
            href="/superadmin"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            Super Admin
          </Link>

          <Link
            href="/register-shop"
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-sm shadow-emerald-600/30 hover:shadow-md transition-all active:scale-95"
          >
            <Store className="w-4 h-4" />
            <span>{t('เปิดสนามยิงธนู', 'Open Range')}</span>
            <ArrowRight className="w-3.5 h-3.5 hidden sm:inline" />
          </Link>
        </div>
      </div>
    </header>
  );
}
