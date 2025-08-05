
import { useEffect } from "react";
import GlassNavbar from "@/components/GlassNavbar";
import GlassImageUpload from "@/components/GlassImageUpload";
import { useGlassTheme } from "@/contexts/GlassThemeContext";
import { useMobileOptimization } from "@/hooks/useMobileOptimization";
import { scrollToTopWithFallback } from "@/utils/scrollUtils";

const DesignTool = () => {
  const { getThemeStyle } = useGlassTheme();
  const { isMobile, animationDuration } = useMobileOptimization();

  // Enhanced scroll to top with mobile optimization
  useEffect(() => {
    // Wait for component to fully render before scrolling
    const timer = setTimeout(() => {
      scrollToTopWithFallback();
    }, isMobile ? 150 : 50);

    return () => clearTimeout(timer);
  }, [isMobile]);

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getThemeStyle('background')} ${animationDuration}`}>
      <GlassNavbar />
      
      {/* Main content area with responsive spacing from navbar */}
      <main className={`container mx-auto px-4 ${isMobile ? 'pt-4' : 'pt-6'}`}>
        <GlassImageUpload />
      </main>
    </div>
  );
};

export default DesignTool;
