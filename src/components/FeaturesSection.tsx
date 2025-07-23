
import { Shield, Zap, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGradientTheme } from "@/contexts/GradientThemeContext";

const FeaturesSection = () => {
  const { getGradient } = useGradientTheme();

  const features = [
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Your images are processed securely with enterprise-grade encryption and privacy protection."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get professional results in seconds, not minutes. Our AI processes images at incredible speed."
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share and collaborate on projects with your team members in real-time."
    },
    {
      icon: Star,
      title: "Premium Quality",
      description: "Industry-leading AI models ensure the highest quality transformations every time."
    }
  ];

  return (
    <section className="relative overflow-hidden py-20 px-4">
      {/* Background decorative elements */}
      <div className={`absolute inset-0 bg-gradient-to-l ${getGradient('hero')} blur-3xl transition-all duration-1000`}></div>
      <div className={`absolute top-20 right-20 w-64 h-64 bg-gradient-to-r ${getGradient('decorative')[0]} rounded-full blur-3xl animate-pulse delay-500`}></div>
      <div className={`absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r ${getGradient('decorative')[1]} rounded-full blur-3xl animate-pulse delay-1500`}></div>
      
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            <span style={{ textShadow: '0 4px 15px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3)' }}>
              Why Choose Our
            </span>
            <span className={`bg-gradient-to-r ${getGradient('accent')} bg-clip-text text-transparent transition-all duration-1000`} style={{ filter: 'drop-shadow(0 0 2px rgba(234, 179, 8, 0.3))' }}>
              {" "}AI Platform
            </span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)' }}>
            Discover the powerful features that make our AI image transformation platform the choice of professionals worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/15 hover:border-white/30 transition-all duration-300 hover:scale-105"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-14 h-14 rounded-lg bg-gradient-to-r ${getGradient('glow')} backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-3" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)' }}>
                {feature.title}
              </h3>
              
              <p className="text-white/80 leading-relaxed" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)' }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button 
            size="lg" 
            className={`bg-gradient-to-r ${getGradient('button')} hover:${getGradient('buttonHover')} text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105`}
          >
            Explore All Features
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
