import { NextResponse } from "next/server";
import { generateMockMaterial, type AIMaterialInput } from "@/lib/ai";

export async function POST(request: Request) {
  const input = (await request.json()) as AIMaterialInput;

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({
      provider: "mock",
      data: generateMockMaterial(input)
    });
  }

  return NextResponse.json({
    provider: "mock",
    data: generateMockMaterial(input),
    nextStep:
      "OPENAI_API_KEY terdeteksi. Ganti blok ini dengan pemanggilan OpenAI API sesuai format output AIMaterialOutput."
  });
}
