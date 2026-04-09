# Nairagram Documentation Site — Exact Replica

Next.js + React Query frontend replicating https://doc.nairagramltd.com/

## IMPORTANT: Download Assets First

Before running, you must manually download the logo and favicon from the original site and place them in the `public/` folder:

1. Save the logo:
   - Open: https://doc.nairagramltd.com/wp-content/uploads/2021/11/nairagram_logo.png
   - Right-click → Save As → `public/nairagram_logo.png`

2. Save the favicon:
   - Open: https://doc.nairagramltd.com/favicon.ico
   - Right-click → Save As → `public/favicon.ico`

Your `public/` folder should look like:
```
public/
├── nairagram_logo.png
└── favicon.ico
```

## Setup

```bash
npm install
npm run dev
```

Make sure Strapi is running on http://localhost:1337 with seeded data and public permissions.

Open http://localhost:3000

## Environment

`.env.local`:
```
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```
