
import { Zap, Shield, Award, Rocket } from "lucide-react";
import { useGlassTheme } from "@/contexts/GlassThemeContext";

const GlassFeaturesSection = () => {
  const { getThemeStyle } = useGlassTheme();
  const textStyles = getThemeStyle('text') as { primary: string; secondary: string; muted: string };

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast Processing",
      description: "Advanced AI algorithms process your images in seconds, not minutes. Experience the fastest transformation speeds in the industry."
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Your images are processed with bank-level security. We never store your data and all processing happens in secure environments."
    },
    {
      icon: Award,
      title: "Award Winning Quality",
      description: "Consistently rated #1 for image quality and user satisfaction by industry professionals."
    },
    {
      icon: Rocket,
      title: "Unlimited Creativity",
      description: "No limits on your imagination. Transform any image into anything you can describe."
    }
  ];

  return (
    <section className="relative overflow-hidden py-20 px-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/10 to-white/5 blur-3xl"></div>
      <div className="absolute top-20 left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1500"></div>
      
      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${getThemeStyle('card')} ${textStyles.secondary} mb-6`}>
            <Rocket className="w-4 h-4" />
            <span className="text-sm font-medium">Why Choose Our Platform</span>
          </div>
          
          <h2 className={`text-4xl md:text-5xl font-bold ${textStyles.primary} mb-6 leading-tight`}>
            <span style={{ textShadow: '0 4px 15px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3)' }}>
              Built for{" "}
            </span>
            <span className="bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-100 bg-clip-text text-transparent" style={{ filter: 'drop-shadow(0 0 2px rgba(234, 179, 8, 0.3))' }}>
              Excellence
            </span>
          </h2>
          
          <p className="text-xl text-white/90 leading-relaxed max-w-3xl mx-auto" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)' }}>
            Experience the next generation of AI-powered image transformation with professional-grade results and unmatched reliability.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${getThemeStyle('card')} rounded-2xl p-8 ${getThemeStyle('shadow')} hover:${getThemeStyle('cardHover')} transition-all duration-300 group`}
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${getThemeStyle('buttonPrimary')} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className={`text-xl font-semibold ${textStyles.primary} mb-4`} style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)' }}>
                {feature.title}
              </h3>
              
              <p className={`${textStyles.secondary} leading-relaxed`} style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)' }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className={`text-4xl md:text-5xl font-bold ${textStyles.primary} mb-2`} style={{ textShadow: '0 4px 15px rgba(0, 0, 0, 0.5)' }}>
              <span className="bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-100 bg-clip-text text-transparent">
                100K+
              </span>
            </div>
            <p className={`${textStyles.secondary} text-lg`} style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)' }}>
              Happy Users
            </p>
          </div>
          
          <div className="text-center">
            <div className={`text-4xl md:text-5xl font-bold ${textStyles.primary} mb-2`} style={{ textShadow: '0 4px 15px rgba(0, 0, 0, 0.5)' }}>
              <span className="bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-100 bg-clip-text text-transparent">
                5M+
              </span>
            </div>
            <p className={`${textStyles.secondary} text-lg`} style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)' }}>
              Images Transformed
            </p>
          </div>
          
          <div className="text-center">
            <div className={`text-4xl md:text-5xl font-bold ${textStyles.primary} mb-2`} style={{ textShadow: '0 4px 15px rgba(0, 0, 0, 0.5)' }}>
              <span className="bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-100 bg-clip-text text-transparent">
                99.9%
              </span>
            </div>
            <p className={`${textStyles.secondary} text-lg`} style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)' }}>
              Uptime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlassFeaturesSection;
