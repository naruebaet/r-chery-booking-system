'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { getStoredShops, getStoredBookings } from '@archery/store';
import { Shop, Booking } from '@archery/types';
import { useI18n } from '@archery/ui';
import { ShieldCheck, TrendingUp, Store, Calendar, DollarSign, ExternalLink, Smartphone, ChevronRight } from 'lucide-react';

export default function SuperAdminPage() {
  const { t } = useI18n();
  const [shops, setShops] = useState<Shop[]>([]);
  const [allBookings, setAllBookings] = useState<Booking[]>([]);

  const loadData = () => {
    setShops(getStoredShops());
    setAllBookings(getStoredBookings());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('archery-shops-updated', loadData);
    window.addEventListener('archery-bookings-updated', loadData);
    return () => {
      window.removeEventListener('archery-shops-updated', loadData);
      window.removeEventListener('archery-bookings-updated', loadData);
    };
  }, []);

  const totalMRR = shops.reduce((sum, s) => {
    if (s.subscriptionPlan === 'starter') return sum + 990;
    if (s.subscriptionPlan === 'pro') return sum + 2490;
    if (s.subscriptionPlan === 'enterprise') return sum + 4900;
    return sum;
  }, 0);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </span>
              <h1 className="text-2xl font-black text-white">Platform Super Admin (Turborepo Edition)</h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {t('ภาพรวมระบบ SaaS จัดการสนามยิงธนูทั่วประเทศไทย และระบบคิดค่าบริการสมาชิก', 'National Archery SaaS Platform Overview, Multi-Tenant Directories & MRR Billing')}
            </p>
          </div>

          <Link
            href="/register-shop"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-all self-start"
          >
            <Store className="w-4 h-4" />
            {t('เพิ่มสนามใหม่ในระบบ', 'Register New Range')}
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-xs font-semibold text-slate-400 flex items-center justify-between">
              {t('SaaS MRR (รายได้รายเดือน)', 'SaaS MRR (Monthly Recurring Revenue)')}
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </span>
            <div className="text-2xl font-black text-white">฿{totalMRR.toLocaleString()}</div>
            <p className="text-[11px] text-emerald-400 font-medium">{t('จากค่า Subscription ของสนาม', 'From active tenant subscriptions')}</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-xs font-semibold text-slate-400 flex items-center justify-between">
              {t('สนามยิงธนูที่เข้าร่วม', 'Active Archery Ranges')}
              <Store className="w-4 h-4 text-blue-400" />
            </span>
            <div className="text-2xl font-black text-white">{shops.length} {t('สนาม', 'Ranges')}</div>
          </div>
        </div>

        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h3 className="text-base font-bold text-white">{t('รายชื่อสนามยิงธนูในระบบ (Tenants Directory)', 'Tenant Directory & Active Ranges')}</h3>
          <div className="divide-y divide-slate-800">
            {shops.map((shop) => (
              <div key={shop.id} className="py-4 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-white">{shop.name}</h4>
                  <p className="text-xs text-slate-400">{shop.tagline}</p>
                </div>
                <div className="flex gap-2">
                  <a
                    href={`http://localhost:3001/book/${shop.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 flex items-center gap-1.5"
                  >
                    <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                    LINE LIFF (:3001)
                  </a>
                  <Link
                    href={`/admin/${shop.slug}`}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 flex items-center gap-1.5"
                  >
                    {t('แดชบอร์ด', 'Dashboard')}
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
