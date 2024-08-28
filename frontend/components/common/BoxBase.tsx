export default function BoxBase({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="overflow-hidden bg-white py-16 dark:bg-gray-dark md:py-[40px] xl:py-[70px] 2xl:py-[100px] flex justify-center items-center">
      <section className="px-6 py-20 w-full max-w-[1536px]">{children}</section>
    </section>
  );
}
