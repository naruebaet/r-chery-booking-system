# 🎯 Web Design System & Brand Identity Specification

> **เอกสารคู่มือมาตรฐานงานดีไซน์ (Design System & UI/UX Guidelines)**  
> จัดทำขึ้นเพื่อให้ทุกโปรเจกต์และเว็บแอปพลิเคชันในเครือ (Sister / Ecosystem Projects) มีทิศทางดีไซน์ ประสบการณ์ผู้ใช้ (UX) และมาตรฐานโค้ดที่สอดคล้องกัน 100%

---

## 📑 สารบัญ (Table of Contents)
1. [Core Design Philosophy & Principles](#1-core-design-philosophy--principles)
2. [Color Palette & Semantic Tokens](#2-color-palette--semantic-tokens)
3. [Typography & Hierarchy](#3-typography--hierarchy)
4. [Elevation, Shadows & Glassmorphism](#4-elevation-shadows--glassmorphism)
5. [Layout & Navigation Architecture](#5-layout--navigation-architecture)
6. [Component Library & UI Patterns](#6-component-library--ui-patterns)
7. [Motion, Micro-interactions & Touch Experience](#7-motion-micro-interactions--touch-experience)
8. [Dark Mode & Theme Switching Specification](#8-dark-mode--theme-switching-specification)
9. [PWA & Mobile-First Best Practices](#9-pwa--mobile-first-best-practices)
10. [Base CSS & Boilerplate Code (Ready to Copy)](#10-base-css--boilerplate-code)

---

## 1. Core Design Philosophy & Principles

```
✨ "Athletic Precision meets Modern Glassmorphism"
ความแม่นยำ กระชับ สวยงามแบบโมเดิร์น สบายตา ใช้งานมือเดียวได้คล่องตัว
```

1. **Mobile-First & One-Handed Reachability**:
   - ออกแบบให้ใช้งานสะดวกที่สุดบนสมาร์ทโฟน จุดกระทำหลัก (Action) อยู่ในระยะนิ้วโป้ง (Thumb Zone)
   - รองรับ Safe Area สำหรับอุปกรณ์ที่มีรอยบาก/Dynamic Island
2. **Tactile & Responsive Glassmorphism**:
   - การซ้อนทับเลเยอร์ด้วยกระจกฝ้า (`backdrop-blur-xl`, `bg-white/70` / `bg-slate-900/70`) ขอบกระจกมีเส้นแสงบาง (`border-white/40`) ให้ความรู้สึกโปร่ง เบา พรีเมียม
   - ทุกปุ่มหรือการแตะสัมผัสต้องมีการตอบสนอง (Micro-interaction, `active:scale-95`, Smooth Hover)
3. **High Contrast & Readability**:
   - รองรับการใช้งานกลางแจ้ง (Outdoor / Daylight) ด้วย Light Mode ที่คมชัด และการใช้งานในร่ม/กลางคืนด้วย Dark Mode สี Slate อมน้ำเงินลึก ไม่ใช่สีดำสนิท 100% เพื่อลดความล้าของสายตา
4. **Consistency across Sister Apps**:
   - ใช้โทนสีหลัก (Royal Blue / Indigo Accent), Icon Set (`lucide-react`), ความโค้งมน (`rounded-3xl` สำหรับกรอบใหญ่, `rounded-2xl` สำหรับการ์ด, `rounded-xl` สำหรับปุ่ม) เสมือนเป็นแอปในตระกูลเดียวกัน

---

## 2. Color Palette & Semantic Tokens

### 2.1 Brand & Accent Colors (โทนสีหลักและเกรเดียนต์)

| Role | Color Name | Hex / Class | Use Case |
| :--- | :--- | :--- | :--- |
| **Primary Brand** | Royal Blue | `#2563EB` (`bg-blue-600`) | สีหลักของแบรนด์, ปุ่ม Action, ไอคอน Active |
| **Primary Accent** | Indigo | `#4F46E5` (`bg-indigo-600`) | สีเชื่อมเกรเดียนต์, Theme Color ของ PWA |
| **Secondary Accent**| Cyan / Sky | `#06B6D4` (`bg-cyan-500`) | ไฮไลต์เกรเดียนต์, จุดเรืองแสง |
| **Hero Gradient** | Blue-Indigo-Cyan | `bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500` | ปุ่ม FAB เด่นกลางจอ, ส่วนหัว Banner สำคัญ |

### 2.2 Surface & Neutral Colors (พื้นหลังและพื้นผิว)

| Token | Light Mode | Dark Mode | รายละเอียด |
| :--- | :--- | :--- | :--- |
| **Background (Body)** | `#F1F5F9` (`bg-slate-100`) | `#0F172A` (`dark:bg-slate-900`) | พื้นหลังหลักของเว็บ |
| **Surface (Solid Card)**| `#FFFFFF` (`bg-white`) | `#1E293B` (`dark:bg-slate-800`) | การ์ดทึบ, Modal Body |
| **Glass Surface (Card)** | `bg-white/80 backdrop-blur-xl` | `dark:bg-slate-800/80 backdrop-blur-xl` | การ์ดกระจกบนหน้า Dashboard |
| **Glass Surface (Nav)** | `bg-white/70 backdrop-blur-xl` | `dark:bg-slate-900/70 backdrop-blur-xl` | Header, Sidebar, Bottom Bar |
| **Border (Subtle Glass)**| `border-white/40` or `border-slate-200/70` | `dark:border-slate-700/50` | เส้นขอบสร้างมิติกระจก |
| **Divider Line** | `border-slate-100` | `dark:border-slate-700/40` | เส้นคั่นแบ่งเนื้อหาภายในการ์ด |

### 2.3 Typography Color Tokens (สีตัวอักษร)

| Token | Light Mode Class | Dark Mode Class | การใช้งาน |
| :--- | :--- | :--- | :--- |
| **Text Primary** | `text-slate-800` (`#1E293B`) | `dark:text-white` (`#FFFFFF`) | หัวข้อ, ข้อความสำคัญ |
| **Text Secondary** | `text-slate-600` (`#475569`) | `dark:text-slate-300` (`#CBD5E1`) | เนื้อหาทั่วไป, ข้อความคำอธิบาย |
| **Text Muted** | `text-slate-400` (`#94A3B8`) | `dark:text-slate-500` (`#64748B`) | วันที่, หน่วย, ข้อความรอง |
| **Text Brand Active** | `text-blue-600` | `dark:text-blue-400` | ข้อความเมนูที่ถูกเลือก |

### 2.4 Semantic Status Colors (สีบอกสถานะ)

| Status | Background Soft | Text / Icon | Border | การใช้งาน |
| :--- | :--- | :--- | :--- | :--- |
| **Success** | `bg-emerald-500/10` | `text-emerald-600 dark:text-emerald-400` | `border-emerald-500/20` | บันทึกสำเร็จ, สถานะเปิดใช้งาน |
| **Warning / Notice** | `bg-amber-500/10` | `text-amber-600 dark:text-amber-400` | `border-amber-500/20` | เตือน, กาแฟสนับสนุน, ข้อสังเกต |
| **Danger / Destructive** | `bg-rose-500/10` | `text-rose-600 dark:text-rose-400` | `border-rose-500/20` | ลบข้อมูล, ปิดเซสชัน, แจ้งเตือนข้อผิดพลาด |
| **Info / Tech** | `bg-blue-500/10` | `text-blue-600 dark:text-blue-400` | `border-blue-500/20` | ข้อมูลเพิ่มเติม, ลิงก์, ป้ายสถานะ |

---

## 3. Typography & Hierarchy

### 3.1 Font Families
- **Main Font**: System Sans-serif Stack (สะอาด อ่านง่าย รองรับภาษาไทยสมบูรณ์)
  ```css
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans Thai', sans-serif;
  ```
- **Monospace / Digits Font**: ตัวเลขนับเวลา, คะแนน, Target Number (ไม่ขยับเมื่อตัวเลขเปลี่ยน)
  ```css
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  ```

### 3.2 Hierarchy Scale

```html
<!-- Hero / Display (เช่น หน้านับเวลา หรือ ไตเติลหลัก) -->
<h1 class="text-3xl sm:text-4xl font-black text-slate-800 dark:text-white tracking-tight">

<!-- Page Title (หัวข้อประจำหน้า) -->
<h1 class="text-2xl font-black text-slate-800 dark:text-white tracking-tight">

<!-- Section / Card Title (หัวข้อภายในการ์ด) -->
<h2 class="text-base sm:text-lg font-bold text-slate-800 dark:text-white">

<!-- Body Text (เนื้อหา) -->
<p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">

<!-- Caption / Subtitle (คำอธิบายย่อย) -->
<p class="text-xs text-slate-400 dark:text-slate-400">

<!-- Micro Label / Badge / Navigation Tag -->
<span class="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
```

---

## 4. Elevation, Shadows & Glassmorphism

### 4.1 Corner Radii Standard (รัศมีความโค้งมน)
- **`rounded-3xl` (24px)**: Outer Shell, Sidebar เมนูใหญ่, Dashboard Hero Container
- **`rounded-2xl` (16px)**: Content Cards, Modals, Bottom Sheet Drawers, Sub-containers
- **`rounded-xl` (12px)**: Buttons, Form Inputs, Badges, Filter Pills
- **`rounded-full` (9999px)**: Floating Action Buttons (FAB), Avatars, Circular Icon Tags

### 4.2 Glassmorphism Recipe (สูตรกระจกฝ้ามาตรฐาน)

```html
<!-- Light & Dark Adaptive Glass Card -->
<div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/60 dark:border-slate-700/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-3xl p-6">
  <!-- Content -->
</div>
```

### 4.3 Shadow Standards
- **Subtle Ambient**: `shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]` (ใช้กับการ์ดกระจก)
- **Elevated Button**: `shadow-[0_8px_25px_rgba(37,99,235,0.4)]` (ปุ่มเด่น Gradient)
- **Top / Bottom Bar Shadow**: `shadow-[0_-8px_32px_0_rgba(31,38,135,0.08)]` (แถบลอยล่าง)
- **Modal Overlay**: `shadow-2xl`

---

## 5. Layout & Navigation Architecture

ระบบ Navigation ถูกออกแบบให้ตอบโจทย์ 2 โลก: **Desktop Responsive** และ **Mobile PWA App-like**

```
+-------------------------------------------------------------------------+
| [Desktop Layout]                                                        |
| +----------------+ +--------------------------------------------------+ |
| | Sidebar Glass  | | Header Bar (Optional breadcrumbs)                | |
| | (Collapsible)  | +--------------------------------------------------+ |
| | [Icon + Label] | | Main Content Area (Scrollable)                   | |
| | [Icon + Label] | |                                                  | |
| |                | |                                                  | |
| +----------------+ +--------------------------------------------------+ |
+-------------------------------------------------------------------------+

+-------------------------------------+
| [Mobile Layout]                     |
| +---------------------------------+ |
| | Top Glass Header (Logo + Action)| |
| +---------------------------------+ |
| |                                 | |
| | Main Page Content               | |
| | (Scrollable, pb-20 for Nav)     | |
| |                                 | |
| +---------------------------------+ |
| | Bottom Nav [Tab] ( + ) [Tab]    | |
| +---------------------------------+ |
+-------------------------------------+
```

### 5.1 Desktop Sidebar (Collapsible Glass Nav)
- กว้าง `w-64` เมื่อขยาย, `w-20` เมื่อหุบ
- มีปุ่ม Toggle หุบ/ขยายเก็บสถานะลง `localStorage`
- Active State: `bg-blue-600/10 dark:bg-blue-400/20 text-blue-700 dark:text-blue-300 border border-white/50 dark:border-slate-600/30`

### 5.2 Mobile Bottom Navigation (Glass Tab Bar with Floating Action)
- ติดหนึบล่าง `fixed bottom-0 left-0 right-0 z-50`
- มี Safe Area Padding: `pb-[calc(0.5rem+env(safe-area-inset-bottom))]`
- ปุ่มกลางยกสูง (Elevated Action Button): ขอบหนา 4px `border-4 border-white dark:border-slate-900` ขนาด `w-13 h-13 rounded-full`

---

## 6. Component Library & UI Patterns

### 6.1 Buttons & Action Controls

#### A. Primary Gradient Button (ปุ่มเด่นหลัก)
```jsx
<button className="bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 hover:opacity-95 text-white font-bold px-5 py-3 rounded-xl shadow-[0_4px_15px_rgba(37,99,235,0.35)] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2">
  <Plus className="w-5 h-5" />
  <span>สร้างเซสชันใหม่</span>
</button>
```

#### B. Secondary / Soft Tint Button (ปุ่มรอง)
```jsx
<button className="bg-blue-600/10 hover:bg-blue-600/20 dark:bg-blue-400/15 dark:hover:bg-blue-400/25 text-blue-600 dark:text-blue-400 font-bold px-4 py-2.5 rounded-xl transition-all active:scale-95 cursor-pointer flex items-center gap-2">
  <Filter className="w-4 h-4" />
  <span>ตัวกรอง</span>
</button>
```

#### C. Ghost / Neutral Button
```jsx
<button className="bg-white/60 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700 font-bold px-4 py-2.5 rounded-xl transition-all active:scale-95 cursor-pointer">
  ยกเลิก
</button>
```

#### D. Destructive / Danger Button
```jsx
<button className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-4 py-2.5 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-2">
  <Trash2 className="w-4 h-4" />
  <span>ลบข้อมูล</span>
</button>
```

---

### 6.2 Form Inputs & Controls

```jsx
{/* Standard Form Field */}
<div className="space-y-1.5">
  <label className="block text-xs font-bold text-slate-600 dark:text-slate-300">
    ชื่อรายการ / ชื่อสนาม
  </label>
  <input 
    type="text" 
    placeholder="กรอกชื่อ..." 
    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
  />
</div>
```

---

### 6.3 Segmented Controls & Filter Pills

```jsx
{/* Pill Selector (e.g. Time Range Filter, Theme Toggle) */}
<div className="flex bg-slate-200/60 dark:bg-slate-900/60 p-1 rounded-2xl border border-slate-200/40 dark:border-slate-700/40">
  {['วัน', 'สัปดาห์', 'เดือน', 'ทั้งหมด'].map((tab, idx) => {
    const isActive = idx === 0;
    return (
      <button
        key={tab}
        className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
          isActive 
            ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm' 
            : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'
        }`}
      >
        {tab}
      </button>
    );
  })}
</div>
```

---

### 6.4 Modals & Confirmation Dialogs

- Backdrop: `fixed inset-0 bg-slate-900/40 dark:bg-slate-950/60 backdrop-blur-sm z-[200] animate-fade-in`
- Modal Shell: `bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-sm p-6 border border-slate-200 dark:border-slate-700 animate-zoom-in`
- Rendering: ใช้ `createPortal(..., document.body)` เสมอเพื่อป้องกันปัญหา stacking context / z-index ซ้อนทับ

---

### 6.5 Animated Smooth Accordion (CSS Grid Technique)
แก้ปัญหา accordion กระตุกโดยไม่ต้องพึ่ง JavaScript คำนวณความสูง:

```jsx
export default function StatsAccordion({ isOpen, children }) {
  return (
    <div 
      className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
        isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
      }`}
    >
      <div className="overflow-hidden">
        {children}
      </div>
    </div>
  );
}
```

---

## 7. Motion, Micro-interactions & Touch Experience

### 7.1 Keyframe Animations (Tailwind v4 / CSS)

```css
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slide-up {
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes zoom-in {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}
```

### 7.2 Micro-interaction Rules
- **Tactile Touch Click**: ใส่ `active:scale-95 transition-all` ให้กับปุ่มและ interactive cards ทุกตัว
- **Disabled State**: ใส่ `disabled:opacity-40 disabled:pointer-events-none disabled:cursor-not-allowed`
- **Mobile Tap Highlight**: ปิด tap highlight สีฟ้าของเบราว์เซอร์มือถือด้วย `-webkit-tap-highlight-color: transparent`
- **Overscroll Behavior**: ป้องกัน bounce ล้นบน iOS ใน Canvas / Board ด้วย `overscroll-behavior-y: none`

---

## 8. Dark Mode & Theme Switching Specification

ระบบ Theme รองรับ 3 โหมด: `Light`, `Dark`, และ `System` (ตาม OS)

### 8.1 Zero-FOUC Head Script (ป้องกันหน้ากระพริบตอนโหลด)
นำโค้ดนี้ใส่ไว้บนสุดของ `<head>` ในไฟล์ `index.html`:

```html
<!-- Prevent Flash of Unstyled Content (FOUC) -->
<script>
  try {
    const theme = localStorage.getItem('theme') || 'system';
    const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {}
</script>
```

### 8.2 React Theme Context Standard Pattern

```jsx
import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'system');

  const applyTheme = (targetTheme) => {
    const isDark = 
      targetTheme === 'dark' || 
      (targetTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
      
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  useEffect(() => {
    applyTheme(theme);
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') applyTheme('system');
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
```

---

## 9. PWA & Mobile-First Best Practices

1. **Meta Viewport Standard**:
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
   ```
2. **Safe Area Utility Classes**:
   ```css
   .pt-safe {
       padding-top: calc(1rem + env(safe-area-inset-top, 0px));
   }
   .pb-safe {
       padding-bottom: calc(1rem + env(safe-area-inset-bottom, 0px));
   }
   ```
3. **Window Controls Overlay (WCO) Support for Desktop PWA**:
   ```css
   @media (display-mode: window-controls-overlay) {
     .pwa-wco-header {
       position: sticky;
       top: 0;
       left: env(titlebar-area-x, 0);
       width: env(titlebar-area-width, 100%);
       min-height: env(titlebar-area-height, 36px);
       -webkit-app-region: drag;
       app-region: drag;
       z-index: 50;
     }
     .pwa-wco-nodrag {
       -webkit-app-region: no-drag;
       app-region: no-drag;
     }
   }
   ```
4. **Standalone App Icon Maskable Guidelines**:
   - จัดรูปทรง Icon ให้อยู่ใน Safe Zone 80% ตรงกลาง เพื่อไม่ให้โดนตัดขอบวงกลมหรือสี่เหลี่ยมโค้งของระบบปฏิบัติการต่าง ๆ

---

## 10. Base CSS & Boilerplate Code

คัดลอกส่วนนี้ไปใส่ใน `src/index.css` ของโปรเจกต์ใหม่เพื่อเริ่มใช้งานได้ทันที:

```css
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));

/* 1. Global Reset & Mobile Polish */
body {
    overscroll-behavior-y: none;
    -webkit-tap-highlight-color: transparent;
}

canvas {
    touch-action: none;
    user-select: none;
    -webkit-user-select: none;
}

/* 2. Glassmorphism Custom Scrollbar */
::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}
::-webkit-scrollbar-track {
    background: transparent;
}
::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
}
.dark ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
}
::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.3);
}
.dark ::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.3);
}

