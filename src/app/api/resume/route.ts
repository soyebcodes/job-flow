import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@supabase/supabase-js";
import { ensureDBUser } from "@/lib/ensureDbUser"; // 🔑 Clerk → Prisma bridge

const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface Resume {
  id: string;
  createdAt: Date;
  fileUrl: string;
}

export async function GET() {
  try {
    // Ensure Clerk user exists in DB
    const user = await ensureDBUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch resumes for this user
    const resumes = await prisma.resume.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    // Sign each file URL with Supabase
    const signedResumes = await Promise.all(
      resumes.map(async (resume: Resume) => {
        const { data } = await supabaseServer.storage
          .from("resumes")
          .createSignedUrl(resume.fileUrl, 60 * 60); // 1h expiration

        return {
          id: resume.id,
          createdAt: resume.createdAt,
          url: data?.signedUrl || "",
        };
      })
    );

    return NextResponse.json({ resumes: signedResumes });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
