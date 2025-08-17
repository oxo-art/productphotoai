
import { useState } from "react";
import { Sparkles, Loader2, Copy, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { usePromptGeneration } from "@/hooks/usePromptGeneration";

interface TextStyles {
  primary: string;
  secondary: string;
  muted: string;
}

interface PromptEnhancerProps {
  onPromptGenerated: (prompt: string) => void;
  getThemeStyle?: (key: string) => string | TextStyles;
  textStyles?: TextStyles;
  isGlassTheme?: boolean;
}

const PromptEnhancer = ({ 
  onPromptGenerated, 
  getThemeStyle,
  textStyles,
  isGlassTheme = false 
}: PromptEnhancerProps) => {
  const [userInput, setUserInput] = useState("");
  const [enhancedPrompt, setEnhancedPrompt] = useState("");
  const { generatePrompt, isGenerating } = usePromptGeneration();
  const { toast } = useToast();

  const handleGenerate = async () => {
    const result = await generatePrompt(userInput);
    if (result) {
      setEnhancedPrompt(result);
    }
  };

  const handleUsePrompt = () => {
    onPromptGenerated(enhancedPrompt);
    toast({
      title: "Prompt applied",
      description: "Enhanced prompt has been added to the main input",
    });
  };

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(enhancedPrompt);
      toast({
        title: "Copied!",
        description: "Enhanced prompt copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Failed to copy prompt to clipboard",
        variant: "destructive"
      });
    }
  };

  const getCardStyle = () => {
    if (isGlassTheme && getThemeStyle) {
      const cardStyle = getThemeStyle('card');
      return typeof cardStyle === 'string' ? `${cardStyle} border border-white/20` : "bg-white/5 border border-white/20";
    }
    return "bg-white/5 border border-white/20";
  };

  const getButtonStyle = () => {
    if (isGlassTheme && getThemeStyle) {
      const buttonStyle = getThemeStyle('buttonPrimary');
      return typeof buttonStyle === 'string' ? buttonStyle : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700";
    }
    return "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700";
  };

  const getTextStyle = (type: 'primary' | 'secondary' | 'muted') => {
    if (isGlassTheme && textStyles) {
      return textStyles[type];
    }
    switch (type) {
      case 'primary': return 'text-white';
      case 'secondary': return 'text-white/80';
      case 'muted': return 'text-white/60';
      default: return 'text-white';
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <label className={`${getTextStyle('secondary')} text-sm font-medium`}>
          Describe your vision in simple words
        </label>
        <div className="space-y-3">
          <Textarea
            placeholder="e.g., make it look professional, add luxury vibes, create a natural outdoor scene..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className={`min-h-[80px] ${getCardStyle()} ${getTextStyle('primary')} placeholder:text-white/50 resize-none rounded-xl`}
          />
          <Button 
            onClick={handleGenerate}
            disabled={isGenerating || !userInput.trim()}
            className={`w-full ${getButtonStyle()} text-white py-3 text-sm font-semibold rounded-xl transition-all duration-300 hover:scale-105`}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enhancing...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Detailed Prompt
              </>
            )}
          </Button>
        </div>
      </div>

      {enhancedPrompt && (
        <Card className={getCardStyle()}>
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className={`text-sm font-medium ${getTextStyle('primary')}`}>
                  Enhanced Prompt
                </h4>
                <Button
                  onClick={handleCopyPrompt}
                  variant="ghost"
                  size="sm"
                  className={`h-8 px-2 ${getTextStyle('secondary')} hover:${getTextStyle('primary')}`}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
              
              <p className={`text-sm ${getTextStyle('secondary')} leading-relaxed`}>
                {enhancedPrompt}
              </p>
              
              <Button
                onClick={handleUsePrompt}
                className={`w-full ${getButtonStyle()} text-white py-2 text-sm font-medium rounded-lg transition-all duration-300`}
              >
                <ArrowRight className="mr-2 h-4 w-4" />
                Use This Prompt
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PromptEnhancer;
