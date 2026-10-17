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


# FollowCheck — شروع‌کننده Mini App تلگرام
یک شروع‌کننده دو زبانه (فارسی/انگلیسی) و حالت روشن برای React/Vite برای یک Mini App مقایسه دنبال‌کنندگان اینستاگرام.

## نیازمندی‌ها
- توصیه می‌شود Node.js نسخه ۲۰ یا بالاتر
- npm

## اجرای محلی
```bash
npm install
npm run dev
```
آدرس محلی که Vite چاپ می‌کند را باز کنید.

## ساخت پروژه
```bash
npm run build
npm run preview
```

## موارد شامل شده
- داشبورد واکنش‌گرا و سوئیچ زبان (فارسی راست به چپ / انگلیسی چپ به راست)
- حالت داشبورد نمونه، با داده‌های نمونه به وضوح مشخص شده
- انتخاب فایل برای خروجی‌های ZIP/JSON اینستاگرام (فقط انتخاب در این شروع‌کننده)
- نمودار نمونه با Recharts
- راه‌اندازی اسکریپت Telegram WebApp

## محدودیت‌های مهم
- این شروع‌کننده هنوز خروجی‌های ZIP/JSON اینستاگرام را تجزیه نمی‌کند.
- ورود به اینستاگرام یا دریافت فهرست دنبال‌کنندگان با نام کاربری انجام نمی‌دهد.
- فایل‌ها را آپلود نمی‌کند و داده‌های شخصی را روی سرور ذخیره نمی‌کند.
- راه‌اندازی Telegram WebApp شامل شده، اما تنظیمات BotFather و استقرار HTTPS در محیط تولید هنوز باید انجام شود.
- ## مراحل بعدی برای پیاده‌سازی 1. پیاده‌سازی تجزیه و تحلیل قوی برای خروجی رسمی داده‌های اینستاگرام (ZIP و JSON). 2. مقایسه لیست دنبال‌کنندگان/دنبال‌شده‌ها و ذخیره لحظه‌ای با زمان‌بندی. 3. افزودن احراز هویت در بک‌اند، حذف داده‌ها و ذخیره امن اگر باید تاریخچه روی دستگاه‌های مختلف همگام‌سازی شود. 4. ارسال روی HTTPS و تنظیم آدرس مینی‌اپ تلگرام با BotFather.
