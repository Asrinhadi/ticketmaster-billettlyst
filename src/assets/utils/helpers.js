export const convertDate = (dateString) => {
  if (!dateString) return "Ukjent dato";
  return dateString.split("-").reverse().join(".");
};

export const choseEventPhoto = (event, minWidth, maxWidth, ratio = "16_9") => {
  if (!event?.images?.length) {
    return "https://placehold.co/600x400?text=Billettlyst";
  }

  const image = event.images.find(
    (img) =>
      img.ratio === ratio &&
      img.width >= minWidth &&
      img.width <= maxWidth
  );

  return image ? image.url : "https://placehold.co/600x400?text=Billettlyst";
};
