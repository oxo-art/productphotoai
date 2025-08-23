
import { Menu, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGlassTheme } from "@/contexts/GlassThemeContext";
import GlassThemeSelector from "@/components/GlassThemeSelector";
import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const GlassNavbar = () => {
  const { getThemeStyle } = useGlassTheme();
  const textStyles = getThemeStyle('text') as { primary: string; secondary: string; muted: string };

  return (
    <nav className={`border-b border-white/10 ${getThemeStyle('navbar')} px-4 py-4`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className={`md:hidden ${textStyles.primary} hover:bg-white/10`}
                aria-label="Open navigation menu"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className={`${getThemeStyle('popover')} border-white/10`}>
              <SheetHeader>
                <SheetTitle className={textStyles.primary}>Navigation</SheetTitle>
                <SheetDescription className={textStyles.secondary}>
                  Navigate through the application
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <Link 
                  to="/" 
                  className={`block px-4 py-3 text-sm ${textStyles.primary} hover:bg-white/10 rounded-lg transition-colors min-h-[44px] flex items-center`}
                >
                  Home
                </Link>
                <Link 
                  to="/design" 
                  className={`block px-4 py-3 text-sm ${textStyles.primary} hover:bg-white/10 rounded-lg transition-colors min-h-[44px] flex items-center`}
                >
                  Design Tool
                </Link>
                <Link 
                  to="/contact" 
                  className={`block px-4 py-3 text-sm ${textStyles.primary} hover:bg-white/10 rounded-lg transition-colors min-h-[44px] flex items-center`}
                >
                  Contact us
                </Link>
              </div>
            </SheetContent>
          </Sheet>
          
          <div className={`p-2 ${getThemeStyle('buttonPrimary')} rounded-lg`}>
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          
          <Link to="/">
            <h1 className={`text-3xl font-bold ${textStyles.primary} font-ramlony cursor-pointer`} style={{ textShadow: '0 4px 8px rgba(0, 0, 0, 0.5), 0 2px 4px rgba(0, 0, 0, 0.3)' }}>
              Decorspaceai
            </h1>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`text-sm font-medium ${textStyles.secondary} hover:${textStyles.primary} transition-colors`}>
              Home
            </Link>
            <Link to="/design" className={`text-sm font-medium ${textStyles.secondary} hover:${textStyles.primary} transition-colors`}>
              Design Tool
            </Link>
            <Link to="/contact" className={`text-sm font-medium ${textStyles.secondary} hover:${textStyles.primary} transition-colors`}>
              Contact us
            </Link>
          </div>
          <GlassThemeSelector />
        </div>
      </div>
    </nav>
  );
};

export default GlassNavbar;
