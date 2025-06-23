
import { Sparkles, Zap, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useArtisticTheme } from "@/contexts/ArtisticThemeContext";

const ArtisticHeroSection = () => {
  const { getThemeStyle } = useArtisticTheme();

  const scrollToUpload = () => {
    const uploadSection = document.querySelector('main');
    uploadSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={`relative overflow-hidden py-20 px-4 ${getThemeStyle('pattern')}`}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10"></div>
      
      <div className="relative max-w-4xl mx-auto text-center">
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${getThemeStyle('card')} ${getThemeStyle('text').secondary} mb-8 ${getThemeStyle('shadow')}`}>
          <Sparkles className="w-4 h-4" />
          <span className={`text-sm font-medium ${getThemeStyle('typography')}`}>Powered by Flux Kontext Pro AI</span>
        </div>
        
        <h1 className={`text-5xl md:text-7xl ${getThemeStyle('typography')} ${getThemeStyle('text').primary} mb-6 leading-tight`}>
          Transform Your
          <span className={`${getThemeStyle('text').accent}`}>
            {" "}Images{" "}
          </span>
          with AI
        </h1>
        
        <p className={`text-xl ${getThemeStyle('text').secondary} mb-12 max-w-2xl mx-auto leading-relaxed`}>
          Upload any image and describe how you want it to be transformed. Our advanced AI will reimagine your vision with stunning & professional results.
        </p>
        
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <div className={`flex items-center gap-3 ${getThemeStyle('text').muted}`}>
            <div className={`p-2 rounded-lg ${getThemeStyle('card')} ${getThemeStyle('shadow')}`}>
              <Zap className="w-5 h-5" />
            </div>
            <span className={getThemeStyle('typography')}>Lightning Fast</span>
          </div>
          <div className={`flex items-center gap-3 ${getThemeStyle('text').muted}`}>
            <div className={`p-2 rounded-lg ${getThemeStyle('card')} ${getThemeStyle('shadow')}`}>
              <Palette className="w-5 h-5" />
            </div>
            <span className={getThemeStyle('typography')}>Professional Quality</span>
          </div>
          <div className={`flex items-center gap-3 ${getThemeStyle('text').muted}`}>
            <div className={`p-2 rounded-lg ${getThemeStyle('card')} ${getThemeStyle('shadow')}`}>
              <Sparkles className="w-5 h-5" />
            </div>
            <span className={getThemeStyle('typography')}>AI Powered</span>
          </div>
        </div>
        
        <Button 
          onClick={scrollToUpload}
          size="lg" 
          className={`${getThemeStyle('buttonPrimary')} px-8 py-6 text-lg ${getThemeStyle('typography')} ${getThemeStyle('shadow')} hover:scale-105 transition-all duration-300`}
        >
          Start Creating
          <Sparkles className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </section>
  );
};

export default ArtisticHeroSection;
