"use server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required and must be string" },
        { status: 400 },
      );
    }

    // Check if API key exists
    if (!process.env.OPENROUTER_API_KEY) {
      console.error("OPENROUTER_API_KEY is not set in environment variables");
      return NextResponse.json(
        { error: "API configuration error" },
        { status: 500 },
      );
    }

    const url = "https://openrouter.ai/api/v1/chat/completions";
    const headers = {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    };
    const payload = {
      model: "deepseek/deepseek-r1-0528:free",
      messages: [
        {
          role: "system",
          content:
            "You are a professional writing assistant. Rewrite the user's message to be more professional, clear and well structured. IMPORTANT: Return ONLY the rewritten text with no additional commentary and explanations. Do not include phrases like 'Here is the rewritten message...' or any other preamble",
        },
        {
          role: "user",
          content: message,
        },
      ],
    };

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`OpenRouter API error: ${response.status} - ${errorText}`);
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();
    const rewrittenMessage = data.choices?.[0]?.message?.content || message;

    return NextResponse.json({
      rewrittenMessage: rewrittenMessage.trim(),
    });
  } catch (err) {
    console.error("Error rewriting message", err);
    return NextResponse.json(
      { error: "Failed to rewrite message" },
      { status: 500 },
    );
  }
}
