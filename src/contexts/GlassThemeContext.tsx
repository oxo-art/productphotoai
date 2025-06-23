
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { GlassTheme, glassThemes } from '@/config/themes';

interface GlassThemeContextType {
  currentTheme: GlassTheme;
  setTheme: (theme: GlassTheme) => void;
  getThemeStyle: (element: keyof typeof glassThemes.default) => string;
  getAllThemes: () => Array<{ key: GlassTheme; name: string }>;
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
  const [currentTheme, setCurrentTheme] = useState<GlassTheme>('default');

  const setTheme = (theme: GlassTheme) => {
    setCurrentTheme(theme);
  };

  const getThemeStyle = (element: keyof typeof glassThemes.default) => {
    return glassThemes[currentTheme][element] as string;
  };

  const getAllThemes = () => {
    return Object.entries(glassThemes).map(([key, value]) => ({
      key: key as GlassTheme,
      name: value.name
    }));
  };

  return (
    <GlassThemeContext.Provider
      value={{
        currentTheme,
        setTheme,
        getThemeStyle,
        getAllThemes
      }}
    >
      {children}
    </GlassThemeContext.Provider>
  );
};
