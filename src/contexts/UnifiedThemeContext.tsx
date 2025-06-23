
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { GradientTheme } from '@/config/gradients';
import { GlassTheme } from '@/config/themes';
import { ArtisticTheme } from '@/config/themes';

export type ThemeMode = 'gradient' | 'glass' | 'artistic';

interface UnifiedThemeContextType {
  // Current theme mode
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  
  // Individual theme selections
  gradientTheme: GradientTheme;
  glassTheme: GlassTheme;
  artisticTheme: ArtisticTheme;
  
  // Theme setters
  setGradientTheme: (theme: GradientTheme) => void;
  setGlassTheme: (theme: GlassTheme) => void;
  setArtisticTheme: (theme: ArtisticTheme) => void;
  
  // Utility functions
  cycleThemeMode: () => void;
  getThemeIcon: () => React.ReactNode;
  getNextThemeName: () => string;
  getCurrentThemeName: () => string;
  
  // Animation state
  isTransitioning: boolean;
}

const UnifiedThemeContext = createContext<UnifiedThemeContextType | undefined>(undefined);

export const useUnifiedTheme = () => {
  const context = useContext(UnifiedThemeContext);
  if (!context) {
    throw new Error('useUnifiedTheme must be used within a UnifiedThemeProvider');
  }
  return context;
};

interface UnifiedThemeProviderProps {
  children: ReactNode;
}

export const UnifiedThemeProvider: React.FC<UnifiedThemeProviderProps> = ({ children }) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>('gradient');
  const [gradientTheme, setGradientTheme] = useState<GradientTheme>('cosmic');
  const [glassTheme, setGlassTheme] = useState<GlassTheme>('default');
  const [artisticTheme, setArtisticTheme] = useState<ArtisticTheme>('artDeco');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Load themes from localStorage on mount
  useEffect(() => {
    const savedThemeMode = localStorage.getItem('themeMode') as ThemeMode;
    const savedGradientTheme = localStorage.getItem('gradientTheme') as GradientTheme;
    const savedGlassTheme = localStorage.getItem('glassTheme') as GlassTheme;
    const savedArtisticTheme = localStorage.getItem('artisticTheme') as ArtisticTheme;

    if (savedThemeMode) setThemeModeState(savedThemeMode);
    if (savedGradientTheme) setGradientTheme(savedGradientTheme);
    if (savedGlassTheme) setGlassTheme(savedGlassTheme);
    if (savedArtisticTheme) setArtisticTheme(savedArtisticTheme);
  }, []);

  // Save to localStorage when themes change
  useEffect(() => {
    localStorage.setItem('themeMode', themeMode);
  }, [themeMode]);

  useEffect(() => {
    localStorage.setItem('gradientTheme', gradientTheme);
  }, [gradientTheme]);

  useEffect(() => {
    localStorage.setItem('glassTheme', glassTheme);
  }, [glassTheme]);

  useEffect(() => {
    localStorage.setItem('artisticTheme', artisticTheme);
  }, [artisticTheme]);

  const setThemeMode = (mode: ThemeMode) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setThemeModeState(mode);
      setTimeout(() => setIsTransitioning(false), 100);
    }, 150);
  };

  const cycleThemeMode = () => {
    const modes: ThemeMode[] = ['gradient', 'glass', 'artistic'];
    const currentIndex = modes.indexOf(themeMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setThemeMode(modes[nextIndex]);
  };

  const getThemeIcon = () => {
    const iconProps = "w-4 h-4 mr-2";
    if (themeMode === 'gradient') return React.createElement('div', { className: `${iconProps} bg-gradient-to-r from-blue-500 to-purple-500 rounded` });
    if (themeMode === 'glass') return React.createElement('div', { className: `${iconProps} bg-white/20 backdrop-blur-sm border border-white/30 rounded` });
    return React.createElement('div', { className: `${iconProps} bg-gradient-to-r from-amber-500 to-yellow-600 rounded` });
  };

  const getNextThemeName = () => {
    if (themeMode === 'gradient') return 'Glass';
    if (themeMode === 'glass') return 'Artistic';
    return 'Gradient';
  };

  const getCurrentThemeName = () => {
    if (themeMode === 'gradient') return 'Gradient';
    if (themeMode === 'glass') return 'Glass';
    return 'Artistic';
  };

  return (
    <UnifiedThemeContext.Provider
      value={{
        themeMode,
        setThemeMode,
        gradientTheme,
        glassTheme,
        artisticTheme,
        setGradientTheme,
        setGlassTheme,
        setArtisticTheme,
        cycleThemeMode,
        getThemeIcon,
        getNextThemeName,
        getCurrentThemeName,
        isTransitioning
      }}
    >
      {children}
    </UnifiedThemeContext.Provider>
  );
};
