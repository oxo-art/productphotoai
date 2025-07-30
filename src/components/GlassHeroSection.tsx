
import { Sparkles, Zap, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGlassTheme } from "@/contexts/GlassThemeContext";
import BeforeAfterSlider from "./BeforeAfterSlider";
import { Link } from "react-router-dom";
import { useMobileOptimization } from "@/hooks/useMobileOptimization";

const GlassHeroSection = () => {
  const { getThemeStyle } = useGlassTheme();
  const { blurIntensity, animationDuration, isMobile } = useMobileOptimization();
  const textStyles = getThemeStyle('text') as { primary: string; secondary: string; muted: string };

  return (
    <section className="relative overflow-hidden py-10 sm:py-20 px-4" style={{ contain: 'layout style paint' }}>
      {/* Optimized Background decorative elements */}
      <div className={`absolute inset-0 bg-gradient-to-br from-white/5 via-white/10 to-white/5 ${blurIntensity} ${animationDuration}`}></div>
      <div className={`absolute top-5 sm:top-10 left-5 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-white/10 rounded-full ${blurIntensity} animate-pulse`} style={{ animationFillMode: 'forwards' }}></div>
      <div className={`absolute bottom-5 sm:bottom-10 right-5 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 bg-white/5 rounded-full ${blurIntensity} animate-pulse delay-1000`} style={{ animationFillMode: 'forwards' }}></div>
      
      <div className="relative max-w-4xl mx-auto text-center">
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full ${getThemeStyle('card')} ${textStyles.secondary} mb-6 sm:mb-8`}>
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="text-xs sm:text-sm font-medium">Image editing powered by AI</span>
        </div>
        
        <h1 className={`text-3xl sm:text-5xl md:text-7xl font-bold ${textStyles.primary} mb-4 sm:mb-6 leading-tight px-2`}>
          <span style={{ textShadow: '0 4px 15px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3)' }}>Transform Your</span>
          <span className="bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-100 bg-clip-text text-transparent" style={{ filter: 'drop-shadow(0 0 2px rgba(234, 179, 8, 0.3))' }}>
            {" "}Images{" "}
          </span>
          <span style={{ textShadow: '0 4px 15px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3)' }}>with AI</span>
        </h1>
        
        <div className="mb-8 sm:mb-12 mx-auto max-w-3xl px-4">
          <p className="text-base sm:text-xl text-white/90 leading-relaxed" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)' }}>
            Upload any image and describe how you want it to be transformed. Our advanced AI will reimagine your vision with stunning & professional results.
          </p>
        </div>
        
        <div className="mb-8 sm:mb-12 mx-auto max-w-4xl">
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 px-4">
            <div className="flex items-center gap-2 sm:gap-3 text-white/80">
              <div className={`p-1.5 sm:p-2 rounded-lg ${getThemeStyle('card')}`}>
                <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="text-sm sm:text-base" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3)' }}>Lightning Fast</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 text-white/80">
              <div className={`p-1.5 sm:p-2 rounded-lg ${getThemeStyle('card')}`}>
                <Palette className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="text-sm sm:text-base" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3)' }}>Professional Quality</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 text-white/80">
              <div className={`p-1.5 sm:p-2 rounded-lg ${getThemeStyle('card')}`}>
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="text-sm sm:text-base" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3)' }}>AI Powered</span>
            </div>
          </div>
        </div>
        
        {/* Responsive Before/After Slider */}
        <div className="mb-8 sm:mb-12 px-4">
          <BeforeAfterSlider 
            beforeImage="/lovable-uploads/92fc894a-2e51-402d-989c-6208ae67ee31.png"
            afterImage="/lovable-uploads/6ee9a072-130a-4b5f-81c7-bfd418eb0839.png"
            className={isMobile ? '' : 'backdrop-blur-sm'}
          />
        </div>
        
        {/* Responsive Prompt Example Section */}
        <div className="mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
          <div className={`${getThemeStyle('card')} rounded-xl sm:rounded-2xl p-4 sm:p-6 ${getThemeStyle('shadow')}`}>
            <div className="text-left">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">
                Prompt:
              </h3>
              <p className="text-sm sm:text-lg leading-relaxed text-white font-medium">
                Put an "orange juice" label on the white can, and change the background to blue studio photoshoot, add 3 to 4 oranges stuck in mid air around the can, hyper-realistic.
              </p>
            </div>
          </div>
        </div>
        
        <Link to="/design">
          <Button 
            size={isMobile ? "default" : "lg"}
            className={`${getThemeStyle('buttonPrimary')} text-white px-6 py-3 sm:px-8 sm:py-6 text-base sm:text-lg font-semibold rounded-xl ${getThemeStyle('shadow')} hover:scale-105 ${animationDuration}`}
          >
            Start Creating
            <Sparkles className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default GlassHeroSection;
