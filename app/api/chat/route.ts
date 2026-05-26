import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Mengambil kunci dari brankas .env.local
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message } = body;

    // Memilih model AI yang cepat
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
    // Instruksi untuk AI
    const prompt = `Kamu adalah StudyFlow AI, asisten belajar yang ramah. Jawablah pertanyaan ini dengan jelas: ${message}`;

    // Meminta jawaban
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });
    
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: "Aduh, otak AI-nya lagi pusing. Coba tanya lagi ya!" },
      { status: 500 }
    );
  }
}