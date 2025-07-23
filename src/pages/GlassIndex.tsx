
import GlassNavbar from "@/components/GlassNavbar";
import GlassHeroSection from "@/components/GlassHeroSection";
import GlassFeaturesSection from "@/components/GlassFeaturesSection";
import { useGlassTheme } from "@/contexts/GlassThemeContext";

const GlassIndex = () => {
  const { getThemeStyle } = useGlassTheme();

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getThemeStyle('background')} transition-all duration-1000`}>
      <GlassNavbar />
      <GlassHeroSection />
      
      {/* Visual separator between sections */}
      <div className="h-24"></div>
      
      <GlassFeaturesSection />
    </div>
  );
};

export default GlassIndex;
