
import { useState } from "react";
import { Palette, Check, Sparkles, Eye, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUnifiedTheme } from "@/contexts/UnifiedThemeContext";
import { gradientThemes } from "@/config/gradients";
import { glassThemes, artisticThemes } from "@/config/themes";

const EnhancedThemeSelector = () => {
  const {
    themeMode,
    setThemeMode,
    gradientTheme,
    glassTheme,
    artisticTheme,
    setGradientTheme,
    setGlassTheme,
    setArtisticTheme,
    getCurrentThemeName,
    isTransitioning
  } = useUnifiedTheme();

  const [previewMode, setPreviewMode] = useState<string | null>(null);

  const handleThemeModeChange = (mode: 'gradient' | 'glass' | 'artistic') => {
    setThemeMode(mode);
  };

  const renderGradientThemes = () => (
    <div className="grid grid-cols-2 gap-3">
      {Object.entries(gradientThemes).map(([key, theme]) => (
        <button
          key={key}
          onClick={() => setGradientTheme(key as keyof typeof gradientThemes)}
          className={`relative p-3 rounded-lg border transition-all duration-200 hover:scale-105 ${
            gradientTheme === key
              ? 'border-white/60 bg-white/10 ring-2 ring-blue-500/50'
              : 'border-white/20 hover:border-white/40 hover:bg-white/5'
          }`}
        >
          <div className={`w-full h-8 rounded-md bg-gradient-to-r ${theme.button} mb-2 shadow-lg`} />
          <div className="text-xs text-white/90 font-medium">{theme.name}</div>
          {gradientTheme === key && (
            <div className="absolute top-1 right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
              <Check className="w-3 h-3 text-white" />
            </div>
          )}
        </button>
      ))}
    </div>
  );

  const renderGlassThemes = () => (
    <div className="grid grid-cols-2 gap-3">
      {Object.entries(glassThemes).map(([key, theme]) => (
        <button
          key={key}
          onClick={() => setGlassTheme(key as keyof typeof glassThemes)}
          className={`relative p-3 rounded-lg border transition-all duration-200 hover:scale-105 ${
            glassTheme === key
              ? 'border-white/60 bg-white/10 ring-2 ring-cyan-500/50'
              : 'border-white/20 hover:border-white/40 hover:bg-white/5'
          }`}
        >
          <div className={`w-full h-8 rounded-md ${theme.buttonPrimary} mb-2 shadow-lg`} />
          <div className="text-xs text-white/90 font-medium">{theme.name}</div>
          {glassTheme === key && (
            <div className="absolute top-1 right-1 w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center">
              <Check className="w-3 h-3 text-white" />
            </div>
          )}
        </button>
      ))}
    </div>
  );

  const renderArtisticThemes = () => (
    <div className="grid grid-cols-2 gap-3">
      {Object.entries(artisticThemes).map(([key, theme]) => (
        <button
          key={key}
          onClick={() => setArtisticTheme(key as keyof typeof artisticThemes)}
          className={`relative p-3 rounded-lg border transition-all duration-200 hover:scale-105 ${
            artisticTheme === key
              ? 'border-amber-400/60 bg-amber-500/10 ring-2 ring-amber-500/50'
              : 'border-white/20 hover:border-amber-400/40 hover:bg-amber-500/5'
          }`}
        >
          <div className={`w-full h-8 rounded-md ${theme.buttonPrimary} mb-2 shadow-lg`} />
          <div className="text-xs text-white/90 font-medium">{theme.name}</div>
          {artisticTheme === key && (
            <div className="absolute top-1 right-1 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center">
              <Check className="w-3 h-3 text-white" />
            </div>
          )}
        </button>
      ))}
    </div>
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={`relative bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300 ${
            isTransitioning ? 'animate-pulse' : ''
          }`}
        >
          <Settings className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">{getCurrentThemeName()} Theme</span>
          <span className="sm:hidden">Theme</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 bg-slate-900/95 backdrop-blur-xl border-white/20 p-0" align="end">
        <Card className="border-0 bg-transparent">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Enhanced Theme Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Theme Mode Selector */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-white/90">Theme Style</h4>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: 'gradient', name: 'Gradient', color: 'from-blue-500 to-purple-500' },
                  { key: 'glass', name: 'Glass', color: 'from-cyan-500 to-blue-500' },
                  { key: 'artistic', name: 'Artistic', color: 'from-amber-500 to-orange-500' }
                ].map((mode) => (
                  <button
                    key={mode.key}
                    onClick={() => handleThemeModeChange(mode.key as any)}
                    className={`p-3 rounded-lg border transition-all duration-200 hover:scale-105 ${
                      themeMode === mode.key
                        ? 'border-white/60 bg-white/10 ring-2 ring-white/30'
                        : 'border-white/20 hover:border-white/40 hover:bg-white/5'
                    }`}
                  >
                    <div className={`w-full h-6 rounded bg-gradient-to-r ${mode.color} mb-2`} />
                    <div className="text-xs text-white/90 font-medium">{mode.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Variants */}
            <Tabs value={themeMode} onValueChange={(value) => handleThemeModeChange(value as any)} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-white/10">
                <TabsTrigger value="gradient" className="text-white data-[state=active]:bg-blue-500/80">
                  Gradient
                </TabsTrigger>
                <TabsTrigger value="glass" className="text-white data-[state=active]:bg-cyan-500/80">
                  Glass
                </TabsTrigger>
                <TabsTrigger value="artistic" className="text-white data-[state=active]:bg-amber-500/80">
                  Artistic
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="gradient" className="mt-4">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-white/90">Gradient Themes</h4>
                  {renderGradientThemes()}
                </div>
              </TabsContent>
              
              <TabsContent value="glass" className="mt-4">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-white/90">Glass Themes</h4>
                  {renderGlassThemes()}
                </div>
              </TabsContent>
              
              <TabsContent value="artistic" className="mt-4">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-white/90">Artistic Themes</h4>
                  {renderArtisticThemes()}
                </div>
              </TabsContent>
            </Tabs>

            {/* Quick Actions */}
            <div className="pt-3 border-t border-white/10">
              <div className="flex items-center justify-between text-xs text-white/60">
                <span>Themes are automatically saved</span>
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  <span>Live Preview</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
};

export default EnhancedThemeSelector;
