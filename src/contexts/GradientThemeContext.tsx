
import React, { createContext, useContext, useState, useEffect } from 'react';
import { gradientThemes, type GradientTheme } from '@/config/gradients';

interface GradientThemeContextType {
  currentTheme: GradientTheme;
  setTheme: (theme: GradientTheme) => void;
  getThemeClasses: () => typeof gradientThemes[GradientTheme];
}

const GradientThemeContext = createContext<GradientThemeContextType | undefined>(undefined);

export const GradientThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<GradientTheme>('cosmic');

  useEffect(() => {
    const savedTheme = localStorage.getItem('gradient-theme') as GradientTheme;
    if (savedTheme && gradientThemes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  const setTheme = (theme: GradientTheme) => {
    setCurrentTheme(theme);
    localStorage.setItem('gradient-theme', theme);
  };

  const getThemeClasses = () => gradientThemes[currentTheme];

  return (
    <GradientThemeContext.Provider value={{ currentTheme, setTheme, getThemeClasses }}>
      {children}
    </GradientThemeContext.Provider>
  );
};

export const useGradientTheme = () => {
  const context = useContext(GradientThemeContext);
  if (context === undefined) {
    throw new Error('useGradientTheme must be used within a GradientThemeProvider');
  }
  return context;
};
