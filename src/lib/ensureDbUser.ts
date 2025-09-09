// lib/ensureDBUser.ts
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "./prisma";

export async function ensureDBUser() {
  // Get the logged-in Clerk user
  const clerkUser = await currentUser();
  if (!clerkUser) return null;

  // Check if user already exists in Prisma
  let user = await prisma.user.findUnique({
    where: { clerkId: clerkUser.id },
  });

  // If not, create a new user in Prisma
  if (!user) {
    user = await prisma.user.create({
      data: {
        clerkId: clerkUser.id,
        email: clerkUser.emailAddresses[0]?.emailAddress ?? "", // fallback if missing
        name: clerkUser.firstName ?? clerkUser.fullName ?? "",
        image: clerkUser.imageUrl ?? "",
      },
    });
  }

  return user;
}
