import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { images, prompt } = body; // Sekarang menerima 'images' (banyak gambar)

    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    // Memproses semua gambar yang masuk
    const imageParts = images.map((img: string) => {
      const base64Data = img.split(',')[1];
      const mimeType = img.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)![0];
      return {
        inlineData: {
          data: base64Data,
          mimeType: mimeType
        }
      };
    });

    const textPrompt = prompt || "Tolong analisis semua gambar ini. Jika ini adalah urutan soal atau materi, berikan penjelasan secara detail dan menyeluruh.";

    // Kirim prompt beserta tumpukan gambar ke AI
    const result = await model.generateContent([textPrompt, ...imageParts]);
    const response = await result.response;
    const answerText = response.text();

    return NextResponse.json({ answer: answerText });
    
  } catch (error) {
    console.error("Vision API Error:", error);
    return NextResponse.json(
      { error: "Gagal memproses tumpukan gambar. Pastikan ukuran file tidak terlalu besar." },
      { status: 500 }
    );
  }
}