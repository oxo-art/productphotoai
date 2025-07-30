
import GlassNavbar from "@/components/GlassNavbar";
import GlassImageUpload from "@/components/GlassImageUpload";
import { useGlassTheme } from "@/contexts/GlassThemeContext";

const DesignTool = () => {
  const { getThemeStyle } = useGlassTheme();

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getThemeStyle('background')} transition-all duration-1000 smooth-scroll`}>
      <GlassNavbar />
      
      {/* Main content area with enhanced padding for better mobile experience */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 mt-16 sm:mt-20 lg:mt-24">
        <GlassImageUpload />
      </main>
    </div>
  );
};

export default DesignTool;
