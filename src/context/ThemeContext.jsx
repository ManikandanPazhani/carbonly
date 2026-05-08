import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(true);

  const theme = {
    dark,
    toggle: () => setDark(d => !d),
    bg:      dark ? '#0a0a0f'                    : '#f5f5f7',
    card:    dark ? '#13131a'                    : '#ffffff',
    text:    dark ? '#f0f0f5'                    : '#0a0a0f',
    sub:     dark ? 'rgba(240,240,245,0.5)'      : 'rgba(10,10,15,0.5)',
    border:  dark ? 'rgba(255,255,255,0.07)'     : 'rgba(0,0,0,0.08)',
    muted:   dark ? 'rgba(255,255,255,0.04)'     : 'rgba(0,0,0,0.03)',
    input:   dark ? 'rgba(255,255,255,0.06)'     : 'rgba(0,0,0,0.05)',
  };

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
