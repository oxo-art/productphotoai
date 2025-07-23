
import { Star, Shield, Zap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const NavySection = () => {
  return (
    <section className="relative overflow-hidden py-20 px-4 bg-gradient-to-br from-blue-950 via-indigo-900 to-slate-900 -mt-1">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-indigo-500/10 to-slate-500/10 blur-3xl"></div>
      <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-blue-500/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-indigo-500/20 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why Choose Our Platform?
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Experience the future of image editing with our cutting-edge AI technology
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Premium Quality</h3>
            <p className="text-white/70">Professional-grade results with every transformation</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Secure & Private</h3>
            <p className="text-white/70">Your images are processed securely and never stored</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Lightning Fast</h3>
            <p className="text-white/70">Get results in seconds, not minutes</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Trusted by Thousands</h3>
            <p className="text-white/70">Join our growing community of creators</p>
          </div>
        </div>

        <div className="text-center mt-16">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Transform Your Images?</h3>
            <p className="text-white/80 mb-6">
              Join thousands of creators who are already using our AI-powered platform to bring their visions to life.
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Get Started Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NavySection;
