
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ArtisticTheme, artisticThemes } from '@/config/themes';

interface ArtisticThemeContextType {
  currentTheme: ArtisticTheme;
  setTheme: (theme: ArtisticTheme) => void;
  getThemeStyle: (element: keyof typeof artisticThemes.artDeco) => string;
  getAllThemes: () => Array<{ key: ArtisticTheme; name: string }>;
}

const ArtisticThemeContext = createContext<ArtisticThemeContextType | undefined>(undefined);

export const useArtisticTheme = () => {
  const context = useContext(ArtisticThemeContext);
  if (!context) {
    throw new Error('useArtisticTheme must be used within an ArtisticThemeProvider');
  }
  return context;
};

interface ArtisticThemeProviderProps {
  children: ReactNode;
}

export const ArtisticThemeProvider: React.FC<ArtisticThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ArtisticTheme>('artDeco');

  const setTheme = (theme: ArtisticTheme) => {
    setCurrentTheme(theme);
  };

  const getThemeStyle = (element: keyof typeof artisticThemes.artDeco) => {
    return artisticThemes[currentTheme][element] as string;
  };

  const getAllThemes = () => {
    return Object.entries(artisticThemes).map(([key, value]) => ({
      key: key as ArtisticTheme,
      name: value.name
    }));
  };

  return (
    <ArtisticThemeContext.Provider
      value={{
        currentTheme,
        setTheme,
        getThemeStyle,
        getAllThemes
      }}
    >
      {children}
    </ArtisticThemeContext.Provider>
  );
};
