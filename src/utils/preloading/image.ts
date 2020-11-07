export default function preloadImage(urls: string[]): void {
  urls.forEach((uu, index) => {
    setTimeout(() => {
      const img = new Image();
      img.src = uu;
    }, 2000 * index);
  });
}
