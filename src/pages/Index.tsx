
import { useGradientTheme } from "@/contexts/GradientThemeContext";
import Navbar from "@/components/Navbar";
import ImageUpload from "@/components/ImageUpload";
import HeroSection from "@/components/HeroSection";

const Index = () => {
  const { getThemeClasses } = useGradientTheme();
  const theme = getThemeClasses();

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.background} transition-all duration-1000`}>
      <Navbar />
      <HeroSection />
      <main className="container mx-auto px-4 py-8">
        <ImageUpload />
      </main>
    </div>
  );
};

export default Index;
