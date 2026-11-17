import { thumbnailUrl } from '../lib/thumbnails';
import type { Video } from '../types';
import { BookmarkButton } from './BookmarkButton';
import { MediaMeta } from './MediaMeta';
import { PlayOverlay } from './PlayOverlay';

type TrendingCardProps = {
  video: Video;
  onToggleBookmark: (video: Video) => void;
};

export function TrendingCard({ video, onToggleBookmark }: TrendingCardProps) {
  const trending = video.thumbnail.trending ?? video.thumbnail.regular;
  return (
    <article className="trending-card">
      <picture>
        <source media="(max-width: 47.9375rem)" srcSet={thumbnailUrl(trending.small)} />
        <img className="trending-card__image" src={thumbnailUrl(trending.large)} alt="" draggable={false} />
      </picture>
      <PlayOverlay />
      <div className="trending-card__info">
        <h3 className="trending-card__title">{video.title}</h3>
        <MediaMeta video={video} variant="trending" />
      </div>
      <BookmarkButton video={video} onToggle={onToggleBookmark} />
    </article>
  );
}
