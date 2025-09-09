import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "./prisma";

export async function ensureDBUser() {
  // Get the logged-in Clerk user
  const clerkUser = await currentUser();
  if (!clerkUser) return null;

  // Ensure there’s at least one email
  const email = clerkUser.emailAddresses?.[0]?.emailAddress;
  if (!email) return null;

  // Try to find user by clerkId first
  let user = await prisma.user.findUnique({
    where: { clerkId: clerkUser.id },
  });

  // Fallback: if not found by clerkId, try by email (migrated users)
  if (!user) {
    user = await prisma.user.findUnique({ where: { email } });
  }

  // If user still doesn’t exist, create in Prisma
  if (!user) {
    user = await prisma.user.create({
      data: {
        clerkId: clerkUser.id,
        email,
        name: clerkUser.firstName ?? clerkUser.fullName ?? "",
        image: clerkUser.imageUrl ?? "",
      },
    });
  }

  return user;
}
