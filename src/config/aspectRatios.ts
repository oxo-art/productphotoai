
export interface AspectRatio {
  label: string;
  value: string;
}

export const aspectRatios: AspectRatio[] = [
  { label: "Match Input", value: "match_input_image" },
  { label: "1:1", value: "1:1" },
  { label: "16:9", value: "16:9" },
  { label: "4:3", value: "4:3" },
  { label: "9:16", value: "9:16" }
];

export const validateAspectRatio = (value: string): boolean => {
  return aspectRatios.some(ratio => ratio.value === value);
};
