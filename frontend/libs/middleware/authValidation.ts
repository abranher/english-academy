import { redirect } from "next/navigation";

import { auth } from "@/config/auth";

export async function validateTutorSession() {
  const session = await auth();

  if (!session) redirect("/");
  if (!session.user.tutor?.activeSubscription) redirect("/tutor/plans");

  return session;
}
