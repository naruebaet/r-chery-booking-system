'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useI18n } from '@archery/ui';

interface FAQItem {
  question: { th: string; en: string };
  answer: { th: string; en: string };
}

const FAQS: FAQItem[] = [
  {
    question: {
      th: 'สามารถเชื่อมต่อกับ LINE Official Account เดิมของร้านได้เลยหรือไม่?',
      en: 'Can I connect our existing range LINE Official Account?',
    },
    answer: {
      th: 'ได้ 100% ครับ ระบบของเรารองรับการนำ LINE Channel ID และ LIFF ID ของร้านคุณมาเชื่อมต่อได้ทันที โดยลูกค้าจะเห็นแบรนด์และชื่อร้านของคุณอย่างสมบูรณ์แบบ ลูกค้าเพียงกด Rich Menu ใน LINE OA เดิม ก็จะเปิดหน้าจองเลนยิงขึ้นมาได้ทันที',
      en: 'Yes, 100%! You can connect your existing LINE Channel ID and LIFF ID directly. Customers will see your brand and logo. When they tap the Rich Menu on your LINE OA, the interactive booking system opens seamlessly.',
    },
  },
  {
    question: {
      th: 'ถ้ามีลูกค้า Walk-in เข้ามาหน้าร้านโดยไม่ได้จองล่วงหน้า จะจัดการอย่างไร?',
      en: 'How does the system handle walk-in customers without reservations?',
    },
    answer: {
      th: 'ระบบหลังบ้านมีแท็บ "เคาน์เตอร์ POS" และปุ่ม "+ เปิดเลน Walk-in" บนผังสนามสด พนักงานสามารถจิ้มเลนที่ว่าง ระบุระยะเวลา (30 นาที ถึง 2 ชั่วโมง) เพิ่มคันธนูเช่า และรับเงินสด (พร้อมคำนวณเงินทอน) หรือสแกนพร้อมเพย์หน้าร้านได้ภายในเวลาไม่เกิน 20 วินาที',
      en: 'The admin dashboard includes a dedicated "Walk-in POS Counter" and live timeline. Staff can tap an empty lane, select shooting duration (30 min - 2 hours), assign bow poundage, and accept cash with change calculator or PromptPay QR in under 20 seconds.',
    },
  },
  {
    question: {
      th: 'Digital Safety Waiver ปลอดภัยและใช้แทนเอกสารกระดาษได้จริงไหม?',
      en: 'Are Digital Safety Waivers legally sound and reliable to replace paper?',
    },
    answer: {
      th: 'ใช้แทนได้จริงและมีประสิทธิภาพกว่ากระดาษมากครับ ระบบมีข้อตกลงความปลอดภัยสากล 4 ข้อหลัก พร้อม Canvas บันทึกลายเซ็นดิจิทัลและ IP Timestamp ของผู้เซ็นอย่างแม่นยำ หมดปัญหากระดาษเปียก ขาดหาย หรือค้นหาประวัติลูกค้าย้อนหลังไม่เจอ',
      en: 'Yes, and far more effective than paper! The system presents standard archery safety regulations with a digital touch canvas, capturing signature, timestamp, and verification. No more soggy paper, lost forms, or chaotic filing cabinets.',
    },
  },
  {
    question: {
      th: 'มีค่าธรรมเนียมแอบแฝง หรือสัญญาผูกมัดหรือไม่?',
      en: 'Are there hidden transaction fees or long-term contracts?',
    },
    answer: {
      th: 'ไม่มีสัญญาผูกมัดใดๆ ทั้งสิ้นครับ คุณสามารถเลือกชำระค่าบริการ SaaS เป็นรายเดือนตามแพ็กเกจที่เลือก และสามารถยกเลิกหรือเปลี่ยนแพ็กเกจได้ตลอดเวลา หรือหากเลือกชำระแบบรายปี จะได้รับส่วนลดพิเศษเพิ่มทันที 20%',
      en: 'None at all. You can pay month-to-month and cancel or upgrade anytime. Choosing annual billing grants an automatic 20% discount with zero hidden lock-ins.',
    },
  },
  {
    question: {
      th: 'อุปกรณ์เช่า (คันธนูตามแรงดึงปอนด์) และราคาเลน สามารถปรับเปลี่ยนเองได้ไหม?',
      en: 'Can we customize rental bow poundage and lane hourly rates?',
    },
    answer: {
      th: 'สามารถปรับแต่งได้อิสระ 100% ผ่านแดชบอร์ดของสนาม คุณสามารถเพิ่มคันธนู Recurve/Compound ระบุน้ำหนักแรงดึง เช่น 18 lbs, 22 lbs, 26 lbs กำหนดราคาต่อชั่วโมงของแต่ละเลน และตั้งราคาคอร์สโค้ชได้ตามต้องการ',
      en: 'Completely customizable! Through your range admin dashboard, you can configure Recurve, Compound, and Barebow options, draw weights (18 to 28 lbs), left/right orientation, custom hourly rates per lane, and coach rates.',
    },
  },
  {
    question: {
      th: 'ระบบหลังบ้านรองรับการใช้งานบน iPad หรือ Tablet หน้าร้านหรือไม่?',
      en: 'Does the staff dashboard work on iPad or front-desk tablets?',
    },
    answer: {
      th: 'ระบบถูกออกแบบด้วยแนวทาง Responsive & Touch-friendly อย่างสมบูรณ์แบบ สามารถเปิดใช้งานบน iPad, Android Tablet หรือคอมพิวเตอร์หน้าเคาน์เตอร์ได้ทันทีโดยไม่ต้องติดตั้งซอฟต์แวร์เพิ่ม',
      en: 'Yes, it is designed mobile-first and touch-friendly. You can run it seamlessly on iPad, Android tablets, or desktop POS stations without installing additional apps.',
    },
  },
];

export function FaqAccordion() {
  const { lang } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3 max-w-3xl mx-auto">
      {FAQS.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className={`rounded-2xl border transition-all overflow-hidden ${
              isOpen
                ? 'bg-[#09172c] border-[#f9c701]/60 shadow-lg shadow-[#074c88]/20'
                : 'bg-[#09172c]/40 border-[#132c4e] hover:border-[#074c88]'
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 select-none"
            >
              <span className="font-bold text-sm sm:text-base text-white flex items-center gap-2.5">
                <HelpCircle className="w-4 h-4 text-[#f9c701] shrink-0" />
                {faq.question[lang]}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                  isOpen ? 'rotate-180 text-[#f9c701]' : ''
                }`}
              />
            </button>

            {isOpen && (
              <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80">
                {faq.answer[lang]}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
