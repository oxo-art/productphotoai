
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
    <section className="relative overflow-hidden py-16 sm:py-32 lg:py-40 px-4" style={{ contain: 'layout style paint' }}>
      {/* Background decorative elements - ensure all are full circles */}
      <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/10 to-cyan-500/5 ${blurIntensity} ${animationDuration}`}></div>
      <div className={`absolute top-8 sm:top-16 left-8 sm:left-16 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full ${blurIntensity}`}></div>
      <div className={`absolute bottom-8 sm:bottom-16 right-8 sm:right-16 w-80 h-80 sm:w-96 sm:h-96 lg:w-112 lg:h-112 bg-gradient-to-br from-purple-400/5 to-cyan-400/5 rounded-full ${blurIntensity}`}></div>
      
      <div className="relative max-w-7xl mx-auto text-center">
        <div className={`inline-flex items-center gap-3 sm:gap-4 lg:gap-5 px-6 py-3 sm:px-8 sm:py-4 lg:px-10 lg:py-5 rounded-full ${getThemeStyle('card')} ${textStyles.secondary} mb-12 sm:mb-16 lg:mb-20`}>
          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
          <span className="text-base sm:text-xl lg:text-2xl xl:text-3xl font-medium">Image editing powered by AI</span>
        </div>
        
        <h1 className={`text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-10xl font-bold ${textStyles.primary} mb-8 sm:mb-12 lg:mb-16 leading-tight px-2`}>
          <span style={{ textShadow: '0 4px 15px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3)' }}>Transform Your</span>
          <span className="bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-100 bg-clip-text text-transparent" style={{ filter: 'drop-shadow(0 0 2px rgba(234, 179, 8, 0.3))' }}>
            {" "}Images{" "}
          </span>
          <span style={{ textShadow: '0 4px 15px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3)' }}>with AI</span>
        </h1>
        
        <div className="mb-14 sm:mb-18 lg:mb-22 mx-auto max-w-5xl px-4">
          <p className="text-xl sm:text-3xl lg:text-4xl xl:text-5xl text-white/90 leading-relaxed font-light" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)' }}>
            Upload any image and describe how you want it to be transformed. Our advanced AI will reimagine your vision with stunning & professional results.
          </p>
        </div>
        
        <div className="mb-14 sm:mb-18 lg:mb-22 mx-auto max-w-6xl">
          <div className="flex flex-wrap justify-center gap-8 sm:gap-12 lg:gap-16 px-4">
            <div className="flex items-center gap-4 sm:gap-5 lg:gap-6 text-white/80">
              <div className={`p-3 sm:p-4 lg:p-5 rounded-xl ${getThemeStyle('card')}`}>
                <Zap className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" />
              </div>
              <span className="text-lg sm:text-2xl lg:text-3xl xl:text-4xl font-medium" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3)' }}>Lightning Fast</span>
            </div>
            <div className="flex items-center gap-4 sm:gap-5 lg:gap-6 text-white/80">
              <div className={`p-3 sm:p-4 lg:p-5 rounded-xl ${getThemeStyle('card')}`}>
                <Palette className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" />
              </div>
              <span className="text-lg sm:text-2xl lg:text-3xl xl:text-4xl font-medium" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3)' }}>Professional Quality</span>
            </div>
            <div className="flex items-center gap-4 sm:gap-5 lg:gap-6 text-white/80">
              <div className={`p-3 sm:p-4 lg:p-5 rounded-xl ${getThemeStyle('card')}`}>
                <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" />
              </div>
              <span className="text-lg sm:text-2xl lg:text-3xl xl:text-4xl font-medium" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3)' }}>AI Powered</span>
            </div>
          </div>
        </div>
        
        {/* Enlarged Before/After Slider */}
        <div className="mb-14 sm:mb-18 lg:mb-22 px-4">
          <BeforeAfterSlider 
            beforeImage="/lovable-uploads/92fc894a-2e51-402d-989c-6208ae67ee31.png"
            afterImage="/lovable-uploads/6ee9a072-130a-4b5f-81c7-bfd418eb0839.png"
            className={isMobile ? '' : 'backdrop-blur-sm'}
          />
        </div>
        
        {/* Enlarged Prompt Example Section */}
        <div className="mb-12 sm:mb-16 lg:mb-20 max-w-5xl mx-auto px-4">
          <div className={`${getThemeStyle('card')} rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 ${getThemeStyle('shadow')}`}>
            <div className="text-left">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold text-white mb-4 sm:mb-6 lg:mb-8">
                Prompt:
              </h3>
              <p className="text-lg sm:text-2xl lg:text-3xl xl:text-4xl leading-relaxed text-white font-medium">
                Put an "orange juice" label on the white can, and change the background to blue studio photoshoot, add 3 to 4 oranges stuck in mid air around the can, hyper-realistic.
              </p>
            </div>
          </div>
        </div>
        
        <Link to="/design">
          <Button 
            size="lg"
            className={`${getThemeStyle('buttonPrimary')} text-white px-10 py-6 sm:px-16 sm:py-8 lg:px-20 lg:py-10 text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold rounded-2xl ${getThemeStyle('shadow')} hover:scale-105 ${animationDuration} touch-target`}
          >
            Start Creating
            <Sparkles className="ml-4 w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default GlassHeroSection;
