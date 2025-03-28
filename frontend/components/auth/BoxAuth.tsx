export default function BoxAuth({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[600px]">
      {children}
    </section>
  );
}
