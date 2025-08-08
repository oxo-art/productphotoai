
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { UploadedImage, GeneratedImage, ImageGenerationRequest, validateImageGenerationRequest } from "@/types/imageGeneration";
import { getAspectRatioDimensions } from "@/config/aspectRatios";

// Helper function to normalize dimensions to valid range (256-2048) and multiples of 8
const normalizeDimensions = (width: number, height: number): { width: number; height: number } => {
  const MIN_SIZE = 256;
  const MAX_SIZE = 2048;
  
  // Calculate the scale needed to fit within bounds
  const maxDimension = Math.max(width, height);
  const minDimension = Math.min(width, height);
  
  let scale = 1;
  
  // If any dimension is too large, scale down
  if (maxDimension > MAX_SIZE) {
    scale = MAX_SIZE / maxDimension;
  }
  
  // If any dimension would be too small after scaling, scale up
  const scaledMin = minDimension * scale;
  if (scaledMin < MIN_SIZE) {
    scale = MIN_SIZE / minDimension;
  }
  
  // Apply scale and round to nearest multiple of 8
  let normalizedWidth = Math.round((width * scale) / 8) * 8;
  let normalizedHeight = Math.round((height * scale) / 8) * 8;
  
  // Ensure dimensions are within bounds
  normalizedWidth = Math.max(MIN_SIZE, Math.min(MAX_SIZE, normalizedWidth));
  normalizedHeight = Math.max(MIN_SIZE, Math.min(MAX_SIZE, normalizedHeight));
  
  // Final check to ensure we have multiples of 8
  normalizedWidth = Math.round(normalizedWidth / 8) * 8;
  normalizedHeight = Math.round(normalizedHeight / 8) * 8;
  
  return { width: normalizedWidth, height: normalizedHeight };
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
      console.log("Original image dimensions:", uploadedImage.width, "x", uploadedImage.height);
      
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
      
      // Normalize dimensions to fit within API constraints
      const normalizedDimensions = normalizeDimensions(outputWidth, outputHeight);
      console.log("Normalized dimensions:", normalizedDimensions.width, "x", normalizedDimensions.height);
      
      const requestBody: ImageGenerationRequest = {
        prompt: prompt,
        input_image: uploadedImage.url,
        aspect_ratio: selectedAspectRatio,
        width: normalizedDimensions.width,
        height: normalizedDimensions.height
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
          width: normalizedDimensions.width,
          height: normalizedDimensions.height
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
