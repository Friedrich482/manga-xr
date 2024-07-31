const imagesArrayLength = 18;
const imagesNames = Array(imagesArrayLength)
  .fill(0)
  .map((_, i) => `/assets/avatars/one-piece/op${i + 1}.svg`);

export { imagesNames as default, imagesArrayLength };
