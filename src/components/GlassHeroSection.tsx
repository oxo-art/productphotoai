
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Play, ArrowRight } from "lucide-react";
import { useGlassTheme } from "@/contexts/GlassThemeContext";
import { useMobileOptimization } from "@/hooks/useMobileOptimization";
import { Link } from "react-router-dom";

const GlassHeroSection = () => {
  const { getThemeStyle } = useGlassTheme();
  const { isMobile, isLowEndDevice, blurIntensity, animationDuration } = useMobileOptimization();
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const textStyles = getThemeStyle('text') as { primary: string; secondary: string; muted: string };

  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-16 ${animationDuration}`}>
      {/* Background decorative elements - optimized for mobile */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getThemeStyle('hero')} opacity-20 ${blurIntensity} ${animationDuration}`}></div>
      <div className={`absolute top-10 left-10 w-48 h-48 md:w-72 md:h-72 bg-gradient-to-r ${getThemeStyle('decorative')[0]} opacity-20 md:opacity-30 rounded-full ${blurIntensity} animate-pulse`}></div>
      <div className={`absolute bottom-10 right-10 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-r ${getThemeStyle('decorative')[1]} opacity-20 md:opacity-30 rounded-full ${blurIntensity} animate-pulse delay-1000`}></div>
      
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Badge */}
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 ${textStyles.secondary} mb-6 md:mb-8 ${animationDuration}`}>
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">AI-Powered Interior Design</span>
        </div>
        
        {/* Main heading - responsive typography */}
        <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold ${textStyles.primary} mb-6 md:mb-8 leading-tight ${animationDuration}`}>
          <span style={{ textShadow: '0 4px 15px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3)' }}>
            Transform Your Space with{" "}
          </span>
          <span className="bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-100 bg-clip-text text-transparent transition-all duration-1000" style={{ filter: 'drop-shadow(0 0 2px rgba(234, 179, 8, 0.3))' }}>
            AI Magic
          </span>
        </h1>
        
        {/* Subtitle - responsive spacing and sizing */}
        <div className="mb-8 md:mb-12 mx-auto max-w-2xl lg:max-w-4xl">
          <p className={`text-lg sm:text-xl md:text-2xl ${textStyles.secondary} leading-relaxed px-4`} style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)' }}>
            Upload your room photo and watch as our advanced AI creates stunning interior designs tailored to your style. 
            Experience the future of home decoration.
          </p>
        </div>
        
        {/* CTA Buttons - responsive layout */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12 md:mb-16">
          <Link to="/design">
            <Button className={`${getThemeStyle('buttonPrimary')} text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl hover:scale-105 ${animationDuration} shadow-2xl w-full sm:w-auto min-w-[200px]`}>
              <Sparkles className="w-5 h-5 mr-2" />
              Start Designing
            </Button>
          </Link>
          
          <Button variant="outline" className={`border-2 border-white/30 ${textStyles.primary} hover:bg-white/10 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl hover:scale-105 ${animationDuration} backdrop-blur-sm w-full sm:w-auto min-w-[200px]`}>
            <Play className="w-5 h-5 mr-2" />
            Watch Demo
          </Button>
        </div>
        
        {/* Hero Image - properly optimized */}
        <div className={`relative max-w-4xl mx-auto ${getThemeStyle('card')} rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl ${animationDuration}`}>
          <div className="aspect-video relative">
            <img 
              src="/lovable-uploads/eede4c9e-9788-42fd-b8ee-446e59290251.png"
              alt="AI Interior Design Transformation Example"
              className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(true)}
              loading={isMobile ? "eager" : "lazy"}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm animate-pulse flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              </div>
            )}
          </div>
          
          {/* Overlay with call to action */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
            <Link to="/design">
              <Button className="bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30 transition-all duration-300">
                Try It Now <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Trust indicators - responsive grid */}
        <div className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-2xl md:max-w-4xl mx-auto">
          {[
            { number: "10K+", label: "Designs Created" },
            { number: "95%", label: "Satisfaction Rate" },
            { number: "50+", label: "Style Options" },
            { number: "24/7", label: "AI Available" }
          ].map((stat, index) => (
            <div key={index} className={`text-center p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 ${animationDuration}`}>
              <div className={`text-xl md:text-2xl font-bold ${textStyles.primary} mb-1`}>{stat.number}</div>
              <div className={`text-xs md:text-sm ${textStyles.muted}`}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlassHeroSection;
