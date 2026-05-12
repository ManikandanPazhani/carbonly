import { useState } from 'react';

export default function ShareCard({ result, badge }) {
  const [copied, setCopied] = useState(false);

  const text = `🌍 My Carbon Footprint — Carbonly

📊 Annual: ${result.annual} tons CO₂/year
📅 Monthly: ${result.total} kg CO₂/month
${badge.emoji} Badge: ${badge.label}
${result.vsAvg > 0 
  ? `⚠️ ${result.vsAvg}% above India average` 
  : `✅ ${Math.abs(result.vsAvg)}% below India average`}

📋 Breakdown:
⚡ Electricity: ${result.electricity} kg/month
🚗 Travel: ${result.travel} kg/month
🥘 Food: ${result.food} kg/month
🛍️ Lifestyle: ${result.lifestyle} kg/month

Calculate yours 👉 https://carbonly-chi.vercel.app/`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'My Carbon Footprint — Carbonly', text });
        return;
      } catch { /* user cancelled */ }
    }
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
      borderRadius: 24,
      padding: '28px 24px',
      color: '#fff',
      textAlign: 'center',
      marginBottom: 14,
      animation: 'fadeUp 0.5s ease',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
      <div style={{ position: 'absolute', bottom: -20, left: -20, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />

      <div style={{ position: 'relative' }}>
        <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 4, letterSpacing: 1, textTransform: 'uppercase', fontFamily: "'DM Sans', sans-serif" }}>
          My Carbon Footprint
        </div>
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 52, fontWeight: 800, letterSpacing: -2, lineHeight: 1 }}>
          {result.annual}
          <span style={{ fontSize: 22, fontWeight: 600, letterSpacing: 0, marginLeft: 6 }}>tons/yr</span>
        </div>
        <div style={{ marginTop: 10, fontSize: 18 }}>{badge.emoji} {badge.label}</div>
        <div style={{ marginTop: 6, fontSize: 13, opacity: 0.75 }}>
          {result.vsAvg > 0
            ? `${result.vsAvg}% above India average`
            : `${Math.abs(result.vsAvg)}% below India average 🎉`}
        </div>

        {/* Breakdown pills */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
          {[
            ['⚡', `${result.electricity}kg`],
            ['🚗', `${result.travel}kg`],
            ['🥘', `${result.food}kg`],
            ['🛍️', `${result.lifestyle}kg`],
          ].map(([ic, val]) => (
            <div key={ic} style={{
              background: 'rgba(255,255,255,0.15)',
              borderRadius: 50,
              padding: '5px 12px',
              fontSize: 12,
              fontWeight: 600,
              fontFamily: "'DM Sans', sans-serif",
            }}>
              {ic} {val}
            </div>
          ))}
        </div>

        <button onClick={handleShare} style={{
          marginTop: 18,
          background: 'rgba(255,255,255,0.18)',
          backdropFilter: 'blur(4px)',
          border: '1px solid rgba(255,255,255,0.25)',
          borderRadius: 50,
          padding: '10px 24px',
          color: '#fff',
          cursor: 'pointer',
          fontSize: 14,
          fontWeight: 600,
          fontFamily: "'DM Sans', sans-serif",
        }}>
          {copied ? '✓ Copied to clipboard!' : '📤 Share my result'}
        </button>

        <div style={{ marginTop: 10, fontSize: 11, opacity: 0.6 }}>
          carbonly-chi.vercel.app
        </div>
      </div>
    </div>
  );
}