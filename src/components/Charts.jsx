import { useTheme } from '../context/ThemeContext';
import { CATEGORY_META } from '../utils/calculator';

// ─── Donut Chart ──────────────────────────────────────────────────────────────
export function DonutChart({ data, total }) {
  const t = useTheme();
  const SIZE = 180, cx = 90, cy = 90, R = 72, IR = 44;

  let cumulative = 0;
  const slices = Object.entries(data).map(([key, val]) => {
    const frac  = val / (total || 1);
    const start = cumulative * 2 * Math.PI - Math.PI / 2;
    cumulative += frac;
    const end   = cumulative * 2 * Math.PI - Math.PI / 2;

    const x1 = cx + R  * Math.cos(start), y1 = cy + R  * Math.sin(start);
    const x2 = cx + R  * Math.cos(end),   y2 = cy + R  * Math.sin(end);
    const ix1= cx + IR * Math.cos(end),   iy1= cy + IR * Math.sin(end);
    const ix2= cx + IR * Math.cos(start), iy2= cy + IR * Math.sin(start);
    const lg = frac > 0.5 ? 1 : 0;

    return {
      key,
      color: CATEGORY_META[key].color,
      path: `M ${x1} ${y1} A ${R} ${R} 0 ${lg} 1 ${x2} ${y2} L ${ix1} ${iy1} A ${IR} ${IR} 0 ${lg} 0 ${ix2} ${iy2} Z`,
    };
  });

  return (
    <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} style={{ flexShrink: 0 }}>
      {slices.map(s => (
        <path key={s.key} d={s.path} fill={s.color} opacity={0.9} />
      ))}
      <circle cx={cx} cy={cy} r={IR - 2} fill={t.dark ? '#111' : '#fff'} />
    </svg>
  );
}

// ─── Horizontal Bar Chart ─────────────────────────────────────────────────────
export function BarChart({ data, total }) {
  const t = useTheme();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
      {Object.entries(data).map(([key, val]) => {
        const meta = CATEGORY_META[key];
        const pct  = Math.round((val / (total || 1)) * 100);
        return (
          <div key={key}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 5, fontFamily: "'DM Sans', sans-serif" }}>
              <span style={{ color: t.text }}>{meta.icon} {meta.label}</span>
              <span style={{ color: meta.color, fontWeight: 700 }}>{val} kg · {pct}%</span>
            </div>
            <div style={{ background: t.dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)', borderRadius: 6, height: 8, overflow: 'hidden' }}>
              <div style={{
                width: `${pct}%`, background: meta.color,
                height: '100%', borderRadius: 6,
                transition: 'width 1.2s cubic-bezier(0.4,0,0.2,1)',
              }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Legend ───────────────────────────────────────────────────────────────────
export function ChartLegend({ data }) {
  const t = useTheme();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1, minWidth: 140 }}>
      {Object.entries(data).map(([key, val]) => {
        const meta = CATEGORY_META[key];
        return (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: 3, background: meta.color, flexShrink: 0 }} />
            <span style={{ flex: 1, fontSize: 13, color: t.sub }}>{meta.label}</span>
            <span style={{ fontWeight: 700, fontSize: 13, color: meta.color }}>{val}kg</span>
          </div>
        );
      })}
    </div>
  );
}
