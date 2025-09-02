
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
  
  if (!request.input_image) {
    errors.push("Input image is required");
  }
  
  if (typeof request.output_quality !== 'number' || request.output_quality <= 0 || request.output_quality > 100) {
    errors.push("Valid output quality (1-100) is required");
  }
  
  return errors;
};
