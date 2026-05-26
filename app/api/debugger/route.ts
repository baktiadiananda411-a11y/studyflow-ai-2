import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message } = body;

    // Kita pakai model yang sama
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    // Ini kunci rahasianya: Memberi instruksi khusus ke AI
    const systemPrompt = `Kamu adalah Senior IT Developer & Linux System Administrator. 
    Tugasmu membantu memecahkan masalah kodingan, jaringan, error terminal, dan konfigurasi server.
    Jawab dengan gaya bahasa yang to-the-point, teknis, dan langsung berikan solusi atau command line yang dibutuhkan. 
    Format balasanmu gunakan markdown untuk blok kode.
    Pertanyaan user: ${message}`;

    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    const replyText = response.text();

    return NextResponse.json({ reply: replyText });
    
  } catch (error) {
    console.error("Debugger API Error:", error);
    return NextResponse.json(
      { error: "Fatal Error: Connection to AI Core lost. Please check server logs." },
      { status: 500 }
    );
  }
}