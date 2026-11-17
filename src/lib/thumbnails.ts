/**
 * data.json stores thumbnails as "./assets/thumbnails/<show>/<regular|trending>/<size>.jpg".
 * Globbing the folder lets Vite fingerprint and bundle every image, and this map
 * turns a data path into the URL Vite actually serves.
 */
const images = import.meta.glob<string>('/assets/thumbnails/**/*.jpg', {
  eager: true,
  query: '?url',
  import: 'default',
});

export function thumbnailUrl(dataPath: string): string {
  return images[dataPath.replace(/^\.\//, '/')] ?? dataPath;
}
