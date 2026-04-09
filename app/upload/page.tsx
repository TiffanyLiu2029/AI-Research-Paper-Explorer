import UploadPanel from "@/components/UploadPanel";

export default function UploadPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
          Upload Workspace
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">
          Upload a paper and generate a structured research summary
        </h1>
        <p className="mt-4 text-base leading-7 text-slate-600">
          This flow extracts text from a PDF research paper, sends it to an
          OpenAI-compatible model, and renders the results in a clean summary
          dashboard.
        </p>
      </div>

      <UploadPanel />
    </div>
  );
}