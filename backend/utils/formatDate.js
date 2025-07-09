export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("uz-UZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};