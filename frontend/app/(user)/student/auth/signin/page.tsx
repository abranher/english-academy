"use client";

import Image from "next/image";
import BoxAuth from "@/components/auth/BoxAuth";
import SignInForm from "@/components/auth/student/SignInForm";

export default function SigninPage() {
  return (
    <>
      <BoxAuth>
        <div className="hidden bg-muted lg:block">
          <Image
            src="/hero-student.jpg"
            alt="Image"
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
        <div className="flex items-center justify-center">
          <SignInForm />
        </div>
      </BoxAuth>
    </>
  );
}
