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
    minHeight: '100vh',
    background: t.dark
      ? 'linear-gradient(160deg, #0d0d18 0%, #0a0a0f 50%, #0d0d1a 100%)'
      : '#f5f5f7',
    color: t.text,
    fontFamily: "'DM Sans', sans-serif",
    transition: 'background 0.3s, color 0.3s',
  };

  const inner = { maxWidth: 480, margin: '0 auto', padding: '20px 20px 80px' };

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
            transition: 'background 0.2s',
          }}>
            {t.dark ? '☀️' : '🌙'}
          </button>
        </div>

        {/* ══ INTRO ══════════════════════════════════════════════════════════ */}
        {step === 0 && (
          <div style={{ animation: 'fadeUp 0.5s ease' }}>
            <div style={{ textAlign: 'center', padding: '8px 0 24px' }}>
              <div className="float-emoji" style={{ fontSize: 72 }}>🌏</div>
            </div>

            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 34, fontWeight: 800, lineHeight: 1.15, marginBottom: 14, letterSpacing: -1 }}>
                What's your real<br />
                <span className="shimmer-text">carbon footprint?</span>
              </h1>
              <p style={{ color: t.sub, fontSize: 15, lineHeight: 1.65, maxWidth: 300, margin: '0 auto' }}>
                Small daily habits create a bigger impact than most people realise. Find out where you stand in under 2 minutes.
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
              {['🇮🇳 Built for India', '⚡ 2 min quiz', '🔒 No login needed'].map(label => (
                <div key={label} style={{
                  background: t.dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
                  border: `1px solid ${t.border}`, borderRadius: 50,
                  padding: '5px 14px', fontSize: 12, fontWeight: 600, color: t.sub,
                }}>{label}</div>
              ))}
            </div>

            {/* Score preview */}
            <div className="card-hover" style={{
              background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.08))',
              border: '1px solid rgba(99,102,241,0.25)',
              borderRadius: 20, padding: '20px', marginBottom: 14,
              animation: 'counterUp 0.8s ease 0.3s both',
            }}>
              <div style={{ fontSize: 11, color: t.sub, marginBottom: 10, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>Example Result</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 36, fontWeight: 800, color: '#6366f1', letterSpacing: -1 }}>
                    1.2 <span style={{ fontSize: 16, fontWeight: 600 }}>tons/yr</span>
                  </div>
                  <div style={{ fontSize: 13, color: t.sub, marginTop: 4 }}>🌱 Getting Started · 25% below avg</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 11, color: t.sub, marginBottom: 6 }}>Breakdown</div>
                  {[['⚡','34%'],['🚗','28%'],['🥘','24%'],['🛍️','14%']].map(([ic,pct]) => (
                    <div key={ic} style={{ fontSize: 12, color: t.sub }}>{ic} {pct}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Why it matters */}
            <div style={{
              background: t.dark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
              border: `1px solid ${t.border}`, borderRadius: 20,
              padding: '18px 20px', marginBottom: 16,
              animation: 'counterUp 0.8s ease 0.5s both',
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>💡 Why this matters</div>
              <div style={{ fontSize: 13, color: t.sub, lineHeight: 1.7 }}>
                The average Indian emits <span style={{ color: '#6366f1', fontWeight: 700 }}>1.6 tons</span> of CO₂ yearly — but most people have no idea where their emissions come from. Carbonly shows you exactly that.
              </div>
            </div>

            {/* What we measure */}
            <div style={{ marginBottom: 24, animation: 'counterUp 0.8s ease 0.6s both' }}>
              <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 12, color: t.sub, letterSpacing: 1 }}>WHAT WE MEASURE</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {[
                  ['⚡','Energy','Home electricity usage'],
                  ['🚗','Travel','Car, flights & commute'],
                  ['🥘','Food','Diet & eating habits'],
                  ['🛍️','Lifestyle','Shopping & consumption'],
                ].map(([ic,title,desc]) => (
                  <div key={title} className="card-hover" style={{
                    background: t.card, border: `1px solid ${t.border}`,
                    borderRadius: 16, padding: '14px',
                    boxShadow: t.dark ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 16px rgba(0,0,0,0.05)',
                  }}>
                    <div style={{ fontSize: 24, marginBottom: 6 }}>{ic}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 3 }}>{title}</div>
                    <div style={{ fontSize: 11, color: t.sub, lineHeight: 1.4 }}>{desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="btn-pulse">
              <BtnPrimary onClick={() => setStep(1)}>See My Carbon Score →</BtnPrimary>
            </div>
            <div style={{ textAlign: 'center', marginTop: 12, fontSize: 12, color: t.sub }}>
              🔒 No login · No data stored · 100% free
            </div>
          </div>
        )}

        {/* ══ STEP 1 — ELECTRICITY ══════════════════════════════════════════ */}
        {step === 1 && (
          <div style={{ animation: 'fadeUp 0.4s ease' }}>
            <StepBar step={0} total={4} />

            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 40, marginBottom: 10 }}>⚡</div>
              <SectionTitle>Home Energy</SectionTitle>
              <Hint>Check your electricity bill for monthly units (kWh). Typical Indian home uses 100–300 kWh/month.</Hint>
            </div>

            <Card>
              <Slider label="Monthly electricity usage" value={data.electricity}
                min={0} max={1000} step={10} onChange={set('electricity')} unit="kWh" />
              <div style={{
                background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)',
                borderRadius: 12, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <span style={{ fontSize: 13, color: t.sub }}>Estimated monthly emissions</span>
                <span style={{ fontSize: 15, fontWeight: 700, color: '#6366f1' }}>≈ {Math.round(data.electricity * 0.8)} kg CO₂</span>
              </div>
            </Card>

            <div style={{ background: t.dark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)', borderRadius: 16, padding: '14px 16px', marginBottom: 20, border: `1px solid ${t.border}` }}>
              <div style={{ fontSize: 12, color: t.sub, lineHeight: 1.6 }}>
                💡 <strong>Tip:</strong> Check your TNEB, BESCOM or local electricity bill for exact units. It's usually on page 1.
              </div>
            </div>

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

            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 40, marginBottom: 10 }}>🚗</div>
              <SectionTitle>Travel</SectionTitle>
              <Hint>Cars and flights are the biggest contributors for most urban Indians.</Hint>
            </div>

            <Card>
              <div style={{ fontSize: 13, fontWeight: 700, color: t.sub, marginBottom: 16, letterSpacing: 0.5 }}>CAR USAGE</div>
              <Slider label="Car travel per week" value={data.carKmPerWeek}
                min={0} max={500} step={5} onChange={set('carKmPerWeek')} unit="km" />
              <div style={{ marginBottom: 10, fontSize: 14, fontWeight: 600 }}>Fuel type</div>
              <ToggleGroup
                options={[{ label: '⛽ Petrol', value: 'petrol' }, { label: '🛢️ Diesel', value: 'diesel' }]}
                value={data.fuelType} onChange={set('fuelType')} />
              <div style={{ marginTop: 14, background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 12, padding: '10px 14px', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 13, color: t.sub }}>Monthly car emissions</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#f59e0b' }}>
                  ≈ {Math.round(data.carKmPerWeek * 4 * 0.12 * (data.fuelType === 'diesel' ? 2.68 : 2.3))} kg CO₂
                </span>
              </div>
            </Card>

            <Card>
              <div style={{ fontSize: 13, fontWeight: 700, color: t.sub, marginBottom: 16, letterSpacing: 0.5 }}>FLIGHTS PER YEAR</div>
              <Slider label="Short-haul flights" value={data.shortFlights}
                min={0} max={20} step={1} onChange={set('shortFlights')} unit="flights" />
              <Slider label="Long-haul flights" value={data.longFlights}
                min={0} max={10} step={1} onChange={set('longFlights')} unit="flights" />
              <div style={{ fontSize: 12, color: t.sub, padding: '10px 14px', background: t.muted, borderRadius: 10 }}>
                ✈️ Short-haul: under 3 hrs (e.g. Mumbai–Delhi) · Long-haul: over 6 hrs (e.g. India–London)
              </div>
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

            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 40, marginBottom: 10 }}>🥘</div>
              <SectionTitle>Food & Lifestyle</SectionTitle>
              <Hint>Your diet and shopping habits contribute more than most people realise.</Hint>
            </div>

            <Card>
              <div style={{ fontSize: 13, fontWeight: 700, color: t.sub, marginBottom: 14, letterSpacing: 0.5 }}>DIET</div>
              <div style={{ marginBottom: 14, fontSize: 14, fontWeight: 600 }}>What best describes your diet?</div>
              <ToggleGroup
                options={[
                  { label: '🥦 Vegetarian', value: 'veg' },
                  { label: '🍗 Occasional', value: 'occasional' },
                  { label: '🥩 Non-veg', value: 'heavy' },
                ]}
                value={data.foodHabit} onChange={set('foodHabit')} />
              <div style={{ marginTop: 14, fontSize: 12, color: t.sub, lineHeight: 1.6, background: t.muted, borderRadius: 10, padding: '10px 14px' }}>
                🌱 Vegetarian diets produce up to 50% less CO₂ than meat-heavy diets
              </div>
            </Card>

            <Card>
              <div style={{ fontSize: 13, fontWeight: 700, color: t.sub, marginBottom: 14, letterSpacing: 0.5 }}>SHOPPING</div>
              <div style={{ marginBottom: 14, fontSize: 14, fontWeight: 600 }}>How often do you shop for new things?</div>
              <ToggleGroup
                options={[
                  { label: '🤏 Low', value: 'low' },
                  { label: '🛒 Medium', value: 'medium' },
                  { label: '🛍️ High', value: 'high' },
                ]}
                value={data.shopping} onChange={set('shopping')} />
              <div style={{ marginTop: 14, fontSize: 12, color: t.sub, background: t.muted, borderRadius: 10, padding: '10px 14px' }}>
                Low = essentials only · Medium = occasional · High = frequent online orders & new purchases
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

            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 40, marginBottom: 10 }}>👀</div>
              <SectionTitle>Quick Review</SectionTitle>
              <Hint>Everything look right? Hit Calculate when ready.</Hint>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
              {[
                ['⚡', 'Electricity', `${data.electricity} kWh/month`],
                ['🚗', 'Car travel',  `${data.carKmPerWeek} km/week · ${data.fuelType}`],
                ['✈️', 'Flights',     `${data.shortFlights} short + ${data.longFlights} long haul/yr`],
                ['🥘', 'Diet',        data.foodHabit === 'veg' ? 'Vegetarian' : data.foodHabit === 'occasional' ? 'Occasional non-veg' : 'Heavy non-veg'],
                ['🛍️', 'Shopping',    data.shopping.charAt(0).toUpperCase() + data.shopping.slice(1)],
              ].map(([ic, lb, val]) => (
                <div key={lb} className="card-hover" style={{
                  background: t.card, border: `1px solid ${t.border}`,
                  borderRadius: 16, padding: '16px 20px',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  boxShadow: t.dark ? '0 2px 16px rgba(0,0,0,0.25)' : '0 2px 12px rgba(0,0,0,0.04)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ fontSize: 22, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(99,102,241,0.1)', borderRadius: 10 }}>{ic}</div>
                    <span style={{ fontSize: 14, fontWeight: 600 }}>{lb}</span>
                  </div>
                  <span style={{ fontSize: 13, color: '#6366f1', fontWeight: 700 }}>{val}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <BtnSecondary onClick={() => setStep(3)} style={{ flex: 1, width: 'auto' }}>← Edit</BtnSecondary>
              <BtnPrimary onClick={goNext} style={{ flex: 2 }}>🔍 Calculate</BtnPrimary>
            </div>
          </div>
        )}

        {/* ══ RESULTS ══════════════════════════════════════════════════════ */}
        {step === 5 && result && (
          <div style={{ animation: 'fadeUp 0.5s ease' }}>

            <ShareCard result={result} badge={badge} />

            {/* Score card */}
            <Card style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: 12, color: t.sub, marginBottom: 6, fontWeight: 600, letterSpacing: 0.5 }}>MONTHLY EMISSIONS</div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 44, fontWeight: 800, letterSpacing: -2, lineHeight: 1 }}>
                    {result.total}
                  </div>
                  <div style={{ fontSize: 16, color: t.sub, marginTop: 4 }}>kg CO₂ / month</div>
                  <div style={{ fontSize: 13, color: t.sub, marginTop: 8 }}>
                    <span style={{ color: '#6366f1', fontWeight: 700 }}>{result.annual} tons</span> per year
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 42 }}>{badge.emoji}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: badge.color, marginTop: 6, maxWidth: 80, lineHeight: 1.3 }}>{badge.label}</div>
                  <div style={{
                    marginTop: 10, fontSize: 12, fontWeight: 700, padding: '5px 12px', borderRadius: 50,
                    background: result.vsAvg > 0 ? 'rgba(239,68,68,0.12)' : 'rgba(34,197,94,0.12)',
                    color: result.vsAvg > 0 ? '#ef4444' : '#22c55e',
                    whiteSpace: 'nowrap',
                  }}>
                    {result.vsAvg > 0 ? `+${result.vsAvg}%` : `${result.vsAvg}%`} vs avg
                  </div>
                </div>
              </div>
            </Card>

            {/* Chart */}
            <Card>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 20 }}>📊 Breakdown</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap', marginBottom: 24 }}>
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
                <div key={i} style={{ display: 'flex', gap: 10, fontSize: 14, marginBottom: 10, lineHeight: 1.6, color: t.sub, padding: '10px 12px', background: t.muted, borderRadius: 10 }}>
                  <span>•</span><span>{insight}</span>
                </div>
              ))}
            </Card>

            {/* Suggestions */}
            <Card>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 16 }}>🎯 What you can do</div>
              {suggestions.map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 10, padding: '14px 16px', borderRadius: 14, background: t.muted, border: `1px solid ${t.border}` }}>
                  <div style={{ fontSize: 24, width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(99,102,241,0.1)', borderRadius: 10, flexShrink: 0 }}>{s.icon}</div>
                  <span style={{ fontSize: 14, lineHeight: 1.6, color: t.sub, paddingTop: 4 }}>{s.text}</span>
                </div>
              ))}
            </Card>

            {/* Offset */}
            <Card style={{ background: t.dark ? 'rgba(34,197,94,0.06)' : 'rgba(34,197,94,0.04)', border: '1px solid rgba(34,197,94,0.2)' }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 6 }}>🌳 Offset your footprint</div>
              <div style={{ fontSize: 13, color: t.sub, marginBottom: 16 }}>Support environmental projects to balance your impact</div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
                {[...new Set([100, 500, 1000, offsetCost])].sort((a, b) => a - b).map(amt => (
                  <button key={amt} onClick={() => setOffsetAmt(amt)} style={{
                    flex: 1, minWidth: 60, padding: '10px 4px', borderRadius: 12, cursor: 'pointer',
                    border: offsetAmt === amt ? '2px solid #22c55e' : `2px solid ${t.border}`,
                    background: offsetAmt === amt ? 'rgba(34,197,94,0.15)' : t.muted,
                    color: offsetAmt === amt ? '#22c55e' : t.text,
                    fontWeight: offsetAmt === amt ? 700 : 500,
                    fontSize: 14, fontFamily: "'DM Sans', sans-serif",
                    transition: 'all 0.2s',
                  }}>₹{amt}</button>
                ))}
              </div>
              <div style={{ fontSize: 13, color: t.sub, marginBottom: 16, padding: '10px 14px', background: 'rgba(34,197,94,0.06)', borderRadius: 10 }}>
                ₹{offsetAmt} offsets approx. <strong style={{ color: '#22c55e' }}>{(offsetAmt / 500).toFixed(1)} tons</strong> CO₂ &nbsp;·&nbsp; 1 ton ≈ ₹500
              </div>
              <BtnPrimary green>Support with ₹{offsetAmt}</BtnPrimary>
              <div style={{ marginTop: 12, fontSize: 11, color: t.sub, textAlign: 'center', lineHeight: 1.6 }}>
                ⚠️ This supports environmental projects. Not a certified carbon credit.
              </div>
            </Card>

            {/* Methodology */}
            <div style={{ borderRadius: 16, padding: '16px 18px', marginBottom: 14, border: `1px solid ${t.border}`, background: t.muted }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>📋 About these estimates</div>
              <div style={{ fontSize: 12, color: t.sub, lineHeight: 1.7 }}>
                Calculations use standard emission factors: electricity (CEA India grid: 0.8 kg CO₂/kWh), petrol (2.3 kg/litre), diesel (2.68 kg/litre), flights (ICAO factors), food and lifestyle (lifecycle averages). India average from World Bank data (~1.6 tons/year).<br /><br />
                These are <strong>approximations for awareness</strong> — not for regulatory or financial reporting.
              </div>
            </div>

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