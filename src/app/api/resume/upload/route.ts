import { NextResponse } from "next/server";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { prisma } from "@/lib/prisma";
import { ensureDBUser } from "@/lib/ensureDbUser"; // Clerk → Prisma bridge

// Server-side Supabase client using SERVICE ROLE key
const supabaseServer: SupabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface SignedUrlData {
  signedUrl: string;
  expiresAt?: string;
}

export async function POST(req: Request) {
  try {
    // ✅ Ensure Clerk user exists in DB
    const user = await ensureDBUser();
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized. Session missing." },
        { status: 401 }
      );
    }

    const userId: string = user.id;

    // Parse uploaded file
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Unique file path
    const filePath = `resumes/${userId}-${Date.now()}.pdf`;

    // Upload using service role
    const { error: uploadError } = await supabaseServer.storage
      .from("resumes")
      .upload(filePath, file, {
        contentType: "application/pdf",
        upsert: false,
      });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    // Generate signed URL
    const { data: signedUrlData, error: signedUrlError } =
      await supabaseServer.storage
        .from("resumes")
        .createSignedUrl(filePath, 60 * 60);

    if (signedUrlError || !signedUrlData) {
      return NextResponse.json(
        { error: signedUrlError?.message || "Failed to generate signed URL" },
        { status: 500 }
      );
    }

    const signedData: SignedUrlData = signedUrlData;

    // Save resume record in Prisma
    await prisma.resume.create({
      data: {
        userId, // Clerk-linked user
        fileUrl: filePath,
      },
    });

    return NextResponse.json({ url: signedData.signedUrl });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
