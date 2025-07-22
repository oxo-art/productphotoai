
import GlassNavbar from "@/components/GlassNavbar";
import GlassImageUpload from "@/components/GlassImageUpload";
import GlassHeroSection from "@/components/GlassHeroSection";
import { useGlassTheme } from "@/contexts/GlassThemeContext";

const GlassIndex = () => {
  const { getThemeStyle } = useGlassTheme();

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getThemeStyle('background')} transition-all duration-1000`}>
      <GlassNavbar />
      <GlassHeroSection />
      <main className="container mx-auto px-4 py-8">
        <GlassImageUpload />
      </main>
    </div>
  );
};

export default GlassIndex;
