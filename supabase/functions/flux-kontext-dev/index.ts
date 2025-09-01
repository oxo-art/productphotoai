
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const REPLICATE_API_KEY = Deno.env.get('REPLICATE_API_KEY')
    if (!REPLICATE_API_KEY) {
      console.error('REPLICATE_API_KEY not found in environment')
      throw new Error('REPLICATE_API_KEY is not configured')
    }

    const body = await req.json()
    console.log('Received request:', { 
      prompt: body.prompt?.substring(0, 100),
      hasImage: !!body.input_image,
      aspectRatio: body.aspect_ratio,
      width: body.width,
      height: body.height
    })

    // Validate required fields
    if (!body.prompt?.trim()) {
      return new Response(
        JSON.stringify({ 
          success: false,
          error: 'Prompt is required',
          details: ['Please provide a valid prompt']
        }), 
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      )
    }

    if (!body.input_image) {
      return new Response(
        JSON.stringify({ 
          success: false,
          error: 'Input image is required',
          details: ['Please upload an image first']
        }), 
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      )
    }

    // Prepare the request payload for Replicate API using Qwen Image Edit model
    const replicatePayload = {
      input: {
        image: body.input_image,
        prompt: body.prompt,
        go_fast: true,
        aspect_ratio: body.aspect_ratio || "4:5",
        output_format: "png",
        output_quality: 80
      }
    }

    console.log('Calling Replicate API with model: qwen/qwen-image-edit')
    console.log('Payload input:', replicatePayload.input)

    // Call Replicate API with the new Qwen Image Edit model
    const response = await fetch(
      'https://api.replicate.com/v1/models/qwen/qwen-image-edit/predictions',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${REPLICATE_API_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'wait'
        },
        body: JSON.stringify(replicatePayload)
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Replicate API error:', response.status, errorText)
      throw new Error(`Replicate API error: ${response.status} - ${errorText}`)
    }

    const result = await response.json()
    console.log('Replicate API response status:', result.status)

    // Handle different response statuses
    if (result.error) {
      console.error('Replicate prediction error:', result.error)
      throw new Error(`Prediction failed: ${result.error}`)
    }

    // If prediction is still processing, we need to poll for completion
    let finalResult = result
    if (result.status === 'starting' || result.status === 'processing') {
      console.log('Prediction is processing, polling for completion...')
      
      // Poll for completion (max 60 seconds)
      const maxAttempts = 60
      let attempts = 0
      
      while ((finalResult.status === 'starting' || finalResult.status === 'processing') && attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 1000)) // Wait 1 second
        attempts++
        
        const pollResponse = await fetch(
          `https://api.replicate.com/v1/predictions/${result.id}`,
          {
            headers: {
              'Authorization': `Bearer ${REPLICATE_API_KEY}`,
              'Content-Type': 'application/json'
            }
          }
        )
        
        if (pollResponse.ok) {
          finalResult = await pollResponse.json()
          console.log(`Poll attempt ${attempts}, status: ${finalResult.status}`)
        }
      }
    }

    if (finalResult.status === 'succeeded' && finalResult.output) {
      // Handle output - could be a single URL or array of URLs
      const outputUrls = Array.isArray(finalResult.output) ? finalResult.output : [finalResult.output]
      
      console.log('Generation successful, output URLs:', outputUrls.length)
      
      return new Response(
        JSON.stringify({
          success: true,
          output: outputUrls
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    } else if (finalResult.status === 'failed') {
      console.error('Prediction failed:', finalResult.error)
      throw new Error(`Generation failed: ${finalResult.error || 'Unknown error'}`)
    } else {
      console.error('Prediction timed out or unexpected status:', finalResult.status)
      throw new Error('Generation timed out. Please try again.')
    }

  } catch (error: any) {
    console.error('Edge function error:', error)
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'An unexpected error occurred',
        details: [error.message]
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
