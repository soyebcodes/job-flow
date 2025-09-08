import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string; // now required
      email?: string | null;
      name?: string | null;
      image?: string | null;
    } & DefaultSession["user"];
    // Supabase-compatible JWT
    supabaseAccessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string; // store user id in JWT
  }
}
