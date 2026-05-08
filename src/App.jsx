import { useState, useRef, useEffect } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { calculate, getBadge, getSuggestions } from './utils/calculator';
import { Card, StepBar, Slider, ToggleGroup, BtnPrimary, BtnSecondary, SectionTitle, Hint, StatChip } from './components/UI';
import { DonutChart, BarChart, ChartLegend } from './components/Charts';
import ShareCard from './components/ShareCard';
import WaitlistForm from './components/WaitlistForm';

function CarbonlyApp() {
  const t = useTheme();
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    electricity: 150, carKmPerWeek: 50, fuelType: 'petrol',
    shortFlights: 2, longFlights: 1, foodHabit: 'occasional', shopping: 'medium',
  });
  const [result, setResult] = useState(null);
  const [offsetAmt, setOffsetAmt] = useState(500);
  const topRef = useRef(null);

  useEffect(() => { topRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [step]);

  const set = key => val => setData(d => ({ ...d, [key]: val }));

  const goNext = () => {
    if (step === 4) { setResult(calculate(data)); setStep(5); }
    else setStep(s => s + 1);
  };

  const reset = () => { setStep(0); setResult(null); };

  const badge = result ? getBadge(result.annual) : null;
  const suggestions = result ? getSuggestions(data, result) : [];
  const offsetCost = result ? Math.round(result.annual * 500) : 500;

  const wrap = {
    minHeight: '100vh', background: t.bg, color: t.text,
    fontFamily: "'DM Sans', sans-serif", transition: 'background 0.3s, color 0.3s',
  };

  const inner = { maxWidth: 480, margin: '0 auto', padding: '20px 20px 60px' };

  return (
    <div style={wrap}>
      <div ref={topRef} style={inner}>

        {/* ── Header ── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <div>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 22, letterSpacing: -0.5 }}>
              carbon<span style={{ color: '#6366f1' }}>ly</span>
            </span>
            <span style={{ fontSize: 10, marginLeft: 8, opacity: 0.35, fontWeight: 600, letterSpacing: 1 }}>BETA</span>
          </div>
          <button onClick={t.toggle} style={{
            background: t.dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)',
            border: 'none', borderRadius: 50, width: 40, height: 40,
            cursor: 'pointer', fontSize: 17, color: t.text,
          }}>
            {t.dark ? '☀️' : '🌙'}
          </button>
        </div>

        {/* ══ INTRO ══════════════════════════════════════════════════════════ */}
        {step === 0 && (
          <div style={{ animation: 'fadeUp 0.5s ease' }}>
            <div style={{ textAlign: 'center', padding: '16px 0 28px' }}>
              <div style={{ fontSize: 72, marginBottom: 16 }}>🌏</div>
              <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 34, fontWeight: 800, lineHeight: 1.15, marginBottom: 14, letterSpacing: -1 }}>
                Know your<br /><span style={{ color: '#6366f1' }}>carbon impact</span>
              </h1>
              <p style={{ color: t.sub, fontSize: 15, lineHeight: 1.65, maxWidth: 300, margin: '0 auto' }}>
                A 2-minute quiz to understand your footprint — tailored for India 🇮🇳
              </p>
            </div>

            <Card>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                {[['⚡','Energy'],['🚗','Travel'],['🥘','Food'],['🛍️','Lifestyle']].map(([ic,lb]) => (
                  <div key={lb} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 26 }}>{ic}</div>
                    <div style={{ fontSize: 12, marginTop: 5, color: t.sub, fontWeight: 500 }}>{lb}</div>
                  </div>
                ))}
              </div>
            </Card>

            <div style={{ background: 'rgba(99,102,241,0.08)', borderRadius: 16, padding: '14px 18px', marginBottom: 20, border: '1px solid rgba(99,102,241,0.15)' }}>
              <div style={{ fontSize: 13, color: t.sub, lineHeight: 1.5 }}>
                🇮🇳 The average Indian emits <span style={{ color: '#6366f1', fontWeight: 700 }}>1.6 tons</span> of CO₂ per year. Where do you stand?
              </div>
            </div>

            <BtnPrimary onClick={() => setStep(1)}>Calculate my footprint →</BtnPrimary>
          </div>
        )}

        {/* ══ STEP 1 — ELECTRICITY ══════════════════════════════════════════ */}
        {step === 1 && (
          <div style={{ animation: 'fadeUp 0.4s ease' }}>
            <StepBar step={0} total={4} />
            <SectionTitle>⚡ Home Energy</SectionTitle>
            <Hint>Check your electricity bill for monthly units (kWh). Typical Indian home uses 100–300 kWh/month.</Hint>
            <Card>
              <Slider label="Monthly electricity usage" value={data.electricity} min={0} max={1000} step={10}
                onChange={set('electricity')} unit="kWh" />
              <StatChip>≈ {Math.round(data.electricity * 0.8)} kg CO₂ this month</StatChip>
            </Card>
            <div style={{ display: 'flex', gap: 10 }}>
              <BtnSecondary onClick={() => setStep(0)} style={{ flex: 1, width: 'auto' }}>← Back</BtnSecondary>
              <BtnPrimary onClick={goNext} style={{ flex: 2 }}>Next →</BtnPrimary>
            </div>
          </div>
        )}

        {/* ══ STEP 2 — TRAVEL ══════════════════════════════════════════════ */}
        {step === 2 && (
          <div style={{ animation: 'fadeUp 0.4s ease' }}>
            <StepBar step={1} total={4} />
            <SectionTitle>🚗 Travel</SectionTitle>
            <Hint>Cars and flights are the biggest contributors for most urban Indians.</Hint>
            <Card>
              <Slider label="Car travel per week" value={data.carKmPerWeek} min={0} max={500} step={5}
                onChange={set('carKmPerWeek')} unit="km" />
              <div style={{ marginBottom: 10, fontSize: 14, fontWeight: 600 }}>Fuel type</div>
              <ToggleGroup
                options={[{ label: '⛽ Petrol', value: 'petrol' }, { label: '🛢️ Diesel', value: 'diesel' }]}
                value={data.fuelType} onChange={set('fuelType')} />
            </Card>
            <Card>
              <Slider label="Short-haul flights / year" value={data.shortFlights} min={0} max={20} step={1}
                onChange={set('shortFlights')} unit="flights" />
              <Slider label="Long-haul flights / year" value={data.longFlights} min={0} max={10} step={1}
                onChange={set('longFlights')} unit="flights" />
              <div style={{ fontSize: 12, color: t.sub }}>Short-haul: under 3 hrs · Long-haul: over 6 hrs</div>
            </Card>
            <div style={{ display: 'flex', gap: 10 }}>
              <BtnSecondary onClick={() => setStep(1)} style={{ flex: 1, width: 'auto' }}>← Back</BtnSecondary>
              <BtnPrimary onClick={goNext} style={{ flex: 2 }}>Next →</BtnPrimary>
            </div>
          </div>
        )}

        {/* ══ STEP 3 — FOOD + LIFESTYLE ════════════════════════════════════ */}
        {step === 3 && (
          <div style={{ animation: 'fadeUp 0.4s ease' }}>
            <StepBar step={2} total={4} />
            <SectionTitle>🥘 Food & Lifestyle</SectionTitle>
            <Hint>Your diet and shopping habits contribute more than most people realise.</Hint>
            <Card>
              <div style={{ marginBottom: 12, fontSize: 14, fontWeight: 600 }}>What best describes your diet?</div>
              <ToggleGroup
                options={[
                  { label: '🥦 Vegetarian', value: 'veg' },
                  { label: '🍗 Occasional', value: 'occasional' },
                  { label: '🥩 Non-veg', value: 'heavy' },
                ]}
                value={data.foodHabit} onChange={set('foodHabit')} />
            </Card>
            <Card>
              <div style={{ marginBottom: 12, fontSize: 14, fontWeight: 600 }}>Shopping frequency?</div>
              <ToggleGroup
                options={[
                  { label: '🤏 Low', value: 'low' },
                  { label: '🛒 Medium', value: 'medium' },
                  { label: '🛍️ High', value: 'high' },
                ]}
                value={data.shopping} onChange={set('shopping')} />
              <div style={{ marginTop: 12, fontSize: 12, color: t.sub }}>
                Low = essentials only · High = frequent online orders & new purchases
              </div>
            </Card>
            <div style={{ display: 'flex', gap: 10 }}>
              <BtnSecondary onClick={() => setStep(2)} style={{ flex: 1, width: 'auto' }}>← Back</BtnSecondary>
              <BtnPrimary onClick={goNext} style={{ flex: 2 }}>Next →</BtnPrimary>
            </div>
          </div>
        )}

        {/* ══ STEP 4 — REVIEW ══════════════════════════════════════════════ */}
        {step === 4 && (
          <div style={{ animation: 'fadeUp 0.4s ease' }}>
            <StepBar step={3} total={4} />
            <SectionTitle>👀 Quick Review</SectionTitle>
            <Hint>Everything look right? Hit Calculate when ready.</Hint>
            {[
              ['⚡','Electricity', `${data.electricity} kWh/month`],
              ['🚗','Car travel',  `${data.carKmPerWeek} km/week · ${data.fuelType}`],
              ['✈️','Flights',     `${data.shortFlights} short + ${data.longFlights} long haul/yr`],
              ['🥘','Diet',        data.foodHabit === 'veg' ? 'Vegetarian' : data.foodHabit === 'occasional' ? 'Occasional non-veg' : 'Heavy non-veg'],
              ['🛍️','Shopping',    data.shopping.charAt(0).toUpperCase() + data.shopping.slice(1)],
            ].map(([ic, lb, val]) => (
              <Card key={lb} style={{ marginBottom: 10, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 20 }}>{ic}</span>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{lb}</span>
                </div>
                <span style={{ fontSize: 13, color: '#6366f1', fontWeight: 600 }}>{val}</span>
              </Card>
            ))}
            <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
              <BtnSecondary onClick={() => setStep(3)} style={{ flex: 1, width: 'auto' }}>← Edit</BtnSecondary>
              <BtnPrimary onClick={goNext} style={{ flex: 2 }}>🔍 Calculate</BtnPrimary>
            </div>
          </div>
        )}

        {/* ══ RESULTS ══════════════════════════════════════════════════════ */}
        {step === 5 && result && (
          <div style={{ animation: 'fadeUp 0.5s ease' }}>

            {/* Share card */}
            <ShareCard result={result} badge={badge} />

            {/* Score */}
            <Card style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 13, color: t.sub, marginBottom: 4 }}>Monthly emissions</div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 40, fontWeight: 800, letterSpacing: -1 }}>
                  {result.total} <span style={{ fontSize: 18, fontWeight: 600 }}>kg</span>
                </div>
                <div style={{ fontSize: 13, color: t.sub, marginTop: 4 }}>{result.annual} tons / year</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 36 }}>{badge.emoji}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: badge.color, marginTop: 4 }}>{badge.label}</div>
                <div style={{
                  marginTop: 8, fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 50,
                  background: result.vsAvg > 0 ? 'rgba(239,68,68,0.12)' : 'rgba(34,197,94,0.12)',
                  color: result.vsAvg > 0 ? '#ef4444' : '#22c55e',
                }}>
                  {result.vsAvg > 0 ? `+${result.vsAvg}%` : `${result.vsAvg}%`} vs avg
                </div>
              </div>
            </Card>

            {/* Chart breakdown */}
            <Card>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 20 }}>Breakdown</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap', marginBottom: 20 }}>
                <DonutChart data={{ electricity: result.electricity, travel: result.travel, food: result.food, lifestyle: result.lifestyle }} total={result.total} />
                <ChartLegend data={{ electricity: result.electricity, travel: result.travel, food: result.food, lifestyle: result.lifestyle }} />
              </div>
              <BarChart data={{ electricity: result.electricity, travel: result.travel, food: result.food, lifestyle: result.lifestyle }} total={result.total} />
            </Card>

            {/* Insights */}
            <Card accent>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 14 }}>💡 Insights</div>
              {[
                result.travel > result.total * 0.3 && `Your travel contributes ${Math.round(result.travel / result.total * 100)}% of your total emissions`,
                result.electricity > result.total * 0.3 && `Electricity is your biggest source at ${Math.round(result.electricity / result.total * 100)}%`,
                result.vsAvg > 0
                  ? `You're ${result.vsAvg}% above the average Indian carbon footprint`
                  : `You're ${Math.abs(result.vsAvg)}% below the average Indian — keep it up!`,
                result.annual > 2 && 'Your footprint is high — but small consistent changes add up fast',
              ].filter(Boolean).map((insight, i) => (
                <div key={i} style={{ fontSize: 14, marginBottom: 8, lineHeight: 1.6, color: t.sub }}>• {insight}</div>
              ))}
            </Card>

            {/* Suggestions */}
            <Card>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 16 }}>🎯 What you can do</div>
              {suggestions.map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 12, padding: '14px 16px', borderRadius: 14, background: t.muted }}>
                  <span style={{ fontSize: 22, flexShrink: 0 }}>{s.icon}</span>
                  <span style={{ fontSize: 14, lineHeight: 1.55, color: t.sub }}>{s.text}</span>
                </div>
              ))}
            </Card>

            {/* Offset */}
            <Card style={{ background: t.dark ? 'rgba(34,197,94,0.07)' : 'rgba(34,197,94,0.04)', border: '1px solid rgba(34,197,94,0.2)' }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 6 }}>🌳 Offset your footprint</div>
              <div style={{ fontSize: 13, color: t.sub, marginBottom: 16 }}>Support environmental projects to balance your impact</div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
                {[...new Set([100, 500, 1000, offsetCost])].sort((a,b) => a-b).map(amt => (
                  <button key={amt} onClick={() => setOffsetAmt(amt)} style={{
                    flex: 1, minWidth: 60, padding: '10px 4px', borderRadius: 12, cursor: 'pointer',
                    border: offsetAmt === amt ? '2px solid #22c55e' : `2px solid ${t.border}`,
                    background: offsetAmt === amt ? 'rgba(34,197,94,0.15)' : 'transparent',
                    color: offsetAmt === amt ? '#22c55e' : t.text,
                    fontWeight: offsetAmt === amt ? 700 : 500,
                    fontSize: 14, fontFamily: "'DM Sans', sans-serif",
                  }}>₹{amt}</button>
                ))}
              </div>
              <div style={{ fontSize: 13, color: t.sub, marginBottom: 16 }}>
                ₹{offsetAmt} offsets approx. <strong style={{ color: '#22c55e' }}>{(offsetAmt / 500).toFixed(1)} tons</strong> CO₂ &nbsp;·&nbsp; 1 ton ≈ ₹500
              </div>
              <BtnPrimary green>Support with ₹{offsetAmt}</BtnPrimary>
              <div style={{ marginTop: 12, fontSize: 11, color: t.sub, textAlign: 'center', lineHeight: 1.6 }}>
                ⚠️ This supports environmental projects. Not a certified carbon credit.
              </div>
            </Card>

            {/* ── WAITLIST FORM (new feature) ── */}
            <WaitlistForm result={result} />

            <BtnSecondary onClick={reset} style={{ marginTop: 4 }}>↺ Recalculate</BtnSecondary>
          </div>
        )}

      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CarbonlyApp />
    </ThemeProvider>
  );
}
