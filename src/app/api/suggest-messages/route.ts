import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { NextResponse } from "next/server";

export async function POST() {


  try {
    const prompt = `Create a list of three open-ended, engaging questions formatted as a single string.
Each question should be separated by '||'.

These questions are for an anonymous social messaging platform like Qooh.me and should be suitable for a diverse audience.
Avoid personal or sensitive topics. Focus on universal themes that encourage friendly interaction.

Example format:
"What's a hobby you enjoy the most? || If you could travel anywhere in the world, where would you go? || What book or movie has had the biggest impact on your life and why?"`;

    const result = await generateText({
      model: google("gemini-2.5-flash"), // ✅ REAL, SUPPORTED MODEL
      prompt,
    });

    return NextResponse.json({
      suggestions: result.text,
    });

  } catch (error) {
    console.error(" Chat API Error:", error);

    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
