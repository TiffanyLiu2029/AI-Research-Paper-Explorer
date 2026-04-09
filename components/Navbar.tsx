import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-sm font-semibold text-white shadow-sm">
            PS
          </div>
          <div>
            <p className="text-sm font-medium tracking-wide text-slate-500">
              PaperScope AI
            </p>
            <p className="text-base font-semibold text-slate-900">
              Research Paper Intelligence
            </p>
          </div>
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link href="/" className="transition hover:text-slate-900">
            Home
          </Link>
          <Link href="/upload" className="transition hover:text-slate-900">
            Upload
          </Link>
          <Link href="/summary" className="transition hover:text-slate-900">
            Summary
          </Link>
        </nav>
      </div>
    </header>
  );
}