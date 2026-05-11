import OpenAI from "openai";

let openai: OpenAI | null = null;

export function getAIClient(): OpenAI | null {
  if (!process.env.OPENAI_API_KEY) return null;
  if (!openai) {
    openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return openai;
}

export async function generateCompletion(
  systemPrompt: string,
  userMessage: string,
): Promise<string | null> {
  const client = getAIClient();
  if (!client) return null;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.7,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage },
    ],
    max_tokens: 800,
  });

  return response.choices[0]?.message?.content || null;
}
