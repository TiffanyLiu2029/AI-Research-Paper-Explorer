"use client";

import { PaperSummary } from "@/lib/types";

type Props = {
  summary: PaperSummary;
  filename?: string;
  pageCount?: number | null;
};

function ListCard({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_8px_32px_rgba(15,23,42,0.06)]">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
        {items.map((item, index) => (
          <li key={index} className="flex gap-3">
            <span className="mt-1 text-slate-400">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TextCard({
  title,
  text,
  large = false,
}: {
  title: string;
  text: string;
  large?: boolean;
}) {
  return (
    <div
      className={`rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_8px_32px_rgba(15,23,42,0.06)] ${
        large ? "min-h-[220px]" : ""
      }`}
    >
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-slate-700">{text}</p>
    </div>
  );
}

export default function SummaryDashboard({
  summary,
  filename,
  pageCount,
}: Props) {
  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_12px_50px_rgba(15,23,42,0.08)]">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
              Paper Summary Dashboard
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              {summary.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              {summary.shortDescription}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-600">
            <p>
              <span className="font-semibold text-slate-900">File:</span>{" "}
              {filename || "Uploaded PDF"}
            </p>
            <p className="mt-1">
              <span className="font-semibold text-slate-900">Pages:</span>{" "}
              {pageCount ?? "N/A"}
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <TextCard
          title="Research Question"
          text={summary.researchQuestion}
          large
        />
        <TextCard
          title="Plain-English Explanation"
          text={summary.plainEnglishExplanation}
          large
        />
        <TextCard
          title="Long Critique"
          text={summary.longCritique}
          large
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
        <ListCard title="Key Contributions" items={summary.keyContributions} />
        <TextCard title="Method" text={summary.method} />
        <ListCard title="Findings" items={summary.findings} />
        <ListCard title="Limitations" items={summary.limitations} />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <ListCard title="Core Arguments" items={summary.coreArguments} />
        <ListCard
          title="Effective Counterarguments"
          items={summary.counterarguments}
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6">
          <h3 className="text-lg font-semibold text-slate-900">
            Concept Graph
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Placeholder panel for future LLM-generated concept extraction and
            relationship graph visualization.
          </p>
        </div>

        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6">
          <h3 className="text-lg font-semibold text-slate-900">Paper Chat</h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Placeholder panel for future question answering and conversational
            interaction with the uploaded paper.
          </p>
        </div>
      </section>
    </div>
  );
}