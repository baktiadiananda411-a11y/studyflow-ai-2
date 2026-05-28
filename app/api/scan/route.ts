import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { imageBase64, mimeType } = body;

    if (!imageBase64) {
      return NextResponse.json({ error: "Tidak ada gambar yang dikirim" }, { status: 400 });
    }

    // PERBAIKAN: Menggunakan nama model "-latest" agar tidak 404 Not Found
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    const prompt = "Kamu adalah guru cerdas. Tolong baca teks atau soal yang ada di gambar ini, lalu berikan jawaban dan penjelasan langkah demi langkahnya secara detail dan rapi.";

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: imageBase64,
          mimeType: mimeType || "image/jpeg",
        },
      },
    ]);

    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error) {
    console.error("Error Scanner AI:", error);
    return NextResponse.json({ error: "Gagal memproses gambar. Pastikan API Key valid." }, { status: 500 });
  }
}