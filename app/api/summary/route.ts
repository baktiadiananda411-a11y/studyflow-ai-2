import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { text } = body;

    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    const prompt = `Tolong buatkan rangkuman yang terstruktur, rapi, dan menggunakan poin-poin (bullet points) dari teks materi berikut agar mudah dipelajari:\n\n${text}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summaryText = response.text();

    return NextResponse.json({ summary: summaryText });
    
  } catch (error) {
    console.error("Gemini Summary Error:", error);
    return NextResponse.json(
      { error: "Gagal merangkum teks. Coba lagi ya!" },
      { status: 500 }
    );
  }
}