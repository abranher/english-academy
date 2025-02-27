export const formatPrice = (price: number | null) => {
  if (price === null) {
    return "$0.00";
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};

/**
 * Function to transform size file to MB
 */
export const formatSize = (size: number) =>
  `${(size / 1024 / 1024).toFixed(2)} MB`;

/**
 * Function to cut string in half
 */
export const truncateString = (
  input: string,
  size: "xs" | "sm" | "md" | "lg" = "sm"
): string => {
  const sizes = {
    xs: { length: 10 },
    sm: { length: 15 },
    md: { length: 40 },
    lg: { length: 65 },
  };

  const { length } = sizes[size];

  const startChars = Math.floor(length * 0.7); // 60% of length

  if (input.length <= length) return input;

  const firstPart = input.slice(0, startChars);
  const lastFour = input.slice(-6);

  return `${firstPart}...${lastFour}`;
};
