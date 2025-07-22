
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Palette } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import GlassIndex from "@/pages/GlassIndex";
import { useGradientTheme } from "@/contexts/GradientThemeContext";

const Index = () => {
  const { getGradient } = useGradientTheme();
  const [isGlassMode, setIsGlassMode] = useState(false);
  const navigate = useNavigate();

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
    </div>
  );
};

export default Index;
