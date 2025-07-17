
import React, { useState, useRef, useCallback } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

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

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    e.preventDefault();
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, [isDragging]);

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  return (
    <div className={`relative max-w-md mx-auto ${className}`}>
      <AspectRatio ratio={9/16}>
        <div 
          ref={containerRef}
          className="relative w-full h-full overflow-hidden rounded-xl shadow-2xl cursor-grab active:cursor-grabbing"
          style={{ userSelect: 'none' }}
        >
          {/* Before Image */}
          <div className="absolute inset-0">
            <img 
              src={beforeImage} 
              alt="Before" 
              className="w-full h-full object-cover"
              draggable={false}
            />
            <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
              Before
            </div>
          </div>
          
          {/* After Image */}
          <div 
            className="absolute inset-0"
            style={{
              clipPath: `polygon(${sliderPosition}% 0%, 100% 0%, 100% 100%, ${sliderPosition}% 100%)`
            }}
          >
            <img 
              src={afterImage} 
              alt="After" 
              className="w-full h-full object-cover"
              draggable={false}
            />
            <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
              After
            </div>
          </div>
          
          {/* Slider Line */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
            style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
          />
          
          {/* Slider Handle */}
          <div 
            className="absolute top-1/2 w-8 h-8 bg-white rounded-full shadow-lg border-2 border-gray-300 cursor-grab active:cursor-grabbing flex items-center justify-center"
            style={{ 
              left: `${sliderPosition}%`, 
              transform: 'translateX(-50%) translateY(-50%)' 
            }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
          </div>
        </div>
      </AspectRatio>
    </div>
  );
};

export default BeforeAfterSlider;
