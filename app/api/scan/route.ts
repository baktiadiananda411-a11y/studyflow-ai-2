import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { imageBase64, mimeType } = body;
    const apiKey = process.env.GEMINI_API_KEY || "";

    if (!imageBase64) {
      return NextResponse.json({ error: "Tidak ada gambar yang dikirim" }, { status: 400 });
    }

    // 1. KITA TANYA LANGSUNG KE GOOGLE MODEL APA YANG TERSEDIA
    const checkModels = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const modelsData = await checkModels.json();
    
    const availableModels = modelsData.models || [];
    const supportedModelNames = availableModels.map((m: any) => m.name);
    
    // Ini akan nge-print daftar modelmu di Terminal VS Code biar kita tahu
    console.log("🔍 DAFTAR MODEL DARI GOOGLE:", supportedModelNames);

    // 2. OTOMATIS PILIH MODEL YANG ADA DI DAFTAR (Prioritas dari yang terbaru)
    let selectedModelName = "";
    if (supportedModelNames.includes("models/gemini-1.5-flash")) {
        selectedModelName = "gemini-1.5-flash";
    } else if (supportedModelNames.includes("models/gemini-1.5-pro")) {
        selectedModelName = "gemini-1.5-pro";
    } else if (supportedModelNames.includes("models/gemini-pro-vision")) {
        selectedModelName = "gemini-pro-vision";
    } else {
        // Kalau nama standarnya ga ada, kita paksa ambil model Gemini pertama yang dukung fitur baca
        const fallback = availableModels.find((m: any) => 
            m.name.includes("gemini") && 
            m.supportedGenerationMethods?.includes("generateContent")
        );
        if (fallback) {
            selectedModelName = fallback.name.replace("models/", "");
        } else {
            throw new Error("API Key ini tidak memiliki akses ke model AI Gemini manapun.");
        }
    }

    console.log("🚀 MENGGUNAKAN MODEL:", selectedModelName);

    // 3. PROSES GAMBAR DENGAN MODEL YANG SUDAH DITEMUKAN
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: selectedModelName });

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
    return NextResponse.json({ error: "Gagal memproses gambar. Cek terminal VS Code." }, { status: 500 });
  }
}