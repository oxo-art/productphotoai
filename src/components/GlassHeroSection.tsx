import { Sparkles, Zap, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGlassTheme } from "@/contexts/GlassThemeContext";
import { Link } from "react-router-dom";
import { useMobileOptimization } from "@/hooks/useMobileOptimization";

const GlassHeroSection = () => {
  const { getThemeStyle } = useGlassTheme();
  const { animationDuration, isMobile } = useMobileOptimization();
  const textStyles = getThemeStyle('text') as { primary: string; secondary: string; muted: string };

  return (
    <section className="relative overflow-hidden py-12 sm:py-24 px-4" style={{ contain: 'layout style paint' }}>
      {/* Background decorative elements - ensure all are full circles */}
      <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/10 to-cyan-500/5 blur-3xl ${animationDuration}`}></div>
      <div className={`absolute top-5 sm:top-10 left-5 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl`}></div>
      <div className={`absolute bottom-5 sm:bottom-10 right-5 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-purple-400/5 to-cyan-400/5 rounded-full blur-3xl`}></div>
      
      <div className="relative max-w-5xl mx-auto text-center">
        <div className={`inline-flex items-center gap-2 sm:gap-3 px-4 py-2 sm:px-6 sm:py-3 rounded-full ${getThemeStyle('card')} ${textStyles.secondary} mb-8 sm:mb-10`}>
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-lg font-medium">Image editing powered by AI</span>
        </div>
        
        <h1 className={`text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] 2xl:text-[12rem] font-bold ${textStyles.primary} mb-6 sm:mb-8 leading-tight px-2`}>
          <span style={{ textShadow: '0 4px 15px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3)' }}>Transform Your</span>
          <span className="bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-100 bg-clip-text text-transparent" style={{ filter: 'drop-shadow(0 0 2px rgba(234, 179, 8, 0.3))' }}>
            {" "}Images{" "}
          </span>
          <span style={{ textShadow: '0 4px 15px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3)' }}>with AI</span>
        </h1>
        
        <div className="mb-10 sm:mb-14 mx-auto max-w-4xl px-4">
          <p className="text-lg sm:text-2xl lg:text-3xl text-white/90 leading-relaxed" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)' }}>
            Upload any image and describe how you want it to be transformed. Our advanced AI will reimagine your vision with stunning & professional results.
          </p>
        </div>
        
        <div className="mb-10 sm:mb-14 mx-auto max-w-5xl">
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 px-4">
            <div className="flex items-center gap-3 sm:gap-4 text-white/80">
              <div className={`p-2 sm:p-3 rounded-lg ${getThemeStyle('card')}`}>
                <Zap className="w-5 h-5 sm:w-7 sm:h-7" />
              </div>
              <span className="text-base sm:text-xl lg:text-2xl" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3)' }}>Lightning Fast</span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 text-white/80">
              <div className={`p-2 sm:p-3 rounded-lg ${getThemeStyle('card')}`}>
                <Palette className="w-5 h-5 sm:w-7 sm:h-7" />
              </div>
              <span className="text-base sm:text-xl lg:text-2xl" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3)' }}>Professional Quality</span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 text-white/80">
              <div className={`p-2 sm:p-3 rounded-lg ${getThemeStyle('card')}`}>
                <Sparkles className="w-5 h-5 sm:w-7 sm:h-7" />
              </div>
              <span className="text-base sm:text-xl lg:text-2xl" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3)' }}>AI Powered</span>
            </div>
          </div>
        </div>
        
        {/* Example Image */}
        <div className="mb-8 sm:mb-10 max-w-4xl mx-auto px-4">
          <div className={`${getThemeStyle('card')} rounded-xl sm:rounded-2xl p-6 sm:p-8 ${getThemeStyle('shadow')}`}>
            <img 
              src="/lovable-uploads/364eb201-1bb4-421f-8eec-f1b3f2f2e074.png" 
              alt="AI transformation example" 
              className="w-full h-auto rounded-xl"
            />
          </div>
        </div>
        
        {/* Enlarged Prompt Example Section */}
        <div className="mb-8 sm:mb-10 max-w-4xl mx-auto px-4">
          <div className={`${getThemeStyle('card')} rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-10 ${getThemeStyle('shadow')}`}>
            <div className="text-left">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white mb-3 sm:mb-4">
                Prompt:
              </h3>
              <p className="text-base sm:text-xl lg:text-2xl leading-relaxed text-white font-medium">
                A baby wearing gold chain and sunglasses with a leather jacket holding this product in his hand, hyper-realistic.
              </p>
            </div>
          </div>
        </div>
        
        <Link to="/design">
          <Button 
            size={isMobile ? "lg" : "lg"}
            className={`${getThemeStyle('buttonPrimary')} text-white px-8 py-4 sm:px-12 sm:py-8 text-lg sm:text-2xl lg:text-3xl font-semibold rounded-xl ${getThemeStyle('shadow')} hover:scale-105 ${animationDuration}`}
          >
            Start Creating
            <Sparkles className="ml-3 w-5 h-5 sm:w-7 sm:h-7" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default GlassHeroSection;
