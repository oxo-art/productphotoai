
import { useGradientTheme } from "@/contexts/GradientThemeContext";
import { useUnifiedTheme } from "@/contexts/UnifiedThemeContext";
import Navbar from "@/components/Navbar";
import ImageUpload from "@/components/ImageUpload";
import HeroSection from "@/components/HeroSection";
import GlassIndex from "@/pages/GlassIndex";
import ArtisticIndex from "@/pages/ArtisticIndex";
import ThemeTransitionWrapper from "@/components/ThemeTransitionWrapper";
import EnhancedThemeSelector from "@/components/EnhancedThemeSelector";

const Index = () => {
  const { getGradient } = useGradientTheme();
  const { themeMode, cycleThemeMode, getThemeIcon, getNextThemeName } = useUnifiedTheme();

  if (themeMode === 'glass') {
    return (
      <ThemeTransitionWrapper>
        <GlassIndex />
      </ThemeTransitionWrapper>
    );
  }

  if (themeMode === 'artistic') {
    return (
      <ThemeTransitionWrapper>
        <ArtisticIndex />
      </ThemeTransitionWrapper>
    );
  }

  return (
    <ThemeTransitionWrapper>
      <div className={`min-h-screen bg-gradient-to-br ${getGradient('background')} transition-all duration-1000`}>
        {/* Enhanced Theme Controls */}
        <div className="fixed top-4 right-4 z-50 flex gap-3">
          {/* Quick Theme Mode Toggle */}
          <button
            onClick={cycleThemeMode}
            className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium"
          >
            {getThemeIcon()}
            Switch to {getNextThemeName()}
          </button>
          
          {/* Enhanced Theme Selector */}
          <EnhancedThemeSelector />
        </div>

        <Navbar />
        <HeroSection />
        <main className="container mx-auto px-4 py-8">
          <ImageUpload />
        </main>
      </div>
    </ThemeTransitionWrapper>
  );
};

export default Index;
