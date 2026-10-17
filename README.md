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
