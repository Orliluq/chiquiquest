import { InferenceClient } from "@huggingface/inference";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();
    const token = process.env.HF_TOKEN;

    if (!token) {
      return NextResponse.json(
        { error: "HF_TOKEN is missing" },
        { status: 500 }
      );
    }

    const client = new InferenceClient(token);

    const completion = await client.chatCompletion({
      model: "meta-llama/Llama-3.1-8B-Instruct",
      messages: [
        {
          role: "system",
          content: "You are a technical documentation expert. Provide concise overviews with best practices and documentation links."
        },
        {
          role: "user",
          content: `Provide a concise overview and best practices or latest documentation links for the following tech/topic: ${query}. Please provide 2-3 links and a short paragraph summarizing it. Keep it strictly tech-focused.`
        }
      ],
      max_tokens: 500,
      temperature: 0.7
    });

    const result = completion?.choices?.[0]?.message?.content || "";
    return NextResponse.json({ result });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
