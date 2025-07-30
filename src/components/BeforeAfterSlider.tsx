
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Slider } from '@/components/ui/slider';
import { Skeleton } from '@/components/ui/skeleton';

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
        
        // Load both images in parallel
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
    setSliderPosition(percentage);
  }, []);

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
        <div className="mt-6 px-2">
          <Skeleton className="w-full h-6 rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className={`relative max-w-md mx-auto ${className}`}>
      <AspectRatio ratio={16/10}>
        <div 
          ref={containerRef}
          className={`relative w-full h-full overflow-hidden rounded-2xl shadow-2xl select-none transition-all duration-300 ${
            isLoading ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'
          }`}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          style={{ touchAction: 'none' }}
        >
          {/* Before Image */}
          <div className="absolute inset-0">
            <img 
              src={beforeImage} 
              alt="Before" 
              className={`w-full h-full object-cover object-center transition-opacity duration-300 ${
                imagesLoaded.before ? 'opacity-100' : 'opacity-0'
              }`}
              draggable={false}
              loading="eager"
            />
            {/* Before tag */}
            {sliderPosition > 10 && imagesLoaded.before && (
              <div className="absolute top-4 left-4 bg-black/80 text-white px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm transition-opacity duration-300">
                Before
              </div>
            )}
          </div>
          
          {/* After Image */}
          <div 
            className="absolute inset-0 transition-all duration-200 ease-out"
            style={{
              clipPath: `polygon(${sliderPosition}% 0%, 100% 0%, 100% 100%, ${sliderPosition}% 100%)`
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
            {/* After tag */}
            {imagesLoaded.after && (
              <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm">
                After
              </div>
            )}
          </div>
          
          {/* Modern Slider Line */}
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-white shadow-xl transition-all duration-200 ease-out"
            style={{ 
              left: `${sliderPosition}%`, 
              transform: 'translateX(-50%)',
              boxShadow: '0 0 20px rgba(255, 255, 255, 0.5)'
            }}
          />
          
          {/* Modern Slider Handle */}
          <div 
            className={`absolute top-1/2 w-12 h-12 bg-white rounded-full shadow-xl border-4 border-white/20 flex items-center justify-center backdrop-blur-sm transition-all duration-200 ease-out ${
              isLoading ? 'cursor-default' : 'cursor-grab active:cursor-grabbing hover:scale-110'
            }`}
            style={{ 
              left: `${sliderPosition}%`, 
              transform: 'translateX(-50%) translateY(-50%)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
            }}
          >
            <div className="flex space-x-1">
              <div className="w-1 h-6 bg-gray-400 rounded-full"></div>
              <div className="w-1 h-6 bg-gray-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </AspectRatio>
      
      {/* Modern Slider Control */}
      <div className="mt-6 px-2">
        <Slider
          value={[sliderPosition]}
          onValueChange={(value) => !isLoading && setSliderPosition(value[0])}
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
