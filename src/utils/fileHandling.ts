
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

// Detect if user is on iOS Safari
const isIOSSafari = (): boolean => {
  const ua = navigator.userAgent;
  const iOS = /iPad|iPhone|iPod/.test(ua);
  const webkit = /WebKit/.test(ua);
  const chrome = /CriOS|Chrome/.test(ua);
  return iOS && webkit && !chrome;
};

// Detect mobile browsers
const isMobileBrowser = (): boolean => {
  return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
         window.innerWidth <= 768;
};

export const downloadImage = async (imageUrl: string, filename: string): Promise<void> => {
  try {
    // For iOS Safari, use different approach due to restrictions
    if (isIOSSafari()) {
      // Try to open in new tab for iOS Safari
      const newWindow = window.open(imageUrl, '_blank');
      
      if (!newWindow) {
        // Fallback: Create instruction modal for manual save
        const instructionModal = document.createElement('div');
        instructionModal.style.cssText = `
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.8); z-index: 10000;
          display: flex; align-items: center; justify-content: center;
          color: white; font-family: Arial, sans-serif;
        `;
        
        instructionModal.innerHTML = `
          <div style="background: #1a1a1a; padding: 30px; border-radius: 10px; max-width: 400px; text-align: center;">
            <h3 style="margin: 0 0 20px 0;">Save Image (iOS)</h3>
            <img src="${imageUrl}" style="max-width: 200px; max-height: 200px; margin-bottom: 20px; border-radius: 8px;">
            <p style="margin: 0 0 20px 0;">Tap and hold the image above, then select "Save to Photos"</p>
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="background: #007AFF; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-size: 16px;">
              Got it
            </button>
          </div>
        `;
        
        document.body.appendChild(instructionModal);
        return;
      }
      return;
    }

    // Standard download approach for other browsers
    const response = await fetch(imageUrl, {
      mode: 'cors',
      credentials: 'omit'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    
    // For mobile browsers, try window.open first
    if (isMobileBrowser()) {
      const newWindow = window.open(url, '_blank');
      if (newWindow) {
        // Give it time to load, then cleanup
        setTimeout(() => {
          window.URL.revokeObjectURL(url);
        }, 1000);
        return;
      }
    }
    
    // Standard download link approach
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    
    // Add to DOM, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Cleanup
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
    }, 100);
    
  } catch (error) {
    console.error("Download failed:", error);
    
    // Final fallback: open in new tab
    try {
      window.open(imageUrl, '_blank');
    } catch (fallbackError) {
      console.error("Fallback failed:", fallbackError);
      throw new Error("Unable to download image. Please right-click and save manually.");
    }
  }
};
