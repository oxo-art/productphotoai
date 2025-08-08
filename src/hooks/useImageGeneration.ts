import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { UploadedImage, GeneratedImage, ImageGenerationRequest, validateImageGenerationRequest } from "@/types/imageGeneration";
import { getAspectRatioDimensions } from "@/config/aspectRatios";

// Helper function to normalize dimensions for mobile compatibility
const normalizeDimensions = (width: number, height: number): { width: number; height: number } => {
  // Scale down if either dimension exceeds 2048
  const maxDimension = 2048;
  const minDimension = 256;
  
  if (width > maxDimension || height > maxDimension) {
    const scale = Math.min(maxDimension / width, maxDimension / height);
    width = Math.round(width * scale);
    height = Math.round(height * scale);
  }
  
  // Ensure minimum dimensions
  if (width < minDimension) {
    const scale = minDimension / width;
    width = Math.round(width * scale);
    height = Math.round(height * scale);
  }
  
  if (height < minDimension) {
    const scale = minDimension / height;
    width = Math.round(width * scale);
    height = Math.round(height * scale);
  }
  
  // Round to nearest multiple of 8 for better model compatibility
  const normalizedWidth = Math.round(width / 8) * 8;
  const normalizedHeight = Math.round(height / 8) * 8;
  
  return { 
    width: Math.max(minDimension, Math.min(maxDimension, normalizedWidth)),
    height: Math.max(minDimension, Math.min(maxDimension, normalizedHeight))
  };
};

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
      
      // Get output dimensions based on selected aspect ratio
      const dimensions = getAspectRatioDimensions(selectedAspectRatio);
      const normalized = normalizeDimensions(dimensions.width, dimensions.height);
      const outputWidth = normalized.width;
      const outputHeight = normalized.height;
      
      console.log("Using normalized aspect ratio dimensions:", outputWidth, "x", outputHeight);
      
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
        // Provide more detailed error message
        const errorMessage = error.message || "Failed to generate image";
        const errorDetails = data?.details ? ` (${data.details.join(', ')})` : '';
        throw new Error(`${errorMessage}${errorDetails}`);
      }

      console.log("Function response:", data);

      if (data.error) {
        // Handle error response from edge function
        const errorDetails = data.details ? ` Details: ${Array.isArray(data.details) ? data.details.join(', ') : data.details}` : '';
        throw new Error(`${data.error}${errorDetails}`);
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
