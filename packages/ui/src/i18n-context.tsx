'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Language } from '@archery/types';

export interface I18nContextType {
  lang: Language;
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (thTextOrKey: string, enText?: string) => string;
  isTh: boolean;
  isEn: boolean;
}

const DICTIONARY: Record<string, { th: string; en: string }> = {
  // Navigation & Brand
  'brand.name': { th: 'ArcherHub', en: 'ArcherHub' },
  'brand.tagline': { th: 'ระบบจองและจัดการสนามยิงธนูครบวงจร', en: 'All-in-One Archery Management & Booking System' },
  'nav.features': { th: 'ฟีเจอร์เด่น', en: 'Features' },
  'nav.pricing': { th: 'แพ็กเกจร้านค้า', en: 'Pricing' },
  'nav.demo_shops': { th: 'สนามตัวอย่าง', en: 'Demo Ranges' },
  'nav.open_shop': { th: 'เปิดสนามยิงธนู', en: 'Open Archery Range' },
  'nav.superadmin': { th: 'Super Admin', en: 'Super Admin' },
  'nav.back_home': { th: 'กลับหน้าหลัก', en: 'Back to Home' },
  'nav.liff_app': { th: 'LINE LIFF App (:3001)', en: 'LINE LIFF App (:3001)' },

  // Common Actions
  'common.save': { th: 'บันทึก', en: 'Save' },
  'common.cancel': { th: 'ยกเลิก', en: 'Cancel' },
  'common.confirm': { th: 'ยืนยัน', en: 'Confirm' },
  'common.close': { th: 'ปิด', en: 'Close' },
  'common.search': { th: 'ค้นหา', en: 'Search' },
  'common.all': { th: 'ทั้งหมด', en: 'All' },
  'common.baht': { th: 'บาท', en: 'THB' },
  'common.per_hour': { th: 'บาท/ชม.', en: 'THB/hr' },
  'common.baht_symbol': { th: '฿', en: '฿' },
  'common.minutes': { th: 'นาที', en: 'mins' },
  'common.hour': { th: 'ชม.', en: 'hr' },
  'common.status': { th: 'สถานะ', en: 'Status' },
  'common.actions': { th: 'จัดการ', en: 'Actions' },
  'common.success': { th: 'สำเร็จ', en: 'Success' },
  'common.loading': { th: 'กำลังโหลด...', en: 'Loading...' },
  'common.free_trial': { th: 'ทดลองใช้ฟรี 14 วัน', en: '14-Day Free Trial' },

  // Lane & Range
  'lane.lane': { th: 'เลน', en: 'Lane' },
  'lane.distance': { th: 'ระยะยิง', en: 'Distance' },
  'lane.target_line': { th: '🎯 เส้นเป้า (Target Line)', en: '🎯 Target Line' },
  'lane.shooting_line': { th: 'จุดยืนยิง (Shooting Line)', en: 'Shooting Line' },
  'lane.safety_wall': { th: 'แนวกำแพงเซฟตี้', en: 'Safety Wall' },
  'lane.available': { th: 'ว่างพร้อมจอง', en: 'Available' },
  'lane.occupied': { th: 'กำลังยิง', en: 'Occupied' },
  'lane.reserved': { th: 'ติดจอง', en: 'Reserved' },
  'lane.maintenance': { th: 'ปิดปรับปรุง', en: 'Maintenance' },
  'lane.clean': { th: 'เคลียร์เลน', en: 'Clear Lane' },
  'lane.extend_time': { th: 'ต่อเวลา +30 นาที', en: 'Extend +30 mins' },
  'lane.extend_60': { th: 'ต่อเวลา +60 นาที', en: 'Extend +60 mins' },
  'lane.finish_session': { th: 'สิ้นสุดรอบยิง', en: 'Finish Session' },

  // LIFF Booking Flow
  'liff.book_tab': { th: 'จองเลนยิง', en: 'Book Lane' },
  'liff.ticket_tab': { th: 'ตั๋ว E-Ticket', en: 'My E-Ticket' },
  'liff.score_tab': { th: 'บันทึกคะแนน', en: 'Score Keeper' },
  'liff.select_date': { th: '1. เลือกวันที่เข้ายิง', en: '1. Select Date' },
  'liff.select_time': { th: '2. เลือกรอบเวลายิง (60 นาที)', en: '2. Select Time Slot (60 mins)' },
  'liff.select_lane': { th: '3. เลือกเลนและระยะยิง', en: '3. Select Lane & Distance' },
  'liff.select_addons': { th: '4. เช่าอุปกรณ์ & บริการโค้ช', en: '4. Equipment & Coach Add-ons' },
  'liff.waiver_required': { th: 'จำเป็นต้องเซ็นยินยอมความปลอดภัย Digital Waiver', en: 'Digital Safety Waiver Signature Required' },
  'liff.sign_waiver': { th: 'เซ็นยินยอมกฎความปลอดภัย', en: 'Sign Safety Waiver' },
  'liff.waiver_signed': { th: 'เซ็นยินยอมเรียบร้อยแล้ว ✓', en: 'Waiver Signed ✓' },
  'liff.total_summary': { th: 'สรุปยอดรวมสุทธิ', en: 'Order Summary' },
  'liff.scan_promptpay': { th: 'สแกนจ่ายพร้อมเพย์ QR', en: 'Pay via PromptPay QR' },
  'liff.lock_notice': { th: 'ระบบจะล็อกเลนให้ 10 นาทีระหว่างรอชำระเงิน', en: 'Lane is reserved for 10 minutes while awaiting payment' },

  // POS & Walk-in
  'pos.title': { th: 'เคาน์เตอร์ POS ลูกค้า Walk-in', en: 'Walk-in Counter POS' },
  'pos.subtitle': { th: 'เปิดเลนหน้าร้านใน 15 วินาที คิดเงินสด/พร้อมเพย์ และคำนวณเงินทอน', en: 'Open lanes in 15 seconds, accept cash/PromptPay, and calculate change' },
  'pos.shooter_name': { th: 'ชื่อลูกค้า / เบอร์โทร', en: 'Shooter Name / Phone' },
  'pos.select_lane': { th: 'เลือกเลนยิง', en: 'Select Shooting Lane' },
  'pos.equipment_rental': { th: 'อุปกรณ์เช่า & ปอนด์คันธนู', en: 'Rental Equipment & Bow Poundage' },
  'pos.payment_method': { th: 'ช่องทางชำระเงิน', en: 'Payment Method' },
  'pos.cash': { th: 'เงินสด', en: 'Cash' },
  'pos.promptpay': { th: 'พร้อมเพย์ QR', en: 'PromptPay QR' },
  'pos.credit_card': { th: 'บัตรเครดิต/เดบิต', en: 'Credit/Debit Card' },
  'pos.member_quota': { th: 'ตัดโควต้าบัตรสมาชิก', en: 'Member Pass Quota' },
  'pos.cash_received': { th: 'รับเงินสดมา (บาท)', en: 'Cash Received (THB)' },
  'pos.change': { th: 'เงินทอน', en: 'Change Due' },
  'pos.submit_open': { th: 'เปิดเลน & พิมพ์สลิป', en: 'Open Lane & Print Slip' },

  // Admin Dashboard Tabs
  'admin.tab_monitor': { th: 'Live Range Monitor (ผังสด & คุมเวลา)', en: 'Live Range Monitor (Real-time Timeline)' },
  'admin.tab_pos': { th: 'เคาน์เตอร์ POS (ลูกค้า Walk-in)', en: 'Walk-in POS Counter' },
  'admin.tab_bookings': { th: 'รายการจองวันนี้', en: "Today's Bookings" },
  'admin.tab_equipment': { th: 'คลังคันธนู & อุปกรณ์', en: 'Bow & Gear Inventory' },
  'admin.tab_waivers': { th: 'บันทึก Digital Waivers', en: 'Digital Safety Waivers Log' },
  'admin.tab_settings': { th: 'ตั้งค่าสนาม & ธีมแบรนด์', en: 'Range Settings & Branding' },
};

