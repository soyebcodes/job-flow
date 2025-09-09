// app/api/jobs/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ensureDBUser } from "@/lib/ensureDbUser";

// Create a new job
export async function POST(req: Request) {
  // Ensure user exists in DB
  const user = await ensureDBUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { position, company, status, description } = body;

    const job = await prisma.job.create({
      data: {
        userId: user.id,
        position,
        company,
        status,
        description,
        createdAt: new Date(),
      },
    });

    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create job" },
      { status: 500 }
    );
  }
}

// Get all jobs for the logged-in user
export async function GET() {
  const user = await ensureDBUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const jobs = await prisma.job.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(jobs);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}
