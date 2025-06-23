
import ArtisticNavbar from "@/components/ArtisticNavbar";
import ArtisticImageUpload from "@/components/ArtisticImageUpload";
import ArtisticHeroSection from "@/components/ArtisticHeroSection";
import { useArtisticTheme } from "@/contexts/ArtisticThemeContext";

const ArtisticIndex = () => {
  const { getThemeStyle } = useArtisticTheme();

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getThemeStyle('background')} transition-all duration-1000`}>
      <ArtisticNavbar />
      <ArtisticHeroSection />
      <main className="container mx-auto px-4 py-8">
        <ArtisticImageUpload />
      </main>
    </div>
  );
};

export default ArtisticIndex;
