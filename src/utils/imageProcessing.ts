
import { getAspectRatioDimensions } from "@/config/aspectRatios";

export const processImageToAspectRatio = (
  imageUrl: string,
  targetAspectRatio: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      const targetDimensions = getAspectRatioDimensions(targetAspectRatio);
      const targetWidth = targetDimensions.width;
      const targetHeight = targetDimensions.height;
      const targetRatio = targetWidth / targetHeight;
      
      const sourceWidth = img.width;
      const sourceHeight = img.height;
      const sourceRatio = sourceWidth / sourceHeight;

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      let drawWidth, drawHeight, offsetX, offsetY;

      if (sourceRatio > targetRatio) {
        // Source is wider, fit by height and center crop width
        drawHeight = targetHeight;
        drawWidth = (sourceWidth * targetHeight) / sourceHeight;
        offsetX = (targetWidth - drawWidth) / 2;
        offsetY = 0;
      } else {
        // Source is taller, fit by width and center crop height
        drawWidth = targetWidth;
        drawHeight = (sourceHeight * targetWidth) / sourceWidth;
        offsetX = 0;
        offsetY = (targetHeight - drawHeight) / 2;
      }

      // Fill background with white in case of letterboxing
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, targetWidth, targetHeight);

      // Draw the image
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

      // Convert to data URL
      const processedImageUrl = canvas.toDataURL('image/png', 0.9);
      resolve(processedImageUrl);
    };

    img.onerror = () => {
      reject(new Error('Failed to load image for processing'));
    };

    img.src = imageUrl;
  });
};
