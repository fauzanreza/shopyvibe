import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";

// Security: Only allow specific image and video MIME types
const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "video/mp4",
  "video/webm",
];

// Security: Max file size (e.g., 10MB)
const MAX_FILE_SIZE = 10 * 1024 * 1024; 

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Security: MIME Type Validation
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type. Only standard images and videos are allowed." }, { status: 400 });
    }

    // Security: File Size Validation
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File exceeds 10MB limit." }, { status: 400 });
    }

    // Security: Generate unique, unguessable file name (UUID/CUID equivalent)
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Hash the content or generate UUID to avoid collisions and path traversal
    const fileExt = file.name.split('.').pop()?.replace(/[^a-zA-Z0-9]/g, '') || "bin";
    const uniqueId = crypto.randomBytes(16).toString("hex");
    const safeFileName = `${uniqueId}.${fileExt}`;

    const uploadDir = path.join(process.cwd(), "public", "uploads", session.user.id);
    
    // Ensure directory exists
    await mkdir(uploadDir, { recursive: true });
    
    const filePath = path.join(uploadDir, safeFileName);
    
    // Write file
    await writeFile(filePath, buffer);

    // Return the public URL
    const fileUrl = `/uploads/${session.user.id}/${safeFileName}`;

    return NextResponse.json({ success: true, url: fileUrl });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to upload file due to server error." }, { status: 500 });
  }
}
