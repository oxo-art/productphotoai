import { useState, useRef } from "react";
import { Upload, Image as ImageIcon, X, Loader2, Download, Sparkles, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useGradientTheme } from "@/contexts/GradientThemeContext";
import { aspectRatios } from "@/config/aspectRatios";
import { UploadedImage, GeneratedImage } from "@/types/imageGeneration";
import { useImageGeneration } from "@/hooks/useImageGeneration";
import { processImageFile, downloadImage } from "@/utils/fileHandling";
import PromptEnhancer from "./PromptEnhancer";

const ImageUpload = () => {
  const { getGradient } = useGradientTheme();
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
  const [prompt, setPrompt] = useState("");
  const [selectedAspectRatio, setSelectedAspectRatio] = useState("4:5");
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { generateImage, isGenerating } = useImageGeneration();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = async (files: File[]) => {
    if (files.length === 0) return;
    
    const file = files[0];
    
    try {
      const uploadedImage = await processImageFile(file);
      setUploadedImage(uploadedImage);
    } catch (error) {
      toast({
        title: "Invalid file",
        description: error instanceof Error ? error.message : "Failed to process image",
        variant: "destructive"
      });
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const handleDownloadImage = async (imageUrl: string, index: number) => {
    try {
      await downloadImage(imageUrl, `generated-image-${index + 1}.jpg`);
      toast({
        title: "Download successful",
        description: "Image downloaded successfully",
      });
    } catch (error) {
      toast({
        title: "Download failed",
        description: "Failed to download the image",
        variant: "destructive"
      });
    }
  };

  const handleGenerate = async () => {
    if (!uploadedImage) return;
    
    const newImages = await generateImage(prompt, uploadedImage, selectedAspectRatio);
    if (newImages.length > 0) {
      setGeneratedImages(prev => [...prev, ...newImages]);
    }
  };

  const handlePromptGenerated = (generatedPrompt: string) => {
    setPrompt(generatedPrompt);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Upload Section */}
      <Card className={`bg-gradient-to-br ${getGradient('card')} backdrop-blur-lg border-white/20 shadow-2xl transition-all duration-1000`}>
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-2 rounded-lg bg-gradient-to-r ${getGradient('glow')} transition-all duration-1000`}>
              <Upload className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white">Upload Your Image</h3>
          </div>
          
          {!uploadedImage ? (
            <div
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
                dragActive 
                  ? "border-blue-400 bg-blue-500/10 scale-105" 
                  : "border-white/30 hover:border-white/50 hover:bg-white/5"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="relative">
                <Upload className="mx-auto h-16 w-16 text-white/60 mb-6" />
                <div className={`absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r ${getGradient('button')} rounded-full flex items-center justify-center transition-all duration-1000`}>
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-white">Drop your image here</h3>
              <p className="text-white/70 mb-6 text-lg">
                Drag and drop your image, or click to browse
              </p>
              <Button 
                onClick={openFileDialog}
                className={`bg-gradient-to-r ${getGradient('button')} hover:${getGradient('buttonHover')} text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-md`}
              >
                Choose File
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
              />
            </div>
          ) : (
            <div className="space-y-6">
              <div className="relative group overflow-hidden rounded-xl">
                <img
                  src={uploadedImage.url}
                  alt="Uploaded image"
                  className="w-full h-auto object-contain rounded-xl border border-white/20 shadow-lg"
                  style={{
                    maxWidth: `${uploadedImage.width}px`,
                    maxHeight: `${uploadedImage.height}px`
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-10 w-10 bg-red-500/80 hover:bg-red-500"
                  onClick={removeImage}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <Button
                variant="outline"
                onClick={openFileDialog}
                className="w-full border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              >
                Choose another image
              </Button>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Prompt Section */}
      <Card className={`bg-gradient-to-br ${getGradient('card')} backdrop-blur-lg border-white/20 shadow-2xl transition-all duration-1000`}>
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-2 rounded-lg bg-gradient-to-r ${getGradient('glow')} transition-all duration-1000`}>
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white">Describe Your Vision</h3>
          </div>
          
          <div className="space-y-6">
            {/* Aspect Ratio Selector */}
            <div className="space-y-3">
              <label className="text-white/90 text-sm font-medium">Aspect Ratio</label>
              <Select value={selectedAspectRatio} onValueChange={setSelectedAspectRatio}>
                <SelectTrigger className="bg-white/5 border-white/20 text-white focus:border-white/40 focus:bg-white/10">
                  <SelectValue placeholder="Select aspect ratio" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900/95 backdrop-blur-lg border-white/20 z-[80]">
                  {aspectRatios.map((ratio) => (
                    <SelectItem 
                      key={ratio.value} 
                      value={ratio.value}
                      className="text-white hover:bg-white/10 focus:bg-white/10"
                    >
                      {ratio.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Textarea
              placeholder="Describe how you want to transform your image..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[120px] bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:bg-white/10 resize-none rounded-xl"
            />
            
            <Button 
              onClick={handleGenerate} 
              className={`w-full bg-gradient-to-r ${getGradient('button')} hover:${getGradient('buttonHover')} text-white py-4 text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 hover:scale-105`}
              disabled={isGenerating || !uploadedImage}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Creating Magic...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Generate Transformation
                </>
              )}
            </Button>
            
            {/* AI Prompt Enhancer - Replacing Quick Suggestions */}
            <div className="space-y-3">
              <p className="text-white/70 text-sm font-medium">Generate your prompt:</p>
              <PromptEnhancer onPromptGenerated={handlePromptGenerated} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Output Section */}
      {generatedImages.length > 0 && (
        <Card className={`bg-gradient-to-br ${getGradient('card')} backdrop-blur-lg border-white/20 shadow-2xl transition-all duration-1000`}>
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-2 rounded-lg bg-gradient-to-r ${getGradient('glow')} transition-all duration-1000`}>
                <ImageIcon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Your Transformed Images</h3>
            </div>
            
            <div className="grid gap-6">
              {generatedImages.map((image, index) => (
                <div key={index} className="relative group overflow-hidden rounded-xl">
                  <img
                    src={image.url}
                    alt={`Generated ${index + 1}`}
                    className="w-full h-auto object-contain rounded-xl border border-white/20 shadow-lg"
                    style={{
                      maxWidth: `${image.width}px`,
                      maxHeight: `${image.height}px`
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      className={`h-12 w-12 rounded-xl bg-gradient-to-br ${getGradient('button')} p-[2px] hover:${getGradient('buttonHover')} transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-110`}
                      onClick={() => handleDownloadImage(image.url, index)}
                    >
                      <div className="h-full w-full rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white/80 transition-colors">
                        <Download className="h-5 w-5 text-gray-700" />
                      </div>
                    </button>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="h-12 w-12 shadow-lg bg-red-500/80 hover:bg-red-500 hover:scale-110 transition-all duration-200"
                      onClick={() => setGeneratedImages(prev => prev.filter((_, i) => i !== index))}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ImageUpload;