const I18nContext = createContext<I18nContextType>({
  lang: 'th',
  language: 'th',
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: (key) => key,
  isTh: true,
  isEn: false,
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('th');

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('archerhub_lang') as Language;
      if (savedLang === 'th' || savedLang === 'en') {
        setLangState(savedLang);
        document.documentElement.lang = savedLang;
      }
    } catch {
      // ignore
    }

    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'archerhub_lang' && (e.newValue === 'th' || e.newValue === 'en')) {
        setLangState(e.newValue as Language);
        document.documentElement.lang = e.newValue;
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const setLanguage = useCallback((newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem('archerhub_lang', newLang);
      document.documentElement.lang = newLang;
      // Dispatch custom event for immediate reactivity across components in the same window
      window.dispatchEvent(new CustomEvent('archerhub-lang-change', { detail: newLang }));
    } catch {
      // ignore
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(lang === 'th' ? 'en' : 'th');
  }, [lang, setLanguage]);

  // Listen to in-window custom event
  useEffect(() => {
    const handleCustomLang = (e: Event) => {
      const customEvent = e as CustomEvent<Language>;
      if (customEvent.detail && (customEvent.detail === 'th' || customEvent.detail === 'en')) {
        setLangState(customEvent.detail);
      }
    };
    window.addEventListener('archerhub-lang-change', handleCustomLang);
    return () => window.removeEventListener('archerhub-lang-change', handleCustomLang);
  }, []);

  /**
   * Powerful translation helper:
   * 1. If enText is provided: t(thText, enText) -> returns thText or enText based on current lang
   * 2. If single argument: t(key) -> looks up in DICTIONARY, or returns key if not found
   */
  const t = useCallback(
    (thTextOrKey: string, enText?: string): string => {
      if (typeof enText === 'string') {
        return lang === 'th' ? thTextOrKey : enText;
      }
      const entry = DICTIONARY[thTextOrKey];
      if (entry) {
        return entry[lang] || entry.th;
      }
      return thTextOrKey;
    },
    [lang]
  );

  return (
    <I18nContext.Provider
      value={{
        lang,
        language: lang,
        setLanguage,
        toggleLanguage,
        t,
        isTh: lang === 'th',
        isEn: lang === 'en',
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextType {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
