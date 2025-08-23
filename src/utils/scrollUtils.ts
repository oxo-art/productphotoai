
// Mobile-optimized scroll utilities
export const smoothScrollToTop = () => {
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

  // Add a small delay for mobile devices to ensure proper rendering
  const isMobile = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (isMobile) {
    setTimeout(scrollToTop, 100);
  } else {
    scrollToTop();
  }
};

// Fallback for browsers that don't support smooth scrolling
export const scrollToTopWithFallback = () => {
  if ('scrollBehavior' in document.documentElement.style) {
    smoothScrollToTop();
  } else {
    // Fallback for older browsers
    const scrollStep = -window.scrollY / (500 / 15);
    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 15);
  }
};
