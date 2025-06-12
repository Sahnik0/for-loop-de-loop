import { streamText } from "ai"
import { createGroq } from "@ai-sdk/groq"

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json()

    const systemPrompt = `You are an AI assistant for "for loop de loop", a fullstack web and mobile app development company. 

Company Information:
- Company name: for loop de loop
- Services: Fullstack Web Development, Mobile App Development, AI & Machine Learning, AI Integration & Automation
- Team members: Sahnik Biswas, Sankalpa Srakar, Shovon Halder, Shreyas Saha
- Technologies: React, Next.js, Node.js, React Native, TypeScript, Python, AI/ML technologies, and modern web technologies
- Email: for.loop.de.loop@gmail.com

You should:
- Be helpful and professional
- Answer questions about the company's services, team, and capabilities
- Provide information about web development, mobile development, and AI/ML services
- Be concise but informative
- If asked about pricing or specific project details, suggest contacting the team directly

Keep responses conversational and helpful.`

    const result = await streamText({
      model: groq("llama-3.1-70b-versatile"),
      system: systemPrompt,
      messages: [
        ...history.map((msg: any) => ({
          role: msg.role,
          content: msg.content,
        })),
        {
          role: "user",
          content: message,
        },
      ],
      maxTokens: 500,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Chat API error:", error)

    // Return a proper JSON error response
    return new Response(
      JSON.stringify({
        error: "Failed to process chat request",
        message: "Sorry, I'm having trouble right now. Please try again later.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
  }
}
