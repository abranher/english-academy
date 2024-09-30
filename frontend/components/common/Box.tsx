import React from "react";

export default function Box({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <section className="w-full flex justify-center">
        <section className={`w-full max-w-[1536px]`}>{children}</section>
      </section>
    </>
  );
}
