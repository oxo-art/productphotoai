
import { Palette, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useGradientTheme } from "@/contexts/GradientThemeContext";
import { gradientThemes } from "@/config/gradients";

const GradientThemeSelector = () => {
  const { currentTheme, setTheme } = useGradientTheme();

  const themeOptions = [
    { key: 'cosmic' as const, name: 'Cosmic' },
    { key: 'sunset' as const, name: 'Sunset' },
    { key: 'ocean' as const, name: 'Ocean' },
    { key: 'forest' as const, name: 'Forest' }
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
        >
          <Palette className="h-5 w-5" />
          <span className="sr-only">Change theme</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 bg-white/10 backdrop-blur-xl border-white/20 p-4">
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-white mb-3">Choose Theme</h3>
          <div className="grid grid-cols-2 gap-2">
            {themeOptions.map((theme) => (
              <button
                key={theme.key}
                onClick={() => setTheme(theme.key)}
                className={`relative p-3 rounded-lg border transition-all duration-200 hover:scale-105 ${
                  currentTheme === theme.key
                    ? 'border-white/40 bg-white/15'
                    : 'border-white/20 hover:border-white/30 bg-white/10'
                }`}
              >
                <div className={`w-full h-8 rounded-md bg-gradient-to-r ${gradientThemes[theme.key].button} mb-2`} />
                <div className="text-xs font-medium text-white/80">{theme.name}</div>
                {currentTheme === theme.key && (
                  <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-black" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default GradientThemeSelector;
