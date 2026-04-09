const PDFParser = require("pdf2json");

type ExtractedPdfResult = {
  text: string;
  pageCount: number;
};

export async function extractPdfTextFromBuffer(
  buffer: Buffer
): Promise<ExtractedPdfResult> {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataError", (errData: any) => {
      reject(errData?.parserError || new Error("Failed to parse PDF."));
    });

    pdfParser.on("pdfParser_dataReady", (pdfData: any) => {
      try {
        const pages = pdfData?.Pages || [];
        let text = "";

        for (const page of pages) {
          const textItems = page?.Texts || [];

          for (const textItem of textItems) {
            const runs = textItem?.R || [];

            for (const r of runs) {
              const rawText = r?.T ?? "";

              try {
                text += decodeURIComponent(rawText) + " ";
              } catch {
                try {
                  text += unescape(rawText) + " ";
                } catch {
                  text += String(rawText) + " ";
                }
              }
            }
          }

          text += "\n\n";
        }

        resolve({
          text: text.trim(),
          pageCount: pages.length,
        });
      } catch (error) {
        reject(error);
      }
    });

    pdfParser.parseBuffer(buffer);
  });
}