import Image from "next/image";
import BoxAuth from "@/components/auth/BoxAuth";
import SignUpForm from "@/components/auth/student/SignUpForm";

export default function SignupPage() {
  return (
    <>
      <BoxAuth>
        <div className="flex items-center justify-center">
          <SignUpForm />
        </div>
        <div className="hidden bg-muted lg:block">
          <Image
            src="/hero-student.jpg"
            alt="Image"
            width="1920"
            height="1080"
            className="h-full w-full object-cover brightness-[0.2] grayscale"
          />
        </div>
      </BoxAuth>
    </>
  );
}
