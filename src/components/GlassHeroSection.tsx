

import { Sparkles, Zap, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGlassTheme } from "@/contexts/GlassThemeContext";
import { Link } from "react-router-dom";

const GlassHeroSection = () => {
  const { getThemeStyle } = useGlassTheme();
  const textStyles = getThemeStyle('text') as { primary: string; secondary: string; muted: string };
  
  // Performance optimizations
  const blurIntensity = 'backdrop-blur-sm';
  const animationDuration = 'transition-all duration-700';

  return (
    <section className="relative overflow-hidden py-10 sm:py-20 px-4" style={{ contain: 'layout style paint' }}>
      {/* Optimized Background decorative elements */}
      <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/10 to-cyan-500/5 ${blurIntensity} ${animationDuration}`}></div>
      <div className={`absolute top-5 sm:top-10 left-5 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full ${blurIntensity}`}></div>
      <div className={`absolute bottom-5 sm:bottom-10 right-5 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-purple-400/5 to-cyan-400/5 rounded-full ${blurIntensity}`}></div>
      
      <div className="relative max-w-4xl mx-auto text-center">
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full ${getThemeStyle('card')} ${textStyles.secondary} mb-6 sm:mb-8`}>
          <Sparkles className="w-4 h-4" />
          <span className="text-xs sm:text-sm font-medium">AI-Powered Interior Design</span>
        </div>

        <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 ${textStyles.primary} leading-tight font-ramlony`}>
          Transform Your Space with{" "}
          <span className={`bg-gradient-to-r ${getThemeStyle('heroTextGradient')} bg-clip-text text-transparent`}>
            AI Magic
          </span>
        </h1>

        <p className={`text-lg sm:text-xl md:text-2xl ${textStyles.secondary} mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed`}>
          Upload any image of your room and watch as our advanced AI transforms it into stunning interior designs. 
          Professional quality results in seconds, not hours.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12 sm:mb-16">
          <Link to="/design">
            <Button 
              size="lg" 
              className={`${getThemeStyle('buttonPrimary')} text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-xl ${getThemeStyle('shadow')} hover:scale-105 transition-all duration-300`}
            >
              <Zap className="w-5 h-5 mr-2" />
              Start Designing
            </Button>
          </Link>
          
          <Button 
            variant="outline" 
            size="lg"
            className={`${getThemeStyle('button')} ${textStyles.primary} px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-xl transition-all duration-300 hover:scale-105`}
          >
            <Palette className="w-5 h-5 mr-2" />
            View Gallery
          </Button>
        </div>

        {/* Stats section with full circles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          <div className={`${getThemeStyle('card')} p-4 sm:p-6 rounded-2xl hover:${getThemeStyle('cardHover')} transition-all duration-300 group`}>
            <div className="flex items-center justify-center mb-3 sm:mb-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
              </div>
            </div>
            <div className={`text-2xl sm:text-3xl font-bold ${textStyles.primary} mb-1 sm:mb-2`}>Lightning Fast</div>
            <div className={`text-sm sm:text-base ${textStyles.secondary}`}>Results in under 30 seconds</div>
          </div>

          <div className={`${getThemeStyle('card')} p-4 sm:p-6 rounded-2xl hover:${getThemeStyle('cardHover')} transition-all duration-300 group`}>
            <div className="flex items-center justify-center mb-3 sm:mb-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
              </div>
            </div>
            <div className={`text-2xl sm:text-3xl font-bold ${textStyles.primary} mb-1 sm:mb-2`}>AI Powered</div>
            <div className={`text-sm sm:text-base ${textStyles.secondary}`}>Advanced machine learning</div>
          </div>

          <div className={`${getThemeStyle('card')} p-4 sm:p-6 rounded-2xl hover:${getThemeStyle('cardHover')} transition-all duration-300 group`}>
            <div className="flex items-center justify-center mb-3 sm:mb-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-400/20 to-cyan-400/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                <Palette className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
              </div>
            </div>
            <div className={`text-2xl sm:text-3xl font-bold ${textStyles.primary} mb-1 sm:mb-2`}>Professional Quality</div>
            <div className={`text-sm sm:text-base ${textStyles.secondary}`}>Studio-grade results</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlassHeroSection;
