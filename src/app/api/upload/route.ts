import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        // Generate unique filename
        const timestamp = Date.now();
        const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
        const fileName = `portfolio/${timestamp}-${safeName}`;

        // Upload to Vercel Blob
        const blob = await put(fileName, file, {
            access: "public",
        });

        return NextResponse.json({
            success: true,
            url: blob.url,
            path: fileName,
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error("Upload error:", errorMessage);
        return NextResponse.json(
            { error: "Failed to upload image", details: errorMessage },
            { status: 500 }
        );
    }
}
