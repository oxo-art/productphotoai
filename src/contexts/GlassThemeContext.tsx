
import React, { createContext, useContext, ReactNode } from 'react';

interface TextStyles {
  primary: string;
  secondary: string;
  muted: string;
}

interface GlassThemeContextType {
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
  const getThemeStyle = (element: string): string | TextStyles => {
    const styles: Record<string, string | TextStyles> = {
      background: 'from-blue-900 via-purple-900 to-indigo-900',
      navbar: 'bg-white/10 backdrop-blur-md border-white/20',
      card: 'bg-white/10 backdrop-blur-md border border-white/20',
      button: 'bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20',
      buttonPrimary: 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700',
      input: 'bg-white/10 backdrop-blur-md border border-white/20 focus:border-white/40',
      popover: 'bg-black/80 backdrop-blur-md',
      shadow: 'shadow-2xl shadow-black/50',
      text: {
        primary: 'text-white',
        secondary: 'text-white/70',
        muted: 'text-white/60'
      }
    };
    
    return styles[element] || '';
  };

  return (
    <GlassThemeContext.Provider value={{ getThemeStyle }}>
      {children}
    </GlassThemeContext.Provider>
  );
};
