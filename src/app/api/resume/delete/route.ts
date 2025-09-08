import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface DeleteRequestBody {
  resumeId: string;
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body: DeleteRequestBody = await req.json();

    const resume = await prisma.resume.findUnique({
      where: { id: body.resumeId },
    });
    if (!resume)
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });

    // Delete from supabase storage
    const { error: supabaseError } = await supabase.storage
      .from("resumes")
      .remove([resume.fileUrl]);
    if (supabaseError) throw supabaseError;

    // Delete from database
    await prisma.resume.delete({ where: { id: resume.id } });

    return NextResponse.json({ success: true });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
