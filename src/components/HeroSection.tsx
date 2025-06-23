
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { useGradientTheme } from "@/contexts/GradientThemeContext";

const HeroSection = () => {
  const { getThemeClasses } = useGradientTheme();
  const theme = getThemeClasses();

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background Elements */}
      <div className={`absolute inset-0 bg-gradient-to-r ${theme.hero} blur-3xl`} />
      <div className={`absolute top-20 left-20 w-72 h-72 bg-gradient-to-r ${theme.glow} rounded-full blur-3xl animate-pulse`} />
      <div className={`absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r ${theme.glow} rounded-full blur-3xl animate-pulse delay-1000`} />
      
      <div className="relative max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span className="text-sm text-white/80">Powered by Advanced AI</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
          Transform Your Images with{" "}
          <span className={`bg-gradient-to-r ${theme.accent} bg-clip-text text-transparent`}>
            AI Magic
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed text-white/80">
          Upload any image and watch our advanced AI transform it into stunning artwork. 
          From style transfers to creative enhancements, the possibilities are endless.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Button 
            size="lg" 
            className={`bg-gradient-to-r ${theme.button} hover:${theme.buttonHover} text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl shadow-black/20 transition-all duration-300 hover:scale-105 group border-0`}
          >
            <Zap className="w-5 h-5 mr-2 group-hover:animate-pulse" />
            Start Creating
            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="bg-white/20 backdrop-blur-md border-white/30 hover:bg-white/30 text-white border-white/30 hover:border-white/50 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105"
          >
            Learn More
          </Button>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Sparkles, title: "AI-Powered", desc: "Advanced algorithms for stunning results" },
            { icon: Zap, title: "Lightning Fast", desc: "Process images in seconds, not minutes" },
            { icon: ArrowRight, title: "Easy to Use", desc: "Simple drag-and-drop interface" }
          ].map((feature, index) => (
            <div key={index} className="p-6 bg-white/10 backdrop-blur-xl border-white/20 rounded-xl shadow-2xl shadow-black/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300">
              <feature.icon className="w-8 h-8 text-white mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-white/80">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
