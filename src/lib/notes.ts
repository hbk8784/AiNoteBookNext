interface OpenRouterResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export async function generateNoteSummary(content: string): Promise<OpenRouterResponse> {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer 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`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://ai-note-book-next.vercel.app/",
        "X-Title": "AI Notes" 
      },
      body: JSON.stringify({
        "model": "deepseek/deepseek-chat-v3-0324:free",
        "messages": [
          {
            "role": "user",
            "content": `Summarize the following content concisely in about 60 words:\n\n${content}`
          }
        ],
        // "temperature": 0.7
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API Error: ${errorData.error?.message || response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error generating summary:', error);
    throw new Error(`Failed to generate summary: ${error}`);
  }
}