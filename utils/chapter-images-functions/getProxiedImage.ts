const getProxiedImage = (url: string) => {
  const isProduction = process.env.NODE_ENV === "production";

  if (isProduction) {
    return `http://caddy:3003/image?imageUrl=${url}`;
  }

  return url;
};

export default getProxiedImage;
