import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createClient } from "@supabase/supabase-js";
import { PdfReader } from "pdfreader";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { resumeId, jobId } = await req.json();
    if (!resumeId || !jobId) {
      return NextResponse.json(
        { error: "Missing resume or job ID" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const resume = await prisma.resume.findUnique({ where: { id: resumeId } });
    const job = await prisma.job.findUnique({ where: { id: jobId } });

    if (!resume || !job) {
      return NextResponse.json(
        { error: "Resume or Job not found" },
        { status: 404 }
      );
    }

    const { data: fileData, error: downloadError } = await supabase.storage
      .from("resumes")
      .download(resume.fileUrl);

    if (downloadError || !fileData) {
      return NextResponse.json(
        { error: "Failed to download resume" },
        { status: 500 }
      );
    }

    const arrayBuffer = await fileData.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const resumeTextChunks: string[] = [];

    const parsedText = await new Promise<string>((resolve, reject) => {
      new PdfReader().parseBuffer(buffer, (err, item) => {
        if (err) return reject(err);
        if (!item) return resolve(resumeTextChunks.join(" "));
        if (item.text) resumeTextChunks.push(item.text);
      });
    });

    const prompt = encodeURIComponent(`
Compare the following resume and job description. Give a match score (0–100), list key missing skills, and suggest improvements.

Resume:
${parsedText}

Job Description:
${job.description}
`);

    const response = await fetch(
      `https://text.pollinations.ai/prompt/${prompt}`
    );
    const matchFeedback = await response.text();

    return NextResponse.json({ matchFeedback });
  } catch (err) {
    console.error("Match error:", err);
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
