import React, { useState, useRef, useCallback, useEffect } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Slider } from '@/components/ui/slider';
import { Skeleton } from '@/components/ui/skeleton';
import { useMobileOptimization } from '@/hooks/useMobileOptimization';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  className?: string;
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ 
  beforeImage, 
  afterImage, 
  className = '' 
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState({ before: false, after: false });
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const lastUpdateRef = useRef<number>(0);
  const { isMobile, animationDuration } = useMobileOptimization();

  // Optimized throttle with RAF for 60fps performance
  const throttledSetPosition = useCallback((position: number) => {
    const now = performance.now();
    
    if (now - lastUpdateRef.current < 8 && !isDragging) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      animationRef.current = requestAnimationFrame(() => {
        setSliderPosition(position);
        lastUpdateRef.current = performance.now();
      });
    } else {
      setSliderPosition(position);
      lastUpdateRef.current = now;
    }
  }, [isDragging]);

  // Preload images
  useEffect(() => {
    const preloadImage = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
        img.src = src;
      });
    };

    const loadImages = async () => {
      try {
        setIsLoading(true);
        setHasError(false);
        
        await Promise.all([
          preloadImage(beforeImage).then(() => {
            setImagesLoaded(prev => ({ ...prev, before: true }));
          }),
          preloadImage(afterImage).then(() => {
            setImagesLoaded(prev => ({ ...prev, after: true }));
          })
        ]);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to preload images:', error);
        setHasError(true);
        setIsLoading(false);
      }
    };

    loadImages();
  }, [beforeImage, afterImage]);

  const updateSliderPosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    throttledSetPosition(percentage);
  }, [throttledSetPosition]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (isLoading) return;
    setIsDragging(true);
    updateSliderPosition(e.clientX);
    e.preventDefault();
  }, [updateSliderPosition, isLoading]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (isLoading) return;
    setIsDragging(true);
    updateSliderPosition(e.touches[0].clientX);
    e.preventDefault();
  }, [updateSliderPosition, isLoading]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    updateSliderPosition(e.clientX);
  }, [isDragging, updateSliderPosition]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    updateSliderPosition(e.touches[0].clientX);
  }, [isDragging, updateSliderPosition]);

  const handleEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove, { passive: false });
      document.addEventListener('mouseup', handleEnd);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleEnd);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleEnd);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleEnd);
      };
    }
  }, [isDragging, handleMouseMove, handleTouchMove, handleEnd]);

  // Cleanup animation frame on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  if (hasError) {
    return (
      <div className={`relative max-w-2xl lg:max-w-4xl mx-auto ${className}`}>
        <AspectRatio ratio={16/10}>
          <div className="w-full h-full bg-gray-200 rounded-2xl flex items-center justify-center">
            <p className="text-gray-500 text-lg sm:text-xl">Failed to load images</p>
          </div>
        </AspectRatio>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={`relative max-w-2xl lg:max-w-4xl mx-auto ${className}`}>
        <AspectRatio ratio={16/10}>
          <Skeleton className="w-full h-full rounded-2xl" />
        </AspectRatio>
        <div className="mt-6 sm:mt-8 px-2">
          <Skeleton className="w-full h-6 sm:h-8 rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full max-w-2xl lg:max-w-4xl mx-auto ${className}`} style={{ contain: 'layout style paint' }}>
      <AspectRatio ratio={16/10}>
        <div 
          ref={containerRef}
          className={`relative w-full h-full overflow-hidden rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl select-none ${
            isLoading ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'
          }`}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          style={{ 
            touchAction: 'pan-x',
            willChange: isDragging ? 'transform' : 'auto'
          }}
        >
          {/* Before Image */}
          <div className="absolute inset-0" style={{ contain: 'paint' }}>
            <img 
              src={beforeImage} 
              alt="Before" 
              className={`w-full h-full object-cover object-center transition-opacity duration-300 ${
                imagesLoaded.before ? 'opacity-100' : 'opacity-0'
              }`}
              draggable={false}
              loading="eager"
            />
            {sliderPosition > 15 && imagesLoaded.before && (
              <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-black/90 text-white px-2 py-1 sm:px-2.5 sm:py-1.5 rounded text-xs font-medium backdrop-blur-sm transition-all duration-300 border border-white/20">
                Before
              </div>
            )}
          </div>
          
          {/* After Image with clip path */}
          <div 
            className="absolute inset-0 transition-all duration-75 ease-out"
            style={{
              clipPath: `polygon(${sliderPosition}% 0%, 100% 0%, 100% 100%, ${sliderPosition}% 100%)`,
              willChange: isDragging ? 'clip-path' : 'auto',
              contain: 'paint'
            }}
          >
            <img 
              src={afterImage} 
              alt="After" 
              className={`w-full h-full object-cover object-center transition-opacity duration-300 ${
                imagesLoaded.after ? 'opacity-100' : 'opacity-0'
              }`}
              draggable={false}
              loading="eager"
            />
            {sliderPosition < 85 && imagesLoaded.after && (
              <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-black/90 text-white px-2 py-1 sm:px-2.5 sm:py-1.5 rounded text-xs font-medium backdrop-blur-sm transition-all duration-300 border border-white/20">
                After
              </div>
            )}
          </div>
          
          {/* Modern Slider Divider */}
          <div 
            className={`absolute top-0 bottom-0 transition-all duration-75 ease-out ${
              isDragging || isHovering ? 'w-1' : 'w-0.5'
            }`}
            style={{ 
              left: `${sliderPosition}%`, 
              transform: 'translate3d(-50%, 0, 0)',
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(255,255,255,1), rgba(255,255,255,0.9))',
              boxShadow: isDragging || isHovering 
                ? '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.4)' 
                : '0 0 15px rgba(255, 255, 255, 0.6)',
              willChange: isDragging ? 'transform, width' : 'auto'
            }}
          />
          
          {/* Slider Handle with Slide text */}
          <div 
            className={`absolute top-1/2 transition-all duration-200 ease-out ${
              isDragging ? 'scale-110' : isHovering ? 'scale-105' : 'scale-100'
            } ${isLoading ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'}`}
            style={{ 
              left: `${sliderPosition}%`, 
              transform: 'translate3d(-50%, -50%, 0)',
              willChange: isDragging ? 'transform' : 'auto'
            }}
          >
            {/* Main Handle - Transparent circle with Slide text */}
            <div className={`relative w-14 h-14 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-white/20 rounded-full shadow-2xl border-3 border-white/40 flex items-center justify-center backdrop-blur-sm transition-all duration-200 ${
              isDragging ? 'ring-4 ring-white/30' : ''
            }`}
              style={{ 
                boxShadow: isDragging 
                  ? '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 4px rgba(255, 255, 255, 0.2)' 
                  : '0 6px 24px rgba(0, 0, 0, 0.3)'
              }}
            >
              {/* Slide text */}
              <span className="text-white text-xs sm:text-sm font-medium tracking-wide drop-shadow-lg">
                Slide
              </span>
              
              {/* Left Arrow */}
              <div className="absolute -left-8 sm:-left-10 top-1/2 transform -translate-y-1/2">
                <div className={`w-6 h-6 sm:w-8 sm:h-8 bg-white/90 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 ${
                  isDragging || isHovering ? 'opacity-100 scale-100' : 'opacity-70 scale-90'
                }`}>
                  <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
                </div>
              </div>
              
              {/* Right Arrow */}
              <div className="absolute -right-8 sm:-right-10 top-1/2 transform -translate-y-1/2">
                <div className={`w-6 h-6 sm:w-8 sm:h-8 bg-white/90 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 ${
                  isDragging || isHovering ? 'opacity-100 scale-100' : 'opacity-70 scale-90'
                }`}>
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </AspectRatio>
      
      {/* Bottom Slider Control */}
      <div className="mt-6 sm:mt-8 px-2">
        <Slider
          value={[sliderPosition]}
          onValueChange={(value) => {
            if (!isLoading) {
              const newValue = value[0];
              throttledSetPosition(newValue);
            }
          }}
          max={100}
          step={0.5}
          className="w-full"
          disabled={isLoading}
        />
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
