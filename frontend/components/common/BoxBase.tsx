const paddingClasses = {
  xs: "px-4 py-4",
  sm: "px-4 py-12",
  md: "px-6 py-20",
  lg: "px-8 py-24",
};

export default function BoxBase({
  children,
  size = "md",
}: Readonly<{
  children: React.ReactNode;
  size?: keyof typeof paddingClasses;
}>) {
  return (
    <section className="overflow-hidden bg-white py-16 dark:bg-gray-dark md:py-[40px] xl:py-[70px] 2xl:py-[100px] flex justify-center items-center">
      <section className={`${paddingClasses[size]} w-full max-w-[1536px]`}>
        {children}
      </section>
    </section>
  );
}
