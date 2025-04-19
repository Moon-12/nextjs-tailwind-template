import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

type RequestBody = {
  content: string;
};

export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json();
    const { content } = body;

    if (typeof content !== "string") {
      return NextResponse.json({ message: "Invalid content" }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), "data", "textfile.txt");
    await fs.appendFile(filePath, content + "\n", "utf8");
    return NextResponse.json({ message: "File updated successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error updating file", error: error.message },
      { status: 500 }
    );
  }
}
