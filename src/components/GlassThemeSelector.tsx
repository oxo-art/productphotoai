
import { Palette, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useGlassTheme } from "@/contexts/GlassThemeContext";
import { glassThemes, GlassTheme } from "@/config/themes";

const GlassThemeSelector = () => {
  const { currentTheme, setTheme, getThemeStyle } = useGlassTheme();
  const textStyles = getThemeStyle('text') as { primary: string; secondary: string; muted: string };

  const themes: { key: GlassTheme; name: string; gradient: string }[] = [
    { key: 'default', name: 'Glass Default', gradient: 'from-blue-500 to-purple-600' },
    { key: 'ocean', name: 'Glass Ocean', gradient: 'from-blue-500 to-cyan-600' },
    { key: 'sunset', name: 'Glass Sunset', gradient: 'from-orange-500 to-red-600' },
    { key: 'forest', name: 'Glass Forest', gradient: 'from-green-500 to-emerald-600' }
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={`${textStyles.primary} hover:bg-white/10 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg transition-all duration-300`}
        >
          <Palette className="h-5 w-5" />
          <span className="sr-only">Change theme</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className={`w-80 ${getThemeStyle('popover')} border-white/20 p-4 z-[80]`}
        align="end"
        side="bottom"
        sideOffset={8}
      >
        <div className="space-y-3">
          <h3 className={`text-sm font-medium ${textStyles.primary} mb-3`}>Choose Glass Theme</h3>
          <div className="grid grid-cols-2 gap-3">
            {themes.map((theme) => (
              <button
                key={theme.key}
                onClick={() => setTheme(theme.key)}
                className={`relative p-4 rounded-lg border transition-all duration-200 hover:scale-105 ${
                  currentTheme === theme.key
                    ? 'border-white/40 bg-white/10'
                    : 'border-white/20 hover:border-white/30 hover:bg-white/5'
                }`}
              >
                <div className={`w-full h-8 rounded-md bg-gradient-to-r ${theme.gradient} mb-2 transition-all duration-500`} />
                <div className={`text-xs ${textStyles.secondary} font-medium`}>{theme.name}</div>
                {currentTheme === theme.key && (
                  <div className="absolute top-1 right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center">
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

export default GlassThemeSelector;
