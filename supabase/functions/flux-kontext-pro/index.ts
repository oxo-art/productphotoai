
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

    console.log("Generating image with Flux Kontext Pro")
    console.log("Prompt:", body.prompt)
    console.log("Input image type:", typeof body.input_image)
    console.log("Input image length:", body.input_image.length)

    // Handle base64 data URLs by converting them to the format Replicate expects
    let inputImage = body.input_image;
    if (body.input_image.startsWith('data:image/')) {
      console.log("Converting base64 data URL for Replicate")
      // Replicate accepts base64 data URLs directly, but let's ensure proper format
      inputImage = body.input_image;
    }

    const prediction = await replicate.predictions.create({
      version: "d4d8501d25bb98dfe28aeea99ca9df1ad9e2dc5b90dcb981dcaef3b7b1a8b6f9",
      input: {
        prompt: body.prompt,
        input_image: inputImage,
        aspect_ratio: body.aspect_ratio || "match_input_image",
        output_format: body.output_format || "png",
        safety_tolerance: body.safety_tolerance || 2
      }
    });

    console.log("Prediction created:", prediction.id)

    // Wait for the prediction to complete
    let result = prediction;
    while (result.status === "starting" || result.status === "processing") {
      console.log("Waiting for prediction to complete, status:", result.status)
      await new Promise(resolve => setTimeout(resolve, 1000));
      result = await replicate.predictions.get(prediction.id);
    }

    console.log("Final prediction result:", result.status)
    
    if (result.status === "succeeded") {
      console.log("Generation successful, output:", result.output)
      return new Response(JSON.stringify({ output: result.output }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      })
    } else {
      console.error("Generation failed:", result.error)
      throw new Error(result.error || "Generation failed")
    }

  } catch (error) {
    console.error("Error in flux-kontext-pro function:", error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
