
import GlassNavbar from "@/components/GlassNavbar";
import GlassImageUpload from "@/components/GlassImageUpload";
import { useGlassTheme } from "@/contexts/GlassThemeContext";

const DesignTool = () => {
  const { getThemeStyle } = useGlassTheme();

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getThemeStyle('background')} transition-all duration-1000`}>
      <GlassNavbar />
      
      {/* Main content area with the image upload component */}
      <main className="container mx-auto px-4 py-8">
        <GlassImageUpload />
      </main>
    </div>
  );
};

export default DesignTool;
