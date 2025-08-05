
import { useEffect } from "react";
import GlassNavbar from "@/components/GlassNavbar";
import GlassImageUpload from "@/components/GlassImageUpload";
import { useGlassTheme } from "@/contexts/GlassThemeContext";
import { useMobileOptimization } from "@/hooks/useMobileOptimization";

const DesignTool = () => {
  const { getThemeStyle } = useGlassTheme();
  const { isMobile } = useMobileOptimization();

  // Scroll to top when component mounts to ensure navbar and upload section are visible
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getThemeStyle('background')} transition-all duration-1000`}>
      <GlassNavbar />
      
      {/* Main content area with responsive spacing from navbar */}
      <main className={`container mx-auto px-4 ${isMobile ? 'pt-4' : 'pt-6'}`}>
        <GlassImageUpload />
      </main>
    </div>
  );
};

export default DesignTool;
