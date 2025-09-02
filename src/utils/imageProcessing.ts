
// Simplified image processing without aspect ratio modifications
export const processImageToAspectRatio = (
  imageUrl: string,
  targetAspectRatio: string
): Promise<string> => {
  // Return the original image URL without any processing
  // Let the API handle aspect ratio adjustments natively
  return Promise.resolve(imageUrl);
};
