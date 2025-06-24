
import React, { createContext, useContext, ReactNode, useState } from 'react';
import { glassThemes, GlassTheme } from '@/config/themes';

interface TextStyles {
  primary: string;
  secondary: string;
  muted: string;
}

interface GlassThemeContextType {
  currentTheme: GlassTheme;
  setTheme: (theme: GlassTheme) => void;
  getThemeStyle: (element: string) => string | TextStyles;
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

export const GlassThemeProvider: React.FC<GlassThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<GlassTheme>('ocean');

  const setTheme = (theme: GlassTheme) => {
    setCurrentTheme(theme);
  };

  const getThemeStyle = (element: string): string | TextStyles => {
    const theme = glassThemes[currentTheme];
    return theme[element as keyof typeof theme] || '';
  };

  return (
    <GlassThemeContext.Provider value={{ currentTheme, setTheme, getThemeStyle }}>
      {children}
    </GlassThemeContext.Provider>
  );
};
