import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // adjust path as needed
import { currentUser } from "@clerk/nextjs/server";

// POST /api/jobs
export async function POST(req: Request) {
  const user = await currentUser();

  if (!user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { position, status, company, description } = body;

  try {
    // Optional: check if user exists in your DB
    let dbUser = await prisma.user.findUnique({ where: { clerkId: user.id } });
    if (!dbUser) {
      // create the user in your DB if it doesn't exist
      dbUser = await prisma.user.create({
        data: {
          clerkId: user.id,
          email: user.email || "",
          name: user.firstName || "",
        },
      });
    }

    const job = await prisma.job.create({
      data: {
        position,
        company,
        status,
        description,
        userId: dbUser.id,
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

// GET /api/jobs
export async function GET() {
  const user = await currentUser();

  if (!user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const dbUser = await prisma.user.findUnique({
    where: { clerkId: user.id },
    include: { jobs: true },
  });

  if (!dbUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(dbUser.jobs);
}
