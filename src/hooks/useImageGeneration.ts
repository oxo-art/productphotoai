
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { UploadedImage, GeneratedImage } from "@/types/imageGeneration";
import { useMobileOptimization } from "@/hooks/useMobileOptimization";

export const useImageGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const { isMobile, isLowEndDevice } = useMobileOptimization();

  const generateImage = async (
    prompt: string,
    uploadedImage: UploadedImage,
    selectedAspectRatio: string
  ): Promise<GeneratedImage[]> => {
    if (!prompt.trim()) {
      toast({
        title: "Prompt required",
        description: "Please enter a prompt to generate an image",
        variant: "destructive"
      });
      return [];
    }

    if (!uploadedImage) {
      toast({
        title: "Image required",
        description: "Please upload an image first",
        variant: "destructive"
      });
      return [];
    }

    setIsGenerating(true);

    try {
      console.log("Calling Qwen Image Edit function...");
      console.log("Selected aspect ratio:", selectedAspectRatio);
      
      // Enhanced prompt engineering to preserve logos and prevent cropping
      let enhancedPrompt = prompt;
      
      // Add mobile-specific optimizations for clearer results
      if (isMobile) {
        enhancedPrompt += ". Mobile-optimized: Use high contrast, sharp details, and clear definition to ensure quality on mobile screens";
      }
      
      // Add logo preservation instructions
      if (!prompt.toLowerCase().includes('logo') && !prompt.toLowerCase().includes('brand')) {
        enhancedPrompt += ". IMPORTANT: Preserve all product logos, text, and branding exactly as shown. Keep all text on the product readable and intact";
      }
      
      // Add aspect ratio specific instructions to prevent cropping
      if (selectedAspectRatio !== "match_input_image") {
        enhancedPrompt += `. For ${selectedAspectRatio} format: DO NOT crop the subject or product. Instead, adjust the background and composition while keeping the full person and product visible. Add background elements or extend the scene as needed to fit ${selectedAspectRatio} without losing any important content`;
      }

      // Optimize quality based on device capabilities
      const optimizedQuality = isLowEndDevice ? 75 : isMobile ? 85 : 90;

      const requestBody = {
        prompt: enhancedPrompt,
        image: uploadedImage.url,
        aspect_ratio: selectedAspectRatio,
        output_quality: optimizedQuality
      };
      
      console.log("Request body:", requestBody);
      
      const { data, error } = await supabase.functions.invoke('qwen-image-edit', {
        body: requestBody
      });

      if (error) {
        console.error("Supabase function error:", error);
        throw new Error(error.message || "Failed to generate image");
      }

      console.log("Function response:", data);

      if (data?.error) {
        // Handle error response from edge function
        const errorDetails = data.details ? ` Details: ${Array.isArray(data.details) ? data.details.join(', ') : data.details}` : '';
        throw new Error(`${data.error}${errorDetails}`);
      }

      if (data?.success && data.output && Array.isArray(data.output) && data.output.length > 0) {
        console.log("Using generated images directly from API response...");
        
        // Return images directly without any processing or dimension assumptions
        const processedImages = data.output.map((url: string) => ({
          url,
          width: 0, // Let browser determine natural dimensions
          height: 0
        }));
        
        toast({
          title: "Success!",
          description: "Your image has been transformed successfully!",
        });

        return processedImages;
      } else {
        throw new Error("No images were generated");
      }

    } catch (error: any) {
      console.error("Generation error:", error);
      toast({
        title: "Generation failed",
        description: error.message || "Failed to generate image. Please try again.",
        variant: "destructive"
      });
      return [];
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generateImage,
    isGenerating
  };
};
