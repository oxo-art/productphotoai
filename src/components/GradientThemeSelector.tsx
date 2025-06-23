
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
  const { currentTheme, setTheme, getAllThemes, getGradient } = useGradientTheme();
  const themes = getAllThemes();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={`text-white hover:bg-white/10 bg-gradient-to-r ${getGradient('glow')} p-2 rounded-lg backdrop-blur-sm border border-white/20 transition-all duration-300`}
        >
          <Palette className="h-5 w-5" />
          <span className="sr-only">Change theme</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 bg-black/90 backdrop-blur-lg border-white/20 p-4">
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-white mb-3">Choose Theme</h3>
          <div className="grid grid-cols-2 gap-2">
            {themes.map((theme) => (
              <button
                key={theme.key}
                onClick={() => setTheme(theme.key)}
                className={`relative p-3 rounded-lg border transition-all duration-200 hover:scale-105 ${
                  currentTheme === theme.key
                    ? 'border-white/40 bg-white/10'
                    : 'border-white/20 hover:border-white/30 hover:bg-white/5'
                }`}
              >
                <div className={`w-full h-8 rounded-md bg-gradient-to-r ${gradientThemes[theme.key].button} mb-2 transition-all duration-500`} />
                <div className="text-xs text-white/80 font-medium">{theme.name}</div>
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
