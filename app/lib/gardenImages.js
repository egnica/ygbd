// app/lib/gardenImages.js

const baseUrl =
  "https://nciholasegner.s3.us-east-2.amazonaws.com/ygbd/ygbd-image-bucket";

const imageUrl = (id) => `${baseUrl}/${id}.webp`;

const rawGardenImages = [
  //URL example:  https://nciholasegner.s3.us-east-2.amazonaws.com/ygbd/ygbd-image-bucket/001.webp

  // Full object example for reference:
  // {
  //   id: "001", <- id represents the end of the image url as well
  //   ribbon: true,
  //   portrait: true,
  //   title: "Layered Garden Path",
  //   alt: "Layered perennial garden with a curved stone path",
  // },

  {
    id: "001",
    ribbon: true,
    portrait: true,
  },
  {
    id: "002",
    ribbon: true,
    portrait: true,
  },
  {
    id: "003",
    ribbon: true,
    portrait: true,
  },
  {
    id: "004",
    ribbon: true,
    portrait: true,
  },
  {
    id: "005",
    ribbon: true,
    portrait: true,
  },
  {
    id: "006",
    ribbon: true,
    portrait: true,
  },
  {
    id: "007",
    ribbon: true,
    portrait: true,
  },
];

export const gardenImages = rawGardenImages.map((image, index) => ({
  ...image,
  src: imageUrl(image.id),
  alt:
    image.alt ||
    image.title ||
    `Your Gardens by Design garden image ${index + 1}`,
}));

export const ribbonGardenImages = gardenImages.filter((image) => image.ribbon);
