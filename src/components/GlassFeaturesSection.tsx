
import { Zap, Shield, Award, Rocket, Camera, Palette, Wand2, Image } from "lucide-react";
import { useGlassTheme } from "@/contexts/GlassThemeContext";
import { useMobileOptimization } from "@/hooks/useMobileOptimization";
import BeforeAfterSlider from "./BeforeAfterSlider";

const GlassFeaturesSection = () => {
  const { getThemeStyle } = useGlassTheme();
  const { blurIntensity, animationDuration, isMobile } = useMobileOptimization();
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
    <section className="relative overflow-hidden py-12 sm:py-24 px-4" style={{ contain: 'layout style paint' }}>
      {/* Background decorative elements - removed pulse animations */}
      <div className={`absolute inset-0 bg-gradient-to-br from-white/5 via-white/10 to-white/5 ${blurIntensity}`}></div>
      <div className={`absolute top-10 sm:top-20 left-10 sm:left-20 w-48 h-48 sm:w-64 sm:h-64 bg-white/5 rounded-full ${blurIntensity}`} style={{ animationFillMode: 'forwards' }}></div>
      <div className={`absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-56 h-56 sm:w-80 sm:h-80 bg-white/10 rounded-full ${blurIntensity}`} style={{ animationFillMode: 'forwards' }}></div>
      
      <div className="relative max-w-7xl mx-auto">
        {/* Image Editing Use Case Section */}
        <div className="mb-20 sm:mb-28">
          <div className="text-center mb-16 sm:mb-20 px-4">
            <div className={`inline-flex items-center gap-2 sm:gap-3 px-4 py-3 sm:px-6 sm:py-4 rounded-full ${getThemeStyle('card')} ${textStyles.secondary} mb-6 sm:mb-8`}>
              <Image className="w-4 h-4 sm:w-6 sm:h-6" />
              <span className="text-sm sm:text-lg lg:text-xl font-medium">Image Editing Use Case</span>
            </div>
            
            <h2 className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold ${textStyles.primary} mb-6 sm:mb-8 leading-tight`}>
              <span style={{ textShadow: '0 4px 15px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3)' }}>
                Perfect for{" "}
              </span>
              <span className="bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-100 bg-clip-text text-transparent" style={{ filter: 'drop-shadow(0 0 2px rgba(234, 179, 8, 0.3))' }}>
                Every Project
              </span>
            </h2>
            
            <p className="text-lg sm:text-2xl lg:text-3xl text-white/90 leading-relaxed max-w-4xl mx-auto" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)' }}>
              From professional product photography to creative content creation, our AI handles every image editing challenge with precision and style.
            </p>
          </div>

          {/* Responsive Use Cases Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 px-4">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className={`${getThemeStyle('card')} rounded-xl sm:rounded-2xl p-8 sm:p-10 lg:p-12 ${getThemeStyle('shadow')} hover:${getThemeStyle('cardHover')} ${animationDuration} group`}
                style={{ contain: 'layout style paint' }}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-xl ${getThemeStyle('buttonPrimary')} mb-6 sm:mb-8 group-hover:scale-110 ${animationDuration}`}>
                  <useCase.icon className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" />
                </div>
                
                {/* Move title and description before slider for Product Photography */}
                {useCase.hasSlider && (
                  <>
                    <h3 className={`text-xl sm:text-2xl lg:text-3xl font-semibold ${textStyles.primary} mb-4 sm:mb-6`} style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)' }}>
                      {useCase.title}
                    </h3>
                    
                    <p className={`${textStyles.secondary} leading-relaxed mb-6 sm:mb-8 text-base sm:text-lg lg:text-xl`} style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)' }}>
                      {useCase.description}
                    </p>
                  </>
                )}
                
                {/* Before and After Slider for Product Photography card */}
                {useCase.hasSlider && (
                  <div className="mb-6 sm:mb-8">
                    <BeforeAfterSlider
                      beforeImage="/lovable-uploads/5b72d958-1574-40c1-a179-edfa72623843.png"
                      afterImage="/lovable-uploads/0084acda-65f8-47c3-9b69-188bd62e8a80.png"
                      className="mb-6 sm:mb-8"
                    />
                    
                    {/* Enlarged prompt text */}
                    <div className={`p-6 sm:p-8 lg:p-10 rounded-xl sm:rounded-2xl ${getThemeStyle('card')} border border-white/20 ${isMobile ? '' : 'backdrop-blur-md'}`}>
                      <div className="space-y-3 sm:space-y-4">
                        <div className="text-lg sm:text-xl lg:text-2xl font-semibold text-white/90">
                          Prompt:
                        </div>
                        <p className="text-base sm:text-lg lg:text-xl text-white/80 leading-relaxed" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)' }}>
                          Put an "orange juice" label on the can, and change the background to blue studio, add 3 to 4 oranges stuck in mid air around the can, hyper-realistic.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Show title and description for non-slider cards */}
                {!useCase.hasSlider && (
                  <>
                    <h3 className={`text-xl sm:text-2xl lg:text-3xl font-semibold ${textStyles.primary} mb-4 sm:mb-6`} style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)' }}>
                      {useCase.title}
                    </h3>
                    
                    <p className={`${textStyles.secondary} leading-relaxed text-base sm:text-lg lg:text-xl`} style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)' }}>
                      {useCase.description}
                    </p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Features Section Header */}
        <div className="text-center mb-16 sm:mb-20 px-4">
          <div className={`inline-flex items-center gap-2 sm:gap-3 px-4 py-3 sm:px-6 sm:py-4 rounded-full ${getThemeStyle('card')} ${textStyles.secondary} mb-6 sm:mb-8`}>
            <Rocket className="w-4 h-4 sm:w-6 sm:h-6" />
            <span className="text-sm sm:text-lg lg:text-xl font-medium">Why Choose Our Platform</span>
          </div>
          
          <h2 className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold ${textStyles.primary} mb-6 sm:mb-8 leading-tight`}>
            <span style={{ textShadow: '0 4px 15px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3)' }}>
              Built for{" "}
            </span>
            <span className="bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-100 bg-clip-text text-transparent" style={{ filter: 'drop-shadow(0 0 2px rgba(234, 179, 8, 0.3))' }}>
              Excellence
            </span>
          </h2>
          
          <p className="text-lg sm:text-2xl lg:text-3xl text-white/90 leading-relaxed max-w-4xl mx-auto" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)' }}>
            Experience the next generation of AI-powered image transformation with professional-grade results and unmatched reliability.
          </p>
        </div>

        {/* Enlarged Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 px-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${getThemeStyle('card')} rounded-xl sm:rounded-2xl p-8 sm:p-10 lg:p-12 ${getThemeStyle('shadow')} hover:${getThemeStyle('cardHover')} ${animationDuration} group`}
              style={{ contain: 'layout style paint' }}
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-xl ${getThemeStyle('buttonPrimary')} mb-6 sm:mb-8 group-hover:scale-110 ${animationDuration}`}>
                <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" />
              </div>
              
              <h3 className={`text-xl sm:text-2xl lg:text-3xl font-semibold ${textStyles.primary} mb-4 sm:mb-6`} style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)' }}>
                {feature.title}
              </h3>
              
              <p className={`${textStyles.secondary} leading-relaxed text-base sm:text-lg lg:text-xl`} style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)' }}>
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
