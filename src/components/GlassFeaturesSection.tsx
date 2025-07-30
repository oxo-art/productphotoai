
import { Zap, Shield, Award, Rocket, Camera, Palette, Wand2, Image } from "lucide-react";
import { useGlassTheme } from "@/contexts/GlassThemeContext";
import { useMobileOptimization } from "@/hooks/useMobileOptimization";

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
    <section className="relative overflow-hidden py-10 sm:py-20 px-4" style={{ contain: 'layout style paint' }}>
      {/* Optimized Background decorative elements */}
      <div className={`absolute inset-0 bg-gradient-to-br from-white/5 via-white/10 to-white/5 ${blurIntensity}`}></div>
      <div className={`absolute top-10 sm:top-20 left-10 sm:left-20 w-48 h-48 sm:w-64 sm:h-64 bg-white/5 rounded-full ${blurIntensity} animate-pulse delay-500`} style={{ animationFillMode: 'forwards' }}></div>
      <div className={`absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-56 h-56 sm:w-80 sm:h-80 bg-white/10 rounded-full ${blurIntensity} animate-pulse delay-1500`} style={{ animationFillMode: 'forwards' }}></div>
      
      <div className="relative max-w-7xl mx-auto">
        {/* Image Editing Use Case Section */}
        <div className="mb-16 sm:mb-24">
          <div className="text-center mb-12 sm:mb-16 px-4">
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full ${getThemeStyle('card')} ${textStyles.secondary} mb-4 sm:mb-6`}>
              <Image className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm font-medium">Image Editing Use Case</span>
            </div>
            
            <h2 className={`text-2xl sm:text-4xl md:text-5xl font-bold ${textStyles.primary} mb-4 sm:mb-6 leading-tight`}>
              <span style={{ textShadow: '0 4px 15px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3)' }}>
                Perfect for{" "}
              </span>
              <span className="bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-100 bg-clip-text text-transparent" style={{ filter: 'drop-shadow(0 0 2px rgba(234, 179, 8, 0.3))' }}>
                Every Project
              </span>
            </h2>
            
            <p className="text-base sm:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)' }}>
              From professional product photography to creative content creation, our AI handles every image editing challenge with precision and style.
            </p>
          </div>

          {/* Responsive Use Cases Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 px-4">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className={`${getThemeStyle('card')} rounded-xl sm:rounded-2xl p-6 sm:p-8 ${getThemeStyle('shadow')} hover:${getThemeStyle('cardHover')} ${animationDuration} group`}
                style={{ contain: 'layout style paint' }}
              >
                <div className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${getThemeStyle('buttonPrimary')} mb-4 sm:mb-6 group-hover:scale-110 ${animationDuration}`}>
                  <useCase.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                
                {/* Move title and description before slider for Product Photography */}
                {useCase.hasSlider && (
                  <>
                    <h3 className={`text-lg sm:text-xl font-semibold ${textStyles.primary} mb-3 sm:mb-4`} style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)' }}>
                      {useCase.title}
                    </h3>
                    
                    <p className={`${textStyles.secondary} leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base`} style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)' }}>
                      {useCase.description}
                    </p>
                  </>
                )}
                
                {/* Responsive slider for Product Photography card */}
                {useCase.hasSlider && (
                  <div className="mb-4 sm:mb-6">
                    <div className="relative max-w-2xl mx-auto">
                      <img 
                        src="/lovable-uploads/eede4c9e-9788-42fd-b8ee-446e59290251.png"
                        alt="Product Photography Example"
                        className="w-full h-auto rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl"
                        loading="lazy"
                      />
                    </div>
                    
                    {/* Responsive prompt text */}
                    <div className={`mt-4 sm:mt-6 p-4 sm:p-6 rounded-xl sm:rounded-2xl ${getThemeStyle('card')} border border-white/20 ${isMobile ? '' : 'backdrop-blur-md'}`}>
                      <div className="space-y-2">
                        <div className="text-base sm:text-lg font-semibold text-white/90">
                          Prompt:
                        </div>
                        <p className="text-sm sm:text-base text-white/80 leading-relaxed" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)' }}>
                          A baby wearing gold chain and sunglasses with a leather jacket holding this product in his hand, hyper-realistic.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Show title and description for non-slider cards */}
                {!useCase.hasSlider && (
                  <>
                    <h3 className={`text-lg sm:text-xl font-semibold ${textStyles.primary} mb-3 sm:mb-4`} style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)' }}>
                      {useCase.title}
                    </h3>
                    
                    <p className={`${textStyles.secondary} leading-relaxed text-sm sm:text-base`} style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)' }}>
                      {useCase.description}
                    </p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Features Section Header */}
        <div className="text-center mb-12 sm:mb-16 px-4">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full ${getThemeStyle('card')} ${textStyles.secondary} mb-4 sm:mb-6`}>
            <Rocket className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm font-medium">Why Choose Our Platform</span>
          </div>
          
          <h2 className={`text-2xl sm:text-4xl md:text-5xl font-bold ${textStyles.primary} mb-4 sm:mb-6 leading-tight`}>
            <span style={{ textShadow: '0 4px 15px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3)' }}>
              Built for{" "}
            </span>
            <span className="bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-100 bg-clip-text text-transparent" style={{ filter: 'drop-shadow(0 0 2px rgba(234, 179, 8, 0.3))' }}>
              Excellence
            </span>
          </h2>
          
          <p className="text-base sm:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)' }}>
            Experience the next generation of AI-powered image transformation with professional-grade results and unmatched reliability.
          </p>
        </div>

        {/* Responsive Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 px-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${getThemeStyle('card')} rounded-xl sm:rounded-2xl p-6 sm:p-8 ${getThemeStyle('shadow')} hover:${getThemeStyle('cardHover')} ${animationDuration} group`}
              style={{ contain: 'layout style paint' }}
            >
              <div className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${getThemeStyle('buttonPrimary')} mb-4 sm:mb-6 group-hover:scale-110 ${animationDuration}`}>
                <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              
              <h3 className={`text-lg sm:text-xl font-semibold ${textStyles.primary} mb-3 sm:mb-4`} style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)' }}>
                {feature.title}
              </h3>
              
              <p className={`${textStyles.secondary} leading-relaxed text-sm sm:text-base`} style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)' }}>
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
