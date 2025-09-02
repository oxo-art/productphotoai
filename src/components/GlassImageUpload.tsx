import { useState, useRef } from "react";
import { Upload, Image as ImageIcon, X, Loader2, Download, Sparkles, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useGlassTheme } from "@/contexts/GlassThemeContext";
import { useMobileOptimization } from "@/hooks/useMobileOptimization";
import { aspectRatios } from "@/config/aspectRatios";
import { UploadedImage, GeneratedImage } from "@/types/imageGeneration";
import { useImageGeneration } from "@/hooks/useImageGeneration";
import { processImageFile, downloadImage } from "@/utils/fileHandling";

const promptSuggestions = [
  "Professional studio photography with luxury lighting, preserve all product logos and text exactly",
  "Clean minimalist background, maintain full product visibility and original branding without cropping", 
  "Elegant lifestyle scene with premium props, keep all product details and logos perfectly intact",
  "Modern aesthetic with soft shadows, ensure complete product and person visibility in frame"
];

const GlassImageUpload = () => {
  const { getThemeStyle } = useGlassTheme();
  const { isMobile, isLowEndDevice, blurIntensity } = useMobileOptimization();
  const textStyles = getThemeStyle('text') as { primary: string; secondary: string; muted: string };
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
  const [prompt, setPrompt] = useState("");
  const [selectedAspectRatio, setSelectedAspectRatio] = useState("match_input_image");
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

  const addPromptSuggestion = (suggestion: string) => {
    setPrompt(suggestion);
  };

  const getAspectRatioBoxStyle = (ratio: string): React.CSSProperties => {
    // Simple aspect ratio visualization without specific dimensions
    const aspectMap: Record<string, React.CSSProperties> = {
      "match_input_image": { width: '24px', height: '20px', borderRadius: '4px' },
      "1:1": { width: '24px', height: '24px' },
      "16:9": { width: '24px', height: '13.5px' },
      "4:3": { width: '24px', height: '18px' },
      "9:16": { width: '13.5px', height: '24px' }
    };
    
    return aspectMap[ratio] || { width: '24px', height: '24px' };
  };

  return (
    <div className={`w-full max-w-4xl mx-auto space-y-${isMobile ? '4' : '8'} ${isMobile ? 'px-4' : ''}`}>
      {/* Upload Section */}
      <Card className={`${getThemeStyle('card')} ${getThemeStyle('shadow')} transition-all duration-1000`}>
        <CardContent className={`${isMobile ? 'p-4' : 'p-8'}`}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-2 rounded-lg ${getThemeStyle('card')}`}>
              <Upload className={`w-5 h-5 ${textStyles.primary}`} />
            </div>
            <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold ${textStyles.primary}`}>Upload Your Image</h3>
          </div>
          
          {!uploadedImage ? (
            <div
              className={`border-2 border-dashed rounded-xl ${isMobile ? 'p-6' : 'p-12'} text-center transition-all duration-300 ${
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
                <Upload className={`mx-auto ${isMobile ? 'h-12 w-12' : 'h-16 w-16'} ${textStyles.muted} mb-6`} />
                <div className={`absolute -top-2 -right-2 w-6 h-6 ${getThemeStyle('buttonPrimary')} rounded-full flex items-center justify-center`}>
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
              </div>
              <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-semibold mb-4 ${textStyles.primary}`}>Drop your image here</h3>
              <p className={`${textStyles.secondary} mb-6 ${isMobile ? 'text-base' : 'text-lg'}`}>
                Drag and drop your image, or click to browse
              </p>
              <Button 
                onClick={openFileDialog}
                className={`${getThemeStyle('buttonPrimary')} text-white ${isMobile ? 'px-6 py-3' : 'px-8 py-3'} rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-md`}
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
                  className={`w-full h-auto object-contain rounded-xl border border-white/20 shadow-lg ${isMobile ? 'max-h-[60vh]' : ''}`}
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isLowEndDevice ? 'hidden' : ''}`}></div>
                <Button
                  variant="destructive"
                  size="icon"
                  className={`absolute top-4 right-4 ${isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-300 h-10 w-10 bg-red-500/80 hover:bg-red-500`}
                  onClick={removeImage}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <Button
                onClick={openFileDialog}
                className={`w-full ${getThemeStyle('button')} ${textStyles.primary} hover:bg-white/20 transition-all duration-300 border border-white/30 ${blurIntensity}`}
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
      <Card className={`${getThemeStyle('card')} ${getThemeStyle('shadow')} transition-all duration-1000`}>
        <CardContent className={`${isMobile ? 'p-4' : 'p-8'}`}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-2 rounded-lg ${getThemeStyle('card')}`}>
              <Lightbulb className={`w-5 h-5 ${textStyles.primary}`} />
            </div>
            <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold ${textStyles.primary}`}>Describe Your Vision</h3>
          </div>
          
          <div className="space-y-6">
            {/* Aspect Ratio Glass Buttons */}
            <div className="space-y-3">
              <label className={`${textStyles.secondary} text-sm font-medium`}>Aspect Ratio</label>
              <div className={`grid ${isMobile ? 'grid-cols-3' : 'flex flex-wrap'} gap-3`}>
                {aspectRatios.map((ratio) => (
                  <button
                    key={ratio.value}
                    onClick={() => setSelectedAspectRatio(ratio.value)}
                    className={`group relative flex flex-col items-center gap-2 ${isMobile ? 'p-3' : 'p-4'} rounded-xl ${blurIntensity} border transition-all duration-300 ${!isLowEndDevice ? 'hover:scale-105' : ''} ${
                      selectedAspectRatio === ratio.value
                        ? `${getThemeStyle('buttonPrimary')} border-white/40 shadow-lg`
                        : `${getThemeStyle('button')} border-white/20 hover:border-white/30`
                    }`}
                  >
                    {/* Visual representation of aspect ratio */}
                    <div 
                      className={`bg-white/80 rounded-sm ${
                        selectedAspectRatio === ratio.value ? 'shadow-md' : 'shadow-sm'
                      }`}
                      style={getAspectRatioBoxStyle(ratio.value)}
                    />
                    <span className={`${isMobile ? 'text-xs' : 'text-xs'} font-medium ${
                      selectedAspectRatio === ratio.value 
                        ? 'text-white' 
                        : textStyles.secondary
                    }`}>
                      {ratio.label}
                    </span>
                    
                    {/* Selection indicator */}
                    {selectedAspectRatio === ratio.value && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <Textarea
              placeholder="Describe how you want to transform your image..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className={`min-h-[120px] ${getThemeStyle('input')} ${textStyles.primary} placeholder:text-white/50 resize-none rounded-xl`}
            />
            
            <Button 
              onClick={handleGenerate} 
              className={`w-full ${getThemeStyle('buttonPrimary')} text-white py-4 ${isMobile ? 'text-base' : 'text-lg'} font-semibold rounded-xl shadow-lg transition-all duration-300 ${!isLowEndDevice ? 'hover:scale-105' : ''}`}
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
            
            {/* Prompt Suggestions */}
            <div className="space-y-3">
              <p className={`${textStyles.secondary} text-sm font-medium`}>Quick suggestions:</p>
              <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'} gap-3`}>
                {promptSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => addPromptSuggestion(suggestion)}
                    className={`px-4 py-3 ${getThemeStyle('button')} ${textStyles.secondary} hover:${textStyles.primary} text-sm transition-all duration-200 ${!isLowEndDevice ? 'hover:scale-105' : ''} rounded-lg text-left border border-white/20 hover:border-white/30`}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Output Section */}
      {generatedImages.length > 0 && (
        <Card className={`${getThemeStyle('card')} ${getThemeStyle('shadow')} transition-all duration-1000`}>
          <CardContent className={`${isMobile ? 'p-4' : 'p-8'}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-2 rounded-lg ${getThemeStyle('card')}`}>
                <ImageIcon className={`w-5 h-5 ${textStyles.primary}`} />
              </div>
              <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold ${textStyles.primary}`}>Your Transformed Images</h3>
            </div>
            
            <div className="grid gap-6">
              {generatedImages.map((image, index) => (
                <div key={index} className="relative group overflow-hidden rounded-xl">
                  <img
                    src={image.url}
                    alt={`Generated ${index + 1}`}
                    className={`w-full h-auto object-contain rounded-xl border border-white/20 shadow-lg max-w-full ${isMobile ? 'max-h-[70vh]' : 'max-h-[80vh]'} mx-auto`}
                    style={{ 
                      display: 'block',
                      objectFit: 'contain'
                    }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent ${isMobile ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-300`}></div>
                  <div className={`absolute ${isMobile ? 'top-2 right-2' : 'top-4 right-4'} flex gap-3 ${isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-300`}>
                    <button
                      className={`${isMobile ? 'h-10 w-10' : 'h-12 w-12'} rounded-xl ${getThemeStyle('buttonPrimary')} p-[2px] transition-all duration-200 shadow-lg hover:shadow-xl ${!isLowEndDevice ? 'hover:scale-110' : ''}`}
                      onClick={() => handleDownloadImage(image.url, index)}
                    >
                      <div className={`h-full w-full rounded-xl bg-white/90 ${blurIntensity} flex items-center justify-center hover:bg-white/80 transition-colors`}>
                        <Download className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} text-gray-700`} />
                      </div>
                    </button>
                    <Button
                      variant="destructive"
                      size="icon"
                      className={`${isMobile ? 'h-10 w-10' : 'h-12 w-12'} shadow-lg bg-red-500/80 hover:bg-red-500 ${!isLowEndDevice ? 'hover:scale-110' : ''} transition-all duration-200`}
                      onClick={() => setGeneratedImages(prev => prev.filter((_, i) => i !== index))}
                    >
                      <X className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
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

export default GlassImageUpload;
