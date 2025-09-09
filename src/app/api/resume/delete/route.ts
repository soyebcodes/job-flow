import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@supabase/supabase-js";
import { ensureDBUser } from "@/lib/ensureDbUser"; // Clerk → Prisma bridge

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface DeleteRequestBody {
  resumeId: string;
}

export async function POST(req: Request) {
  // ✅ Ensure Clerk user exists in DB
  const user = await ensureDBUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body: DeleteRequestBody = await req.json();

    const resume = await prisma.resume.findUnique({
      where: { id: body.resumeId },
    });

    if (!resume) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    // ✅ Ensure the resume belongs to the logged-in user
    if (resume.userId !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Delete from Supabase storage
    const { error: supabaseError } = await supabase.storage
      .from("resumes")
      .remove([resume.fileUrl]);

    if (supabaseError) {
      throw supabaseError;
    }

    // Delete from Prisma
    await prisma.resume.delete({ where: { id: resume.id } });

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
