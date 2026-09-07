'use client';

import React from 'react';
import { EquipmentItem, Coach } from '@archery/types';
import { useI18n } from '@archery/ui';
import { Shield, UserCheck, Plus, Check } from 'lucide-react';

interface AddonsSelectorProps {
  equipmentList: EquipmentItem[];
  coaches: Coach[];
  selectedEquipment: { id: string; name: string; price: number; details: string }[];
  selectedCoach: { id: string; name: string; price: number } | null;
  onToggleEquipment: (item: EquipmentItem, details: string) => void;
  onSelectCoach: (coach: { id: string; name: string; price: number } | null) => void;
}

export function AddonsSelector({
  equipmentList,
  coaches,
  selectedEquipment,
  selectedCoach,
  onToggleEquipment,
  onSelectCoach,
}: AddonsSelectorProps) {
  const { t } = useI18n();

  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div>
            <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-emerald-600" />
              {t('ครูฝึก / โค้ชดูแลการยิง (แนะนำสำหรับมือใหม่)', 'Instructor / Archery Coach (Beginners)')}
            </h4>
            <p className="text-xs text-slate-500">{t('สอนพื้นฐาน จับคัน เล็งเป้า และความปลอดภัย 20-30 นาที', '20-30 min basics: stance, grip, aiming & safety')}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => onSelectCoach(null)}
            className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
              selectedCoach === null
                ? 'border-emerald-600 bg-emerald-50/70 text-emerald-900'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div>
              <p className="text-xs font-semibold">{t('ยิงด้วยตัวเอง (ไม่รับโค้ช)', 'Self-practice (No coach)')}</p>
              <p className="text-[11px] text-slate-500">{t('สำหรับผู้ที่มีประสบการณ์แล้ว', 'For experienced archers')}</p>
            </div>
            {selectedCoach === null && <Check className="w-4 h-4 text-emerald-600" />}
          </button>

          {coaches.map((coach) => {
            const isSelected = selectedCoach?.id === coach.id;
            return (
              <button
                key={coach.id}
                type="button"
                onClick={() =>
                  onSelectCoach(
                    isSelected ? null : { id: coach.id, name: coach.name, price: coach.ratePerSession }
                  )
                }
                className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/70 ring-1 ring-emerald-600'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <img
                  src={coach.avatarUrl}
                  alt={coach.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-900 truncate">{coach.name}</p>
                    <span className="text-xs font-semibold text-emerald-600">+฿{coach.ratePerSession}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate">{coach.specialty}</p>
                </div>
                {isSelected && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <div>
            <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-600" />
              {t('อุปกรณ์เช่าสำหรับรอบนี้ (Rental Gear)', 'Rental Gear & Bow Sets')}
            </h4>
            <p className="text-xs text-slate-500">{t('คันธนู ปลอกแขน ซองใส่ลูก พร้อมลูกธนูครบเซ็ต', 'Bows, armguards, finger tabs, quivers and full arrow sets')}</p>
          </div>
        </div>

        <div className="space-y-2">
          {equipmentList.map((item) => {
            const isSelected = selectedEquipment.some((eq) => eq.id === item.id);
            const orientationText = item.orientation === 'left' ? t('ซ้าย', 'Left-handed') : t('ขวา', 'Right-handed');
            const detailLabel = `${item.drawWeight || 'Standard'}, ${t('ถนัด', 'Dexterity: ')}${orientationText}`;

            return (
              <div
                key={item.id}
                className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/50'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="min-w-0 flex-1 pr-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{item.name}</span>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-mono">
                      {t('เหลือ', 'Left')} {item.availableCount} {t('ชุด', 'sets')}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">{detailLabel}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-bold text-emerald-600">+฿{item.price}</span>
                  <button
                    type="button"
                    onClick={() => onToggleEquipment(item, detailLabel)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                      isSelected
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        {t('เลือกแล้ว', 'Selected')}
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        {t('เพิ่ม', 'Add')}
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
