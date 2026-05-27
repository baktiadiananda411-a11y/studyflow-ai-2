// @ts-nocheck
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Mengambil kunci secara aman dari Environment Variables
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const promptSystem = `Kamu adalah AI Tutor universal yang cerdas untuk aplikasi StudyFlow. 
Jawablah pertanyaan user dengan jelas, santai, dan akurat dalam bahasa Indonesia. 
Jika jawaban mengandung rumus, WAJIB menggunakan format LaTeX dengan tanda $ atau $$.
Pertanyaan user: ${message}`;

    const result = await model.generateContent(promptSystem);
    const responseText = result.response.text();

    return NextResponse.json({ text: responseText });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal mengambil jawaban dari AI" }, { status: 500 });
  }
}