export default function MainBox({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="grid flex-1 items-start gap-4 p-6 sm:px-8 md:gap-6">
        <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
          {children}
        </div>
      </main>
    </>
  );
}
