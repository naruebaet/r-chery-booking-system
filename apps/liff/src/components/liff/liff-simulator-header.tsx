'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import { Shop } from '@archery/types';
import { useI18n, LanguageSwitcher } from '@archery/ui';

interface LiffSimulatorHeaderProps {
  shop: Shop;
  currentUser: {
    lineUserId: string;
    displayName: string;
    pictureUrl: string;
    isMember: boolean;
    membershipSessionsLeft?: number;
  };
  onSwitchUser: (type: 'beginner' | 'member') => void;
}

export function LiffSimulatorHeader({ shop, currentUser, onSwitchUser }: LiffSimulatorHeaderProps) {
  const { t } = useI18n();

  return (
    <div className="bg-slate-900 text-slate-200 text-xs px-3 py-2 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 shadow-inner">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 bg-[#074c88]/30 text-[#f9c701] px-2 py-0.5 rounded-full font-mono text-[10px] border border-[#074c88]/40">
          <span className="w-1.5 h-1.5 rounded-full bg-[#f9c701] animate-pulse"></span>
          LINE LIFF v2.21
        </div>
        <span className="text-slate-400 hidden sm:inline">{t('เชื่อมต่อ LINE OA:', 'Connected LINE OA:')}</span>
        <span className="font-semibold text-[#f9c701]">{shop.branding.lineOaId}</span>
      </div>

      <div className="flex items-center gap-2">
        <LanguageSwitcher variant="compact" />

        <div className="flex items-center gap-1.5 bg-slate-800 px-2 py-1 rounded-lg">
          <img
            src={currentUser.pictureUrl}
            alt={currentUser.displayName}
            className="w-4 h-4 rounded-full object-cover border border-slate-600"
          />
          <span className="font-medium truncate max-w-[100px]">{currentUser.displayName}</span>
          {currentUser.isMember ? (
            <span className="bg-amber-500/20 text-[#f9c701] text-[10px] px-1.5 py-0.2 rounded font-bold flex items-center gap-0.5">
              <Sparkles className="w-2.5 h-2.5" />
              Member ({currentUser.membershipSessionsLeft} {t('ครั้ง', 'passes')})
            </span>
          ) : (
            <span className="bg-slate-700 text-slate-300 text-[10px] px-1 rounded">{t('ทั่วไป', 'Guest')}</span>
          )}
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onSwitchUser('beginner')}
            className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
              !currentUser.isMember ? 'bg-[#074c88] text-white font-bold' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {t('ผู้ใช้ทั่วไป', 'Guest')}
          </button>
          <button
            onClick={() => onSwitchUser('member')}
            className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
              currentUser.isMember ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {t('สมาชิก Pass', 'Member Pass')}
          </button>
        </div>
      </div>
    </div>
  );
}
