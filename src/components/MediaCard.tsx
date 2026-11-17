import { thumbnailUrl } from '../lib/thumbnails';
import type { Video } from '../types';
import { BookmarkButton } from './BookmarkButton';
import { MediaMeta } from './MediaMeta';
import { PlayOverlay } from './PlayOverlay';

type MediaCardProps = {
  video: Video;
  onToggleBookmark: (video: Video) => void;
};

/** Thumbnail card used in "Recommended for you", the category pages, bookmarks and search results. */
export function MediaCard({ video, onToggleBookmark }: MediaCardProps) {
  const { small, medium, large } = video.thumbnail.regular;
  return (
    <article className="media-card">
      <div className="media-card__thumb">
        <picture>
          <source media="(max-width: 47.9375rem)" srcSet={thumbnailUrl(small)} />
          <source media="(max-width: 63.9375rem)" srcSet={thumbnailUrl(medium)} />
          <img className="media-card__image" src={thumbnailUrl(large)} alt="" loading="lazy" draggable={false} />
        </picture>
        <PlayOverlay />
        <BookmarkButton video={video} onToggle={onToggleBookmark} />
      </div>
      {/* Title first in the DOM for screen readers; CSS shows the meta line above it. */}
      <div className="media-card__info">
        <h3 className="media-card__title">{video.title}</h3>
        <MediaMeta video={video} variant="regular" />
      </div>
    </article>
  );
}
