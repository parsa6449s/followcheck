# FollowCheck — Telegram Mini App starter

A bilingual (Persian/English), light-mode React/Vite starter for an Instagram follower comparison Mini App.

## Requirements
- Node.js 20+ recommended
- npm

## Run locally
```bash
npm install
npm run dev
```
Open the local URL printed by Vite.

## Build
```bash
npm run build
npm run preview
```

## What is included
- Responsive dashboard and language switch (Persian RTL / English LTR)
- Sample-only dashboard mode, clearly labelled as sample data
- File picker for Instagram ZIP/JSON exports (selection only in this starter)
- Recharts sample graph
- Telegram WebApp script initialization

## Important limitations
- This starter does **not** parse Instagram ZIP/JSON exports yet.
- It does **not** log in to Instagram or fetch follower lists by username.
- It does **not** upload files or store personal data on a server.
- Telegram WebApp initialization is included, but BotFather configuration and production HTTPS deployment remain to be done.

## Next implementation steps
1. Implement robust parsing for the official Instagram data export (ZIP and JSON).
2. Compare followers/following lists and store timestamped snapshots.
3. Add backend authentication, data deletion, and secure persistence if history must sync across devices.
4. Deploy to HTTPS and configure the Telegram Mini App URL with BotFather.

# FollowCheck — استارتر مینی‌اپ تلگرام

یک استارتر دو‌زبانه (فارسی/انگلیسی)، با تم روشن، بر پایه React/Vite برای مینی‌اپ مقایسه فالوورهای اینستاگرام.

## پیش‌نیازها
- Node.js نسخه ۲۰ به بالا توصیه می‌شه
- npm

## اجرای محلی
```bash
npm install
npm run dev
```
آدرس محلی که Vite چاپ می‌کنه رو باز کن.

## بیلد
```bash
npm run build
npm run preview
```

## چی توی این پروژه هست
- داشبورد ریسپانسیو و سوییچ زبان (فارسی راست‌به‌چپ / انگلیسی چپ‌به‌راست)
- حالت داشبورد فقط-نمونه، با برچسب واضح که داده‌ها نمونه‌ان
- فایل‌پیکر برای خروجی ZIP/JSON اینستاگرام (توی این استارتر فقط انتخاب فایل انجام می‌شه)
- نمودار نمونه با Recharts
- راه‌اندازی اولیه اسکریپت Telegram WebApp

## محدودیت‌های مهم
- این استارتر هنوز خروجی ZIP/JSON اینستاگرام رو پارس نمی‌کنه.
- به اینستاگرام لاگین نمی‌کنه و لیست فالوورها رو با یوزرنیم نمی‌گیره.
- فایل آپلود نمی‌کنه و داده شخصی رو روی سرور ذخیره نمی‌کنه.
- راه‌اندازی اولیه Telegram WebApp هست، ولی تنظیمات BotFather و دیپلوی HTTPS پروداکشن هنوز مونده.

## قدم‌های بعدی پیاده‌سازی
1. پیاده‌سازی پارسینگ دقیق برای خروجی رسمی داده اینستاگرام (ZIP و JSON).
2. مقایسه لیست فالوورها/فالووینگ‌ها و ذخیره اسنپ‌شات‌های زمان‌دار.
3. اضافه‌کردن احراز هویت بک‌اند، حذف داده، و ذخیره‌سازی امن اگه تاریخچه باید بین دستگاه‌ها سینک بشه.
4. دیپلوی روی HTTPS و تنظیم URL مینی‌اپ تلگرام با BotFather.
