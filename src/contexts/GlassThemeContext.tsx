
import React, { createContext, useContext, ReactNode, useState, useCallback } from 'react';
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

  const setTheme = useCallback((theme: GlassTheme) => {
    // Validate theme exists before setting
    if (glassThemes[theme]) {
      setCurrentTheme(theme);
    } else {
      console.warn(`Theme "${theme}" does not exist, falling back to ocean`);
      setCurrentTheme('ocean');
    }
  }, []);

  const getThemeStyle = useCallback((element: string): string | TextStyles => {
    try {
      const theme = glassThemes[currentTheme];
      if (!theme) {
        console.warn(`Theme "${currentTheme}" not found, using ocean`);
        return glassThemes.ocean[element as keyof typeof glassThemes.ocean] || '';
      }
      return theme[element as keyof typeof theme] || '';
    } catch (error) {
      console.warn('Error getting theme style:', error);
      return '';
    }
  }, [currentTheme]);

  return (
    <GlassThemeContext.Provider value={{ currentTheme, setTheme, getThemeStyle }}>
      {children}
    </GlassThemeContext.Provider>
  );
};
