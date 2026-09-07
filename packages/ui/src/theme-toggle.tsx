'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './theme-provider';
import { useI18n } from './i18n-context';

export interface ThemeToggleProps {
  variant?: 'pill' | 'compact' | 'icon';
  className?: string;
}

export function ThemeToggle({ variant = 'pill', className = '' }: ThemeToggleProps) {
  const { theme, toggleTheme, isDark } = useTheme();
  let t = (th: string, en: string) => (theme === 'dark' ? en : th);

  try {
    const i18n = useI18n();
    if (i18n && i18n.t) {
      t = i18n.t;
    }
  } catch {
    // Graceful fallback if used outside I18nProvider
  }

  const label = isDark
    ? t('โหมดมืด', 'Dark Mode')
    : t('โหมดสว่าง', 'Light Mode');

  const tooltip = isDark
    ? t('สลับเป็นโหมดสว่าง', 'Switch to Light Mode')
    : t('สลับเป็นโหมดมืด', 'Switch to Dark Mode');

  if (variant === 'compact' || variant === 'icon') {
    return (
      <button
        type="button"
        id="theme-toggle-compact"
        onClick={toggleTheme}
        title={tooltip}
        aria-label={tooltip}
        className={`relative p-1.5 rounded-xl border transition-all duration-200 flex items-center justify-center ${
          isDark
            ? 'bg-slate-800/90 hover:bg-slate-700 text-amber-400 border-slate-700/80 shadow-sm'
            : 'bg-white hover:bg-slate-100 text-amber-500 border-slate-200 shadow-sm'
        } ${className}`}
      >
        {isDark ? (
          <Moon className="w-4 h-4 transition-transform duration-300 rotate-0 hover:-rotate-12" />
        ) : (
          <Sun className="w-4 h-4 transition-transform duration-300 rotate-0 hover:rotate-45" />
        )}
      </button>
    );
  }

  // Pill variant
  return (
    <button
      type="button"
      id="theme-toggle-pill"
      onClick={toggleTheme}
      title={tooltip}
      aria-label={tooltip}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 select-none shadow-sm ${
        isDark
          ? 'bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 border-slate-700/80 hover:border-slate-600'
          : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
      } ${className}`}
    >
      <span className="flex items-center justify-center w-4 h-4 rounded-full">
        {isDark ? (
          <Moon className="w-3.5 h-3.5 text-amber-400" />
        ) : (
          <Sun className="w-3.5 h-3.5 text-amber-500" />
        )}
      </span>
      <span className="text-[11px] font-medium">{label}</span>
    </button>
  );
}
