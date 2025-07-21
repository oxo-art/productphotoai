
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { UploadedImage, GeneratedImage, ImageGenerationRequest, validateImageGenerationRequest } from "@/types/imageGeneration";
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
      console.log("Calling Flux Kontext Dev function...");
      console.log("Selected aspect ratio:", selectedAspectRatio);
      
      // Calculate output dimensions based on selected aspect ratio
      let outputWidth: number;
      let outputHeight: number;
      
      if (selectedAspectRatio === "match_input_image") {
        outputWidth = uploadedImage.width || 1024;
        outputHeight = uploadedImage.height || 1024;
        console.log("Using input image dimensions:", outputWidth, "x", outputHeight);
      } else {
        const dimensions = getAspectRatioDimensions(selectedAspectRatio);
        outputWidth = dimensions.width || 1024;
        outputHeight = dimensions.height || 1024;
        console.log("Using aspect ratio dimensions:", outputWidth, "x", outputHeight);
      }
      
      const requestBody: ImageGenerationRequest = {
        prompt: prompt,
        input_image: uploadedImage.url,
        aspect_ratio: selectedAspectRatio,
        width: outputWidth,
        height: outputHeight
      };

      // Validate request before sending
      const validationErrors = validateImageGenerationRequest(requestBody);
      if (validationErrors.length > 0) {
        throw new Error(`Validation failed: ${validationErrors.join(', ')}`);
      }
      
      console.log("Request body:", requestBody);
      
      const { data, error } = await supabase.functions.invoke('flux-kontext-pro', {
        body: requestBody
      });

      if (error) {
        console.error("Supabase function error:", error);
        throw new Error(error.message || "Failed to generate image");
      }

      console.log("Function response:", data);

      if (data.error) {
        throw new Error(data.error);
      }

      if (data.output && Array.isArray(data.output) && data.output.length > 0) {
        const newImages = data.output.map((url: string) => ({
          url,
          width: outputWidth,
          height: outputHeight
        }));
        
        toast({
          title: "Success!",
          description: "Your image has been transformed successfully!",
        });

        return newImages;
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
