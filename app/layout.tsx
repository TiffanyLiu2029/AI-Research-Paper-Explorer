import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "PaperScope AI",
  description: "Summarize research papers and explore their arguments visually.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}