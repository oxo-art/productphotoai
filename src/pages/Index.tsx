
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Palette } from "lucide-react";
import Navbar from "@/components/Navbar";
import ImageUpload from "@/components/ImageUpload";
import HeroSection from "@/components/HeroSection";
import GlassIndex from "@/pages/GlassIndex";
import { useGradientTheme } from "@/contexts/GradientThemeContext";

const Index = () => {
  const { getGradient } = useGradientTheme();
  const [isGlassMode, setIsGlassMode] = useState(false);

  if (isGlassMode) {
    return <GlassIndex />;
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getGradient('background')} transition-all duration-1000`}>
      {/* Theme Mode Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={() => setIsGlassMode(!isGlassMode)}
          className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
          size="sm"
        >
          {isGlassMode ? <Sparkles className="w-4 h-4 mr-2" /> : <Palette className="w-4 h-4 mr-2" />}
          {isGlassMode ? "Gradient" : "Glass"}
        </Button>
      </div>

      <Navbar />
      <HeroSection />
      
      {/* Features Section */}
      <section className="relative overflow-hidden py-20 px-4 mt-16">
        {/* Background decorative elements */}
        <div className={`absolute inset-0 bg-gradient-to-r ${getGradient('hero')} opacity-20 blur-3xl transition-all duration-1000`}></div>
        <div className={`absolute top-10 left-10 w-72 h-72 bg-gradient-to-r ${getGradient('decorative')[0]} opacity-30 rounded-full blur-3xl animate-pulse`}></div>
        <div className={`absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r ${getGradient('decorative')[1]} opacity-30 rounded-full blur-3xl animate-pulse delay-1000`}></div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 mb-8">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Why Choose Our Platform</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            <span style={{ textShadow: '0 4px 15px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3)' }}>Built for </span>
            <span className="bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-100 bg-clip-text text-transparent transition-all duration-1000" style={{ filter: 'drop-shadow(0 0 2px rgba(234, 179, 8, 0.3))' }}>
              Excellence
            </span>
          </h2>
          
          <div className="mb-12 mx-auto max-w-3xl">
            <p className="text-xl text-white/90 leading-relaxed" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)' }}>
              Experience the next generation of AI-powered image transformation with professional-grade results and unmatched reliability.
            </p>
          </div>
        </div>
      </section>
      
      <main className="container mx-auto px-4 py-8 mt-16">
        <ImageUpload />
      </main>
    </div>
  );
};

export default Index;
