
import React, { useState, useRef, useCallback } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Slider } from '@/components/ui/slider';

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
  const containerRef = useRef<HTMLDivElement>(null);

  const updateSliderPosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    updateSliderPosition(e.clientX);
    e.preventDefault();
  }, [updateSliderPosition]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    updateSliderPosition(e.touches[0].clientX);
    e.preventDefault();
  }, [updateSliderPosition]);

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

  return (
    <div className={`relative max-w-md mx-auto ${className}`}>
      <AspectRatio ratio={4/3}>
        <div 
          ref={containerRef}
          className="relative w-full h-full overflow-hidden rounded-2xl shadow-2xl cursor-grab active:cursor-grabbing select-none"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          style={{ touchAction: 'none' }}
        >
          {/* Before Image */}
          <div className="absolute inset-0">
            <img 
              src={beforeImage} 
              alt="Before" 
              className="w-full h-full object-cover object-center"
              draggable={false}
            />
            {/* Before tag */}
            {sliderPosition > 10 && (
              <div className="absolute top-4 left-4 bg-black/80 text-white px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm transition-opacity duration-300">
                Before
              </div>
            )}
          </div>
          
          {/* After Image */}
          <div 
            className="absolute inset-0 transition-all duration-100 ease-out"
            style={{
              clipPath: `polygon(${sliderPosition}% 0%, 100% 0%, 100% 100%, ${sliderPosition}% 100%)`
            }}
          >
            <img 
              src={afterImage} 
              alt="After" 
              className="w-full h-full object-cover object-center"
              draggable={false}
            />
            {/* After tag */}
            <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm">
              After
            </div>
          </div>
          
          {/* Modern Slider Line */}
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-white shadow-xl transition-all duration-100 ease-out"
            style={{ 
              left: `${sliderPosition}%`, 
              transform: 'translateX(-50%)',
              boxShadow: '0 0 20px rgba(255, 255, 255, 0.5)'
            }}
          />
          
          {/* Modern Slider Handle */}
          <div 
            className="absolute top-1/2 w-12 h-12 bg-white rounded-full shadow-xl border-4 border-white/20 cursor-grab active:cursor-grabbing flex items-center justify-center backdrop-blur-sm transition-all duration-100 ease-out hover:scale-110"
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
          onValueChange={(value) => setSliderPosition(value[0])}
          max={100}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-white/70 mt-2">
          <span>Before</span>
          <span>After</span>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
