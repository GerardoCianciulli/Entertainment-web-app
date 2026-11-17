import type { Video } from '../types';

export function searchVideos(videos: Video[], query: string): Video[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return videos;
  return videos.filter((video) => video.title.toLowerCase().includes(needle));
}

export function resultsHeading(count: number, query: string): string {
  return `Found ${count} result${count === 1 ? '' : 's'} for ‘${query.trim()}’`;
}
