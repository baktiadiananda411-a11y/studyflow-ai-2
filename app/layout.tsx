import type { Metadata } from "next";
import "./globals.css"; // <-- INI BARIS YANG SANGAT PENTING!
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "StudyFlow AI",
  description: "Platform edukasi berbasis AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="antialiased bg-slate-950 text-slate-50">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}