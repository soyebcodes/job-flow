import { redirect } from "next/navigation";
import { currentUser, getAuth } from "@clerk/nextjs/server";

export default async function Page() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return <div>Hello,: {user.fullName}</div>;
}
