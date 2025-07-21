
import { UploadedImage } from "@/types/imageGeneration";

export const validateImageFile = (file: File): string | null => {
  if (!file.type.startsWith('image/')) {
    return "Only image files are allowed";
  }
  
  // Check file size (10MB limit)
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    return "File size must be less than 10MB";
  }
  
  return null;
};

export const processImageFile = (file: File): Promise<UploadedImage> => {
  return new Promise((resolve, reject) => {
    const validationError = validateImageFile(file);
    if (validationError) {
      reject(new Error(validationError));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      
      const img = new Image();
      img.onload = () => {
        resolve({ 
          url: result,
          width: img.width,
          height: img.height
        });
      };
      img.onerror = () => {
        reject(new Error("Failed to load image"));
      };
      img.src = result;
    };
    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };
    reader.readAsDataURL(file);
  });
};

export const downloadImage = async (imageUrl: string, filename: string): Promise<void> => {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download failed:", error);
    throw new Error("Failed to download the image");
  }
};
