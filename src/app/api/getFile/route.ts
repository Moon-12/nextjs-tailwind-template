import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "data", "textfile.txt");
    const content = await fs.readFile(filePath, "utf8");
    return NextResponse.json({ content });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to read file" }, { status: 500 });
  }
}
