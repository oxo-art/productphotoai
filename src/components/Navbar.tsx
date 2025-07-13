import { Menu, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import GradientThemeSelector from "@/components/GradientThemeSelector";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  return (
    <nav className="border-b border-white/10 bg-black/20 backdrop-blur-lg px-4 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/10">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-slate-900/95 backdrop-blur-lg border-white/10">
              <SheetHeader>
                <SheetTitle className="text-white">Navigation</SheetTitle>
                <SheetDescription className="text-white/70">
                  Navigate through the application
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <a href="/" className="block px-4 py-3 text-sm text-white hover:bg-white/10 rounded-lg transition-colors">
                  Home
                </a>
                <a href="#" className="block px-4 py-3 text-sm text-white hover:bg-white/10 rounded-lg transition-colors">
                  Gallery
                </a>
                <a href="#" className="block px-4 py-3 text-sm text-white hover:bg-white/10 rounded-lg transition-colors">
                  Settings
                </a>
              </div>
            </SheetContent>
          </Sheet>
          
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-russo" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)' }}>
              Decorspaceai
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-sm font-medium text-white/80 hover:text-white transition-colors">
              Home
            </a>
            <a href="#" className="text-sm font-medium text-white/80 hover:text-white transition-colors">
              Gallery
            </a>
            <a href="#" className="text-sm font-medium text-white/80 hover:text-white transition-colors">
              Settings
            </a>
          </div>
          <GradientThemeSelector />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
