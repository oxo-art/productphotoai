
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import GlassNavbar from "@/components/GlassNavbar";
import GlassHeroSection from "@/components/GlassHeroSection";
import { useGlassTheme } from "@/contexts/GlassThemeContext";

const GlassIndex = () => {
  const { getThemeStyle } = useGlassTheme();
  const navigate = useNavigate();

  const handleToggleMode = () => {
    navigate("/");
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getThemeStyle('background')} transition-all duration-1000`}>
      {/* Theme Mode Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={handleToggleMode}
          className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
          size="sm"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Gradient Mode
        </Button>
      </div>

      <GlassNavbar />
      <GlassHeroSection />
    </div>
  );
};

export default GlassIndex;
