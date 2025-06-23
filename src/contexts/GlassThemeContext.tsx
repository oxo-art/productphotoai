
import React, { createContext, useContext, ReactNode } from 'react';

interface GlassThemeContextType {
  getThemeStyle: (element: string) => string | { primary: string; secondary: string; muted: string };
}

const GlassThemeContext = createContext<GlassThemeContextType | undefined>(undefined);

export const useGlassTheme = () => {
  const context = useContext(GlassThemeContext);
  if (!context) {
    throw new Error('useGlassTheme must be used within a GlassThemeProvider');
  }
  return context;
};

interface GlassThemeProviderProps {
  children: ReactNode;
}

// Fixed glass theme with proper text styles
const glassTheme = {
  background: 'from-blue-900/20 via-purple-900/20 to-pink-900/20',
  navbar: 'bg-white/5 backdrop-blur-xl',
  card: 'bg-white/10 backdrop-blur-xl border border-white/20',
  cardHover: 'bg-white/20 backdrop-blur-xl',
  button: 'bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20',
  buttonPrimary: 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700',
  input: 'bg-white/10 backdrop-blur-sm border border-white/20 focus:border-white/40',
  popover: 'bg-black/80 backdrop-blur-xl border border-white/20',
  shadow: 'shadow-2xl shadow-black/20',
  text: {
    primary: 'text-white',
    secondary: 'text-white/80',
    muted: 'text-white/60'
  }
};

export const GlassThemeProvider: React.FC<GlassThemeProviderProps> = ({ children }) => {
  const getThemeStyle = (element: string) => {
    if (element === 'text') {
      return glassTheme.text;
    }
    return glassTheme[element as keyof typeof glassTheme] as string;
  };

  return (
    <GlassThemeContext.Provider value={{ getThemeStyle }}>
      {children}
    </GlassThemeContext.Provider>
  );
};
