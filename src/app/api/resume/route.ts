import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createClient } from "@supabase/supabase-js";

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
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const resumes = await prisma.resume.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });

    const signedResumes = await Promise.all(
      resumes.map(async (resume: Resume) => {
        const { data } = await supabaseServer.storage
          .from("resumes")
          .createSignedUrl(resume.fileUrl, 60 * 60);
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
