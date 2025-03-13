const titleSizes = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-md",
  lg: "text-lg",
  xl: "text-xl",
  sxl: "text-2xl",
  mxl: "text-3xl",
  lxl: "text-4xl",
  // ... other sizes as needed
};

export function Title({
  children,
  size = "md",
}: Readonly<{
  children: React.ReactNode;
  size?: keyof typeof titleSizes;
}>) {
  return (
    <>
      <h2 className={`font-bold ${titleSizes[size]} py-3 flex gap-2`}>
        {children}
      </h2>
    </>
  );
}
