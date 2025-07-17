
import React, { useState, useRef } from 'react';
import { Slider } from '@/components/ui/slider';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After"
}) => {
  const [sliderValue, setSliderValue] = useState([50]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
      <div 
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-lg"
        style={{ aspectRatio: '9/16' }}
      >
        {/* After image (right side) */}
        <div className="absolute inset-0">
          <img 
            src={afterImage}
            alt={afterLabel}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            {afterLabel}
          </div>
        </div>

        {/* Before image (left side) with clip-path */}
        <div 
          className="absolute inset-0 transition-all duration-200 ease-out"
          style={{
            clipPath: `polygon(0 0, ${sliderValue[0]}% 0, ${sliderValue[0]}% 100%, 0 100%)`
          }}
        >
          <img 
            src={beforeImage}
            alt={beforeLabel}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            {beforeLabel}
          </div>
        </div>

        {/* Slider line */}
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg transition-all duration-200 ease-out"
          style={{ left: `${sliderValue[0]}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Slider control */}
      <div className="mt-4 px-2">
        <Slider
          value={sliderValue}
          onValueChange={handleSliderChange}
          max={100}
          min={0}
          step={1}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
