"use client";

import { useEffect, useState } from "react";
import SummaryDashboard from "@/components/SummaryDashboard";
import { PaperSummary } from "@/lib/types";
import Link from "next/link";

type StoredResult = {
  metadata: {
    filename: string;
    pageCount: number | null;
    size: number;
  };
  summary: PaperSummary;
};

export default function SummaryPage() {
  const [data, setData] = useState<StoredResult | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("paperscope:lastResult");
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw) as StoredResult;
      setData(parsed);
    } catch {
      setData(null);
    }
  }, []);

  if (!data) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-[0_12px_50px_rgba(15,23,42,0.08)]">
          <h1 className="text-3xl font-semibold text-slate-950">
            No summary yet
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Upload a research paper first. Once PaperScope AI processes it, your
            structured summary dashboard will appear here.
          </p>

          <Link
            href="/upload"
            className="mt-8 inline-flex rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            Go to Upload
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
      <SummaryDashboard
        summary={data.summary}
        filename={data.metadata.filename}
        pageCount={data.metadata.pageCount}
      />
    </div>
  );
}