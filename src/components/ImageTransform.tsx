
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Wand2, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ImageTransformProps {
  uploadedImages: { url: string }[];
}

const ImageTransform = ({ uploadedImages }: ImageTransformProps) => {
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [customPrompt, setCustomPrompt] = useState("");
  const [transformedImage, setTransformedImage] = useState<string>("");
  const [isTransforming, setIsTransforming] = useState(false);
  const { toast } = useToast();

  const handleTransform = async () => {
    if (!selectedImage || !customPrompt.trim()) {
      toast({
        title: "Missing information",
        description: "Please select an image and enter a prompt",
        variant: "destructive"
      });
      return;
    }

    setIsTransforming(true);
    setTransformedImage("");

    try {
      const { data, error } = await supabase.functions.invoke('transform-image', {
        body: {
          prompt: customPrompt.trim(),
          input_image: selectedImage,
          aspect_ratio: "match_input_image",
          output_format: "png",
          safety_tolerance: 2
        }
      });

      if (error) throw error;

      if (data?.output && Array.isArray(data.output) && data.output.length > 0) {
        setTransformedImage(data.output[0]);
        toast({
          title: "Transformation complete!",
          description: "Your image has been successfully transformed"
        });
      } else {
        throw new Error("No transformed image received");
      }
    } catch (error) {
      console.error('Transformation error:', error);
      toast({
        title: "Transformation failed",
        description: "There was an error transforming your image. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsTransforming(false);
    }
  };

  const downloadTransformedImage = () => {
    if (transformedImage) {
      const link = document.createElement('a');
      link.href = transformedImage;
      link.download = 'transformed-image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (uploadedImages.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">Upload some images first to use AI transformation</p>
        </CardContent>
      </Card>
    );
  }

  const isButtonDisabled = isTransforming || !selectedImage || !customPrompt.trim();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Wand2 className="mr-2 h-5 w-5" />
          AI Image Transformation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="image-select">Select Image to Transform</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {uploadedImages.map((image, index) => (
              <div
                key={index}
                className={`relative cursor-pointer rounded-lg border-2 transition-colors ${
                  selectedImage === image.url
                    ? "border-primary"
                    : "border-muted hover:border-primary/50"
                }`}
                onClick={() => setSelectedImage(image.url)}
              >
                <img
                  src={image.url}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg"
                />
                {selectedImage === image.url && (
                  <div className="absolute inset-0 bg-primary/20 rounded-lg flex items-center justify-center">
                    <div className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                      Selected
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="prompt">Transformation Prompt</Label>
          <Textarea
            id="prompt"
            placeholder="e.g., Make this a 90s cartoon, Convert to oil painting style, Turn into a cyberpunk scene..."
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            className="min-h-[80px]"
          />
        </div>

        <div className="w-full">
          <Button 
            onClick={handleTransform}
            disabled={isButtonDisabled}
            className="w-full h-12 text-base font-medium"
            size="lg"
          >
            {isTransforming ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Transforming...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Transform Image
              </>
            )}
          </Button>
          {isButtonDisabled && !isTransforming && (
            <p className="text-sm text-muted-foreground mt-2 text-center">
              {!selectedImage && !customPrompt.trim() 
                ? "Please select an image and enter a prompt" 
                : !selectedImage 
                ? "Please select an image" 
                : "Please enter a prompt"}
            </p>
          )}
        </div>

        {transformedImage && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Transformation Result</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Original</p>
                <img
                  src={selectedImage}
                  alt="Original"
                  className="w-full h-48 object-cover rounded-lg border"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Transformed</p>
                <img
                  src={transformedImage}
                  alt="Transformed"
                  className="w-full h-48 object-cover rounded-lg border"
                />
              </div>
            </div>
            <Button onClick={downloadTransformedImage} variant="outline" className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download Transformed Image
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ImageTransform;
