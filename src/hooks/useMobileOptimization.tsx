
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

// Extend Window interface for the timeout
declare global {
  interface Window {
    resizeTimeout: NodeJS.Timeout;
  }
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
    const checkDevice = () => {
      // More reliable mobile detection
      const isMobile = window.innerWidth <= 768 || 
        ('ontouchstart' in window) || 
        (navigator.maxTouchPoints > 0) ||
        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      // Safely check for experimental properties with fallbacks
      const extendedNavigator = navigator as ExtendedNavigator;
      const deviceMemory = extendedNavigator.deviceMemory || 8; // Default to 8GB if not available
      const hardwareConcurrency = navigator.hardwareConcurrency || 4; // Default to 4 cores if not available
      
      // More conservative low-end device detection
      const isLowEndDevice = hardwareConcurrency <= 2 || deviceMemory <= 2;
      
      // Check for reduced motion preference
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Optimize scroll behavior for mobile devices
      const scrollBehavior: 'smooth' | 'auto' = (isMobile && isLowEndDevice) || reducedMotion ? 'auto' : 'smooth';

      setOptimization({
        isMobile,
        isLowEndDevice,
        reducedMotion,
        blurIntensity: isLowEndDevice ? 'blur-sm' : isMobile ? 'blur-md' : 'blur-3xl',
        animationDuration: reducedMotion ? 'duration-0' : isLowEndDevice ? 'duration-150' : isMobile ? 'duration-200' : 'duration-300',
        scrollBehavior
      });
    };

    // Initial check
    checkDevice();
    
    // Add event listeners with proper cleanup
    const handleResize = () => {
      // Debounce resize events for better performance
      if (window.resizeTimeout) {
        clearTimeout(window.resizeTimeout);
      }
      window.resizeTimeout = setTimeout(checkDevice, 100);
    };

    window.addEventListener('resize', handleResize);
    
    // Listen for reduced motion changes
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = () => checkDevice();
    
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMotionChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleMotionChange);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMotionChange);
      } else {
        mediaQuery.removeListener(handleMotionChange);
      }
      if (window.resizeTimeout) {
        clearTimeout(window.resizeTimeout);
      }
    };
  }, []);

  return optimization;
};
