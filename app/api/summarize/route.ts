import { NextResponse } from "next/server";

export const runtime = "nodejs";

function extractJsonObject(text: string) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");

  if (start === -1 || end === -1 || end <= start) {
    return null;
  }

  return text.slice(start, end + 1);
}

function safeJsonParse(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    const extracted = extractJsonObject(text);
    if (!extracted) return null;

    try {
      return JSON.parse(extracted);
    } catch {
      return null;
    }
  }
}

export async function POST(request: Request) {
  try {
    const { text, metadata } = await request.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { success: false, error: "Missing extracted PDF text." },
        { status: 400 }
      );
    }

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "anything";
    const OPENAI_BASE_URL = process.env.OPENAI_BASE_URL;
    const OPENAI_MODEL = process.env.OPENAI_MODEL;

    if (!OPENAI_BASE_URL || !OPENAI_MODEL) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing model environment variables in .env.local",
        },
        { status: 500 }
      );
    }

    const prompt = `
You are analyzing a research paper.

Return ONLY valid JSON with this exact schema:
{
  "title": "string",
  "shortDescription": "string",
  "researchQuestion": "string",
  "keyContributions": ["string"],
  "coreArguments": ["string"],
  "counterarguments": ["string"],
  "method": "string",
  "findings": ["string"],
  "limitations": ["string"],
  "plainEnglishExplanation": "string"
  "longCritique": "string"
}

Rules:
- Output JSON only
- No markdown
- No explanation before or after
- keyContributions: 3 to 5 items
- coreArguments: 3 to 5 items
- counterarguments: 3 to 5 items
- findings: 3 to 5 items
- limitations: 2 to 4 items
- shortDescription should be 1 to 2 sentences
- plainEnglishExplanation should be clear for a smart non-expert
- longCritique should be thoughtful, specific, and academic in tone
- longCritique should be around 2 to 4 detailed paragraphs
- In the critique, evaluate the paper's reasoning, evidence, methodology, assumptions, limitations, and possible alternative interpretations
- longCritique should not just restate the paper
- It should critically evaluate whether the evidence truly supports the conclusions
- It should discuss possible flaws in design, sampling, generalizability, interpretation, or logic when relevant
- It should identify what the paper does well before discussing weaknesses
- It should sound like a thoughtful research reviewer, not a hostile critic
- Be fair and balanced
- Be faithful to the paper

Paper metadata:
${JSON.stringify(metadata, null, 2)}

Paper text:
${text.slice(0, 12000)}
`;

    const response = await fetch(
      `${OPENAI_BASE_URL.replace(/\/$/, "")}/chat/completions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: OPENAI_MODEL,
          temperature: 0.2,
          messages: [
            {
              role: "system",
              content:
                "You are a precise research paper analyst. Return only valid JSON.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("LLM API error:", errorText);

      return NextResponse.json(
        {
          success: false,
          error: "The summary model request failed.",
        },
        { status: 500 }
      );
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content ?? "";

    console.log("RAW MODEL OUTPUT:", content);

    const parsed = safeJsonParse(content);

    if (!parsed) {
      return NextResponse.json(
        {
          success: false,
          error: "The model returned an unreadable summary format.",
          rawOutput: content,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      summary: parsed,
    });
  } catch (error) {
    console.error("Summarization error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong while summarizing the paper.",
      },
      { status: 500 }
    );
  }
}