"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Status = "idle" | "extracting" | "summarizing" | "success" | "error";

export default function UploadPanel() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  function handleFile(file: File | null) {
    if (!file) return;

    if (file.type !== "application/pdf") {
      setStatus("error");
      setMessage("Only PDF files are supported.");
      return;
    }

    setSelectedFile(file);
    setStatus("idle");
    setMessage("");
  }

  async function handleUpload() {
    if (!selectedFile) {
      setStatus("error");
      setMessage("Please select a PDF first.");
      return;
    }

    try {
      // =====================
      // STEP 1: EXTRACT TEXT
      // =====================
      setStatus("extracting");
      setMessage("Extracting text...");

      const formData = new FormData();
      formData.append("file", selectedFile);

      const extractRes = await fetch("/api/extract", {
        method: "POST",
        body: formData,
      });

      const extractData = await extractRes.json();
      console.log("extractData:", extractData);

      if (!extractRes.ok || !extractData.success) {
        throw new Error(extractData.error || "Extraction failed.");
      }

      // =====================
      // STEP 2: SUMMARIZE
      // =====================
      setStatus("summarizing");
      setMessage("Summarizing paper...");

      const summarizeRes = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: extractData.text,
          metadata: extractData.metadata,
        }),
      });

      console.log("summarize status:", summarizeRes.status);

      const summaryData = await summarizeRes.json();
      console.log("summaryData:", summaryData);

      if (!summarizeRes.ok || !summaryData.success) {
        throw new Error(summaryData.error || "Summarization failed.");
      }

      // =====================
      // STEP 3: STORE + REDIRECT
      // =====================
      sessionStorage.setItem(
        "paperscope:lastResult",
        JSON.stringify({
          metadata: extractData.metadata,
          summary: summaryData.summary,
        })
      );

      setStatus("success");
      setMessage("Success! Redirecting...");

      router.push("/summary");
    } catch (err: any) {
      console.error("UPLOAD ERROR:", err);
      setStatus("error");
      setMessage(err.message || "Something went wrong.");
    }
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow">
      <h2 className="text-2xl font-semibold mb-4">
        Upload a research paper
      </h2>

      <p className="text-sm text-slate-600 mb-6">
        Upload a PDF to extract and summarize.
      </p>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="bg-black text-white px-5 py-2 rounded-xl"
        >
          Choose PDF
        </button>

        <button
          onClick={handleUpload}
          className="border px-5 py-2 rounded-xl"
        >
          Extract and Summarize
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0] || null)}
      />

      {selectedFile && (
        <div className="mb-4 text-sm">
          Selected file: {selectedFile.name}
        </div>
      )}

      {message && (
        <div
          className={`mt-4 p-3 rounded-xl text-sm ${
            status === "error"
              ? "bg-red-100 text-red-700"
              : status === "success"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}