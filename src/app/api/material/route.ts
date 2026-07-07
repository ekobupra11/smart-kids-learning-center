import { NextResponse } from "next/server";
import { generateMockMaterial, type MaterialGeneratorInput } from "@/lib/material-generator";

export async function POST(request: Request) {
  const input = (await request.json()) as MaterialGeneratorInput;

  return NextResponse.json({
    provider: "mock",
    data: generateMockMaterial(input)
  });
}
