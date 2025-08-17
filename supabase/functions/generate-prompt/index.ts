
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userInput } = await req.json();

    if (!userInput) {
      return new Response(JSON.stringify({ error: 'User input is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Generating detailed prompt for:', userInput);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are an expert image generation prompt engineer. Your task is to transform simple user descriptions into detailed, professional prompts for AI image generation.

Guidelines:
- Expand simple descriptions into detailed, vivid prompts
- Include specific details about lighting, composition, colors, textures, and mood
- Use professional photography and design terminology
- Make prompts suitable for product photography, lifestyle shots, or creative content
- Keep prompts clear and actionable
- Aim for 50-150 words for optimal results
- Focus on visual elements that will enhance the original image

Example:
User: "make it look professional"
Enhanced: "Transform this image into a professional studio photograph with clean composition, balanced lighting, and crisp details. Use a neutral background with subtle shadows that complement the subject. Apply color grading that enhances the visual appeal while maintaining natural tones. Ensure the final result has commercial-quality aesthetics suitable for business use."`
          },
          {
            role: 'user',
            content: `Transform this simple description into a detailed image generation prompt: "${userInput}"`
          }
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('OpenAI API error:', data);
      throw new Error(data.error?.message || 'Failed to generate prompt');
    }

    const enhancedPrompt = data.choices[0].message.content.trim();
    
    console.log('Generated enhanced prompt:', enhancedPrompt);

    return new Response(JSON.stringify({ 
      success: true, 
      enhancedPrompt 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-prompt function:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message || 'Failed to generate enhanced prompt' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
