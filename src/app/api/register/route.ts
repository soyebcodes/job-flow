import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { email, name, password } = await req.json();

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) return new Response("User already exists", { status: 400 });

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: { email, name, password: hashedPassword },
  });

  return new Response("User created", { status: 201 });
}
