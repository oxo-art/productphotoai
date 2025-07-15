
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { GradientTheme, gradientThemes } from '@/config/gradients';

interface GradientThemeContextType {
  currentTheme: GradientTheme;
  setTheme: (theme: GradientTheme) => void;
  getGradient: (type: keyof typeof gradientThemes.cosmic) => string;
  getAllThemes: () => Array<{ key: GradientTheme; name: string }>;
}

const GradientThemeContext = createContext<GradientThemeContextType | undefined>(undefined);

export const useGradientTheme = () => {
  const context = useContext(GradientThemeContext);
  if (!context) {
    throw new Error('useGradientTheme must be used within a GradientThemeProvider');
  }
  return context;
};

interface GradientThemeProviderProps {
  children: ReactNode;
}

export const GradientThemeProvider: React.FC<GradientThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<GradientTheme>('grayscale');

  const setTheme = (theme: GradientTheme) => {
    setCurrentTheme(theme);
  };

  const getGradient = (type: keyof typeof gradientThemes.cosmic) => {
    return gradientThemes[currentTheme][type] as string;
  };

  const getAllThemes = () => {
    return Object.entries(gradientThemes).map(([key, value]) => ({
      key: key as GradientTheme,
      name: value.name
    }));
  };

  return (
    <GradientThemeContext.Provider
      value={{
        currentTheme,
        setTheme,
        getGradient,
        getAllThemes
      }}
    >
      {children}
    </GradientThemeContext.Provider>
  );
};
