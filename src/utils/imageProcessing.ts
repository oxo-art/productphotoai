
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

      // Fill background with white
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, targetWidth, targetHeight);

      let drawWidth, drawHeight, offsetX, offsetY;

      // Use "contain" fit - scale the image to fit entirely within the target dimensions
      if (sourceRatio > targetRatio) {
        // Source is wider than target, fit by width
        drawWidth = targetWidth;
        drawHeight = (sourceHeight * targetWidth) / sourceWidth;
        offsetX = 0;
        offsetY = (targetHeight - drawHeight) / 2;
      } else {
        // Source is taller than target, fit by height
        drawHeight = targetHeight;
        drawWidth = (sourceWidth * targetHeight) / sourceHeight;
        offsetX = (targetWidth - drawWidth) / 2;
        offsetY = 0;
      }

      // Draw the image centered with letterboxing/pillarboxing
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

      // Detect mobile for better quality - mobile devices often have high DPI screens
      const isMobile = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const devicePixelRatio = window.devicePixelRatio || 1;
      
      // Use maximum quality for mobile/high-DPI devices to preserve detail
      const quality = (isMobile || devicePixelRatio > 1) ? 1.0 : 0.95;
      
      // Convert to data URL with optimized quality
      const processedImageUrl = canvas.toDataURL('image/png', quality);
      resolve(processedImageUrl);
    };

    img.onerror = () => {
      reject(new Error('Failed to load image for processing'));
    };

    img.src = imageUrl;
  });
};
