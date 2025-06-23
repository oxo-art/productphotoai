
import Navbar from "@/components/Navbar";
import ImageUpload from "@/components/ImageUpload";
import HeroSection from "@/components/HeroSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />
      <HeroSection />
      <main className="container mx-auto px-4 py-8">
        <ImageUpload />
      </main>
    </div>
  );
};

export default Index;
