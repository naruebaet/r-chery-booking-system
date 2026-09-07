'use client';

import React from 'react';
import { useI18n } from './i18n-context';
import { Globe } from 'lucide-react';

export interface LanguageSwitcherProps {
  className?: string;
  variant?: 'pill' | 'compact' | 'minimal';
}

export function LanguageSwitcher({ className = '', variant = 'pill' }: LanguageSwitcherProps) {
  const { lang, setLanguage, toggleLanguage } = useI18n();

  if (variant === 'minimal') {
    return (
      <button
        type="button"
        onClick={toggleLanguage}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 transition-all ${className}`}
        title={lang === 'th' ? 'Switch to English' : 'เปลี่ยนเป็นภาษาไทย'}
      >
        <Globe className="w-3.5 h-3.5 text-emerald-400" />
        <span>{lang === 'th' ? 'EN' : 'ไทย'}</span>
      </button>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center p-0.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-bold ${className}`}>
        <button
          type="button"
          onClick={() => setLanguage('th')}
          className={`px-2 py-0.5 rounded-md transition-all flex items-center gap-1 ${
            lang === 'th'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span>🇹🇭</span>
          <span>TH</span>
        </button>
        <button
          type="button"
          onClick={() => setLanguage('en')}
          className={`px-2 py-0.5 rounded-md transition-all flex items-center gap-1 ${
            lang === 'en'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span>🇬🇧</span>
          <span>EN</span>
        </button>
      </div>
    );
  }

  // Default Pill Variant
  return (
    <div
      className={`inline-flex items-center p-1 rounded-xl bg-slate-900/90 border border-slate-700/70 shadow-inner backdrop-blur-sm ${className}`}
      role="group"
      aria-label="Language selector"
    >
      <button
        type="button"
        onClick={() => setLanguage('th')}
        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
          lang === 'th'
            ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30'
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <span className="text-sm leading-none">🇹🇭</span>
        <span>TH</span>
      </button>
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
          lang === 'en'
            ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30'
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <span className="text-sm leading-none">🇬🇧</span>
        <span>EN</span>
      </button>
    </div>
  );
}
