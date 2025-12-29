import { generateText } from "ai"
import { google } from "@ai-sdk/google"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const prompt = `
You are generating content for an anonymous messaging platform.

CONTEXT:
The recent messages show a soft, thoughtful tone — quiet care, curiosity, emotional warmth, and reflective moments without pressure or urgency.

TASK:
Generate exactly 3 open-ended, friendly questions that feel natural, calm, and emotionally considerate.

RULES:
- Do NOT include any explanation or extra text
- Do NOT number the questions
- Do NOT use quotes
- Do NOT mention anonymity
- Avoid personal, political, medical, or sensitive topics
- Questions must be suitable for all ages and cultures
- Keep the tone gentle, reassuring, and positive
- Encourage reflection, comfort, or light curiosity without demanding deep disclosure

FORMAT:
Return a SINGLE LINE string.
Separate each question using exactly: ||

EXAMPLE FORMAT (do not repeat this text):
What’s something that’s been quietly bringing you comfort lately? || What kind of moment helps you feel most at ease during the day? || Is there a simple thought that’s been staying with you recently?

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
