// GitHub Models AI Service
// Using direct HTTP API calls for maximum compatibility

export interface EmotionalInsight {
  pattern: string;
  confidence: number;
  description: string;
  suggestions: string[];
}

export interface MoodAnalysis {
  dominantMood: string;
  trends: string[];
  insights: EmotionalInsight[];
  summary: string;
}

const API_ENDPOINT = import.meta.env.VITE_GITHUB_MODEL_ENDPOINT || 'https://models.inference.ai.azure.com';
const API_KEY = import.meta.env.VITE_GITHUB_TOKEN || '';

async function callAI(messages: any[], temperature = 0.7, maxTokens = 1000): Promise<string> {
  if (!API_KEY) {
    console.warn('GitHub API token not configured');
    throw new Error('AI service not configured');
  }

  try {
    const response = await fetch(`${API_ENDPOINT}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages,
        temperature,
        max_tokens: maxTokens,
      }),
    });

    if (!response.ok) {
      throw new Error(`AI API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('AI API call failed:', error);
    throw error;
  }
}

/**
 * Analyzes behavioral metadata to infer emotional patterns
 */
export async function analyzeEmotionalPatterns(
  metadata: any[]
): Promise<MoodAnalysis> {
  try {
    const prompt = `Analyze the following behavioral metadata and provide emotional insights:
${JSON.stringify(metadata, null, 2)}

Please provide:
1. The dominant mood pattern
2. Emotional trends over time
3. Specific insights with confidence levels
4. Actionable suggestions for emotional well-being

Respond in JSON format matching the MoodAnalysis interface.`;

    const content = await callAI([
      {
        role: 'system',
        content: 'You are an empathetic AI assistant specialized in emotional pattern analysis. Provide compassionate, evidence-based insights while respecting user privacy.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ], 0.7, 1000);

    if (!content) {
      throw new Error('No response from AI');
    }

    return JSON.parse(content);
  } catch (error) {
    console.error('Error analyzing emotional patterns:', error);
    // Return fallback analysis
    return {
      dominantMood: 'neutral',
      trends: ['Unable to analyze at this time'],
      insights: [],
      summary: 'Analysis temporarily unavailable. Please try again later.',
    };
  }
}

/**
 * Handles natural language queries about emotional data
 */
export async function handleNaturalLanguageQuery(
  query: string,
  context: any
): Promise<string> {
  try {
    const content = await callAI([
      {
        role: 'system',
        content: 'You are a supportive AI assistant helping users understand their emotional journey. Provide clear, empathetic responses based on their data.',
      },
      {
        role: 'user',
        content: `Context: ${JSON.stringify(context)}\n\nQuestion: ${query}`,
      },
    ], 0.8, 500);

    return content || 'I apologize, but I could not process your query at this time.';
  } catch (error) {
    console.error('Error handling query:', error);
    return 'I apologize, but I encountered an error processing your question. Please try again.';
  }
}

/**
 * Generates personalized insights based on mood data
 */
export async function generateInsights(moodData: any[]): Promise<string[]> {
  try {
    const content = await callAI([
      {
        role: 'system',
        content: 'Generate 3-5 concise, actionable insights based on mood tracking data.',
      },
      {
        role: 'user',
        content: JSON.stringify(moodData),
      },
    ], 0.7, 400);

    if (!content) return [];

    return content.split('\n').filter((line: string) => line.trim().length > 0);
  } catch (error) {
    console.error('Error generating insights:', error);
    return [];
  }
}

