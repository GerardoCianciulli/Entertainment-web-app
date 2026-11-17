import PlayIcon from '/assets/icon-play.svg?react';

/** Hover state of a thumbnail: darkened image with a "Play" pill. Purely visual. */
export function PlayOverlay() {
  return (
    <div className="play-overlay" aria-hidden="true">
      <span className="play-overlay__pill">
        <PlayIcon />
        Play
      </span>
    </div>
  );
}
