
export interface AspectRatio {
  label: string;
  value: string;
  width: number;
  height: number;
}

export const aspectRatios: AspectRatio[] = [
  { label: "1:1", value: "1:1", width: 1024, height: 1024 },
  { label: "16:9", value: "16:9", width: 1024, height: 576 },
  { label: "4:3", value: "4:3", width: 1024, height: 768 },
  { label: "9:16", value: "9:16", width: 576, height: 1024 }
];

export const validateAspectRatio = (value: string): boolean => {
  return aspectRatios.some(ratio => ratio.value === value);
};

export const getAspectRatioDimensions = (value: string): { width: number; height: number } => {
  const ratio = aspectRatios.find(r => r.value === value);
  return ratio ? { width: ratio.width, height: ratio.height } : { width: 1024, height: 1024 };
};
