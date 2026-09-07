# 🏹 ArcherHub — All-in-One Archery Management & Booking System

ระบบบริหารจัดการสนามยิงธนูและจองเลนแบบครบวงจร (SaaS Monorepo with Next.js Turborepo & LINE LIFF)

---

## 🏗️ Architecture & Apps

| Service / App | Port | Description |
| :--- | :--- | :--- |
| **`apps/web`** | `http://localhost:3000` | Landing Page, SaaS Pricing, Shop Registration, Super Admin, Range Admin Dashboard & Walk-in POS |
| **`apps/liff`** | `http://localhost:3001` | LINE LIFF Customer Booking Web App (Interactive Lane Map, Digital Waiver, PromptPay QR, E-Ticket, Score Companion) |
| **`packages/ui`** | - | Shared UI Components, Design System, ThemeProvider, and I18n Dual-Language Engine |
| **`packages/store`** | - | In-memory Mock Data & State Store for Ranges, Lanes, Bookings, and Scores |
| **`packages/types`** | - | TypeScript Definitions & Data Models |

---

## ⚡ Quick Start with `make`

โปรเจกต์มี `Makefile` สำหรับสั่งการได้อย่างรวดเร็ว:

```bash
# แสดงรายการคำสั่งทั้งหมด
make help

# ติดตั้ง dependencies
make install

# รัน Dev Server ทั้งระบบ (Web :3000 และ LIFF :3001)
make dev

# สั่ง build ตรวจสอบความถูกต้องทั้งโปรเจกต์
make build

# ตรวจสอบ TypeScript Types และ Lint
make check-types
make lint

# ล้างแคชการ build
make clean
```

---

## 🐳 Docker & Docker Compose

สามารถรันทั้งระบบบน Docker ได้ทันที:

### 1. รันในโหมด Background
```bash
make docker-up
# หรือรันตรงด้วย: docker compose up -d --build
```

### 2. ดูสถานะและ Log
```bash
# ดู Log แบบ Real-time
make docker-logs

# ดูสถานะคอนเทนเนอร์
make docker-ps
```

### 3. หยุดการทำงาน
```bash
make docker-down
```

เมื่อรันแล้ว สามารถเข้าใช้งานได้ที่:
- **Web App / Admin POS**: [http://localhost:3000](http://localhost:3000)
- **Customer LINE LIFF**: [http://localhost:3001](http://localhost:3001)

---

## 🌐 Dual Language Support (🇹🇭 TH / 🇬🇧 EN)

ระบบรองรับสองภาษาไทย-อังกฤษทั้งระบบ (Persistent Language Switcher via localStorage `archerhub_lang`).
