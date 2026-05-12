import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Card } from './UI';

export default function WaitlistForm({ result }) {
  const t = useTheme();
  const [name,   setName]   = useState('');
  const [email,  setEmail]  = useState('');
  const [status, setStatus] = useState('idle');
  const [error,  setError]  = useState('');

  const validate = () => {
    if (!name.trim())  return 'Please enter your name';
    if (!email.trim()) return 'Please enter your email';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email';
    return null;
  };

  const handleSubmit = () => {
    const err = validate();
    if (err) { setError(err); return; }
    window.open('https://tally.so/r/0Q1y7N', '_blank');
    setStatus('success');
  };

  const inputStyle = {
    width: '100%',
    background: t.input,
    border: `1.5px solid ${t.border}`,
    borderRadius: 12,
    padding: '13px 16px',
    fontSize: 15,
    color: t.text,
    fontFamily: "'DM Sans', sans-serif",
    outline: 'none',
    transition: 'border-color 0.2s',
    marginBottom: 12,
  };

  if (status === 'success') {
    return (
      <Card style={{ textAlign: 'center', padding: '32px 24px', animation: 'fadeUp 0.5s ease' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20, marginBottom: 8 }}>
          You're on the list, {name.split(' ')[0]}!
        </div>
        <div style={{ color: t.sub, fontSize: 14, lineHeight: 1.6 }}>
          We'll let you know when the Carbonly app launches. No spam, ever.
        </div>
        <div style={{
          marginTop: 16, display: 'inline-block',
          background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.25)',
          borderRadius: 50, padding: '6px 16px', fontSize: 13, color: '#22c55e', fontWeight: 600,
        }}>
          ✓ Waitlist confirmed
        </div>
      </Card>
    );
  }

  return (
    <Card accent style={{ animation: 'fadeUp 0.4s ease' }}>
      <div style={{ marginBottom: 18 }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18, marginBottom: 6 }}>
          📬 Stay in the loop
        </div>
        <div style={{ color: t.sub, fontSize: 13, lineHeight: 1.6 }}>
          Get early access to the Carbonly app — free.
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
        {[
          ['📊', 'Monthly footprint report in your inbox'],
          ['🏢', 'Early access to corporate team tracking'],
          ['🏅', 'Exclusive badges and impact milestones'],
        ].map(([ic, text]) => (
          <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: t.sub }}>
            <span style={{ fontSize: 16 }}>{ic}</span>
            <span>{text}</span>
          </div>
        ))}
      </div>

      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={e => setName(e.target.value)}
        style={inputStyle}
        onFocus={e => (e.target.style.borderColor = '#6366f1')}
        onBlur={e  => (e.target.style.borderColor = t.border)}
      />
      <input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ ...inputStyle, marginBottom: 0 }}
        onFocus={e => (e.target.style.borderColor = '#6366f1')}
        onBlur={e  => (e.target.style.borderColor = t.border)}
        onKeyDown={e => e.key === 'Enter' && handleSubmit()}
      />

      {error && (
        <div style={{ fontSize: 13, color: '#ef4444', marginTop: 8, marginBottom: 4 }}>
          ⚠️ {error}
        </div>
      )}

      <button
        onClick={handleSubmit}
        style={{
          marginTop: 14,
          width: '100%',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          border: 'none',
          borderRadius: 14,
          padding: '15px',
          color: '#fff',
          fontSize: 15,
          fontWeight: 700,
          cursor: 'pointer',
          fontFamily: "'DM Sans', sans-serif",
          boxShadow: '0 4px 20px rgba(99,102,241,0.3)',
        }}
      >
        Join the waitlist →
      </button>

      <div style={{ marginTop: 10, fontSize: 11, color: t.sub, textAlign: 'center' }}>
        No spam. Unsubscribe anytime.
      </div>
    </Card>
  );
}