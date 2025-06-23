
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { glassTheme } from "@/config/glassTheme";

const HeroSection = () => {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl" />
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="relative max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span className={`text-sm ${glassTheme.text.secondary}`}>Powered by Advanced AI</span>
        </div>
        
        <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${glassTheme.text.primary} leading-tight`}>
          Transform Your Images with{" "}
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            AI Magic
          </span>
        </h1>
        
        <p className={`text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed ${glassTheme.text.secondary}`}>
          Upload any image and watch our advanced AI transform it into stunning artwork. 
          From style transfers to creative enhancements, the possibilities are endless.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Button 
            size="lg" 
            className={`${glassTheme.buttonPrimary} text-white px-8 py-4 text-lg font-semibold rounded-xl ${glassTheme.shadow} transition-all duration-300 hover:scale-105 group`}
          >
            <Zap className="w-5 h-5 mr-2 group-hover:animate-pulse" />
            Start Creating
            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className={`${glassTheme.button} ${glassTheme.text.primary} border-white/30 hover:border-white/50 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105`}
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
            <div key={index} className={`p-6 ${glassTheme.card} rounded-xl ${glassTheme.shadow} hover:${glassTheme.cardHover} transition-all duration-300`}>
              <feature.icon className={`w-8 h-8 ${glassTheme.text.primary} mb-4 mx-auto`} />
              <h3 className={`text-lg font-semibold mb-2 ${glassTheme.text.primary}`}>{feature.title}</h3>
              <p className={glassTheme.text.secondary}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
