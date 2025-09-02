
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { UploadedImage, GeneratedImage } from "@/types/imageGeneration";
import { getAspectRatioDimensions } from "@/config/aspectRatios";

export const useImageGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

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
      
      // Get output dimensions based on selected aspect ratio
      const dimensions = getAspectRatioDimensions(selectedAspectRatio);
      
      console.log("Using aspect ratio dimensions:", dimensions.width, "x", dimensions.height);
      
      const requestBody = {
        prompt: prompt,
        input_image: uploadedImage.url,
        aspect_ratio: selectedAspectRatio,
        width: dimensions.width,
        height: dimensions.height
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
        console.log("Processing generated images directly from API response...");
        
        // Return images directly without post-processing
        const processedImages = data.output.map((url: string) => ({
          url,
          width: dimensions.width,
          height: dimensions.height
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
