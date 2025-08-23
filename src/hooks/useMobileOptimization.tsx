
import { useState, useEffect } from 'react';

interface MobileOptimization {
  isMobile: boolean;
  isLowEndDevice: boolean;
  reducedMotion: boolean;
  blurIntensity: string;
  animationDuration: string;
  scrollBehavior: 'smooth' | 'auto';
}

// Extend Navigator interface to include experimental properties
interface ExtendedNavigator extends Navigator {
  deviceMemory?: number;
}

export const useMobileOptimization = (): MobileOptimization => {
  const [optimization, setOptimization] = useState<MobileOptimization>({
    isMobile: false,
    isLowEndDevice: false,
    reducedMotion: false,
    blurIntensity: 'blur-3xl',
    animationDuration: 'duration-300',
    scrollBehavior: 'smooth'
  });

  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;

    const checkDevice = () => {
      const isMobile = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      // Safely check for experimental properties
      const extendedNavigator = navigator as ExtendedNavigator;
      const deviceMemory = extendedNavigator.deviceMemory || 8; // Default to 8GB if not available
      const hardwareConcurrency = navigator.hardwareConcurrency || 4; // Default to 4 cores if not available
      
      const isLowEndDevice = hardwareConcurrency <= 4 || deviceMemory <= 4;
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Optimize scroll behavior for mobile devices
      const scrollBehavior: 'smooth' | 'auto' = isMobile && isLowEndDevice ? 'auto' : 'smooth';

      setOptimization({
        isMobile,
        isLowEndDevice,
        reducedMotion,
        blurIntensity: isMobile || isLowEndDevice ? 'blur-lg' : 'blur-3xl',
        animationDuration: reducedMotion ? 'duration-75' : isMobile ? 'duration-200' : 'duration-300',
        scrollBehavior
      });
    };

    const debouncedCheckDevice = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkDevice, 150);
    };

    checkDevice();
    window.addEventListener('resize', debouncedCheckDevice);
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addEventListener('change', checkDevice);

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', debouncedCheckDevice);
      mediaQuery.removeEventListener('change', checkDevice);
    };
  }, []);

  return optimization;
};
