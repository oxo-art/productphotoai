
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Replicate from "https://esm.sh/replicate@0.25.2"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
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

    // Validate required fields
    if (!body.prompt || !body.input_image) {
      return new Response(
        JSON.stringify({ 
          error: "Missing required fields: prompt and input_image are required" 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      )
    }

    console.log("Generating image with Flux Kontext Pro")
    console.log("Prompt:", body.prompt)
    
    // Ensure the input_image is in the correct data URI format
    let imageData = body.input_image;
    if (!imageData.startsWith('data:image')) {
      // If it's raw base64, add the data URI prefix
      imageData = `data:image/jpeg;base64,${imageData}`;
      console.log("Added data URI prefix to base64 data")
    } else {
      console.log("Input image already in data URI format")
    }

    // Use Flux Kontext Pro model with proper input structure
    const input = {
      prompt: body.prompt,
      input_image: imageData,
      aspect_ratio: body.aspect_ratio || "match_input_image",
      output_format: body.output_format || "png",
      safety_tolerance: body.safety_tolerance || 2
    };

    console.log("Calling Replicate with input:", { ...input, input_image: `[data URI - ${imageData.length} chars]` })

    const output = await replicate.run("black-forest-labs/flux-kontext-pro", { input });

    console.log("Replicate response received:", typeof output, Array.isArray(output))
    
    // Handle different output formats from Flux Kontext Pro
    let imageUrl;
    if (Array.isArray(output) && output.length > 0) {
      imageUrl = output[0];
    } else if (typeof output === 'string') {
      imageUrl = output;
    } else if (output && output.url) {
      imageUrl = output.url;
    } else {
      console.error("Unexpected output format:", output)
      throw new Error("No valid image URL in response")
    }

    console.log("Final image URL:", imageUrl)

    return new Response(JSON.stringify({ output: imageUrl }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    console.error("Error in flux-kontext-pro function:", error)
    
    // Handle specific Replicate API errors
    if (error.message && error.message.includes('402')) {
      return new Response(JSON.stringify({ 
        error: "Monthly spend limit reached on Replicate account. Please check your billing settings at https://replicate.com/account/billing#limits",
        details: "Payment Required - API quota exceeded"
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 402,
      })
    }
    
    return new Response(JSON.stringify({ 
      error: error.message || "An unexpected error occurred",
      details: error.toString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
