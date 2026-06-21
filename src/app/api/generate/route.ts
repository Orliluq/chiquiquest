import { NextRequest, NextResponse } from "next/server";
import { InferenceClient } from "@huggingface/inference";
import { ChiquiQuestSchema } from "@/lib/chiquiquest-schema";
import { normalizeDashData } from "@/lib/normalize-chiquiquest";

export async function POST(req: NextRequest) {
  try {
    const { profile, goal } = await req.json();

    const token = process.env.HF_TOKEN;

    if (!token) {
      return NextResponse.json(
        { error: "HF_TOKEN is missing" },
        { status: 500 }
      );
    }

    const client = new InferenceClient(token);

    console.log("🎮 ChiquiQuest AI running...");
    console.log("Profile:", profile);
    console.log("Goal:", goal);

    const prompt = `
You are ChiquiQuest AI.

Profile:
${profile}

Goal:
${goal}

Return ONLY valid JSON with:
hero, skillTree, quests, gapAnalysis, xpSystem, achievements, roadmap
`;

    const completion = await client.chatCompletion({
      model: "meta-llama/Llama-3.1-8B-Instruct",

      messages: [
        {
          role: "system",
          content:
            "You are ChiquiQuest AI. Return STRICT JSON only. No markdown."
        },
        {
          role: "user",
          content: prompt
        }
      ],

      max_tokens: 1500,
      temperature: 0.7
    });

    const raw =
      completion?.choices?.[0]?.message?.content ?? "{}";

    console.log("MODEL RAW RESPONSE:", raw);

    const clean = raw
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsed;

    try {
      parsed = JSON.parse(clean);
    } catch (err) {
      return NextResponse.json(
        {
          error: "Invalid JSON returned by model",
          raw: clean
        },
        { status: 500 }
      );
    }

    // Normalize the data to handle varying model responses
    const normalized = normalizeDashData(parsed);

    const validation = ChiquiQuestSchema.safeParse(normalized);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Schema validation failed",
          details: validation.error.flatten()
        },
        { status: 500 }
      );
    }

    return NextResponse.json(validation.data);

  } catch (error: any) {
    console.error("API ERROR:", error);

    return NextResponse.json(
      {
        error: error?.message ?? "Unknown error"
      },
      { status: 500 }
    );
  }
}