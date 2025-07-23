import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Palette } from "lucide-react";
import Navbar from "@/components/Navbar";
import ImageUpload from "@/components/ImageUpload";
import HeroSection from "@/components/HeroSection";
import GlassIndex from "@/pages/GlassIndex";
import { useGradientTheme } from "@/contexts/GradientThemeContext";
import NavySection from "@/components/NavySection";

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
      <NavySection />
      <main className="container mx-auto px-4 py-8">
        <ImageUpload />
      </main>
    </div>
  );
};

export default Index;
