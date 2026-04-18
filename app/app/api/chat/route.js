import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { message } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: `
You are Poro Chat, an AI assistant focused on Papua New Guinea.

You know about:
- PNG culture and tribes
- Travel destinations (Kokoda, Sepik River, Mount Wilhelm, etc.)
- Safety advice
- Local news and general knowledge

Always respond clearly, simply, and helpfully.
          `,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    return Response.json({
      reply: completion.choices[0].message.content,
    });

  } catch (error) {
    return Response.json({
      reply: "Error: AI failed to respond. Check your API key.",
    });
  }
}
