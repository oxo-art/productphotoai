
import { Menu, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import ArtisticThemeSelector from "@/components/ArtisticThemeSelector";
import { useArtisticTheme } from "@/contexts/ArtisticThemeContext";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const ArtisticNavbar = () => {
  const { getThemeStyle } = useArtisticTheme();

  return (
    <nav className={`${getThemeStyle('navbar')} px-4 py-4 ${getThemeStyle('typography')}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={`md:hidden ${getThemeStyle('text').primary} hover:bg-black/10`}>
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className={`${getThemeStyle('popover')}`}>
              <SheetHeader>
                <SheetTitle className={getThemeStyle('text').primary}>Navigation</SheetTitle>
                <SheetDescription className={getThemeStyle('text').secondary}>
                  Navigate through the application
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <a href="/" className={`block px-4 py-3 text-sm ${getThemeStyle('text').primary} hover:bg-black/10 rounded-lg transition-colors`}>
                  Home
                </a>
                <a href="#" className={`block px-4 py-3 text-sm ${getThemeStyle('text').primary} hover:bg-black/10 rounded-lg transition-colors`}>
                  Gallery
                </a>
                <a href="#" className={`block px-4 py-3 text-sm ${getThemeStyle('text').primary} hover:bg-black/10 rounded-lg transition-colors`}>
                  Settings
                </a>
              </div>
            </SheetContent>
          </Sheet>
          
          <div className="flex items-center gap-2">
            <div className={`p-2 ${getThemeStyle('buttonPrimary')} rounded-lg`}>
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className={`text-xl ${getThemeStyle('typography')} ${getThemeStyle('text').primary}`}>
              ImageAI Pro
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className={`text-sm font-medium ${getThemeStyle('text').secondary} hover:${getThemeStyle('text').primary} transition-colors`}>
              Home
            </a>
            <a href="#" className={`text-sm font-medium ${getThemeStyle('text').secondary} hover:${getThemeStyle('text').primary} transition-colors`}>
              Gallery
            </a>
            <a href="#" className={`text-sm font-medium ${getThemeStyle('text').secondary} hover:${getThemeStyle('text').primary} transition-colors`}>
              Settings
            </a>
          </div>
          <ArtisticThemeSelector />
        </div>
      </div>
    </nav>
  );
};

export default ArtisticNavbar;
