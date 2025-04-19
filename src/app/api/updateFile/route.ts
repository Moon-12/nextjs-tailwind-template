import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

type RequestBody = {
  content: string;
};

export async function POST(request: Request) {
  try {
    const filePath = process.env.FILE_PATH;
    if (!filePath) {
      return NextResponse.json(
        { message: "File path not configured" },
        { status: 500 }
      );
    }

    const body: RequestBody = await request.json();
    const { content } = body;

    if (typeof content !== "string") {
      return NextResponse.json({ message: "Invalid content" }, { status: 400 });
    }

    // Resolve the file path
    const resolvedPath = path.resolve(filePath);
    await fs.appendFile(resolvedPath, content + "\n", "utf8");
    return NextResponse.json({ message: "File updated successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating file" },
      { status: 500 }
    );
  }
}
