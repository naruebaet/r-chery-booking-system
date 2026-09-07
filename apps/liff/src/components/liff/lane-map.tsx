'use client';

import React, { useState } from 'react';
import { Lane } from '@archery/types';
import { useI18n } from '@archery/ui';
import { Target, Users, Check } from 'lucide-react';

interface LaneMapProps {
  lanes: Lane[];
  selectedLaneId: string | null;
  onSelectLane: (lane: Lane) => void;
}

export function LaneMap({ lanes, selectedLaneId, onSelectLane }: LaneMapProps) {
  const { t } = useI18n();
  const [distanceFilter, setDistanceFilter] = useState<string>('all');

  const distances = [
    { label: t('ทั้งหมด', 'All'), value: 'all' },
    { label: t('10m (มือใหม่/ซ้อม)', '10m (Beginner)'), value: '10m' },
    { label: t('18m (มาตรฐานสากล)', '18m (Standard WA)'), value: '18m' },
    { label: t('30m+ (ระยะไกล)', '30m+ (Outdoor/Long)'), value: '30m' },
  ];

  const filteredLanes = lanes.filter((lane) => {
    if (distanceFilter === 'all') return true;
    if (distanceFilter === '30m') return lane.distance === '30m' || lane.distance === '50m' || lane.distance === '70m';
    return lane.distance === distanceFilter;
  });

  return (
    <div className="space-y-4">
      {/* Distance Filter Tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {distances.map((d) => (
          <button
            key={d.value}
            type="button"
            onClick={() => setDistanceFilter(d.value)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              distanceFilter === d.value
                ? 'bg-gradient-to-r from-[#074c88] to-[#10516e] text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-[#074c88] inline-block"></span>
          <span>{t('ว่าง (พร้อมจอง)', 'Available')}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-[#db1219] inline-block"></span>
          <span>{t('มีผู้ใช้งาน', 'Occupied')}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-[#f9c701] inline-block"></span>
          <span>{t('ปิดตรวจเป้า', 'Maintenance')}</span>
        </div>
      </div>

      {/* Interactive Range Field Layout */}
      <div className="relative rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 p-4 border border-slate-800 shadow-xl overflow-hidden">
        <div className="mb-4 pb-2 border-b border-dashed border-slate-700/80 flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-wider font-mono text-[#f9c701] font-semibold flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-[#f9c701]" />
            {t('Target Line (แนวเป้ายิงธนู)', 'Target Line')}
          </span>
          <span className="text-[10px] text-slate-400 font-mono">Safety Backstop Wall</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {filteredLanes.map((lane) => {
            const isSelected = selectedLaneId === lane.id;
            const isAvailable = lane.status === 'available';
            const isOccupied = lane.status === 'occupied';
            const isMaintenance = lane.status === 'maintenance';

            return (
              <div
                key={lane.id}
                onClick={() => {
                  if (isAvailable) onSelectLane(lane);
                }}
                className={`group relative rounded-xl p-3 border transition-all duration-200 text-left ${
                  isSelected
                    ? 'ring-2 ring-[#f9c701] bg-[#074c88]/40 border-[#f9c701] shadow-lg shadow-[#074c88]/30 scale-[1.02]'
                    : isAvailable
                    ? 'bg-slate-800/80 border-slate-700 hover:border-[#074c88] hover:bg-slate-800 cursor-pointer'
                    : 'bg-slate-900/60 border-slate-800/80 opacity-60 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-950 text-[#f9c701] border border-[#f9c701]/30">
                    {lane.distance}
                  </span>
                  <div className="flex items-center">
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-[#f9c701] text-slate-950 flex items-center justify-center text-xs">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                    {!isSelected && isAvailable && (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#074c88]"></span>
                    )}
                    {isOccupied && (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#db1219]"></span>
                    )}
                    {isMaintenance && (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#f9c701]"></span>
                    )}
                  </div>
                </div>

                <div className="my-2 flex justify-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center p-1 border transition-transform group-hover:scale-105 ${
                      isSelected
                        ? 'border-[#f9c701] bg-[#074c88]/40'
                        : isAvailable
                        ? 'border-slate-600 bg-slate-700/50'
                        : 'border-slate-800 bg-slate-950'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-[#074c88] flex items-center justify-center p-1">
                      <div className="w-5 h-5 rounded-full bg-[#db1219] flex items-center justify-center p-0.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#f9c701] flex items-center justify-center">
                          <span className="text-[7px] font-bold text-slate-900">X</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-0.5 text-center">
                  <h4 className="font-bold text-sm text-white">{t('เลน', 'Lane')} #{lane.number}</h4>
                  <p className="text-[11px] text-slate-400 truncate capitalize">{lane.name}</p>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-700/60 flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-[#f9c701]">฿{lane.hourlyRate}<span className="text-[9px] text-slate-400">/{t('ชม.', 'hr')}</span></span>
                  <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
                    <Users className="w-3 h-3" />
                    {lane.maxShooters}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-2 border-t border-dashed border-[#074c88]/40 flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-wider font-mono text-[#f9c701] font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#f9c701] animate-ping"></span>
            {t('Shooting Line (จุดยืนยิงของผู้เล่น)', 'Shooting Line')}
          </span>
          <span className="text-[10px] text-slate-400 font-mono">Archer Wait Area</span>
        </div>
      </div>
    </div>
  );
}
