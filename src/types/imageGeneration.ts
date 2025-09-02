
export interface UploadedImage {
  url: string;
  width?: number;
  height?: number;
}

export interface GeneratedImage {
  url: string;
  width: number;
  height: number;
}

export interface ImageGenerationRequest {
  prompt: string;
  image: string;
  aspect_ratio: string;
  output_quality: number;
}

export interface ImageGenerationResponse {
  success: boolean;
  output: string[];
  message?: string;
  error?: string;
}

export const validateImageGenerationRequest = (request: Partial<ImageGenerationRequest>): string[] => {
  const errors: string[] = [];
  
  if (!request.prompt?.trim()) {
    errors.push("Prompt is required");
  }
  
  if (!request.image) {
    errors.push("Image is required");
  }
  
  if (!request.aspect_ratio) {
    errors.push("Aspect ratio is required");
  }
  
  if (typeof request.output_quality !== 'number' || request.output_quality <= 0) {
    errors.push("Valid output quality is required");
  }
  
  return errors;
};
