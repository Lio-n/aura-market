export const imageFallback = (event: Event) => {
  const imgElement = event.currentTarget as HTMLImageElement;

  const fallbackImageUrl = '/generic/steel_tin.jpg';

  const validUrlPattern =
    /^(https:\/\/i\.imgur\.com\/[a-zA-Z0-9]+\.jpeg|https:\/\/fakestoreapi\.com\/img\/[a-zA-Z0-9]+\.jpg)$/;

  if (!validUrlPattern.test(imgElement.src)) {
    imgElement.src = fallbackImageUrl;
  }
};
