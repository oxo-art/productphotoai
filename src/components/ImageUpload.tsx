import { useState, useRef } from "react";
import { Upload, Image as ImageIcon, X, Loader2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
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

const ImageUpload = () => {
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
    
    const file = files[0]; // Only take the first file
    
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
      
      // Create an image element to get dimensions
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

      // Handle specific API errors
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

      // Handle the response - data.output should be a single URL string
      if (data.output && typeof data.output === 'string') {
        const generatedImageUrl = data.output;
        console.log("Generated image URL:", generatedImageUrl);
        
        // Create a new image to get the actual dimensions
        const img = new Image();
        img.onload = () => {
          setGeneratedImages(prev => [...prev, {
            url: generatedImageUrl,
            width: uploadedImage.width || img.width || 1024,
            height: uploadedImage.height || img.height || 1024
          }]);
        };
        img.onerror = () => {
          // If image fails to load for dimensions, still add it with input dimensions
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

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Upload Section */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Upload image</h3>
          {!uploadedImage ? (
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive 
                  ? "border-primary bg-primary/5" 
                  : "border-muted-foreground/25 hover:border-primary/50"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Upload Image</h3>
              <p className="text-muted-foreground mb-4">
                Drag and drop your image here, or click to browse
              </p>
              <Button onClick={openFileDialog}>
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
            <div className="space-y-4">
              <div className="relative group">
                <img
                  src={uploadedImage.url}
                  alt="Uploaded image"
                  className="w-full h-auto object-contain rounded-lg border"
                  style={{
                    maxWidth: `${uploadedImage.width}px`,
                    maxHeight: `${uploadedImage.height}px`
                  }}
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                  onClick={removeImage}
                >
                  <X className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  onClick={openFileDialog}
                  className="w-full mt-2"
                >
                  Choose another image
                </Button>
              </div>
              
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
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Prompt</h3>
          <div className="space-y-4">
            <Textarea
              placeholder="Describe how you want to transform the image..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[100px]"
            />
            <Button 
              onClick={handleGenerate} 
              className="w-full"
              disabled={isGenerating || !uploadedImage}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Image"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Output Section */}
      {generatedImages.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Generated Images</h3>
            <div className="grid gap-4">
              {generatedImages.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image.url}
                    alt={`Generated ${index + 1}`}
                    className="w-full h-auto object-contain rounded-lg border"
                    style={{
                      maxWidth: `${image.width}px`,
                      maxHeight: `${image.height}px`
                    }}
                  />
                  <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-[2px] hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                      onClick={() => downloadImage(image.url, index)}
                    >
                      <div className="h-full w-full rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white/80 transition-colors">
                        <Download className="h-4 w-4 text-gray-700" />
                      </div>
                    </button>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="h-10 w-10 shadow-lg"
                      onClick={() => setGeneratedImages(prev => prev.filter((_, i) => i !== index))}
                    >
                      <X className="h-4 w-4" />
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
