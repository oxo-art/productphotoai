
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGlassTheme } from "@/contexts/GlassThemeContext";
import GlassThemeSelector from "./GlassThemeSelector";
import { useMobileOptimization } from "@/hooks/useMobileOptimization";

const GlassNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { getThemeStyle } = useGlassTheme();
  const { animationDuration } = useMobileOptimization();
  const textStyles = getThemeStyle('text') as { primary: string; secondary: string; muted: string };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${getThemeStyle('navbar')} ${animationDuration}`} style={{ contain: 'layout style paint' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 lg:h-24">
          {/* Logo */}
          <Link 
            to="/" 
            className={`text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold ${textStyles.primary} hover:scale-105 ${animationDuration} touch-target`}
          >
            ImageAI
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link 
              to="/" 
              className={`${textStyles.secondary} hover:${textStyles.primary} ${animationDuration} text-base lg:text-lg xl:text-xl font-medium touch-target`}
            >
              Home
            </Link>
            <Link 
              to="/design" 
              className={`${textStyles.secondary} hover:${textStyles.primary} ${animationDuration} text-base lg:text-lg xl:text-xl font-medium touch-target`}
            >
              Design Tool
            </Link>
            
            <GlassThemeSelector />
            
            <Link to="/design">
              <Button 
                className={`${getThemeStyle('buttonPrimary')} text-white px-6 py-3 lg:px-8 lg:py-4 text-base lg:text-lg xl:text-xl font-semibold rounded-xl hover:scale-105 ${animationDuration} touch-target`}
              >
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              onClick={() => setIsOpen(!isOpen)}
              variant="ghost"
              className={`${textStyles.primary} hover:${getThemeStyle('cardHover')} p-3 touch-target`}
            >
              {isOpen ? <X className="w-6 h-6 lg:w-8 lg:h-8" /> : <Menu className="w-6 h-6 lg:w-8 lg:h-8" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className={`md:hidden ${getThemeStyle('card')} rounded-2xl mx-4 mb-4 p-6 shadow-xl ${animationDuration}`}>
            <div className="space-y-4">
              <Link 
                to="/" 
                className={`block ${textStyles.secondary} hover:${textStyles.primary} ${animationDuration} text-lg lg:text-xl font-medium py-2 touch-target`}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/design" 
                className={`block ${textStyles.secondary} hover:${textStyles.primary} ${animationDuration} text-lg lg:text-xl font-medium py-2 touch-target`}
                onClick={() => setIsOpen(false)}
              >
                Design Tool
              </Link>
              
              <div className="py-2">
                <GlassThemeSelector />
              </div>
              
              <Link to="/design" onClick={() => setIsOpen(false)}>
                <Button 
                  className={`w-full ${getThemeStyle('buttonPrimary')} text-white px-6 py-4 text-lg font-semibold rounded-xl hover:scale-105 ${animationDuration} touch-target`}
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default GlassNavbar;
