import { useState, useRef } from "react";
import { Upload, Image as ImageIcon, X, Loader2, Download, Sparkles, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useGradientTheme } from "@/contexts/GradientThemeContext";
import { supabase } from "@/integrations/supabase/client";

interface UploadedImage {
  url: string;
  width?: number;
  height?: number;
}

interface GeneratedImage {
  url: string;
  width: number;
  height: number;
}

const promptSuggestions = [
  "Turn this image into a ghibli style art",
  "Make it look like a vintage photograph",
  "Transform into a futuristic cyberpunk style",
  "Add dramatic lighting and shadows",
  "Make it look like a comic book illustration"
];

const ImageUpload = () => {
  const { getGradient } = useGradientTheme();
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
  const [prompt, setPrompt] = useState("");
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

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

  const handleFiles = (files: File[]) => {
    if (files.length === 0) return;
    
    const file = files[0];
    
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file",
        description: "Only image files are allowed",
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      
      const img = new Image();
      img.onload = () => {
        setUploadedImage({ 
          url: result,
          width: img.width,
          height: img.height
        });
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setUploadedImage(null);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const downloadImage = async (imageUrl: string, index: number) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `generated-image-${index + 1}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast({
        title: "Download failed",
        description: "Failed to download the image",
        variant: "destructive"
      });
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Prompt required",
        description: "Please enter a prompt to generate an image",
        variant: "destructive"
      });
      return;
    }

    if (!uploadedImage) {
      toast({
        title: "Image required",
        description: "Please upload an image first",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      console.log("Starting image generation with Flux Kontext Pro");
      console.log("Prompt:", prompt.trim());
      console.log("Input image URL type:", typeof uploadedImage.url);
      
      const { data, error } = await supabase.functions.invoke('flux-kontext-pro', {
        body: {
          prompt: prompt.trim(),
          input_image: uploadedImage.url,
          aspect_ratio: "match_input_image",
          output_format: "png",
          safety_tolerance: 2
        }
      });

      console.log("Supabase response:", { data, error });

      if (error) {
        console.error("Supabase function error:", error);
        throw new Error(error.message || "Failed to generate image");
      }

      if (!data) {
        throw new Error("No data received from the service");
      }

      if (data.error) {
        if (data.error.includes("Monthly spend limit")) {
          toast({
            title: "API Limit Reached",
            description: "The Replicate account has reached its monthly spending limit. Please check the billing settings or try again later.",
            variant: "destructive"
          });
          return;
        }
        throw new Error(data.error);
      }

      if (data.output && typeof data.output === 'string') {
        const generatedImageUrl = data.output;
        console.log("Generated image URL:", generatedImageUrl);
        
        const img = new Image();
        img.onload = () => {
          setGeneratedImages(prev => [...prev, {
            url: generatedImageUrl,
            width: uploadedImage.width || img.width || 1024,
            height: uploadedImage.height || img.height || 1024
          }]);
        };
        img.onerror = () => {
          setGeneratedImages(prev => [...prev, {
            url: generatedImageUrl,
            width: uploadedImage.width || 1024,
            height: uploadedImage.height || 1024
          }]);
        };
        img.src = generatedImageUrl;

        toast({
          title: "Image generated successfully",
          description: "Your image has been generated with Flux Kontext Pro",
        });
      } else {
        console.error("Unexpected response format:", data);
        throw new Error("Invalid response format from AI service");
      }
    } catch (error) {
      console.error("Generation error:", error);
      toast({
        title: "Generation failed",
        description: error instanceof Error ? error.message : "Failed to generate image",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const addPromptSuggestion = (suggestion: string) => {
    setPrompt(suggestion);
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
            <Textarea
              placeholder="Describe how you want to transform your image..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[120px] bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:bg-white/10 resize-none rounded-xl"
            />
            
            {/* Prompt Suggestions */}
            <div className="space-y-3">
              <p className="text-white/70 text-sm font-medium">Quick suggestions:</p>
              <div className="flex flex-wrap gap-2">
                {promptSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => addPromptSuggestion(suggestion)}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 rounded-lg text-white/80 hover:text-white text-sm transition-all duration-200 hover:scale-105"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
            
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
                      onClick={() => downloadImage(image.url, index)}
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
