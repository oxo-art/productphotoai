
import { Button } from "@/components/ui/button";
import { Sparkles, Upload } from "lucide-react";
import { useGlassTheme } from "@/contexts/GlassThemeContext";
import BeforeAfterSlider from "./BeforeAfterSlider";

const GlassHeroSection = () => {
  const { getThemeStyle } = useGlassTheme();

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-6xl mx-auto text-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Transform Your Space with
              <span className={`block bg-gradient-to-r ${getThemeStyle('accent')} bg-clip-text text-transparent`}>
                AI Magic
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
              Upload your room photo and watch AI transform it into stunning interior designs
            </p>
          </div>

          {/* Before/After Slider Section */}
          <div className="py-12">
            <BeforeAfterSlider 
              beforeImage="/lovable-uploads/cf6de1f5-513d-44e4-9893-9a778f1a0e20.png"
              afterImage="/lovable-uploads/003dde29-6184-448e-b261-a9f9aa0150fe.png"
              beforeLabel="Before"
              afterLabel="After"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300 text-lg px-8 py-4 group"
            >
              <Upload className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Start Creating
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white/20 text-white hover:bg-white/10 backdrop-blur-md transition-all duration-300 text-lg px-8 py-4"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              See Examples
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlassHeroSection;
