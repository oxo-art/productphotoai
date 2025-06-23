
import { Sparkles, Zap, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const scrollToUpload = () => {
    const uploadSection = document.querySelector('main');
    uploadSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden py-20 px-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl"></div>
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="relative max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 mb-8">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">Powered by Flux Kontext Pro AI</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Transform Your
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {" "}Images{" "}
          </span>
          with AI
        </h1>
        
        <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed">
          Upload any image and describe how you want it transformed. Our advanced AI will reimagine your vision with stunning, professional results.
        </p>
        
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <div className="flex items-center gap-3 text-white/60">
            <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm">
              <Zap className="w-5 h-5" />
            </div>
            <span>Lightning Fast</span>
          </div>
          <div className="flex items-center gap-3 text-white/60">
            <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm">
              <Palette className="w-5 h-5" />
            </div>
            <span>Professional Quality</span>
          </div>
          <div className="flex items-center gap-3 text-white/60">
            <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <span>AI Powered</span>
          </div>
        </div>
        
        <Button 
          onClick={scrollToUpload}
          size="lg" 
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
        >
          Start Creating
          <Sparkles className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
