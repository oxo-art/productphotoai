
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

    console.log("Generating image with Flux Kontext Dev")
    console.log("Prompt:", body.prompt)
    
    const input = {
      prompt: body.prompt,
      go_fast: true,
      guidance: 2.5,
      input_image: body.input_image,
      aspect_ratio: "match_input_image", 
      output_format: "jpg",
      output_quality: 80,
      num_inference_steps: 30
    };

    const output = await replicate.run("black-forest-labs/flux-kontext-dev", { input });

    console.log("Generation successful")
    
    // Ensure output is always an array for consistent frontend handling
    const outputArray = Array.isArray(output) ? output : [output];
    
    return new Response(JSON.stringify({ 
      success: true,
      output: outputArray,
      message: "Image generated successfully with Flux Kontext Dev"
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    console.error("Error in function:", error)
    
    return new Response(JSON.stringify({ 
      error: error.message || "An unexpected error occurred",
      details: error.toString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
