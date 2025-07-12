
import { Menu, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGlassTheme } from "@/contexts/GlassThemeContext";
import GlassThemeSelector from "@/components/GlassThemeSelector";
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
        <div className="flex items-center space-x-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={`md:hidden ${textStyles.primary} hover:bg-white/10`}>
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
                <a href="/" className={`block px-4 py-3 text-sm ${textStyles.primary} hover:bg-white/10 rounded-lg transition-colors`}>
                  Home
                </a>
                <a href="#" className={`block px-4 py-3 text-sm ${textStyles.primary} hover:bg-white/10 rounded-lg transition-colors`}>
                  Gallery
                </a>
                <a href="#" className={`block px-4 py-3 text-sm ${textStyles.primary} hover:bg-white/10 rounded-lg transition-colors`}>
                  Settings
                </a>
              </div>
            </SheetContent>
          </Sheet>
          
          <div className="flex items-center gap-2">
            <div className={`p-2 ${getThemeStyle('buttonPrimary')} rounded-lg`}>
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className={`text-xl font-bold ${textStyles.primary} font-gochi`}>
              Decorspaceai
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className={`text-sm font-medium ${textStyles.secondary} hover:${textStyles.primary} transition-colors`}>
              Home
            </a>
            <a href="#" className={`text-sm font-medium ${textStyles.secondary} hover:${textStyles.primary} transition-colors`}>
              Gallery
            </a>
            <a href="#" className={`text-sm font-medium ${textStyles.secondary} hover:${textStyles.primary} transition-colors`}>
              Settings
            </a>
          </div>
          <GlassThemeSelector />
        </div>
      </div>
    </nav>
  );
};

export default GlassNavbar;
