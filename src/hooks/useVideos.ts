import { useCallback, useEffect, useState } from 'react';
import { fetchVideos, saveBookmark } from '../lib/api';
import type { Video } from '../types';

type Status = 'loading' | 'ready' | 'error';

/** Loads the catalogue once and exposes an optimistic bookmark toggle. */
export function useVideos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [status, setStatus] = useState<Status>('loading');

  useEffect(() => {
    let active = true;
    fetchVideos()
      .then((data) => {
        if (!active) return;
        setVideos(data);
        setStatus('ready');
      })
      .catch((error: unknown) => {
        console.error(error);
        if (active) setStatus('error');
      });
    return () => {
      active = false;
    };
  }, []);

  const toggleBookmark = useCallback((video: Video) => {
    const isBookmarked = !video.isBookmarked;
    const apply = (value: boolean) =>
      setVideos((current) => current.map((v) => (v.id === video.id ? { ...v, isBookmarked: value } : v)));

    apply(isBookmarked);
    saveBookmark(video.id, isBookmarked).catch((error: unknown) => {
      console.error(error);
      apply(!isBookmarked); // roll back if the server rejected the change
    });
  }, []);

  return { videos, status, toggleBookmark };
}
