import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// IMPORT INI YANG PALING PENTING UNTUK MENYEMBUHKAN ERROR VERCEL
// Pastikan folder context-mu ada, atau sesuaikan namanya
import { AuthProvider } from "@/context/AuthContext"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StudyFlow AI",
  description: "AI-powered study assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
        {/* BUNGKUS APLIKASIMU DENGAN AUTHPROVIDER DI SINI */}
        <AuthProvider>
          {children}
        </AuthProvider>
        
      </body>
    </html>
  );
}