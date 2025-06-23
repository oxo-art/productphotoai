
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Palette, Brush } from "lucide-react";
import Navbar from "@/components/Navbar";
import ImageUpload from "@/components/ImageUpload";
import HeroSection from "@/components/HeroSection";
import GlassIndex from "@/pages/GlassIndex";
import ArtisticIndex from "@/pages/ArtisticIndex";
import { useGradientTheme } from "@/contexts/GradientThemeContext";

type ThemeMode = 'gradient' | 'glass' | 'artistic';

const Index = () => {
  const { getGradient } = useGradientTheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>('gradient');

  if (themeMode === 'glass') {
    return <GlassIndex />;
  }

  if (themeMode === 'artistic') {
    return <ArtisticIndex />;
  }

  const cycleTheme = () => {
    setThemeMode(current => {
      if (current === 'gradient') return 'glass';
      if (current === 'glass') return 'artistic';
      return 'gradient';
    });
  };

  const getThemeIcon = () => {
    switch (themeMode) {
      case 'gradient': return <Sparkles className="w-4 h-4 mr-2" />;
      case 'glass': return <Palette className="w-4 h-4 mr-2" />;
      case 'artistic': return <Brush className="w-4 h-4 mr-2" />;
    }
  };

  const getNextThemeName = () => {
    switch (themeMode) {
      case 'gradient': return 'Glass';
      case 'glass': return 'Artistic';
      case 'artistic': return 'Gradient';
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getGradient('background')} transition-all duration-1000`}>
      {/* Theme Mode Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={cycleTheme}
          className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
          size="sm"
        >
          {getThemeIcon()}
          {getNextThemeName()}
        </Button>
      </div>

      <Navbar />
      <HeroSection />
      <main className="container mx-auto px-4 py-8">
        <ImageUpload />
      </main>
    </div>
  );
};

export default Index;
