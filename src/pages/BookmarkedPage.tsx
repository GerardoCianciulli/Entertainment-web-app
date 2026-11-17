import { useMemo, useState } from 'react';
import { AppShell } from '../components/AppShell';
import { MediaSection } from '../components/MediaSection';
import { useVideos } from '../hooks/useVideos';
import { resultsHeading, searchVideos } from '../lib/search';

export function BookmarkedPage() {
  const { videos, status, toggleBookmark } = useVideos();
  const [query, setQuery] = useState('');
  const isSearching = query.trim() !== '';

  const bookmarked = useMemo(() => videos.filter((v) => v.isBookmarked), [videos]);
  const results = useMemo(() => searchVideos(bookmarked, query), [bookmarked, query]);
  const ready = status === 'ready';

  return (
    <AppShell
      page="bookmarked"
      pageTitle="Bookmarked shows"
      searchPlaceholder="Search for bookmarked shows"
      query={query}
      onQueryChange={setQuery}
      status={status}
    >
      {isSearching ? (
        <MediaSection title={resultsHeading(results.length, query)} videos={results} onToggleBookmark={toggleBookmark} />
      ) : (
        <>
          <MediaSection
            title="Bookmarked Movies"
            videos={bookmarked.filter((v) => v.category === 'Movie')}
            onToggleBookmark={toggleBookmark}
            variant="page"
            emptyMessage={ready ? 'You haven’t bookmarked any movies yet.' : undefined}
          />
          <MediaSection
            title="Bookmarked TV Series"
            videos={bookmarked.filter((v) => v.category === 'TV Series')}
            onToggleBookmark={toggleBookmark}
            variant="page"
            emptyMessage={ready ? 'You haven’t bookmarked any TV series yet.' : undefined}
          />
        </>
      )}
    </AppShell>
  );
}
