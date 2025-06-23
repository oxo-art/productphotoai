
import { Palette, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useArtisticTheme } from "@/contexts/ArtisticThemeContext";
import { artisticThemes } from "@/config/themes";

const ArtisticThemeSelector = () => {
  const { currentTheme, setTheme, getAllThemes, getThemeStyle } = useArtisticTheme();
  const themes = getAllThemes();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={`${getThemeStyle('text').primary} hover:bg-black/10 ${getThemeStyle('button')} transition-all duration-300`}
        >
          <Palette className="h-5 w-5" />
          <span className="sr-only">Change artistic theme</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className={`w-64 ${getThemeStyle('popover')} p-4`}>
        <div className="space-y-3">
          <h3 className={`text-sm font-medium ${getThemeStyle('text').primary} mb-3`}>Choose Artistic Theme</h3>
          <div className="grid grid-cols-2 gap-2">
            {themes.map((theme) => (
              <button
                key={theme.key}
                onClick={() => setTheme(theme.key)}
                className={`relative p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                  currentTheme === theme.key
                    ? `border-black ${artisticThemes[theme.key].cardHover}`
                    : `border-gray-400 hover:border-black ${artisticThemes[theme.key].card}`
                }`}
              >
                <div className={`w-full h-8 rounded-md ${artisticThemes[theme.key].buttonPrimary} mb-2 transition-all duration-500`} />
                <div className={`text-xs font-medium ${artisticThemes[theme.key].text.secondary}`}>{theme.name}</div>
                {currentTheme === theme.key && (
                  <div className="absolute top-1 right-1 w-4 h-4 bg-black rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
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

export default ArtisticThemeSelector;
