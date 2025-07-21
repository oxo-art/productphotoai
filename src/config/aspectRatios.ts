
export interface AspectRatio {
  label: string;
  value: string;
  width: number | null;
  height: number | null;
}

export const aspectRatios: AspectRatio[] = [
  { label: "Match Input Image", value: "match_input_image", width: null, height: null },
  { label: "1:1", value: "1:1", width: 1024, height: 1024 },
  { label: "16:9", value: "16:9", width: 1024, height: 576 },
  { label: "21:9", value: "21:9", width: 1024, height: 437 },
  { label: "3:2", value: "3:2", width: 1024, height: 683 },
  { label: "2:3", value: "2:3", width: 683, height: 1024 },
  { label: "4:5", value: "4:5", width: 819, height: 1024 },
  { label: "5:4", value: "5:4", width: 1024, height: 819 },
  { label: "3:4", value: "3:4", width: 768, height: 1024 },
  { label: "4:3", value: "4:3", width: 1024, height: 768 },
  { label: "9:16", value: "9:16", width: 576, height: 1024 },
  { label: "9:21", value: "9:21", width: 437, height: 1024 }
];

export const validateAspectRatio = (value: string): boolean => {
  return aspectRatios.some(ratio => ratio.value === value);
};

export const getAspectRatioDimensions = (value: string): { width: number | null; height: number | null } => {
  const ratio = aspectRatios.find(r => r.value === value);
  return ratio ? { width: ratio.width, height: ratio.height } : { width: 1024, height: 1024 };
};
