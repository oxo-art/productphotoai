
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
    <section className="relative overflow-hidden py-16 sm:py-32 lg:py-40 px-4" style={{ contain: 'layout style paint' }}>
      {/* Background decorative elements */}
      <div className={`absolute inset-0 bg-gradient-to-br from-white/5 via-white/10 to-white/5 ${blurIntensity}`}></div>
      <div className={`absolute top-16 sm:top-32 left-16 sm:left-32 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-white/5 rounded-full ${blurIntensity}`}></div>
      <div className={`absolute bottom-16 sm:bottom-32 right-16 sm:right-32 w-80 h-80 sm:w-96 sm:h-96 lg:w-112 lg:h-112 bg-white/10 rounded-full ${blurIntensity}`}></div>
      
      <div className="relative max-w-7xl mx-auto">
        {/* Image Editing Use Case Section */}
        <div className="mb-28 sm:mb-36 lg:mb-44">
          <div className="text-center mb-20 sm:mb-28 lg:mb-36 px-4">
            <div className={`inline-flex items-center gap-3 sm:gap-4 lg:gap-5 px-6 py-4 sm:px-8 sm:py-5 lg:px-10 lg:py-6 rounded-full ${getThemeStyle('card')} ${textStyles.secondary} mb-8 sm:mb-12 lg:mb-16`}>
              <Image className="w-5 h-5 sm:w-7 sm:h-7 lg:w-9 lg:h-9" />
              <span className="text-base sm:text-xl lg:text-2xl xl:text-3xl font-medium">Image Editing Use Case</span>
            </div>
            
            <h2 className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold ${textStyles.primary} mb-8 sm:mb-12 lg:mb-16 leading-tight`}>
              <span style={{ textShadow: '0 4px 15px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3)' }}>
                Perfect for{" "}
              </span>
              <span className="bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-100 bg-clip-text text-transparent" style={{ filter: 'drop-shadow(0 0 2px rgba(234, 179, 8, 0.3))' }}>
                Every Project
              </span>
            </h2>
            
            <p className="text-xl sm:text-3xl lg:text-4xl xl:text-5xl text-white/90 leading-relaxed max-w-5xl mx-auto font-light" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)' }}>
              From professional product photography to creative content creation, our AI handles every image editing challenge with precision and style.
            </p>
          </div>

          {/* Responsive Use Cases Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-16 px-4">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className={`${getThemeStyle('card')} rounded-2xl sm:rounded-3xl p-10 sm:p-14 lg:p-16 xl:p-20 ${getThemeStyle('shadow')} hover:${getThemeStyle('cardHover')} ${animationDuration} group`}
                style={{ contain: 'layout style paint' }}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 rounded-2xl ${getThemeStyle('buttonPrimary')} mb-8 sm:mb-12 lg:mb-16 group-hover:scale-110 ${animationDuration} touch-target`}>
                  <useCase.icon className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 text-white" />
                </div>
                
                {/* Move title and description before slider for Product Photography */}
                {useCase.hasSlider && (
                  <>
                    <h3 className={`text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold ${textStyles.primary} mb-6 sm:mb-8 lg:mb-10`} style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)' }}>
                      {useCase.title}
                    </h3>
                    
                    <p className={`${textStyles.secondary} leading-relaxed mb-8 sm:mb-12 lg:mb-16 text-lg sm:text-xl lg:text-2xl xl:text-3xl`} style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)' }}>
                      {useCase.description}
                    </p>
                  </>
                )}
                
                {/* Enlarged slider for Product Photography card */}
                {useCase.hasSlider && (
                  <div className="mb-8 sm:mb-12 lg:mb-16">
                    <div className="relative max-w-4xl mx-auto">
                      <img 
                        src="/lovable-uploads/eede4c9e-9788-42fd-b8ee-446e59290251.png"
                        alt="Product Photography Example"
                        className="w-full h-auto rounded-2xl sm:rounded-3xl shadow-2xl"
                        loading="lazy"
                      />
                    </div>
                    
                    {/* Enlarged prompt text */}
                    <div className={`mt-8 sm:mt-12 lg:mt-16 p-8 sm:p-12 lg:p-16 xl:p-20 rounded-2xl sm:rounded-3xl ${getThemeStyle('card')} border border-white/20 ${isMobile ? '' : 'backdrop-blur-md'}`}>
                      <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                        <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold text-white/90">
                          Prompt:
                        </div>
                        <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-white/80 leading-relaxed" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)' }}>
                          A baby wearing gold chain and sunglasses with a leather jacket holding this product in his hand, hyper-realistic.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Show title and description for non-slider cards */}
                {!useCase.hasSlider && (
                  <>
                    <h3 className={`text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold ${textStyles.primary} mb-6 sm:mb-8 lg:mb-10`} style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)' }}>
                      {useCase.title}
                    </h3>
                    
                    <p className={`${textStyles.secondary} leading-relaxed text-lg sm:text-xl lg:text-2xl xl:text-3xl`} style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)' }}>
                      {useCase.description}
                    </p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Features Section Header */}
        <div className="text-center mb-20 sm:mb-28 lg:mb-36 px-4">
          <div className={`inline-flex items-center gap-3 sm:gap-4 lg:gap-5 px-6 py-4 sm:px-8 sm:py-5 lg:px-10 lg:py-6 rounded-full ${getThemeStyle('card')} ${textStyles.secondary} mb-8 sm:mb-12 lg:mb-16`}>
            <Rocket className="w-5 h-5 sm:w-7 sm:h-7 lg:w-9 lg:h-9" />
            <span className="text-base sm:text-xl lg:text-2xl xl:text-3xl font-medium">Why Choose Our Platform</span>
          </div>
          
          <h2 className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold ${textStyles.primary} mb-8 sm:mb-12 lg:mb-16 leading-tight`}>
            <span style={{ textShadow: '0 4px 15px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3)' }}>
              Built for{" "}
            </span>
            <span className="bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-100 bg-clip-text text-transparent" style={{ filter: 'drop-shadow(0 0 2px rgba(234, 179, 8, 0.3))' }}>
              Excellence
            </span>
          </h2>
          
          <p className="text-xl sm:text-3xl lg:text-4xl xl:text-5xl text-white/90 leading-relaxed max-w-5xl mx-auto font-light" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)' }}>
            Experience the next generation of AI-powered image transformation with professional-grade results and unmatched reliability.
          </p>
        </div>

        {/* Enlarged Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-16 px-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${getThemeStyle('card')} rounded-2xl sm:rounded-3xl p-10 sm:p-14 lg:p-16 xl:p-20 ${getThemeStyle('shadow')} hover:${getThemeStyle('cardHover')} ${animationDuration} group`}
              style={{ contain: 'layout style paint' }}
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 rounded-2xl ${getThemeStyle('buttonPrimary')} mb-8 sm:mb-12 lg:mb-16 group-hover:scale-110 ${animationDuration} touch-target`}>
                <feature.icon className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 text-white" />
              </div>
              
              <h3 className={`text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold ${textStyles.primary} mb-6 sm:mb-8 lg:mb-10`} style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)' }}>
                {feature.title}
              </h3>
              
              <p className={`${textStyles.secondary} leading-relaxed text-lg sm:text-xl lg:text-2xl xl:text-3xl`} style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)' }}>
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
