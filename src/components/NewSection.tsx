
import { Sparkles, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGradientTheme } from "@/contexts/GradientThemeContext";

const NewSection = () => {
  const { getGradient } = useGradientTheme();

  return (
    <section className="relative overflow-hidden py-16 px-4 bg-gradient-to-br from-blue-900 via-slate-700 to-gray-600">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-800/10 via-slate-600/10 to-gray-500/10 blur-2xl"></div>
      <div className="absolute top-8 left-8 w-64 h-64 bg-gradient-to-r from-blue-800/20 to-transparent rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-8 right-8 w-80 h-80 bg-gradient-to-r from-slate-600/20 to-transparent rounded-full blur-2xl animate-pulse delay-500"></div>
      
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 mb-6">
            <Star className="w-4 h-4" />
            <span className="text-sm font-medium">Powered by Advanced AI</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            <span style={{ textShadow: '0 4px 15px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3)' }}>
              Experience the Future of 
            </span>
            <span className="bg-gradient-to-r from-blue-300 via-slate-300 to-gray-200 bg-clip-text text-transparent" style={{ filter: 'drop-shadow(0 0 2px rgba(59, 130, 246, 0.3))' }}>
              {" "}Image Editing
            </span>
          </h2>
          
          <p className="text-xl text-white/90 leading-relaxed max-w-3xl mx-auto" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)' }}>
            Transform your creative vision into reality with our cutting-edge AI technology. 
            Generate, edit, and enhance images with unprecedented quality and speed.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
            <div className="p-3 rounded-lg bg-gradient-to-r from-blue-800/20 to-slate-600/20 backdrop-blur-sm w-fit mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Instant Results</h3>
            <p className="text-white/80 leading-relaxed">
              Get professional-quality image transformations in seconds, not hours.
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
            <div className="p-3 rounded-lg bg-gradient-to-r from-blue-800/20 to-slate-600/20 backdrop-blur-sm w-fit mb-4">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">AI-Powered</h3>
            <p className="text-white/80 leading-relaxed">
              Advanced machine learning algorithms ensure perfect results every time.
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
            <div className="p-3 rounded-lg bg-gradient-to-r from-blue-800/20 to-slate-600/20 backdrop-blur-sm w-fit mb-4">
              <Star className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Premium Quality</h3>
            <p className="text-white/80 leading-relaxed">
              Studio-grade results that meet professional standards and exceed expectations.
            </p>
          </div>
        </div>
        
        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-800 to-slate-600 hover:from-blue-900 hover:to-slate-700 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
          >
            Explore Features
            <Sparkles className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewSection;
