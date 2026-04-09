import Link from "next/link";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
      <section className="rounded-[2rem] border border-slate-200 bg-white px-8 py-12 shadow-[0_14px_60px_rgba(15,23,42,0.08)] sm:px-12 sm:py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
            Academic AI Workspace
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
            Understand papers faster with PaperScope AI
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Upload a research paper PDF and generate a structured summary with
            key contributions, methods, findings, limitations, main arguments,
            and strong counterarguments.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/upload"
              className="rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
            >
              Upload a Paper
            </Link>
            <Link
              href="/summary"
              className="rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
            >
              View Summary Layout
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">
            Structured Summaries
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Extract research questions, contributions, methods, findings,
            limitations, and a plain-English explanation.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">
            Argument Analysis
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Identify core claims in the paper and generate effective,
            evidence-based counterarguments.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">
            Visual Concept Graph
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Placeholder space for future concept extraction and relationship
            mapping across the paper.
          </p>
        </div>
      </section>
    </div>
  );
}