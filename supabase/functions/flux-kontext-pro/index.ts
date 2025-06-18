
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

    // If it's a status check request
    if (body.predictionId) {
      console.log("Checking status for prediction:", body.predictionId)
      const prediction = await replicate.predictions.get(body.predictionId)
      console.log("Status check response:", prediction)
      return new Response(JSON.stringify(prediction), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // If it's a generation request
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

    console.log("Generating image with Flux model")
    console.log("Prompt:", body.prompt)
    console.log("Input image type:", typeof body.input_image)

    // Use Flux Schnell model which is available and works well for image-to-image
    const output = await replicate.run(
      "black-forest-labs/flux-schnell",
      {
        input: {
          prompt: body.prompt,
          image: body.input_image,
          go_fast: true,
          megapixels: "1",
          num_outputs: 1,
          aspect_ratio: "1:1",
          output_format: "png",
          output_quality: 80,
          num_inference_steps: 4
        }
      }
    )

    console.log("Generation successful, output:", output)
    
    // The output from Flux Schnell is an array of URLs
    if (Array.isArray(output) && output.length > 0) {
      return new Response(JSON.stringify({ output: output[0] }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      })
    } else {
      throw new Error("No output generated")
    }

  } catch (error) {
    console.error("Error in flux generation function:", error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
