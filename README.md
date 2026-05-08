# 🌿 Carbonly

> Know your carbon footprint — built for India.

A clean, minimal carbon footprint calculator with a fintech-style UI. Designed to help Indian users understand and reduce their climate impact.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- A GitHub account
- A Vercel account (free)

### Run locally

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev
# Opens at http://localhost:5173
```

### Build for production

```bash
npm run build
```

---

## ☁️ Deploy to Vercel (Free)

1. Push this folder to a GitHub repo:
```bash
git init
git add .
git commit -m "Carbonly MVP 🌿"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/carbonly.git
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com) → **New Project** → Import your repo

3. Click **Deploy** — done in ~60 seconds

Your app will be live at `carbonly.vercel.app` (or similar)

---

## 📁 Project Structure

```
carbonly/
├── index.html                  # Entry HTML
├── vite.config.js              # Vite config
├── package.json
├── public/
│   └── leaf.svg                # Favicon
└── src/
    ├── main.jsx                # React entry point
    ├── index.css               # Global styles + animations
    ├── App.jsx                 # Main app + all steps
    ├── context/
    │   └── ThemeContext.jsx    # Dark/light mode state
    ├── utils/
    │   └── calculator.js      # Emission factors + calculations
    └── components/
        ├── UI.jsx              # Reusable primitives (Card, Slider, etc.)
        ├── Charts.jsx          # Donut + bar charts
        ├── ShareCard.jsx       # Shareable result card
        └── WaitlistForm.jsx    # ⭐ Email waitlist / feedback form
```

---

## ⭐ Features

| Feature | Status |
|---|---|
| Multi-step calculator | ✅ |
| Dark / light mode | ✅ |
| Donut + bar charts | ✅ |
| Personalised suggestions | ✅ |
| Share result card | ✅ |
| Offset simulation | ✅ |
| **Email waitlist form** | ✅ New |
| Badge system | ✅ |
| Mobile responsive | ✅ |

---

## 📬 Connecting the Waitlist to a Real Backend

The `WaitlistForm` currently saves to `localStorage`. To connect a real backend, open `src/components/WaitlistForm.jsx` and replace the `setTimeout` block with a real API call:

### Option A — Tally.so (no-code, free)
Replace the form with a Tally embed URL.

### Option B — Mailchimp / ConvertKit API
```js
await fetch('https://us1.api.mailchimp.com/...', {
  method: 'POST',
  headers: { Authorization: `apikey ${YOUR_KEY}` },
  body: JSON.stringify({ email_address: email, status: 'subscribed' }),
});
```

### Option C — Supabase (free, recommended)
```js
const { error } = await supabase
  .from('waitlist')
  .insert({ name, email, footprint: result?.annual });
```

---

## 🌍 Emission Factors Used

| Category | Factor |
|---|---|
| Electricity | 0.8 kg CO₂ / kWh (India grid) |
| Petrol | 2.3 kg CO₂ / litre |
| Diesel | 2.68 kg CO₂ / litre |
| Short-haul flight | 0.25 kg CO₂ / km |
| Long-haul flight | 0.15 kg CO₂ / km |
| Vegetarian diet | 50 kg CO₂ / month |
| Occasional non-veg | 120 kg CO₂ / month |
| Heavy non-veg | 200 kg CO₂ / month |

India average: **~1.6 tons CO₂/year** (133 kg/month)

---

## ⚠️ Disclaimer

The offset section is for awareness only. Carbonly does not sell certified carbon credits.

---

Built with ❤️ for India 🇮🇳
