
import { Sparkles, Zap, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGradientTheme } from "@/contexts/GradientThemeContext";
import BeforeAfterSlider from "./BeforeAfterSlider";

const HeroSection = () => {
  const { getGradient } = useGradientTheme();

  const scrollToUpload = () => {
    const uploadSection = document.querySelector('main');
    uploadSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden py-20 px-4">
      {/* Background decorative elements */}
      <div className={`absolute inset-0 bg-gradient-to-r ${getGradient('hero')} blur-3xl transition-all duration-1000`}></div>
      <div className={`absolute top-10 left-10 w-72 h-72 bg-gradient-to-r ${getGradient('decorative')[0]} rounded-full blur-3xl animate-pulse`}></div>
      <div className={`absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r ${getGradient('decorative')[1]} rounded-full blur-3xl animate-pulse delay-1000`}></div>
      
      <div className="relative max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 mb-8">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">Image editing powered by AI</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          <span style={{ textShadow: '0 4px 15px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3)' }}>Transform Your</span>
          <span className="bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-100 bg-clip-text text-transparent transition-all duration-1000" style={{ filter: 'drop-shadow(0 0 2px rgba(234, 179, 8, 0.3))' }}>
            {" "}Images{" "}
          </span>
          <span style={{ textShadow: '0 4px 15px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3)' }}>with AI</span>
        </h1>
        
        <div className="mb-12 mx-auto max-w-3xl">
          <p className="text-xl text-white/90 leading-relaxed" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)' }}>
            Upload any image and describe how you want it to be transformed. Our advanced AI will reimagine your vision with stunning & professional results.
          </p>
        </div>
        
        <div className="mb-12 mx-auto max-w-4xl">
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-3 text-white/80">
              <div className={`p-2 rounded-lg bg-gradient-to-r ${getGradient('glow')} backdrop-blur-sm transition-all duration-1000`}>
                <Zap className="w-5 h-5" />
              </div>
              <span style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3)' }}>Lightning Fast</span>
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <div className={`p-2 rounded-lg bg-gradient-to-r ${getGradient('glow')} backdrop-blur-sm transition-all duration-1000`}>
                <Palette className="w-5 h-5" />
              </div>
              <span style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3)' }}>Professional Quality</span>
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <div className={`p-2 rounded-lg bg-gradient-to-r ${getGradient('glow')} backdrop-blur-sm transition-all duration-1000`}>
                <Sparkles className="w-5 h-5" />
              </div>
              <span style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3)' }}>AI Powered</span>
            </div>
          </div>
        </div>
        
        {/* Before/After Slider */}
        <div className="mb-12">
          <BeforeAfterSlider 
            beforeImage="/lovable-uploads/906faf93-70af-40f1-b724-cdac16877fa8.png"
            afterImage="/lovable-uploads/62894b6c-ed3a-4cb7-9115-31633c4f763f.png"
            className="backdrop-blur-sm"
          />
        </div>
        
        <Button 
          onClick={scrollToUpload}
          size="lg" 
          className={`bg-gradient-to-r ${getGradient('button')} hover:${getGradient('buttonHover')} text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105`}
        >
          Start Creating
          <Sparkles className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
