import MovieIcon from '/assets/icon-category-movie.svg?react';
import TvIcon from '/assets/icon-category-tv.svg?react';
import type { Video } from '../types';

export function MediaMeta({ video, variant }: { video: Video; variant: 'trending' | 'regular' }) {
  const CategoryIcon = video.category === 'Movie' ? MovieIcon : TvIcon;
  return (
    <ul className={`media-meta media-meta--${variant}`}>
      <li>{video.year}</li>
      <li className="media-meta__category">
        <CategoryIcon aria-hidden="true" />
        {video.category}
      </li>
      <li>{video.rating}</li>
    </ul>
  );
}
