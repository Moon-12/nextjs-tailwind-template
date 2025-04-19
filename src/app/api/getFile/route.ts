import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const filePath = process.env.FILE_PATH;
    if (!filePath) {
      return NextResponse.json(
        { message: "File path not configured" },
        { status: 500 }
      );
    }
    // Resolve the file path
    const resolvedPath = path.resolve(filePath);
    const content = await fs.readFile(resolvedPath, "utf-8");
    return NextResponse.json({ content });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to read file" }, { status: 500 });
  }
}
