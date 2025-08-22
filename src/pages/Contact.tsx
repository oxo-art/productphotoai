
import { useEffect } from "react";
import { useGlassTheme } from "@/contexts/GlassThemeContext";
import { smoothScrollToTop } from "@/utils/scrollUtils";

const Contact = () => {
  const { getThemeStyle } = useGlassTheme();

  useEffect(() => {
    // Scroll to top when component mounts
    smoothScrollToTop();
  }, []);

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getThemeStyle('background')} transition-all duration-1000`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className={`max-w-2xl mx-auto ${getThemeStyle('card')} rounded-2xl p-6 sm:p-8 lg:p-10`}>
          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 ${(getThemeStyle('text') as any).primary}`}>
            Contact Us
          </h1>
          
          <div className={`space-y-4 sm:space-y-6 ${(getThemeStyle('text') as any).secondary}`}>
            <p className="text-base sm:text-lg leading-relaxed">
              You may contact us using the information below:
            </p>
            
            <div className="space-y-4 sm:space-y-6">
              <div className="break-words">
                <h3 className={`font-semibold text-sm sm:text-base ${(getThemeStyle('text') as any).primary} mb-2`}>
                  Merchant Legal entity name:
                </h3>
                <p className="text-sm sm:text-base">ABR ONLINE SERVICES.</p>
              </div>
              
              <div className="break-words">
                <h3 className={`font-semibold text-sm sm:text-base ${(getThemeStyle('text') as any).primary} mb-2`}>
                  Operational Address:
                </h3>
                <p className="text-sm sm:text-base leading-relaxed">
                  9-4-87/203 ADARSH RESIDENCY, GANDHI STATUE ROAD, HYDERABAD, RANGAREDDY, TELANGANA, 500079, SAROORNAGAR
                </p>
              </div>
              
              <div className="break-words">
                <h3 className={`font-semibold text-sm sm:text-base ${(getThemeStyle('text') as any).primary} mb-2`}>
                  Telephone No:
                </h3>
                <p className="text-sm sm:text-base">
                  <a href="tel:+918121657845" className="hover:underline transition-all duration-200">
                    +918121657845
                  </a>
                </p>
              </div>
              
              <div className="break-words">
                <h3 className={`font-semibold text-sm sm:text-base ${(getThemeStyle('text') as any).primary} mb-2`}>
                  E-Mail ID:
                </h3>
                <p className="text-sm sm:text-base">
                  <a href="mailto:Contact@decorspaceai.com" className="hover:underline transition-all duration-200">
                    Contact@decorspaceai.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
