// ─── Emission Factors ─────────────────────────────────────────────────────────
export const EMISSION = {
  electricity: 0.8,       // kg CO2 per kWh (India grid average)
  petrol: 2.3,            // kg CO2 per litre
  diesel: 2.68,           // kg CO2 per litre
  carEfficiency: 0.12,    // litres per km (avg Indian car)
  shortHaulKm: 1200,      // avg km per short haul flight
  longHaulKm: 8000,       // avg km per long haul flight
  shortHaulFactor: 0.25,  // kg CO2 per passenger km
  longHaulFactor: 0.15,   // kg CO2 per passenger km
  food: {
    veg: 50,              // kg CO2 / month
    occasional: 120,
    heavy: 200,
  },
  shopping: {
    low: 20,              // kg CO2 / month
    medium: 60,
    high: 120,
  },
};

export const INDIA_AVG_MONTHLY = 133; // ~1.6 tons/year

// ─── Main Calculation ─────────────────────────────────────────────────────────
export function calculate(data) {
  const electricity = (data.electricity || 0) * EMISSION.electricity;

  const fuelFactor = data.fuelType === 'diesel' ? EMISSION.diesel : EMISSION.petrol;
  const carMonthly = (data.carKmPerWeek || 0) * 4 * EMISSION.carEfficiency * fuelFactor;

  const shortHaul =
    ((data.shortFlights || 0) / 12) * EMISSION.shortHaulKm * EMISSION.shortHaulFactor;
  const longHaul =
    ((data.longFlights || 0) / 12) * EMISSION.longHaulKm * EMISSION.longHaulFactor;
  const travel = carMonthly + shortHaul + longHaul;

  const food      = EMISSION.food[data.foodHabit || 'veg'];
  const lifestyle = EMISSION.shopping[data.shopping || 'medium'];

  const total = electricity + travel + food + lifestyle;

  return {
    electricity: Math.round(electricity),
    travel:      Math.round(travel),
    food:        Math.round(food),
    lifestyle:   Math.round(lifestyle),
    total:       Math.round(total),
    annual:      Math.round((total * 12) / 1000 * 10) / 10,
    vsAvg:       Math.round(((total - INDIA_AVG_MONTHLY) / INDIA_AVG_MONTHLY) * 100),
  };
}

// ─── Badge ────────────────────────────────────────────────────────────────────
export function getBadge(annual) {
  if (annual < 1)   return { label: 'Eco Hero',        emoji: '🌿', color: '#22c55e' };
  if (annual < 1.6) return { label: 'Getting Started', emoji: '🌱', color: '#84cc16' };
  if (annual < 2.5) return { label: 'Climate Aware',   emoji: '🌍', color: '#f59e0b' };
  return              { label: 'Room to Grow',          emoji: '🔥', color: '#ef4444' };
}

// ─── Personalised Suggestions ─────────────────────────────────────────────────
export function getSuggestions(data, result) {
  const s = [];

  if (result.electricity > 60)
    s.push({ icon: '💡', text: 'Switch to LED bulbs — saves up to ₹500/month on your electricity bill' });

  if ((data.carKmPerWeek || 0) > 50)
    s.push({ icon: '🚲', text: `Carpool or use public transit 2 days a week — saves ~${Math.round(result.travel * 0.2)} kg CO₂/month` });

  if (data.foodHabit !== 'veg')
    s.push({ icon: '🥗', text: 'Try 2 vegetarian days per week — small habit, big planetary impact' });

  if (data.shopping === 'high')
    s.push({ icon: '♻️', text: 'Buy second-hand or rent for your next non-essential purchase' });

  if ((data.shortFlights || 0) > 4)
    s.push({ icon: '🚆', text: 'Replace one short-haul flight with a train ride this year' });

  if (s.length < 3)
    s.push({ icon: '🌳', text: 'Plant a tree or support a local green initiative this month' });

  return s.slice(0, 5);
}

// ─── Category colors & labels ─────────────────────────────────────────────────
export const CATEGORY_META = {
  electricity: { label: 'Electricity', icon: '⚡', color: '#6366f1' },
  travel:      { label: 'Travel',      icon: '🚗', color: '#f59e0b' },
  food:        { label: 'Food',         icon: '🥘', color: '#22c55e' },
  lifestyle:   { label: 'Lifestyle',   icon: '🛍️', color: '#ec4899' },
};
