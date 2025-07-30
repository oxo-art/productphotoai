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
      <div className={`relative max-w-md mx-auto ${className}`}>
        <AspectRatio ratio={16/10}>
          <div className="w-full h-full bg-gray-200 rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Failed to load images</p>
          </div>
        </AspectRatio>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={`relative max-w-md mx-auto ${className}`}>
        <AspectRatio ratio={16/10}>
          <Skeleton className="w-full h-full rounded-2xl" />
        </AspectRatio>
        <div className="mt-4 sm:mt-6 px-2">
          <Skeleton className="w-full h-4 sm:h-6 rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full max-w-md mx-auto ${className}`} style={{ contain: 'layout style paint' }}>
      <AspectRatio ratio={16/10}>
        <div 
          ref={containerRef}
          className={`relative w-full h-full overflow-hidden rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl select-none ${animationDuration} ${
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
              <div className={`absolute top-2 sm:top-4 left-2 sm:left-4 bg-black/80 text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium backdrop-blur-sm ${animationDuration}`}>
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
              <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-black/80 text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium backdrop-blur-sm">
                After
              </div>
            )}
          </div>
          
          {/* Optimized Slider Line */}
          <div 
            className={`absolute top-0 bottom-0 w-0.5 bg-white shadow-xl ${animationDuration} ease-out`}
            style={{ 
              left: `${sliderPosition}%`, 
              transform: 'translate3d(-50%, 0, 0)',
              boxShadow: isMobile ? '0 0 10px rgba(255, 255, 255, 0.3)' : '0 0 20px rgba(255, 255, 255, 0.5)',
              willChange: isDragging ? 'transform' : 'auto'
            }}
          />
          
          {/* Optimized Slider Handle */}
          <div 
            className={`absolute top-1/2 w-8 h-8 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg sm:shadow-xl border-2 sm:border-4 border-white/20 flex items-center justify-center backdrop-blur-sm ${animationDuration} ease-out ${
              isLoading ? 'cursor-default' : 'cursor-grab active:cursor-grabbing hover:scale-110'
            }`}
            style={{ 
              left: `${sliderPosition}%`, 
              transform: 'translate3d(-50%, -50%, 0)',
              boxShadow: isMobile ? '0 4px 16px rgba(0, 0, 0, 0.2)' : '0 8px 32px rgba(0, 0, 0, 0.3)',
              willChange: isDragging ? 'transform' : 'auto'
            }}
          >
            <div className="flex space-x-0.5 sm:space-x-1">
              <div className="w-0.5 sm:w-1 h-4 sm:h-6 bg-gray-400 rounded-full"></div>
              <div className="w-0.5 sm:w-1 h-4 sm:h-6 bg-gray-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </AspectRatio>
      
      {/* Responsive Slider Control */}
      <div className="mt-4 sm:mt-6 px-2">
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
