// @ts-nocheck
import { GoogleGenAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Memasukkan API Key langsung ke kodingan (Hati-hati saat push ke GitHub!)
const apiKey = "AIzaSyBxKQczqZGPTMrqcQEsQxI_HxNaV0bm-p0";
const genAI = new GoogleGenAI({ apiKey });

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Instruksi sistem agar AI menjawab seperti guru universal dan memakai format LaTeX untuk rumus
    const promptSystem = `Kamu adalah AI Tutor universal yang cerdas untuk aplikasi StudyFlow. 
Jawablah pertanyaan user dengan jelas, santai, dan akurat dalam bahasa Indonesia. 
Jika jawaban mengandung rumus matematika, fisika, kalkulus, atau angka kompleks, kamu WAJIB menggunakan format LaTeX dengan tanda tunggal $ untuk rumus inline atau tanda ganda $$ di baris baru untuk rumus blok.
Pertanyaan user: ${message}`;

    const result = await model.generateContent(promptSystem);
    const responseText = result.response.text();

    return NextResponse.json({ text: responseText });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal mengambil jawaban dari AI" }, { status: 500 });
  }
}