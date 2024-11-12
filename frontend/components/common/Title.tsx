const titleSizes = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-md",
  lg: "text-lg",
  xl: "text-xl",
  // ... other sizes as needed
};

export default function Title({
  children,
  size = "md",
}: Readonly<{
  children: React.ReactNode;
  size?: keyof typeof titleSizes;
}>) {
  return (
    <>
      <h2 className={`font-bold ${titleSizes[size]}`}>{children}</h2>
    </>
  );
}
