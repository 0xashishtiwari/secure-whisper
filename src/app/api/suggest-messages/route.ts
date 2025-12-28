import { generateText } from "ai"
import { google } from "@ai-sdk/google"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const prompt = `
You are generating content for an anonymous messaging platform.

TASK:
Generate exactly 3 open-ended, friendly questions.

RULES:
- Do NOT include any explanation or extra text
- Do NOT number the questions
- Do NOT use quotes
- Do NOT mention anonymity
- Avoid personal, political, medical, or sensitive topics
- Questions must be suitable for all ages and cultures
- Encourage thoughtful, positive interaction

FORMAT:
Return a SINGLE LINE string.
Separate each question using exactly: ||

EXAMPLE FORMAT (do not repeat this text):
What's a hobby you enjoy the most? || If you could travel anywhere in the world, where would you go? || What small thing makes your day better?
`

    const result = await generateText({
      model: google("gemini-2.5-flash"),
      prompt,
    })

    // 🔹 Parse and clean suggestions
    const suggestions = result.text
      .split("||")
      .map((s) => s.trim())
      .filter(Boolean)

    return NextResponse.json({
      success: true,
      message: "Suggestions generated successfully",
      data: {
        suggestions,
      },
    })
  } catch (error) {
    console.error("AI Suggest API Error:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Failed to generate message suggestions",
      },
      { status: 500 }
    )
  }
}
