import { useId } from 'react';
import type { Video } from '../types';
import { MediaCard } from './MediaCard';
import './media.css';

type MediaSectionProps = {
  title: string;
  videos: Video[];
  onToggleBookmark: (video: Video) => void;
  /** "page" sections (Movies, TV Series, Bookmarked) sit slightly further from their grid. */
  variant?: 'home' | 'page';
  emptyMessage?: string;
};

export function MediaSection({ title, videos, onToggleBookmark, variant = 'home', emptyMessage }: MediaSectionProps) {
  const headingId = useId();
  return (
    <section className={`media-section media-section--${variant}`} aria-labelledby={headingId}>
      <h2 className="media-section__title heading-l" id={headingId}>
        {title}
      </h2>
      {videos.length > 0 ? (
        <ul className="media-grid">
          {videos.map((video) => (
            <li key={video.id}>
              <MediaCard video={video} onToggleBookmark={onToggleBookmark} />
            </li>
          ))}
        </ul>
      ) : (
        emptyMessage && <p className="media-section__empty">{emptyMessage}</p>
      )}
    </section>
  );
}
