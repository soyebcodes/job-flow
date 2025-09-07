import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // unique path for every resume
    const filePath = `resumes/${session.user.email}-${Date.now()}.pdf`;

    const { error } = await supabase.storage
      .from("resumes")
      .upload(filePath, file, {
        contentType: "application/pdf",
        upsert: false,
      });

    if (error) throw error;

    const { data: publicUrlData } = supabase.storage
      .from("resumes")
      .getPublicUrl(filePath);

    // save and create to prisma
    await prisma.resume.create({
      data: {
        user: { connect: { email: session.user.email } },
        fileUrl: publicUrlData.publicUrl,
      },
    });

    return NextResponse.json({ url: publicUrlData.publicUrl });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
