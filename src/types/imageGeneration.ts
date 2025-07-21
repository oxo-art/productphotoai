
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
  input_image: string;
  aspect_ratio: string;
  width: number;
  height: number;
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
  
  if (!request.input_image) {
    errors.push("Input image is required");
  }
  
  if (!request.aspect_ratio) {
    errors.push("Aspect ratio is required");
  }
  
  if (typeof request.width !== 'number' || request.width <= 0) {
    errors.push("Valid width is required");
  }
  
  if (typeof request.height !== 'number' || request.height <= 0) {
    errors.push("Valid height is required");
  }
  
  return errors;
};
