
import { Palette, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useGlassTheme } from "@/contexts/GlassThemeContext";
import { glassThemes } from "@/config/themes";
import { useMobileOptimization } from "@/hooks/useMobileOptimization";

const GlassThemeSelector = () => {
  const { currentTheme, setTheme, getThemeStyle } = useGlassTheme();
  const { animationDuration } = useMobileOptimization();
  const textStyles = getThemeStyle('text') as { primary: string; secondary: string; muted: string };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={`${getThemeStyle('button')} ${textStyles.primary} hover:${getThemeStyle('cardHover')} px-4 py-3 lg:px-6 lg:py-4 text-base lg:text-lg xl:text-xl font-medium rounded-xl ${animationDuration} touch-target`}
        >
          <Palette className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
          <span className="hidden sm:inline">Theme</span>
          <ChevronDown className="w-4 h-4 lg:w-5 lg:h-5 ml-2" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className={`w-72 sm:w-80 lg:w-96 ${getThemeStyle('popover')} border-0 p-0 ${animationDuration}`}
        align="end"
        side="bottom"
        sideOffset={8}
      >
        <div className="p-6 lg:p-8">
          <h3 className={`${textStyles.primary} font-semibold mb-4 lg:mb-6 text-lg lg:text-xl`}>
            Choose Theme
          </h3>
          <div className="grid gap-3 lg:gap-4">
            {Object.entries(glassThemes).map(([key, theme]) => (
              <button
                key={key}
                onClick={() => setTheme(key as keyof typeof glassThemes)}
                className={`w-full text-left p-4 lg:p-5 rounded-xl ${animationDuration} ${
                  currentTheme === key
                    ? getThemeStyle('cardHover')
                    : getThemeStyle('card')
                } hover:${getThemeStyle('cardHover')} border border-white/10 touch-target`}
              >
                <div className="flex items-center gap-3 lg:gap-4">
                  <div className={`w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-gradient-to-r ${theme.background} border border-white/20`} />
                  <span className={`${textStyles.primary} font-medium text-base lg:text-lg`}>
                    {theme.name}
                  </span>
                  {currentTheme === key && (
                    <div className="ml-auto w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-300" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default GlassThemeSelector;
