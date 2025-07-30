
import { Zap, Shield, Award, Rocket, Camera, Palette, Wand2, Image } from "lucide-react";
import { useGlassTheme } from "@/contexts/GlassThemeContext";
import BeforeAfterSlider from "./BeforeAfterSlider";

const GlassFeaturesSection = () => {
  const { getThemeStyle } = useGlassTheme();
  const textStyles = getThemeStyle('text') as { primary: string; secondary: string; muted: string };

  const useCases = [
    {
      icon: Camera,
      title: "Product Photography",
      description: "Transform product shots with professional backgrounds and enhanced lighting for e-commerce excellence.",
      hasSlider: true
    },
    {
      icon: Palette,
      title: "Creative Design",
      description: "Reimagine artwork and designs with AI-powered style transfers and artistic transformations."
    },
    {
      icon: Wand2,
      title: "Content Creation",
      description: "Generate eye-catching visuals for social media, marketing campaigns, and digital content."
    },
    {
      icon: Image,
      title: "Photo Restoration",
      description: "Restore old photographs and enhance image quality with advanced AI algorithms."
    }
  ];

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
        {/* Image Editing Use Case Section */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${getThemeStyle('card')} ${textStyles.secondary} mb-6`}>
              <Image className="w-4 h-4" />
              <span className="text-sm font-medium">Image Editing Use Case</span>
            </div>
            
            <h2 className={`text-4xl md:text-5xl font-bold ${textStyles.primary} mb-6 leading-tight`}>
              <span style={{ textShadow: '0 4px 15px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3)' }}>
                Perfect for{" "}
              </span>
              <span className="bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-100 bg-clip-text text-transparent" style={{ filter: 'drop-shadow(0 0 2px rgba(234, 179, 8, 0.3))' }}>
                Every Project
              </span>
            </h2>
            
            <p className="text-xl text-white/90 leading-relaxed max-w-3xl mx-auto" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)' }}>
              From professional product photography to creative content creation, our AI handles every image editing challenge with precision and style.
            </p>
          </div>

          {/* Use Cases Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className={`${getThemeStyle('card')} rounded-2xl p-8 ${getThemeStyle('shadow')} hover:${getThemeStyle('cardHover')} transition-all duration-300 group`}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${getThemeStyle('buttonPrimary')} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <useCase.icon className="w-6 h-6 text-white" />
                </div>
                
                {/* Move title and description before slider for Product Photography */}
                {useCase.hasSlider && (
                  <>
                    <h3 className={`text-xl font-semibold ${textStyles.primary} mb-4`} style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)' }}>
                      {useCase.title}
                    </h3>
                    
                    <p className={`${textStyles.secondary} leading-relaxed mb-6`} style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)' }}>
                      {useCase.description}
                    </p>
                  </>
                )}
                
                {/* Add expanded slider for Product Photography card */}
                {useCase.hasSlider && (
                  <div className="mb-6">
                    <BeforeAfterSlider
                      beforeImage=""
                      afterImage=""
                      className="mx-auto max-w-xl"
                    />
                    
                    {/* Updated prompt text with new styling */}
                    <div className={`mt-6 p-6 rounded-2xl ${getThemeStyle('card')} border border-white/20 backdrop-blur-md`}>
                      <div className="space-y-2">
                        <div className="text-lg font-semibold text-white/90">
                          Prompt:
                        </div>
                        <p className="text-base text-white/80 leading-relaxed" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)' }}>
                          A baby wearing gold chain and sunglasses with a leather jacket holding this product in his hand, hyper-realistic.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Show title and description for non-slider cards */}
                {!useCase.hasSlider && (
                  <>
                    <h3 className={`text-xl font-semibold ${textStyles.primary} mb-4`} style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)' }}>
                      {useCase.title}
                    </h3>
                    
                    <p className={`${textStyles.secondary} leading-relaxed`} style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)' }}>
                      {useCase.description}
                    </p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

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
      </div>
    </section>
  );
};

export default GlassFeaturesSection;
