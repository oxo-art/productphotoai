
import { Sparkles, Zap, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGlassTheme } from "@/contexts/GlassThemeContext";

const HeroSection = () => {
  const { getThemeStyle } = useGlassTheme();
  const textStyles = getThemeStyle('text') as { primary: string; secondary: string; muted: string };

  const scrollToUpload = () => {
    const uploadSection = document.querySelector('main');
    uploadSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden py-20 px-4">
      {/* Background decorative elements */}
      <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/10 to-cyan-500/5 blur-3xl transition-all duration-1000`}></div>
      <div className={`absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl`}></div>
      <div className={`absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/5 to-cyan-400/5 rounded-full blur-3xl`}></div>
      
      <div className="relative max-w-4xl mx-auto text-center">
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${getThemeStyle('card')} ${textStyles.secondary} mb-8`}>
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">Image editing powered by AI</span>
        </div>
        
        <h1 className={`text-5xl md:text-7xl font-bold ${textStyles.primary} mb-6 leading-tight`}>
          <span style={{ textShadow: '0 4px 15px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3)' }}>Turn Products into</span>
          <span className="bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-100 bg-clip-text text-transparent transition-all duration-1000" style={{ filter: 'drop-shadow(0 0 2px rgba(234, 179, 8, 0.3))' }}>
            {" "}Marketing{" "}
          </span>
          <span style={{ textShadow: '0 4px 15px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3)' }}>Gold</span>
        </h1>
        
        <div className="mb-12 mx-auto max-w-3xl">
          <p className={`text-xl ${textStyles.secondary} leading-relaxed`} style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)' }}>
            Turn basic product shots into professional marketing assets. Describe your vision and our AI will create stunning visuals with perfect lighting, backgrounds, and styling for maximum impact.
          </p>
        </div>
        
        <div className="mb-12 mx-auto max-w-4xl">
          <div className="flex flex-wrap justify-center gap-6">
            <div className={`flex items-center gap-3 ${textStyles.secondary}`}>
              <div className={`p-2 rounded-lg ${getThemeStyle('card')} backdrop-blur-sm transition-all duration-1000`}>
                <Zap className="w-5 h-5" />
              </div>
              <span style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3)' }}>Lightning Fast</span>
            </div>
            <div className={`flex items-center gap-3 ${textStyles.secondary}`}>
              <div className={`p-2 rounded-lg ${getThemeStyle('card')} backdrop-blur-sm transition-all duration-1000`}>
                <Palette className="w-5 h-5" />
              </div>
              <span style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3)' }}>Professional Quality</span>
            </div>
            <div className={`flex items-center gap-3 ${textStyles.secondary}`}>
              <div className={`p-2 rounded-lg ${getThemeStyle('card')} backdrop-blur-sm transition-all duration-1000`}>
                <Sparkles className="w-5 h-5" />
              </div>
              <span style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3)' }}>AI Powered</span>
            </div>
          </div>
        </div>
        
        {/* Example Image */}
        <div className="mb-8 max-w-3xl mx-auto">
          <div className={`${getThemeStyle('card')} rounded-2xl p-6 ${getThemeStyle('shadow')}`}>
            <img 
              src="/lovable-uploads/18c96854-77c5-45d4-bd59-083373aaaf84.png" 
              alt="AI transformation example" 
              className="w-full h-auto rounded-xl"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </div>
        </div>
        
        {/* Prompt Example Section */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className={`${getThemeStyle('card')} rounded-2xl p-6 ${getThemeStyle('shadow')}`}>
            <div className="text-left">
              <h3 className={`text-lg font-semibold ${textStyles.primary} mb-3`}>
                Prompt:
              </h3>
              <p className={`text-lg leading-relaxed ${textStyles.primary} font-medium`}>
                A realistic baby wearing gold chain and leather jacket holding this product in his hand
              </p>
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

export default HeroSection;
