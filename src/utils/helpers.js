export const formatPrice = (number) => {
  const formattedPrice = new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  }).format(number / 100);
  return formattedPrice;
};

export const getUniqueValues = (data, type) => {
  let unique = data.map((item) => item[type]);
  if (type === "colors") {
    unique = unique.flat();
  }

  return ["all", ...new Set(unique)];
};
