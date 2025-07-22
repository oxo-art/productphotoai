
import GlassNavbar from "@/components/GlassNavbar";
import GlassImageUpload from "@/components/GlassImageUpload";
import { useGlassTheme } from "@/contexts/GlassThemeContext";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const DesignTool = () => {
  const { getThemeStyle } = useGlassTheme();
  const textStyles = getThemeStyle('text') as { primary: string; secondary: string; muted: string };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getThemeStyle('background')} transition-all duration-1000`}>
      <GlassNavbar />
      
      {/* Header with back button */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button 
              variant="ghost" 
              size="sm"
              className={`${textStyles.primary} hover:bg-white/10 transition-all duration-300`}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div>
            <h1 className={`text-3xl font-bold ${textStyles.primary} font-ramlony`} style={{ textShadow: '0 4px 8px rgba(0, 0, 0, 0.5), 0 2px 4px rgba(0, 0, 0, 0.3)' }}>
              AI Design Tool
            </h1>
            <p className={`${textStyles.secondary} mt-2`}>
              Transform your images with AI-powered editing
            </p>
          </div>
        </div>
      </div>

      {/* Main content area with the image upload component */}
      <main className="container mx-auto px-4 pb-8">
        <GlassImageUpload />
      </main>
    </div>
  );
};

export default DesignTool;
