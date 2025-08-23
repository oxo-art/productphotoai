
// Mobile-optimized scroll utilities with error handling
export const smoothScrollToTop = () => {
  try {
    // Use requestAnimationFrame for better mobile performance
    const scrollToTop = () => {
      if (window.scrollY > 0) {
        window.requestAnimationFrame(() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        });
      }
    };

    // Enhanced mobile detection
    const isMobile = window.innerWidth <= 768 || 
      ('ontouchstart' in window) || 
      (navigator.maxTouchPoints > 0) ||
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Instant scroll for users who prefer reduced motion
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }
    
    if (isMobile) {
      // Add a small delay for mobile devices to ensure proper rendering
      setTimeout(scrollToTop, 50);
    } else {
      scrollToTop();
    }
  } catch (error) {
    // Fallback to basic scroll if anything fails
    console.warn('Smooth scroll failed, using fallback:', error);
    window.scrollTo(0, 0);
  }
};

// Enhanced fallback for browsers that don't support smooth scrolling
export const scrollToTopWithFallback = () => {
  try {
    // Check if smooth scrolling is supported
    if ('scrollBehavior' in document.documentElement.style) {
      smoothScrollToTop();
    } else {
      // Animated fallback for older browsers
      const scrollStep = -window.scrollY / (300 / 15); // Faster animation
      const scrollInterval = setInterval(() => {
        if (window.scrollY !== 0) {
          window.scrollBy(0, scrollStep);
        } else {
          clearInterval(scrollInterval);
        }
      }, 15);
      
      // Safety timeout to prevent infinite scrolling
      setTimeout(() => {
        clearInterval(scrollInterval);
        window.scrollTo(0, 0);
      }, 1000);
    }
  } catch (error) {
    // Ultimate fallback
    console.warn('All scroll methods failed, using basic scroll:', error);
    window.scrollTo(0, 0);
  }
};

// Utility to scroll to a specific element with mobile optimization
export const scrollToElement = (elementId: string, offset: number = 0) => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      console.warn(`Element with id "${elementId}" not found`);
      return;
    }

    const elementPosition = element.offsetTop - offset;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    window.scrollTo({
      top: elementPosition,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
  } catch (error) {
    console.warn('Scroll to element failed:', error);
  }
};
