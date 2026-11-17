import { useId, useRef } from 'react';
import { useDragScroll } from '../hooks/useDragScroll';
import type { Video } from '../types';
import { TrendingCard } from './TrendingCard';
import './media.css';

type TrendingSectionProps = {
  videos: Video[];
  onToggleBookmark: (video: Video) => void;
};

export function TrendingSection({ videos, onToggleBookmark }: TrendingSectionProps) {
  const headingId = useId();
  const scrollerRef = useRef<HTMLDivElement>(null);
  useDragScroll(scrollerRef);

  return (
    <section className="media-section media-section--trending" aria-labelledby={headingId}>
      <h2 className="media-section__title heading-l" id={headingId}>
        Trending
      </h2>
      {/* Focusable so keyboard users can scroll it sideways with the arrow keys. */}
      <div className="trending" ref={scrollerRef} role="region" aria-labelledby={headingId} tabIndex={0}>
        <ul className="trending__list">
          {videos.map((video) => (
            <li key={video.id}>
              <TrendingCard video={video} onToggleBookmark={onToggleBookmark} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
