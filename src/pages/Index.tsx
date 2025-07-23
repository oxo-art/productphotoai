
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Palette } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ImageUpload from "@/components/ImageUpload";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import { useGradientTheme } from "@/contexts/GradientThemeContext";

const Index = () => {
  const { getGradient } = useGradientTheme();
  const navigate = useNavigate();

  const handleToggleMode = () => {
    navigate("/glass");
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getGradient('background')} transition-all duration-1000`}>
      {/* Theme Mode Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={handleToggleMode}
          className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
          size="sm"
        >
          <Palette className="w-4 h-4 mr-2" />
          Glass Mode
        </Button>
      </div>

      <Navbar />
      <HeroSection />
      
      {/* Add small gap between sections */}
      <div className="py-8"></div>
      
      <FeaturesSection />
      
      <main className="container mx-auto px-4 py-8">
        <ImageUpload />
      </main>
    </div>
  );
};

export default Index;
