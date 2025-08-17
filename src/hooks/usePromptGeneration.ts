
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const usePromptGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generatePrompt = async (userInput: string): Promise<string | null> => {
    if (!userInput.trim()) {
      toast({
        title: "Input required",
        description: "Please enter a description to enhance",
        variant: "destructive"
      });
      return null;
    }

    setIsGenerating(true);

    try {
      console.log("Calling generate-prompt function with input:", userInput);
      
      const { data, error } = await supabase.functions.invoke('generate-prompt', {
        body: { userInput: userInput.trim() }
      });

      if (error) {
        console.error("Supabase function error:", error);
        throw new Error(error.message || "Failed to generate enhanced prompt");
      }

      console.log("Function response:", data);

      if (data?.error) {
        throw new Error(data.error);
      }

      if (data?.success && data.enhancedPrompt) {
        toast({
          title: "Success!",
          description: "Enhanced prompt generated successfully!",
        });

        return data.enhancedPrompt;
      } else {
        throw new Error("No enhanced prompt was generated");
      }

    } catch (error: any) {
      console.error("Prompt generation error:", error);
      toast({
        title: "Generation failed",
        description: error.message || "Failed to generate enhanced prompt. Please try again.",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generatePrompt,
    isGenerating
  };
};
