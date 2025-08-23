
import { useEffect } from "react";
import { useGlassTheme } from "@/contexts/GlassThemeContext";
import { smoothScrollToTop } from "@/utils/scrollUtils";

const Terms = () => {
  const { getThemeStyle } = useGlassTheme();
  const textStyles = getThemeStyle('text') as { primary: string; secondary: string; muted: string };

  useEffect(() => {
    // Scroll to top when component mounts
    smoothScrollToTop();
  }, []);

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getThemeStyle('background')} transition-all duration-1000`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className={`max-w-4xl mx-auto ${getThemeStyle('card')} rounded-2xl p-6 sm:p-8 lg:p-12`}>
          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${textStyles.primary} mb-6 sm:mb-8`}>
            Terms & Conditions
          </h1>
          
          <div className={`prose prose-sm sm:prose-base lg:prose-lg ${textStyles.secondary} space-y-4 sm:space-y-6 max-w-none`}>
            <p className="leading-relaxed text-sm sm:text-base">
              These Terms and Conditions, along with privacy policy or other terms ("Terms") constitute a binding agreement by and between ABR ONLINE SERVICES, ( "Website Owner" or "we" or "us" or "our") and you ("you" or "your") and relate to your use of our website, goods (as applicable) or services (as applicable) (collectively, "Services").
            </p>
            
            <p className="leading-relaxed text-sm sm:text-base">
              By using our website and availing the Services, you agree that you have read and accepted these Terms (including the Privacy Policy). We reserve the right to modify these Terms at any time and without assigning any reason. It is your responsibility to periodically review these Terms to stay informed of updates.
            </p>
            
            <p className={`leading-relaxed font-semibold text-sm sm:text-base ${textStyles.primary}`}>
              The use of this website or availing of our Services is subject to the following terms of use:
            </p>
            
            <ol className="list-decimal list-inside space-y-3 sm:space-y-4 pl-2 sm:pl-4">
              <li className="leading-relaxed text-sm sm:text-base">
                To access and use the Services, you agree to provide true, accurate and complete information to us during and after registration, and you shall be responsible for all acts done through the use of your registered account.
              </li>
              
              <li className="leading-relaxed text-sm sm:text-base">
                Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials offered on this website or through the Services, for any specific purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.
              </li>
              
              <li className="leading-relaxed text-sm sm:text-base">
                Your use of our Services and the website is solely at your own risk and discretion.. You are required to independently assess and ensure that the Services meet your requirements.
              </li>
              
              <li className="leading-relaxed text-sm sm:text-base">
                The contents of the Website and the Services are proprietary to Us and you will not have any authority to claim any intellectual property rights, title, or interest in its contents.
              </li>
              
              <li className="leading-relaxed text-sm sm:text-base">
                You acknowledge that unauthorized use of the Website or the Services may lead to action against you as per these Terms or applicable laws.
              </li>
              
              <li className="leading-relaxed text-sm sm:text-base">
                You agree to pay us the charges associated with availing the Services.
              </li>
              
              <li className="leading-relaxed text-sm sm:text-base">
                You agree not to use the website and/ or Services for any purpose that is unlawful, illegal or forbidden by these Terms, or Indian or local laws that might apply to you.
              </li>
              
              <li className="leading-relaxed text-sm sm:text-base">
                You agree and acknowledge that website and the Services may contain links to other third party websites. On accessing these links, you will be governed by the terms of use, privacy policy and such other policies of such third party websites.
              </li>
              
              <li className="leading-relaxed text-sm sm:text-base">
                You understand that upon initiating a transaction for availing the Services you are entering into a legally binding and enforceable contract with the us for the Services.
              </li>
              
              <li className="leading-relaxed text-sm sm:text-base">
                You shall be entitled to claim a refund of the payment made by you in case we are not able to provide the Service. The timelines for such return and refund will be according to the specific Service you have availed or within the time period provided in our policies (as applicable). In case you do not raise a refund claim within the stipulated time, than this would make you ineligible for a refund.
              </li>
              
              <li className="leading-relaxed text-sm sm:text-base">
                Notwithstanding anything contained in these Terms, the parties shall not be liable for any failure to perform an obligation under these Terms if performance is prevented or delayed by a force majeure event.
              </li>
              
              <li className="leading-relaxed text-sm sm:text-base">
                These Terms and any dispute or claim relating to it, or its enforceability, shall be governed by and construed in accordance with the laws of India.
              </li>
              
              <li className="leading-relaxed text-sm sm:text-base">
                All disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts in SAROORNAGAR, Telangana
              </li>
              
              <li className="leading-relaxed text-sm sm:text-base">
                All concerns or communications relating to these Terms must be communicated to us using the contact information provided on this website.
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
