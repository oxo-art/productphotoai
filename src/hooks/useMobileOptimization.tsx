
import { useState, useEffect } from 'react';

interface MobileOptimization {
  isMobile: boolean;
  isLowEndDevice: boolean;
  reducedMotion: boolean;
  blurIntensity: string;
  animationDuration: string;
}

export const useMobileOptimization = (): MobileOptimization => {
  const [optimization, setOptimization] = useState<MobileOptimization>({
    isMobile: false,
    isLowEndDevice: false,
    reducedMotion: false,
    blurIntensity: 'blur-3xl',
    animationDuration: 'duration-300'
  });

  useEffect(() => {
    const checkDevice = () => {
      const isMobile = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isLowEndDevice = navigator.hardwareConcurrency <= 4 || navigator.deviceMemory <= 4;
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      setOptimization({
        isMobile,
        isLowEndDevice,
        reducedMotion,
        blurIntensity: isMobile || isLowEndDevice ? 'blur-lg' : 'blur-3xl',
        animationDuration: reducedMotion ? 'duration-75' : 'duration-300'
      });
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addEventListener('change', checkDevice);

    return () => {
      window.removeEventListener('resize', checkDevice);
      mediaQuery.removeEventListener('change', checkDevice);
    };
  }, []);

  return optimization;
};
