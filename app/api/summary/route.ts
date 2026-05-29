// File: app/api/summary/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { text } = body;
    const apiKey = process.env.GEMINI_API_KEY || "";

    if (!text) {
      return NextResponse.json({ error: "Tidak ada teks yang dikirim" }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    // Menggunakan model 2.5-flash yang sudah terbukti jalan di akunmu
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); 

    // Prompt khusus (perintah) agar AI merangkum dengan rapi
    const prompt = `Tolong buatkan rangkuman yang padat, jelas, informatif, dan menggunakan format bullet points dari teks berikut ini. Buang kalimat yang bertele-tele dan ambil inti utamanya saja:\n\n${text}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text();

    return NextResponse.json({ summary });
  } catch (error) {
    console.error("Error Summarizer AI:", error);
    return NextResponse.json({ error: "Gagal memproses rangkuman." }, { status: 500 });
  }
}