/* 3. Safe Area Padding Utilities */
.pt-safe {
    padding-top: calc(1rem + env(safe-area-inset-top, 0px));
}
.pb-safe {
    padding-bottom: calc(1rem + env(safe-area-inset-bottom, 0px));
}

/* 4. Motion Animations */
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes slide-in-right {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}
@keyframes slide-up {
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
@keyframes zoom-in {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
@keyframes fade-up {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}

.animate-fade-in { animation: fade-in 0.2s ease-out forwards; }
.animate-slide-up { animation: slide-up 0.3s ease-out forwards; }
.animate-zoom-in { animation: zoom-in 0.2s ease-out forwards; }
.animate-fade-up { animation: fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
.animate-blob { animation: blob 7s infinite; }
```

---

## 📌 Checklist สำหรับการสร้างโปรเจกต์ใหม่ในเครือ (Sister App Checklist)

- [ ] นำเข้า `index.css` และตั้งค่า Tailwind CSS v4 `@custom-variant dark (&:where(.dark, .dark *));`
- [ ] ติดตั้ง `lucide-react` เป็น Icon Library มาตรฐาน
- [ ] ใส่สคริปต์ Zero-FOUC ใน `index.html` เพื่อการสลับ Dark / Light Mode ที่ไร้รอยต่อ
- [ ] ใช้ `rounded-3xl` กับ Container หลัก และ `rounded-2xl` กับ Card ทั่วไป
- [ ] ใส่ `active:scale-95` บนทุกปุ่ม Interactive เพื่อให้ได้ Tactile Feel
- [ ] จัดเลย์เอาต์ Navigation แยก Desktop Sidebar Collapsible และ Mobile Bottom Glass Bar
- [ ] ตรวจสอบ Safe Area Inset (`pt-safe`, `pb-safe`) สำหรับหน้าจอมือถือที่มี Notch / Home Bar
