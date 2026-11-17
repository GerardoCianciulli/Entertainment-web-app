import BookmarkEmptyIcon from '/assets/icon-bookmark-empty.svg?react';
import BookmarkFullIcon from '/assets/icon-bookmark-full.svg?react';
import type { Video } from '../types';

type BookmarkButtonProps = {
  video: Video;
  onToggle: (video: Video) => void;
};

export function BookmarkButton({ video, onToggle }: BookmarkButtonProps) {
  const Icon = video.isBookmarked ? BookmarkFullIcon : BookmarkEmptyIcon;
  return (
    <button
      type="button"
      className="bookmark-button"
      aria-label={`Bookmark ${video.title}`}
      aria-pressed={video.isBookmarked}
      onClick={() => onToggle(video)}
    >
      <Icon aria-hidden="true" />
    </button>
  );
}
