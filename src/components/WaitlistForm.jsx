import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Card } from './UI';

/**
 * WaitlistForm
 * Collects name + email from the user after they see their results.
 * Stores locally (localStorage) to simulate a waitlist —
 * swap the handleSubmit function for a real API call (Mailchimp,
 * Supabase, Tally webhook, etc.) when you're ready.
 */
export default function WaitlistForm({ result }) {
  const t = useTheme();
  const [name,    setName]    = useState('');
  const [email,   setEmail]   = useState('');
  const [status,  setStatus]  = useState('idle'); // idle | loading | success | error
  const [error,   setError]   = useState('');

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

    // ── Simulate save (replace with real API call) ────────────────────────────
    // Example real call:
    // fetch('https://your-api.com/waitlist', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ name, email, footprint: result?.annual }),
    // })
    // ─────────────────────────────────────────────────────────────────────────

    setTimeout(() => {
      try {
        const existing = JSON.parse(localStorage.getItem('carbonly_waitlist') || '[]');
        const alreadyIn = existing.some(e => e.email === email);
        if (alreadyIn) {
          setStatus('success'); // still show success — don't tell the user they're duped
          return;
        }
        existing.push({ name, email, footprint: result?.annual, joinedAt: new Date().toISOString() });
        localStorage.setItem('carbonly_waitlist', JSON.stringify(existing));
        setStatus('success');
      } catch {
        setStatus('error');
      }
    }, 900);
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
          We'll let you know when company reports, monthly tracking,<br />
          and the Carbonly app launch. No spam, ever.
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
      {/* Header */}
      <div style={{ marginBottom: 18 }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18, marginBottom: 6 }}>
          📬 Stay in the loop
        </div>
        <div style={{ color: t.sub, fontSize: 13, lineHeight: 1.6 }}>
          Get monthly tracking, company carbon reports, and early access to the Carbonly app — free.
        </div>
      </div>

      {/* Perks */}
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

      {/* Inputs */}
      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={e => setName(e.target.value)}
        style={inputStyle}
        onFocus={e  => (e.target.style.borderColor = '#6366f1')}
        onBlur={e   => (e.target.style.borderColor = t.border)}
      />
      <input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ ...inputStyle, marginBottom: 0 }}
        onFocus={e  => (e.target.style.borderColor = '#6366f1')}
        onBlur={e   => (e.target.style.borderColor = t.border)}
        onKeyDown={e => e.key === 'Enter' && handleSubmit()}
      />

      {/* Error */}
      {error && (
        <div style={{ fontSize: 13, color: '#ef4444', marginTop: 8, marginBottom: 4 }}>
          ⚠️ {error}
        </div>
      )}

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={status === 'loading'}
        style={{
          marginTop: 14,
          width: '100%',
          background: status === 'loading'
            ? 'rgba(99,102,241,0.4)'
            : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          border: 'none',
          borderRadius: 14,
          padding: '15px',
          color: '#fff',
          fontSize: 15,
          fontWeight: 700,
          cursor: status === 'loading' ? 'not-allowed' : 'pointer',
          fontFamily: "'DM Sans', sans-serif",
          boxShadow: '0 4px 20px rgba(99,102,241,0.3)',
          transition: 'all 0.2s',
          animation: status === 'loading' ? 'pulse 1s infinite' : 'none',
        }}
      >
        {status === 'loading' ? 'Joining…' : 'Join the waitlist →'}
      </button>

      <div style={{ marginTop: 10, fontSize: 11, color: t.sub, textAlign: 'center' }}>
        No spam. Unsubscribe anytime.
      </div>

      {status === 'error' && (
        <div style={{ fontSize: 13, color: '#ef4444', textAlign: 'center', marginTop: 8 }}>
          Something went wrong. Please try again.
        </div>
      )}
    </Card>
  );
}
