import { useTheme } from '../context/ThemeContext';

// ─── Card ─────────────────────────────────────────────────────────────────────
export function Card({ children, style = {}, accent = false }) {
  const t = useTheme();
  return (
    <div style={{
      background: accent
        ? (t.dark ? 'rgba(99,102,241,0.08)' : 'rgba(99,102,241,0.05)')
        : t.card,
      borderRadius: 24,
      padding: '24px 20px',
      border: `1px solid ${accent ? 'rgba(99,102,241,0.2)' : t.border}`,
      marginBottom: 14,
      boxShadow: t.dark
        ? '0 4px 40px rgba(0,0,0,0.35)'
        : '0 4px 24px rgba(0,0,0,0.06)',
      ...style,
    }}>
      {children}
    </div>
  );
}

// ─── Step Progress Bar ────────────────────────────────────────────────────────
export function StepBar({ step, total }) {
  const t = useTheme();
  return (
    <div style={{ display: 'flex', gap: 6, marginBottom: 28 }}>
      {Array.from({ length: total }, (_, i) => (
        <div key={i} style={{
          height: 4, flex: 1, borderRadius: 4,
          background: i <= step ? '#6366f1' : t.border,
          transition: 'background 0.4s',
        }} />
      ))}
    </div>
  );
}

// ─── Slider ───────────────────────────────────────────────────────────────────
export function Slider({ label, value, min, max, step, onChange, unit }) {
  const t = useTheme();
  return (
    <div style={{ marginBottom: 22 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
        <span style={{ fontSize: 14, color: t.sub, fontFamily: "'DM Sans', sans-serif" }}>{label}</span>
        <span style={{ fontWeight: 700, fontSize: 15, color: '#6366f1', fontFamily: "'DM Sans', sans-serif" }}>
          {value} <span style={{ fontWeight: 500, fontSize: 13 }}>{unit}</span>
        </span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{ width: '100%' }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: t.sub, marginTop: 4, opacity: 0.5 }}>
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

// ─── Toggle Group ─────────────────────────────────────────────────────────────
export function ToggleGroup({ options, value, onChange }) {
  const t = useTheme();
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {options.map(o => {
        const active = value === o.value;
        return (
          <button key={o.value} onClick={() => onChange(o.value)} style={{
            padding: '10px 18px',
            borderRadius: 50,
            border: active ? '2px solid #6366f1' : `2px solid ${t.border}`,
            background: active ? 'rgba(99,102,241,0.15)' : 'transparent',
            color: active ? '#6366f1' : t.text,
            fontWeight: active ? 700 : 500,
            fontSize: 14,
            fontFamily: "'DM Sans', sans-serif",
            transition: 'all 0.2s',
            cursor: 'pointer',
          }}>
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

// ─── Primary Button ───────────────────────────────────────────────────────────
export function BtnPrimary({ children, onClick, style = {}, green = false }) {
  return (
    <button onClick={onClick} style={{
      background: green
        ? 'linear-gradient(135deg, #22c55e, #16a34a)'
        : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
      border: 'none',
      borderRadius: 16,
      padding: '16px 32px',
      color: '#fff',
      fontSize: 16,
      fontWeight: 700,
      cursor: 'pointer',
      width: '100%',
      fontFamily: "'DM Sans', sans-serif",
      boxShadow: green
        ? '0 4px 20px rgba(34,197,94,0.3)'
        : '0 4px 20px rgba(99,102,241,0.35)',
      transition: 'transform 0.15s, box-shadow 0.15s',
      letterSpacing: 0.3,
      ...style,
    }}>
      {children}
    </button>
  );
}

// ─── Secondary Button ─────────────────────────────────────────────────────────
export function BtnSecondary({ children, onClick, style = {} }) {
  const t = useTheme();
  return (
    <button onClick={onClick} style={{
      background: 'transparent',
      border: `1.5px solid ${t.border}`,
      borderRadius: 16,
      padding: '14px 32px',
      color: t.text,
      fontSize: 15,
      fontWeight: 600,
      cursor: 'pointer',
      width: '100%',
      fontFamily: "'DM Sans', sans-serif",
      transition: 'all 0.2s',
      ...style,
    }}>
      {children}
    </button>
  );
}

// ─── Section Heading ──────────────────────────────────────────────────────────
export function SectionTitle({ children }) {
  return (
    <h2 style={{
      fontFamily: "'Syne', sans-serif",
      fontSize: 26,
      fontWeight: 800,
      marginBottom: 6,
      letterSpacing: -0.5,
      lineHeight: 1.2,
    }}>
      {children}
    </h2>
  );
}

// ─── Hint Text ────────────────────────────────────────────────────────────────
export function Hint({ children }) {
  const t = useTheme();
  return (
    <p style={{ color: t.sub, fontSize: 14, marginBottom: 22, lineHeight: 1.5 }}>
      {children}
    </p>
  );
}

// ─── Inline Stat Chip ─────────────────────────────────────────────────────────
export function StatChip({ children }) {
  return (
    <div style={{
      background: 'rgba(99,102,241,0.08)',
      border: '1px solid rgba(99,102,241,0.15)',
      borderRadius: 12,
      padding: '10px 14px',
      fontSize: 13,
      color: '#6366f1',
      fontWeight: 600,
    }}>
      {children}
    </div>
  );
}
