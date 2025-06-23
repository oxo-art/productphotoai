
import { ReactNode } from 'react';
import { useUnifiedTheme } from '@/contexts/UnifiedThemeContext';

interface ThemeTransitionWrapperProps {
  children: ReactNode;
}

const ThemeTransitionWrapper = ({ children }: ThemeTransitionWrapperProps) => {
  const { isTransitioning } = useUnifiedTheme();

  return (
    <div className={`transition-all duration-300 ${isTransitioning ? 'opacity-90 scale-[0.99]' : 'opacity-100 scale-100'}`}>
      {children}
    </div>
  );
};

export default ThemeTransitionWrapper;
