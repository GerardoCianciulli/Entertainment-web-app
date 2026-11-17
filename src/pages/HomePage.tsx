import { useMemo, useState } from 'react';
import { AppShell } from '../components/AppShell';
import { MediaSection } from '../components/MediaSection';
import { TrendingSection } from '../components/TrendingSection';
import { useVideos } from '../hooks/useVideos';
import { resultsHeading, searchVideos } from '../lib/search';

export function HomePage() {
  const { videos, status, toggleBookmark } = useVideos();
  const [query, setQuery] = useState('');
  const isSearching = query.trim() !== '';
  const results = useMemo(() => searchVideos(videos, query), [videos, query]);

  return (
    <AppShell
      page="home"
      pageTitle="Home"
      searchPlaceholder="Search for movies or TV series"
      query={query}
      onQueryChange={setQuery}
      status={status}
    >
      {isSearching ? (
        <MediaSection title={resultsHeading(results.length, query)} videos={results} onToggleBookmark={toggleBookmark} />
      ) : (
        <>
          <TrendingSection videos={videos.filter((v) => v.isTrending)} onToggleBookmark={toggleBookmark} />
          <MediaSection
            title="Recommended for you"
            videos={videos.filter((v) => !v.isTrending)}
            onToggleBookmark={toggleBookmark}
          />
        </>
      )}
    </AppShell>
  );
}
