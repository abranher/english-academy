export const formatPrice = (price: number | null) => {
  if (price === null) {
    return "$0.00";
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};

export const formatSize = (size: number) => {
  return `${(size / 1024).toFixed(2)} KB o ${(size / 1024 / 1024).toFixed(
    2
  )} MB`;
};
