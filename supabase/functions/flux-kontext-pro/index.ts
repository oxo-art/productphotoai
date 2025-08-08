
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Replicate from "https://esm.sh/replicate@0.25.2"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ImageGenerationRequest {
  prompt: string;
  input_image: string;
  aspect_ratio: string;
  width: number;
  height: number;
  strength?: number;
}

// Helper function to calculate optimal dimensions for better quality
const calculateOptimalDimensions = (aspectRatio: string): { width: number; height: number } => {
  const maxDimension = 2048;
  const minDimension = 512;
  
  // Define base ratios
  const ratioMap: { [key: string]: { w: number; h: number } } = {
    "1:1": { w: 1, h: 1 },
    "16:9": { w: 16, h: 9 },
    "21:9": { w: 21, h: 9 },
    "3:2": { w: 3, h: 2 },
    "2:3": { w: 2, h: 3 },
    "4:5": { w: 4, h: 5 },
    "5:4": { w: 5, h: 4 },
    "3:4": { w: 3, h: 4 },
    "4:3": { w: 4, h: 3 },
    "9:16": { w: 9, h: 16 },
    "9:21": { w: 9, h: 21 }
  };
  
  const ratio = ratioMap[aspectRatio] || { w: 4, h: 5 }; // default to 4:5
  
  // Calculate dimensions that maximize resolution within limits
  let width, height;
  
  if (ratio.w >= ratio.h) {
    // Landscape or square - make width the max dimension
    width = Math.min(maxDimension, Math.max(minDimension, maxDimension));
    height = Math.round((width * ratio.h) / ratio.w);
    
    // Ensure height doesn't exceed max
    if (height > maxDimension) {
      height = maxDimension;
      width = Math.round((height * ratio.w) / ratio.h);
    }
  } else {
    // Portrait - make height the max dimension
    height = Math.min(maxDimension, Math.max(minDimension, maxDimension));
    width = Math.round((height * ratio.w) / ratio.h);
    
    // Ensure width doesn't exceed max
    if (width > maxDimension) {
      width = maxDimension;
      height = Math.round((width * ratio.h) / ratio.w);
    }
  }
  
  // Snap to multiples of 8 for better model compatibility
  width = Math.round(width / 8) * 8;
  height = Math.round(height / 8) * 8;
  
  // Final bounds check
  width = Math.max(minDimension, Math.min(maxDimension, width));
  height = Math.max(minDimension, Math.min(maxDimension, height));
  
  return { width, height };
};

const validateRequest = (body: any): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!body.prompt || typeof body.prompt !== 'string' || body.prompt.trim().length === 0) {
    errors.push("prompt is required and must be a non-empty string");
  }
  
  if (!body.input_image || typeof body.input_image !== 'string') {
    errors.push("input_image is required and must be a string");
  }
  
  if (!body.aspect_ratio || typeof body.aspect_ratio !== 'string') {
    errors.push("aspect_ratio is required and must be a string");
  }

  // Validate aspect ratio values
  const validAspectRatios = [
    "1:1", "16:9", "21:9", "3:2", "2:3", 
    "4:5", "5:4", "3:4", "4:3", "9:16", "9:21"
  ];
  
  if (body.aspect_ratio && !validAspectRatios.includes(body.aspect_ratio)) {
    errors.push(`aspect_ratio must be one of: ${validAspectRatios.join(', ')}`);
  }

  // Validate strength if provided
  if (body.strength !== undefined) {
    if (typeof body.strength !== 'number' || body.strength < 0.1 || body.strength > 0.6) {
      errors.push("strength must be a number between 0.1 and 0.6");
    }
  }

  return { isValid: errors.length === 0, errors };
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const REPLICATE_API_KEY = Deno.env.get('REPLICATE_API_KEY')
    if (!REPLICATE_API_KEY) {
      throw new Error('REPLICATE_API_KEY is not set')
    }

    const replicate = new Replicate({
      auth: REPLICATE_API_KEY,
    })

    const body = await req.json()
    console.log("Received request body keys:", Object.keys(body))

    // Validate request
    const validation = validateRequest(body);
    if (!validation.isValid) {
      console.error("Validation errors:", validation.errors);
      return new Response(
        JSON.stringify({ 
          error: "Validation failed",
          details: validation.errors
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      )
    }

    const requestData: ImageGenerationRequest = body as ImageGenerationRequest;

    // Calculate optimal dimensions for better quality
    const optimalDimensions = calculateOptimalDimensions(requestData.aspect_ratio);
    console.log(`Optimal dimensions for ${requestData.aspect_ratio}: ${optimalDimensions.width}x${optimalDimensions.height}`);

    // Set strength for better detail preservation (default 0.30 for good balance)
    const strength = requestData.strength || 0.30;
    
    console.log("Generating image with Flux Kontext Dev")
    console.log("Prompt:", requestData.prompt)
    console.log("Aspect ratio:", requestData.aspect_ratio)
    console.log("Strength:", strength)
    console.log("Width:", optimalDimensions.width)
    console.log("Height:", optimalDimensions.height)
    
    const input = {
      prompt: requestData.prompt,
      go_fast: false,
      guidance: 4.0,
      guidance_scale: 4.0,
      input_image: requestData.input_image,
      aspect_ratio: requestData.aspect_ratio,
      width: optimalDimensions.width,
      height: optimalDimensions.height,
      strength: strength,
      negative_prompt: "blurry, distorted text, unreadable label, warped letters, deformed bottle, misspelled words, low resolution, artifacts, pixelated, smudged text",
      output_format: "png",
      output_quality: 95,
      num_inference_steps: 44
    };

    console.log("Final input payload to Replicate:", JSON.stringify(input, null, 2));

    const output = await replicate.run("black-forest-labs/flux-kontext-dev", { input });

    console.log("Generation successful")
    
    // Ensure output is always an array for consistent frontend handling
    const outputArray = Array.isArray(output) ? output : [output];
    
    // Validate output
    if (!outputArray || outputArray.length === 0) {
      throw new Error("No images were generated by the model");
    }

    return new Response(JSON.stringify({ 
      success: true,
      output: outputArray,
      message: "Image generated successfully with Flux Kontext Dev",
      metadata: {
        prompt: requestData.prompt,
        aspect_ratio: requestData.aspect_ratio,
        dimensions: {
          width: optimalDimensions.width,
          height: optimalDimensions.height
        },
        quality_settings: {
          guidance_scale: 4.0,
          num_inference_steps: 44,
          output_format: "png",
          output_quality: 95,
          strength: strength,
          negative_prompt_applied: true
        }
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    console.error("Error in function:", error)
    
    // Provide more specific error messages
    let errorMessage = "An unexpected error occurred";
    let statusCode = 500;
    
    if (error.message?.includes("REPLICATE_API_KEY")) {
      errorMessage = "Service configuration error";
      statusCode = 503;
    } else if (error.message?.includes("Validation")) {
      errorMessage = error.message;
      statusCode = 400;
    } else if (error.message?.includes("rate limit")) {
      errorMessage = "Service temporarily unavailable due to rate limiting";
      statusCode = 429;
    } else if (error.message?.includes("timeout")) {
      errorMessage = "Request timed out, please try again";
      statusCode = 408;
    }
    
    return new Response(JSON.stringify({ 
      error: errorMessage,
      details: error.toString(),
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: statusCode,
    })
  }
})
