
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Slider } from '@/components/ui/slider';
import { Skeleton } from '@/components/ui/skeleton';
import { useMobileOptimization } from '@/hooks/useMobileOptimization';

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
  const [isLoading, setIsLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState({ before: false, after: false });
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const { isMobile, animationDuration } = useMobileOptimization();

  // Throttle position updates for 60fps performance
  const throttledSetPosition = useCallback((position: number) => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    animationRef.current = requestAnimationFrame(() => {
      setSliderPosition(position);
    });
  }, []);

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
      <div className={`relative max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto ${className}`}>
        <AspectRatio ratio={16/10}>
          <div className="w-full h-full bg-gray-200 rounded-2xl flex items-center justify-center">
            <p className="text-gray-500 text-xl sm:text-2xl lg:text-3xl">Failed to load images</p>
          </div>
        </AspectRatio>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={`relative max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto ${className}`}>
        <AspectRatio ratio={16/10}>
          <Skeleton className="w-full h-full rounded-2xl" />
        </AspectRatio>
        <div className="mt-8 sm:mt-12 px-2">
          <Skeleton className="w-full h-8 sm:h-12 lg:h-16 rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto ${className}`} style={{ contain: 'layout style paint' }}>
      <AspectRatio ratio={16/10}>
        <div 
          ref={containerRef}
          className={`relative w-full h-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl select-none ${animationDuration} ${
            isLoading ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'
          }`}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
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
              className={`w-full h-full object-cover object-center ${animationDuration} ${
                imagesLoaded.before ? 'opacity-100' : 'opacity-0'
              }`}
              draggable={false}
              loading="eager"
            />
            {sliderPosition > 10 && imagesLoaded.before && (
              <div className={`absolute top-4 sm:top-8 lg:top-12 left-4 sm:left-8 lg:left-12 bg-black/80 text-white px-4 py-3 sm:px-6 sm:py-4 lg:px-8 lg:py-5 rounded-full text-base sm:text-xl lg:text-2xl xl:text-3xl font-medium backdrop-blur-sm ${animationDuration}`}>
                Before
              </div>
            )}
          </div>
          
          {/* After Image with optimized clipPath */}
          <div 
            className={`absolute inset-0 ${animationDuration} ease-out`}
            style={{
              clipPath: `polygon(${sliderPosition}% 0%, 100% 0%, 100% 100%, ${sliderPosition}% 100%)`,
              willChange: isDragging ? 'clip-path' : 'auto',
              contain: 'paint'
            }}
          >
            <img 
              src={afterImage} 
              alt="After" 
              className={`w-full h-full object-cover object-center ${animationDuration} ${
                imagesLoaded.after ? 'opacity-100' : 'opacity-0'
              }`}
              draggable={false}
              loading="eager"
            />
            {imagesLoaded.after && (
              <div className="absolute top-4 sm:top-8 lg:top-12 right-4 sm:right-8 lg:right-12 bg-black/80 text-white px-4 py-3 sm:px-6 sm:py-4 lg:px-8 lg:py-5 rounded-full text-base sm:text-xl lg:text-2xl xl:text-3xl font-medium backdrop-blur-sm">
                After
              </div>
            )}
          </div>
          
          {/* Enlarged Slider Line */}
          <div 
            className={`absolute top-0 bottom-0 w-2 sm:w-3 lg:w-4 bg-white shadow-2xl ${animationDuration} ease-out`}
            style={{ 
              left: `${sliderPosition}%`, 
              transform: 'translate3d(-50%, 0, 0)',
              boxShadow: isMobile ? '0 0 20px rgba(255, 255, 255, 0.6)' : '0 0 30px rgba(255, 255, 255, 0.8)',
              willChange: isDragging ? 'transform' : 'auto'
            }}
          />
          
          {/* Enlarged Slider Handle */}
          <div 
            className={`absolute top-1/2 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 bg-white rounded-full shadow-2xl border-4 sm:border-6 lg:border-8 border-white/30 flex items-center justify-center backdrop-blur-sm ${animationDuration} ease-out ${
              isLoading ? 'cursor-default' : 'cursor-grab active:cursor-grabbing hover:scale-110 touch-target'
            }`}
            style={{ 
              left: `${sliderPosition}%`, 
              transform: 'translate3d(-50%, -50%, 0)',
              boxShadow: isMobile ? '0 8px 32px rgba(0, 0, 0, 0.4)' : '0 16px 64px rgba(0, 0, 0, 0.5)',
              willChange: isDragging ? 'transform' : 'auto',
              minHeight: '44px',
              minWidth: '44px'
            }}
          >
            <div className="flex space-x-1 sm:space-x-2 lg:space-x-3">
              <div className="w-1.5 sm:w-2 lg:w-2.5 h-8 sm:h-10 lg:h-12 xl:h-14 bg-gray-400 rounded-full"></div>
              <div className="w-1.5 sm:w-2 lg:w-2.5 h-8 sm:h-10 lg:h-12 xl:h-14 bg-gray-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </AspectRatio>
      
      {/* Enlarged Slider Control */}
      <div className="mt-8 sm:mt-12 lg:mt-16 px-2">
        <Slider
          value={[sliderPosition]}
          onValueChange={(value) => !isLoading && throttledSetPosition(value[0])}
          max={100}
          step={1}
          className="w-full"
          disabled={isLoading}
        />
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
