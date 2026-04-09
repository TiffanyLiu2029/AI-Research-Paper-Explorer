import { NextResponse } from "next/server";
import { extractPdfTextFromBuffer } from "@/lib/pdf";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { success: false, error: "No PDF file uploaded." },
        { status: 400 }
      );
    }

    // ❌ Not a PDF
    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { success: false, error: "Only PDF files are supported." },
        { status: 400 }
      );
    }

    // Convert to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Extract text
    const result = await extractPdfTextFromBuffer(buffer);

    const text = result.text;
    const pageCount = result.pageCount;

    // ❌ No usable text
    if (!text || text.length < 20) {
      return NextResponse.json(
        {
          success: false,
          error: "Could not extract enough text from this PDF.",
        },
        { status: 422 }
      );
    }

    // ✅ SUCCESS
    return NextResponse.json({
      success: true,
      text,
      metadata: {
        filename: file.name,
        pageCount,
        size: file.size,
      },
    });
  } catch (error) {
    console.error("PDF extraction error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong while extracting the PDF.",
      },
      { status: 500 }
    );
  }
}