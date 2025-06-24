
import { Sparkles, Zap, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGlassTheme } from "@/contexts/GlassThemeContext";

const GlassHeroSection = () => {
  const { getThemeStyle } = useGlassTheme();
  const textStyles = getThemeStyle('text') as { primary: string; secondary: string; muted: string };

  const scrollToUpload = () => {
    const uploadSection = document.querySelector('main');
    uploadSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden py-20 px-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/10 to-white/5 blur-3xl"></div>
      <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="relative max-w-4xl mx-auto text-center">
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${getThemeStyle('card')} ${textStyles.secondary} mb-8`}>
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">Powered by Flux Kontext Pro AI</span>
        </div>
        
        <h1 className={`text-5xl md:text-7xl font-bold ${textStyles.primary} mb-6 leading-tight`}>
          <span style={{ textShadow: '0 4px 15px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3)' }}>Transform Your</span>
          <span className="bg-gradient-to-r from-lime-300 via-lime-200 to-lime-100 bg-clip-text text-transparent" style={{ filter: 'drop-shadow(0 0 2px rgba(132, 204, 22, 0.3))' }}>
            {" "}Images{" "}
          </span>
          <span style={{ textShadow: '0 4px 15px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3)' }}>with AI</span>
        </h1>
        
        <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 mb-12 mx-auto max-w-3xl">
          <p className={`text-xl ${textStyles.secondary} leading-relaxed`} style={{ textShadow: '0 3px 10px rgba(0, 0, 0, 0.6), 0 1px 6px rgba(0, 0, 0, 0.4)' }}>
            Upload any image and describe how you want it to be transformed. Our advanced AI will reimagine your vision with stunning & professional results.
          </p>
        </div>
        
        <div className="bg-black/15 backdrop-blur-sm rounded-2xl p-6 mb-12 mx-auto max-w-4xl">
          <div className="flex flex-wrap justify-center gap-6">
            <div className={`flex items-center gap-3 ${textStyles.muted}`}>
              <div className={`p-2 rounded-lg ${getThemeStyle('card')}`}>
                <Zap className="w-5 h-5" />
              </div>
              <span style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3)' }}>Lightning Fast</span>
            </div>
            <div className={`flex items-center gap-3 ${textStyles.muted}`}>
              <div className={`p-2 rounded-lg ${getThemeStyle('card')}`}>
                <Palette className="w-5 h-5" />
              </div>
              <span style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3)' }}>Professional Quality</span>
            </div>
            <div className={`flex items-center gap-3 ${textStyles.muted}`}>
              <div className={`p-2 rounded-lg ${getThemeStyle('card')}`}>
                <Sparkles className="w-5 h-5" />
              </div>
              <span style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3)' }}>AI Powered</span>
            </div>
          </div>
        </div>
        
        <Button 
          onClick={scrollToUpload}
          size="lg" 
          className={`${getThemeStyle('buttonPrimary')} text-white px-8 py-6 text-lg font-semibold rounded-xl ${getThemeStyle('shadow')} hover:scale-105 transition-all duration-300`}
        >
          Start Creating
          <Sparkles className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </section>
  );
};

export default GlassHeroSection;
