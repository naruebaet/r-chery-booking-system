'use client';

import React, { useState } from 'react';
import { Target, RotateCcw, Save, Trophy, Check } from 'lucide-react';
import { ScoreEntry, DistanceType } from '@archery/types';
import { saveScoreEntry } from '@archery/store';
import { useI18n } from '@archery/ui';

interface ScoreCompanionProps {
  shopName: string;
  distance: DistanceType;
  onBackToBooking: () => void;
}

export function ScoreCompanion({ shopName, distance, onBackToBooking }: ScoreCompanionProps) {
  const { t } = useI18n();
  const [currentEnd, setCurrentEnd] = useState<number[]>([]);
  const [ends, setEnds] = useState<number[][]>([]);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const scoreButtons = [
    { label: 'X', value: 10, bg: 'bg-amber-400 text-slate-950 hover:bg-amber-300 font-black' },
    { label: '10', value: 10, bg: 'bg-amber-400 text-slate-950 hover:bg-amber-300 font-bold' },
    { label: '9', value: 9, bg: 'bg-amber-300 text-slate-950 hover:bg-amber-200 font-bold' },
    { label: '8', value: 8, bg: 'bg-rose-500 text-white hover:bg-rose-400 font-bold' },
    { label: '7', value: 7, bg: 'bg-rose-500 text-white hover:bg-rose-400 font-bold' },
    { label: '6', value: 6, bg: 'bg-blue-500 text-white hover:bg-blue-400 font-bold' },
    { label: '5', value: 5, bg: 'bg-blue-500 text-white hover:bg-blue-400 font-bold' },
    { label: '4', value: 4, bg: 'bg-slate-900 text-white hover:bg-slate-800 font-bold' },
    { label: '3', value: 3, bg: 'bg-slate-900 text-white hover:bg-slate-800 font-bold' },
    { label: '2', value: 2, bg: 'bg-slate-200 text-slate-900 hover:bg-slate-100 font-bold border border-slate-300' },
    { label: '1', value: 1, bg: 'bg-slate-200 text-slate-900 hover:bg-slate-100 font-bold border border-slate-300' },
    { label: 'M', value: 0, bg: 'bg-slate-400 text-white hover:bg-slate-300 font-bold' },
  ];

  const handleAddScore = (val: number) => {
    if (currentEnd.length < 3) {
      setCurrentEnd([...currentEnd, val]);
    }
  };

  const handleFinishEnd = () => {
    if (currentEnd.length === 0) return;
    setEnds([...ends, currentEnd]);
    setCurrentEnd([]);
  };

  const handleReset = () => {
    setEnds([]);
    setCurrentEnd([]);
    setSavedSuccess(false);
  };

  const allArrows = [...ends.flat(), ...currentEnd];
  const totalScore = allArrows.reduce((sum, val) => sum + val, 0);
  const averagePerArrow = allArrows.length > 0 ? (totalScore / allArrows.length).toFixed(1) : '0.0';

  const handleSaveRound = () => {
    const entry: ScoreEntry = {
      id: 'score-' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      shopName,
      distance,
      arrowsPerEnd: 3,
      ends: [...ends, ...(currentEnd.length > 0 ? [currentEnd] : [])],
      totalScore,
      maxScore: (ends.length + (currentEnd.length > 0 ? 1 : 0)) * 30,
    };
    saveScoreEntry(entry);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <div className="bg-slate-900 text-white p-4 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <Trophy className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm">Archery Scorebook Companion</h3>
            <p className="text-[11px] text-slate-400">{shopName} • {t('ระยะ', 'Distance')} {distance}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onBackToBooking}
          className="text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded-lg bg-slate-800 transition-colors"
        >
          {t('กลับหน้าตั๋ว', 'Back to Ticket')}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-[10px] text-slate-500 font-semibold uppercase">{t('คะแนนรวม', 'Total Score')}</p>
          <p className="text-2xl font-black text-slate-900 mt-0.5">{totalScore}</p>
        </div>
        <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-[10px] text-slate-500 font-semibold uppercase">{t('ลูกที่ยิงไป', 'Arrows Shot')}</p>
          <p className="text-2xl font-black text-[#074c88] mt-0.5">{allArrows.length}</p>
        </div>
        <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-[10px] text-slate-500 font-semibold uppercase">{t('เฉลี่ย / ลูก', 'Avg / Arrow')}</p>
          <p className="text-2xl font-black text-[#f9c701] mt-0.5">{averagePerArrow}</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800">
            {t('ชุดยิงที่', 'End')} #{ends.length + 1}
          </span>
          <span className="text-[11px] text-slate-400">{t('ยิง 3 ลูกต่อชุด', '3 arrows per end')}</span>
        </div>

        <div className="flex gap-3 justify-center py-2">
          {[0, 1, 2].map((idx) => {
            const val = currentEnd[idx];
            const hasVal = val !== undefined;
            return (
              <div
                key={idx}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-black transition-all ${
                  hasVal
                    ? 'bg-slate-900 text-white shadow-md scale-105'
                    : 'border-2 border-dashed border-slate-200 text-slate-300'
                }`}
              >
                {hasVal ? (val === 0 ? 'M' : val) : idx + 1}
              </div>
            );
          })}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            disabled={currentEnd.length === 0}
            onClick={() => setCurrentEnd(currentEnd.slice(0, -1))}
            className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 transition-colors"
          >
            {t('ลบแต้มล่าสุด', 'Delete Last')}
          </button>
          <button
            type="button"
            disabled={currentEnd.length === 0}
            onClick={handleFinishEnd}
            className="flex-1 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#074c88] to-[#10516e] hover:from-[#09579c] hover:to-[#146487] disabled:opacity-40 shadow-sm transition-all"
          >
            {t('จบชุดนี้ (บันทึก End', 'Finish End (Save End')} #{ends.length + 1})
          </button>
        </div>
      </div>

      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
        <div className="grid grid-cols-4 gap-2">
          {scoreButtons.map((btn, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleAddScore(btn.value)}
              className={`h-11 rounded-xl shadow-sm text-sm active:scale-95 transition-all flex items-center justify-center ${btn.bg}`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {ends.length > 0 && (
        <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800">{t('ประวัติชุดยิงวันนี้', "Today's Ends History")}</span>
            <button
              type="button"
              onClick={handleReset}
              className="text-[11px] text-rose-500 hover:text-rose-600 flex items-center gap-0.5"
            >
              <RotateCcw className="w-3 h-3" />
              {t('เริ่มใหม่', 'Reset')}
            </button>
          </div>

          <button
            type="button"
            onClick={handleSaveRound}
            className="w-full mt-2 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-sm flex items-center justify-center gap-1.5 transition-all"
          >
            {savedSuccess ? (
              <>
                <Check className="w-4 h-4 text-[#f9c701]" />
                <span>{t('บันทึกสถิติลงโปรไฟล์แล้ว!', 'Saved to your profile!')}</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4 text-[#f9c701]" />
                <span>{t('บันทึกประวัติการยิงรอบนี้', 'Save This Round')}</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
