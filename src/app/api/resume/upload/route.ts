import { NextResponse } from "next/server";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface SignedUrlData {
  signedUrl: string;
  expiresAt?: string;
}

// Server-side Supabase client using SERVICE ROLE key
const supabaseServer: SupabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    // Get NextAuth session
    const session = await getServerSession(authOptions);

    if (!session?.user?.id || !session.user.email) {
      return NextResponse.json(
        { error: "Unauthorized. Session missing." },
        { status: 401 }
      );
    }

    // Get uploaded file
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Unique file path -> every user
    const filePath = `resumes/${session.user.id}-${Date.now()}.pdf`;

    // Upload file using service role key
    const { error: uploadError } = await supabaseServer.storage
      .from("resumes")
      .upload(filePath, file, {
        contentType: "application/pdf",
        upsert: false,
      });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    // Generate signed URL (valid 1 hour)
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

    // Save resume metadata in Prisma
    await prisma.resume.create({
      data: {
        user: { connect: { id: session.user.id } },
        fileUrl: filePath, // store path, signed URL used for access
      },
    });

    return NextResponse.json({ url: signedData.signedUrl });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
