"use client";
import { useSession } from "next-auth/react";

export default function StudentHomePage() {
  const { data: session } = useSession();
  console.log(session);
  return <div>StudentHomePage</div>;
}
