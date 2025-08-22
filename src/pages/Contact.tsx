
import { useGlassTheme } from "@/contexts/GlassThemeContext";

const Contact = () => {
  const { getThemeStyle } = useGlassTheme();

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getThemeStyle('background')} transition-all duration-1000`}>
      <div className="container mx-auto px-4 py-16">
        <div className={`max-w-2xl mx-auto ${getThemeStyle('card')} rounded-2xl p-8`}>
          <h1 className={`text-4xl font-bold mb-8 ${(getThemeStyle('text') as any).primary}`}>
            Contact Us
          </h1>
          
          <div className={`space-y-6 ${(getThemeStyle('text') as any).secondary}`}>
            <p className="text-lg">
              You may contact us using the information below:
            </p>
            
            <div className="space-y-4">
              <div>
                <h3 className={`font-semibold ${(getThemeStyle('text') as any).primary} mb-2`}>
                  Merchant Legal entity name:
                </h3>
                <p>ABR ONLINE SERVICES.</p>
              </div>
              
              <div>
                <h3 className={`font-semibold ${(getThemeStyle('text') as any).primary} mb-2`}>
                  Operational Address:
                </h3>
                <p>9-4-87/203 ADARSH RESIDENCY, GANDHI STATUE ROAD, HYDERABAD, RANGAREDDY, TELANGANA, 500079, SAROORNAGAR</p>
              </div>
              
              <div>
                <h3 className={`font-semibold ${(getThemeStyle('text') as any).primary} mb-2`}>
                  Telephone No:
                </h3>
                <p>+918121657845</p>
              </div>
              
              <div>
                <h3 className={`font-semibold ${(getThemeStyle('text') as any).primary} mb-2`}>
                  E-Mail ID:
                </h3>
                <p>Contact@decorspaceai.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
